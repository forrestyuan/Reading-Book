## Nginx 可以做啥

### 1. 正向代理

正向代理服务器是一个位于客户端和原始服务器(origin server)之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标(原始服务器)，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端才能使用正向代理。

> 比较典型的例子就是 VPN 服务器，用户可以利用代理用户器穿过防火墙来访问外部网络，如下图：

![](https://i.bmp.ovh/imgs/2021/09/287b90d9e8a155e3.png)

### 2. 反向代理

反向代理服务器位于用户与目标服务器之间，但是对于用户而言，反向代理服务器就相当于目标服务器，即用户直接访问反向代理服务器就可以获得目标服务器的资源。

同时，用户不需要知道目标服务器的地址，也无须在用户端作任何设定。反向代理服务器通常可用来作为 Web 加速，即使用反向代理作为 Web 服务器的前置机来降低网络和服务器的负载，提高访问效率。

> 真实服务器地址不能被外界所访问，所以需要通过一台代理服务器来访问内部资源，相当于外界提供的一个接口

![](https://i.bmp.ovh/imgs/2021/09/3ea43ddc70429ccd.png)

### 3. HTTP 服务器

Nginx 本身也是一个静态资源的服务器，当只有静态资源的时候，就可以用 Nginx 来做服务器。就像现在比较流行的动静分离，将动态资源和静态资源根据一定的规则来区分开，这样我们就可以根据静态资源特点来对它进行缓存。

> 对于静态资源比如图片，js，css 等文件，我们则在反向代理服务器 nginx 中进行缓存。这样浏览器在请求一个静态资源时，代理服务器 nginx 就可以直接处理，无需将请求转发给后端服务器 tomcat。

> 若用户请求的动态文件，比如 servlet,jsp 则转发给 Tomcat 服务器处理，从而实现动静分离。这也是反向代理服务器的一个重要的作用。

![](https://i.bmp.ovh/imgs/2021/09/dd7a5f4edbefdf49.png)

### 4. 负责均衡

将请求通过某些负载均衡算法来分摊到某个指定的服务器上进行处理.

**upstream 负载均衡算法：**

负载均衡服务器的实现可以分成两个部分：

1、根据负载均衡算法和 web 服务器的 IP 列表来计算得到集群中某一台服务器的 IP

2、将请求数据发送到该地址对应的服务器；

|                      |
| -------------------- |
| **一、 🚗 轮询方式** |
|                      |

**轮询（round robin）**  
默认按照轮询（Round Robin）的方式进行负载均衡，每个请求按照 IP 顺序分配到不同的后端服务器，会维护一个服务器列表，如果后端服务器 down 掉，可以将 down 掉的服务器剔除。

> 缺点是可靠性低，和负载分配不均衡（如果后端服务器性能不一致的话）

**加权轮询（Weighted Round Robin）**  
针对每台后端服务器性能不一致的情况，可以对性能较好的服务器进行侧重分配用户请求，对性能不高的服务器分配少一些用户请求

```
upstream sunsite{
  server 192.168.0.12:80 weight=7;
  server 192.168.0.12:81 weight=3;
}
```

> 指定轮询几率，权重为 7 的 A 服务器访问几率会比权重为 3 的 B 服务器大

|                      |
| -------------------- |
| **二、 🚗 随机方式** |
|                      |

**随机**  
在服务器列表中随机抽取一个服务器 IP 地址来处理用户请求，在请求量大的情况下，根据概率论，每台服务器所处理的请求趋于平衡。

**加权随机**
在随机的基础上，给不同的服务器进行加权，服务器性能好的优先响应请求。

|                      |
| -------------------- |
| **三、 🚗 最小连接** |
|                      |

**最小连接**  
根据连接数分配用户请求，连接数小的服务器优先级高

|                  |
| ---------------- |
| **四、 🚗 散列** |
|                  |

**IP_Hash**  
根据请求来源的 IP 地址进行 Hash 计算，得到后端服务器，这样来自同一个 IP 的请求总是会落到同一台服务器上处理，以致于可以将请求上下文信息存储在这个服务器上

> 同一个会话周期内共享使用（共享 Session），实现会话粘滞

```
upstream sunsite{
  ip_hash;
  server 192.168.0.12:80;
  server 192.168.0.12:81;
}
```

**url_hash（第三方）**  
按访问 url 的 hash 结果来分配请求，使每个 url 定向到同一个后端服务器，后端服务器为缓存时比较有效。

|                  |
| ---------------- |
| **五、 🚗 其它** |
|                  |

**fair（第三方）**  
fair 采用的不是内建负载均衡使用的轮换的均衡算法，而是可以根据页面大小、加载时间长短智能的进行负载均衡。，也就是根据后端服务器时间来分配用户请求，响应时间短的优先分配。

```
upstream sunsite{
  fair;
  server 192.168.0.12:80;
  server 192.168.0.12:81;
}
```
