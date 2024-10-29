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

## 创建DockerFile文件

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 19001

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

COPY . .
ENTRYPOINT ["dotnet", "WCS.Web.dll"]
```

## 创建后端服务镜像

将`publish`文件复制到服务器，进入到文件目录，在文件目录下执行镜像构建指令

```bash
docker build -t namexxx:v1029 .
```

## 创建容器

```bash
docker run --name  namexxxv1029 -p 19001:19001 -d namexxx:v1029

```
