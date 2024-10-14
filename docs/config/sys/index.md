# 系统配置

## 应用程序配置

日志配置在`src->WCS.Web`项目`appsettings.json` 文档配置
配置启动程序端口、跨域、数据连接等

## 日志配置

日志使用 `sierllog` + `Seq`

日志配置在`src->WCS.Web`项目`serilogsettings.json` 文档配置

- 插件配置

``` json
{ 
    "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.Seq",
      "Serilog.Sinks.File",
      "Serilog.Expressions"
    ],
    }
}
   
```

- 日志等级

``` json
{ 
    "Serilog": {
       "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning"
      }
    }
    }
}
   
```

- 写入控制台

``` json
{ 
    "Serilog": {
      "WriteTo": [
      {
        "Name": "Console",
        "Args": {
          "restrictedToMinimumLevel": "Error",
          "theme": "Serilog.Sinks.SystemConsole.Themes.SystemConsoleTheme::Literate, Serilog.Sinks.Console"
        }
      }
      ]
    }
}
   
```

- 写入Seq

``` json
{ 
    "Serilog": {
      "WriteTo": [
      {
        "Name": "Seq",
        "Args": {
          "serverUrl": "http://47.106.154.216:5341",
          "apiKey": "gIeCpozRBWCsRDnaPSV7"
        }
      },
      ]
    }
}
   
```

- 写入File

``` json
{ 
    "Serilog": {
      "WriteTo": [
     {
        "Name": "Logger",
        "Args": {
          "configureLogger": {
            "Filter": [ // 过滤条件
              {
                "Name": "ByIncludingOnly",
                "Args": {
                  "expression": "StartsWith(SourceContext, 'WCS.Application.Services.WMSInterfaceService')"
                }
              }
            ],
            "WriteTo": [
              {
                "Name": "File",
                "Args": {
                  "path": "logs/WMSInterface/WMSInterfaceService-.log",
                  "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{ThreadId} {Level:u3}] {Message:lj} {NewLine} {Exception}",
                  "rollingInterval": "Day",
                  "retainedFileCountLimit": "7", //最大数量
                  "fileSizeLimitBytes": 52428800
                }
              }
            ]
          }
        }
      }
      ]
    }
}
   
```

::: details 完整配置

``` json
{
  "Serilog": {
    "Using": [
      "Serilog.Sinks.Console",
      "Serilog.Sinks.Seq",
      "Serilog.Sinks.File",
      "Serilog.Expressions"
    ],
    "MinimumLevel": {
      "Default": "Debug",
      "Override": {
        "Microsoft": "Warning"
      }
    },
    "WriteTo": [ // 日志志事件接收器
      {
        "Name": "Console",
        "Args": {
          "restrictedToMinimumLevel": "Error",
          "theme": "Serilog.Sinks.SystemConsole.Themes.SystemConsoleTheme::Literate, Serilog.Sinks.Console"
        }
      },
      {
        "Name": "Seq",
        "Args": {
          "serverUrl": "http://47.106.154.216:5341",
          "apiKey": "gIeCpozRBWCsRDnaPSV7"
        }
      },
      {
        "Name": "File",
        "Args": {
          "path": "logs/error/error-.log",
          "rollingInterval": "Day",
          "fileSizeLimitBytes": 52428800,
          "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{ThreadId} {Level:u3}] {Message:lj} {NewLine}{Exception}",
          "restrictedToMinimumLevel": "Error",
          "retainedFileCountLimit": "7" //最大数量
        }
      },
      {
        "Name": "Logger",
        "Args": {
          "configureLogger": {
            "Filter": [
              {
                "Name": "ByIncludingOnly",
                "Args": {
                  "expression": "StartsWith(SourceContext, 'WCS.Application.Services.WMSInterfaceService')"
                }
              }
            ],
            "WriteTo": [
              {
                "Name": "File",
                "Args": {
                  "path": "logs/WMSInterface/WMSInterfaceService-.log",
                  "outputTemplate": "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{ThreadId} {Level:u3}] {Message:lj} {NewLine} {Exception}",
                  "rollingInterval": "Day",
                  "retainedFileCountLimit": "7", //最大数量
                  "fileSizeLimitBytes": 52428800
                }
              }
            ]
          }
        }
      }
    ],
    "Enrich": [
      "FromLogContext",
      "WithMachineName",
      "WithThreadId"
    ],
    "Properties": {
      "Application": "WCS-vNext"
    }
  }
}
```

:::
