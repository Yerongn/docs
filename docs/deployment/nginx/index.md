# Nginx

## Nginx安装

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
