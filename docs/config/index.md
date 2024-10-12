# 简介

::: tip Introduction
后端项目使用abp项目分层结构
:::

## 项目结构图

项目结构后续1.0版本会进行调整

```c#
docs：文档文件
framework: 基础组件文件
module: 模块文件 包含 wsc模块 wms模块 权限模块
scheduler: 核心设备调度及通讯模块文件 
  SchedulerCore
  SchedulerCore.Siemens
  SchedulerCore.Socket
Solution Items: 解决方案文件 包含编码风格配置文件`Solution Items`等
src: wcs模块代码(后续调整)
    Application: 应用层 放业务代码
        Jobs: 定时任务
        Mappers: 对象映射， 例如协议对象与设备模型对象间的映射关系
        ProtocolParses: 协议配置
        Services: 业务开发，设备状态订阅、调度逻辑处理、对外接口
    Application.Contracts : dtos、接口
    Domain: 领域层 实体、领域业务
    Domain.Shared: 各层统共享的常量枚举等
    SqlSugarCore: ORM
    Web:网站
```
