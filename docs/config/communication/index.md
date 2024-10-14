# 通讯配置

::: tip Describe
支持西门子s7 通讯、socket 通讯，socket通讯支持底层分包等功能。
:::

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

## 连接配置

### siemens.s7

  1. 配置驱动: 设置ip、port、cpu、插槽、机架号
  2. 创建分组：设置是否主动扫描db块数据及读取频率
  3. 生成设备协议：使用快速生成 生成设备协议字段对应点位地址

### socket.client

  1. 通讯配置: 设置ip、port
  2. 分包规则: 分包配置，底层分包

### socket.service

   1. 通讯配置: 设置ip、port
   2. 分包规则: 分包配置，底层分包