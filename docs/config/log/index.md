# 日志使用

::: tip Describe
使用  sierllog + Seq 结构化应用程序日志和跟踪的实时搜索和分析服务器，可以进行日志快速索引追踪。审计日志可以记录用户的操作行为。
:::

## 业务日志

业务日志指系统运行过程种主动输出或者是异常捕获日志

### sierllog

`sierllog` 结构化日志库，更多可以查看[官方文档](https://serilog.net/)

- 日志配置
  
- 日志基础使用

```C#
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
            Logger.LogError("读取信息失败。原因：{@Errors}", deviceInfo.DeviceNo, errors);
    }
}
```

在工作流代码中的日志底层中间件会附件设备编号及工作流id等属性，方便问题排查。

```c#
  using (_log.BeginScope("{@WorkflowId}", workflowId))
  using (_log.BeginScope("{@StepId}", stepId))
  using (_log.BeginScope("{@DeviceNo}", deviceNo))
  {
      return await next();
  }
```

### Seq

`Seq` 结构化应用程序日志和跟踪的实时搜索和分析服务器，可以进行日志快速索引追踪,如需了解更多可以参考[官方文档](https://docs.datalust.co/docs/an-overview-of-seq)

访问[seq远程服务地址](http://47.106.154.216:8900/) 可以进行日志搜索查询

seq 支持多种查询方式

## 审计日志

审计日志记录用户的操作行为,帮助排查问题
