# 模块间通讯

::: tip
模块间通讯，分为同步通信和异步通信，同步通信采用请求\响应式，异步通信采用事件发布\消费形式.
:::

## 同步通讯

::: tip
例如：wms模块任务下发至wcs模块
:::

在wcs模块`WMCS.WCS.IntegrationEvents`项目中增加数据请求参数类`WmsTaskSendRequest`:

```c#

public sealed record WmsTaskSendRequest(
    string TaskNo, 
    string ContainerBarcode, 
    string SourceAddress, 
    string TargetAddress);

```

在`WMCS.WCS.IntegrationEvents`项目中新增消息处理类`WmsTaskSendRequestConsumer`

```c#
internal sealed class WmsTaskSendRequestConsumer(ILogger<WmsTaskSendRequestConsumer> logger)
    : IConsumer<WmsTaskSendRequest>
{
    public async Task Consume(ConsumeContext<WmsTaskSendRequest> context)
    {
        // 检查数据库中是否已有该任务

        // 检查任务是否已完成

        // 字段校验

        // 数据存储

        logger.LogInformation("wcs:收到wms下发任务,任务号：{TaskNo}",context.Message.TaskNo);

        // 结果返回
        var result = OperationResult.Success();
        await context.RespondAsync(result);
    }
}

```

在基础设施模块`WCSInfrastructureModule`中注册消费者

```c#
public static void ConfigureConsumers(IRegistrationConfigurator registrationConfigurator, string instanceId)
{
    registrationConfigurator.AddConsumer<WmsTaskSendRequestConsumer>()
        .Endpoint(c => c.InstanceId = instanceId);
}
```

::: tip
wms 进行任务下发
:::

```c#
public class WcsTaskService(IRequestClient<WmsTaskSendRequest> client) : IWcsTaskService
{
    public async Task<OperationResult> SendTask(WmsTaskDto task)
    {
        return (await client.GetResponse<OperationResult>(task.Adapt<WmsTaskSendRequest>())).Message;
    }
}

```

## 异步通讯

::: tip
例如：wcs任务状态更新通知wms进行异步更新，使用事件发布模式
:::

在`WMCS.WCS.IntegrationEvents`项目中增加集成事件`TaskStatusChangeIntegrationEvent`

```c#
public sealed class TaskStatusChangeIntegrationEvent(
    string taskNo,
    string taskStatus) 
{
    public string TaskNo { get; init; } = taskNo;

    public string TaskStatus { get; init; } = taskStatus;
}
```

消息发布

```c# [7]
public class WmsTaskService(IBus bus) : ITransientDependency, IWmsTaskService
{
    public async Task<OperationResult> UpdateWmsTaskStatusAsync(string wmsTaskNo, string taskStatus, string taskNo = "")
    {
        try
        {
            await bus.Publish(new TaskStatusChangeIntegrationEvent(wmsTaskNo, taskStatus));
            return OperationResult.Success();
        }
        catch (Exception ex)
        {
            return OperationResult.Failure(nameof(UpdateWmsTaskStatusAsync), $"发布更新wms任务状态失败,异常信息：{ex.Message}");
        }
    }
}
```

在`WMCS.WMS.Infrastructure` 中增加事件消费者`TaskStatusChangeIntegrationEventHandler`

```c#
internal sealed class TaskStatusChangeIntegrationEventConsumer(
    ILogger<TaskStatusChangeIntegrationEventConsumer> logger) 
    :IConsumer<TaskStatusChangeIntegrationEvent>
{
    public Task Consume(ConsumeContext<TaskStatusChangeIntegrationEvent> context)
    {
        logger.LogInformation("WCS 调用任务更新接口，任务号:{TaskNo},任务状态：{TaskStatus}",context.Message.TaskNo,context.Message.TaskStatus);

        return Task.CompletedTask;
    }
}
```

在基础设施模块`WmsInfrastructureModule`中注册消费者

```c#
public static void ConfigureConsumers(IRegistrationConfigurator registrationConfigurator, string instanceId)
{
    registrationConfigurator.AddConsumer<TaskStatusChangeIntegrationEventConsumer>()
        .Endpoint(c => c.InstanceId = instanceId);
}
```
