## 1. 安装 Docker CE

**安装 Docker CE**  
Docker 有两个分支版本：Docker CE 和 Docker EE，即社区版和企业版。本教程基于 CentOS 7 安装 Docker CE。

1.  安装 Docker 的依赖库。

```bash
yum install -y yum-utils device-mapper-persistent-data lvm2
```

1.  添加 Docker CE 的软件源信息。

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

3.  安装 Docker CE。

```bash
yum makecache fast
yum -y install docker-ce
```

4.  启动 Docker 服务。

```bash
systemctl start docker
```
