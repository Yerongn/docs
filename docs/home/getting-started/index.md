# 快速开始

## 设备协议配置

创建协议类底层按协议类型字段顺序数据类型将`byte[]`转换成协议对象，协议类需实现两个标记接口`IDeviceProtocol` 、 设备状态标记接口`IState`

```c#
[Description("输送线任务数据协议")]
public class ConveryProtocol : IDeviceProtocol, IState
{
    [DataMember(Name = "任务号", Order = 1)]
    public int TaskNo { get; set; }

    [DataMember(Name = "条码", Order = 2)]
    public int Barcode { get; set; }

    [DataMember(Name = "起始地址", Order = 3)]
    public int FromNode { get; set; }

    [DataMember(Name = "目标地址", Order = 4)]
    public int ToNode { get; set; }
}
```

## 场景搭建

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

## 流程配置
