# 日志服务

## 拉取镜像

```bash
SeqPsw=$(echo '123456' | docker run --rm -i datalust/seq config hash)  #拉取seq镜像，并通过seq实例命令生成seq密码hash
```

## 运行容器

```bash

# 创建数据文件目录
mkdir -p /docker/seq/data  
# 运行容器
docker run \
--name seq \
-d \
--restart unless-stopped \
-e ACCEPT_EULA=Y \
-e SEQ_FIRSTRUN_ADMINPASSWORDHASH="$SeqPsw" \ # 设置默认用户admin密码
-v  /docker/seq/data:/data \ # 映射数据卷到容器外部
--memory = 500m \ # 配置容器最大使用内存
--memory-swap = 500m \
-e SEQ_CACHE_SYSTEMRAMTARGET = 0 \ # 配置不使用缓存
-p 55080:80 \
-p 55341:5341 \
datalust/seq
```

## 日志配置
