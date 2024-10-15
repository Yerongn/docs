# 业务开发

::: tip Describe
WCS业务开发大致分为`工作流`和`后台任务`两种类型
:::

## 工作流

> 一般为`设备触发一次性执行(设备到位处理流程)`或者`达成某些条件后重复执行的流程(设备状态就绪定时获取设备任务)`

### Step

> Step 为流程中的一个步骤，开发完成后可以根据实际场景进行组合成业务流程。  
流程步骤需继承`StepBodyBaseAsync`抽象基类，指定设备模型数据类型`ConveryModelDto`，实现抽象方法`HandleAsync`,方法`HandleAsync`里放置业务代码

```c#
[ProcessAttribute(nameof(ConveryMove), "输送线移动")]
public class ConveryMove(ILoggerFactory loggerFactory, IReadWriteService readWriteService) // 
    : StepBodyBaseAsync<ConveryModelDto>(loggerFactory)
{
    private readonly IReadWriteService _readWriteService = readWriteService;

    public async override Task HandleAsync(StepDto<ConveryModelDto> deviceInfo)
    {
       // 业务代码
    }
}
```

::: tip
`Step`作为工作流中一个步骤，它应职责分明，实际业务与描述相符
:::

### 数据读写

> 底层做了封装，简化协议数据转换，设备服务查询等过程，支持使用`设备号`及对应的`数据类型`即可。  

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

// 数据部分写入 仅写入任务号和目标地址
(succeeded, errors) = await _readWriteService.WriteOnlyAsync("1002", new ConveryProtocol()
{
    Barcode = 1005,
    TaskNo = 1002,
    ToNode = 1004
}, x => new { x.ToNode, x.TaskNo });

(succeeded, errors, cry1002) = await _readWriteService.ReadAsync<ConveryProtocol, ConveryModelDto>("1002");

```

::: tip
系统鼓励使用强类型设备读写方法，强类型的好处：减少低级编码错误，提高可读性，重构方便，结合结构化日志+seq可对相关字段建立全文索引易于查询等。
:::

## 后台任务

> 定时任务一般用于`wms任务分解`，`设备状态定时推送`,`led、智能电视等数据定时推送`等需要在程序运行后定时执行的任务。

::: tip
定时任务的实现有多种，`.net`自带的`BackgroundService`,自己实现,abp自身也有 `BackgroundWorker`
项目主要使用Quartz.Net 库。[开源地址](https://github.com/quartznet/quartznet)
:::

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
        // 定时任务 逻辑
    }
}
```
