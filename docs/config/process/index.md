# 业务开发

::: tip Describe
业务开发
:::

## 流程开发

```c#
[ProcessAttribute(nameof(ConveryMove), "输送线移动")]
public class ConveryMove(ILoggerFactory loggerFactory, IReadWriteService readWriteService) // 
    : StepBodyBaseAsync<ConveryModelDto>(loggerFactory)
{
    private readonly IReadWriteService _readWriteService = readWriteService;

    public async override Task HandleAsync(StepDto<ConveryModelDto> deviceInfo)
    {
       // Handle
    }
}
```

## 数据读写

```c#

// 设备数据读取
var (succeeded, errors, cry1002) = await _readWriteService.ReadAsync<ConveryProtocol, ConveryModelDto>("1002");
     
// 设备数据写入
(succeeded, errors) = await _readWriteService.WriteAsync("1002", new ConveryProtocol()
{
    Barcode = 1001,
    TaskNo = 1002,
    ToNode = 1003
});

// 数据部分写入
(succeeded, errors) = await _readWriteService.WriteOnlyAsync("1002", new ConveryProtocol()
{
    Barcode = 1005,
    TaskNo = 1002,
    ToNode = 1004
}, x => new { x.ToNode, x.TaskNo });

(succeeded, errors, cry1002) = await _readWriteService.ReadAsync<ConveryProtocol, ConveryModelDto>("1002");

```

## 定时任务

定时任务的实现有多种，`.net`自带的`BackgroundService`,自己实现,abp自身也有 `BackgroundWorker`
项目主要使用Quartz.Net 库。[开源地址](https://github.com/quartznet/quartznet)

```c#
public class WmsTaskDisassembleJob : QuartzBackgroundWorkerBase
{
    private readonly WMSInterfaceService _wmsInterfaceService;

    public WmsTaskDisassembleJob(ISqlSugarRepository<UserEntity> repository, WMSInterfaceService wmsInterfaceService)
    {
        JobDetail = JobBuilder.Create<WmsTaskDisassembleJob>().WithIdentity(nameof(WmsTaskDisassembleJob)).Build();
        Trigger = TriggerBuilder.Create().WithIdentity(nameof(WmsTaskDisassembleJob)).StartNow()
          .WithSimpleSchedule(x => x
              .WithIntervalInSeconds(200) // 间隔时间
              .RepeatForever())
          .Build();

        _wmsInterfaceService = wmsInterfaceService;
    }

    public override async Task Execute(IJobExecutionContext context)
    {
        //业务逻辑
    }
}
```
