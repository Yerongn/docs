# 前端部署

## 构建Vue 项目

::: tip
后端接口地址与websocket通讯地址在环境文件`.env.production`中修改。
:::

确认地址无误后执行构建指令

```bash
npm run build
```

执行成功后得到构建后的项目文件`dist`

## 安装配置Nginx

### 1.镜像下载

下载最新版本:

```bash
docker pull nginx
```

下载指定版本

```bash
docker pull nginx:1.21.3
```

### 2.创建Nginx配置文件

```bash
# 创建挂载目录
mkdir -p /home/nginx/conf
mkdir -p /home/nginx/log
mkdir -p /home/nginx/html
```

  容器中的`nginx.conf`文件和`conf.d`文件夹复制到宿主机

```bash
# 生成容器
docker run --name nginx -p 9001:80 -d nginx
docker cp nginx:/etc/nginx/nginx.conf /home/nginx/conf/nginx.conf
docker cp nginx:/etc/nginx/conf.d /home/nginx/conf/conf.d
docker cp nginx:/usr/share/nginx/html /home/nginx/
```

### 3.创建Nginx容器并运行

  Docker 创建Nginx容器

```bash
# 删除之前创建Nginx容器
docker rm -f nginx
# 运行容器进行挂载
docker run \
-p 9002:80 \
--name nginx \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html \
-d nginx:latest
```

## 部署Vue项目

将`dist`文件整个复制到`/home/nginx/html` 中，根据实际需求重命名`xxx`，修改nginx配置文件`/home/nginx/conf/conf.d/default.conf`

```conf
  location / {
        root   /usr/share/nginx/html/xxx;
        index  index.html index.htm;
    }
```

修改配置后重启docker容器

```bash
docker restart nginx
```

至此就完成前端的部署，可以访问服务器地址9002端口查看部署好的前端应用
