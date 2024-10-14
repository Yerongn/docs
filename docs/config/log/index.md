# 日志使用

::: tip Describe
使用  sierllog + Seq 结构化应用程序日志和跟踪的实时搜索和分析服务器，可以进行日志快速索引追踪。审计日志可以记录用户的操作行为。
:::

## 业务日志

业务日志指系统运行过程种主动输出或者是异常捕获日志

### sierllog

`sierllog` 结构化日志库，更多可以查看[官方文档](https://serilog.net/)

- 日志使用

```C# {3,7}
public class LoggerDemo(ILogger<LoggerDemo> logger)
{
    private readonly ILogger<LoggerDemo> _logger = logger;

    public void LogTest() 
    {
        _logger.LogInformation("{Level} {Message}", "Information", "test log");
    }
}
```

- 在工作流代码中使用

```c#
[ProcessAttribute(nameof(ConveryCheck),"输送线异常校验")]
public class ConveryCheck(ILoggerFactory loggerFactory,
    IS7ReadWriteService readWriteService) // 
    : StepBodyBaseAsync<ConveryModelDto>(loggerFactory)
{
       private readonly IS7ReadWriteService _readWriteService = readWriteService;

    public override async Task HandleAsync(StepDto<ConveryModelDto> deviceInfo)
    {
        var (succeeded, errors, cry1002) = await _readWriteService.ReadAsync<ConveryProtocol, ConveryModelDto>("1002");
     
        if (!succeeded)
            Logger.LogError("读取信息失败。原因：{@Errors}", deviceInfo.DeviceNo, errors); // [!code highlight] 
    }
}
```

在工作流代码中的日志底层中间件会附件设备编号及工作流id等属性，方便问题排查。

```c#{1,3}
  using (_log.BeginScope("{@WorkflowId}", workflowId))
  using (_log.BeginScope("{@StepId}", stepId))
  using (_log.BeginScope("{@DeviceNo}", deviceNo))
  {
      return await next();
  }
```

### 监控界面

监控界面双击设备，设备日志页签可以显示设备近期发生的日志信息，方便快速定位`正在发生`的异常。

### Seq

用于`已发生异常`分析追踪。

> `Seq` 结构化应用程序日志和跟踪的实时搜索和分析服务器，可以进行日志快速索引追踪,如需了解更多可以参考[官方文档](https://docs.datalust.co/docs/an-overview-of-seq)

访问[seq远程服务地址](http://47.106.154.216:8900/) 可以进行日志搜索查询

- 设备日志查询  
  直接使用`DeviceNo='查询设备号'`即可查询该设备日志信息

- 业务流程日志查询  
  根据流程id查询流程相关日志

## 审计日志

审计日志记录用户的操作行为,帮助排查问题
