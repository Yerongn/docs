# 后端端部署

## 发布项目

vs中右键WCS.Web项目，选择发布，发布至文件夹

发布成功后我们将得到`publish`文件

## CQRS

在`appsettings.json`跨域配置中增加前端服务地址如`http://localhost:8899`

```json
  //应用启动
  "App": {
    "SelfUrl": "http://*:19001",
    "CorsOrigins": "http://localhost:8899"
  },
```

## 部署并运行

将`publish`文件复制到服务器,进入文件双击`WCS.Web.exe`。完成服务启动

## 部署成后台服务
