# ψ(._. )> 图解HTTP 阅读笔记

## 📚 简单的HTTP协议
### 🖊 请求--响应
```bash
#客户端发送请求
POST /index.hmtl  HTTP/1.1
Host:hackr.jp
Connection: keep-alive
Content-Type: application/x-www-form-urlencoded
Content-Length: 16 

name = ueno&age = 37

#服务端返回响应
HTTP/1.1 200 OK
Date: Tue, 10 Jul 2022 06:50:15 GMT
Content-Length: 362
Content-Type:text/html
<html>
....
```
从上述发送的请求报文和响应报文可以看出：请求访问某台服务器上的/index.html 文件资源。
请求报文是由 **请求方法**、**请求URI**、**协议版本**、可选的 **请求首部字段**和 **内容实体**构成。

响应报文基本由 **协议版本**、**状态码**、**原因短语**、可选的 **响应首部字段** 以及 **实体**

### 🖊HTTP首部字段
HTTP首部字段是由首部字段名 和 字段值构成的，中间用冒号“：”分隔  
`首部字段名：字段值`  
HTTP首部字段根据实际用途可分为以下4种类型。

|类型|解释|
|--|--|
|通用首部字段（General Header Fields）|请求报文和响应报文都会使用的首部|
|请求首部字段（Request Heaser Fields）|从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、相应内容先骨干优先级等信息|
|响应首部字段（rESONPONESE Header Fields）|从服务器端想客户端返回响应报文时使用的首部。补充了响应的附加内容，也会要求客户端附加额外的内容信息|
|实体首部字段（Entity Header Fields）|针对请求报文和响应报文的实体部分使用的首部。补充了资源内容更新时间等与实体有关的信息|

<details>
<summary>通用首部字段</summary>

字段名|说明
--|--
Cache-Control|控制缓存的行为
Connection|逐跳首部、连接的管理
Date|创建报文的日期时间
Pragma|报文指令
Trailer|报文指令
Transfer-Encoding|报文末端的首部一览
Upgrade|升级为其他协议
Via|代理服务器的相关信息
Warning|错误通知
</details>
<details>
<summary>请求首部字段</summary>

字段名|说明
--|--
Accept|用户代理可处理的媒体类型
Accept-Charset|优先的字符集
Accept-Encoding|优先的内容编码
Accept-Language|优先的语言
Authorization|Web认证信息
Expect|期待服务器的特定行为
From|用户的电子邮箱地址
Host|请求资源所在服务器
If-Match|比较实体标记（ETag）
If-Modified-Since|比较资源的更新时间
If-None-Match|比较实体标记
If-Range|资源未更新时发送实体Byte的范围请求
If-Unmodified-Since|比较资源的更新时间
Max-Forwards|最大传输逐跳数
Proxy-Authorization|代理服务器要求客户端的认证信息
Range|实体的字节范围请求
Referer|对请求中URI的原始获取方
TE|传输编码的优先级
User-Agent|客户端程序的信息

</details>
<details>
<summary>响应首部字段</summary>

字段名|说明
--|--
Accept-Range|是否接受字节范围请求
Age|推算资源创建经过时间
ETag|资源的匹配信息
Location|让客户端重定向到指定URI
Proxy-Authenticate| 代理服务器对客户端的认证信息
Retry-After|对再次发起请求的实际要求
Server|HTTP服务器的安装信息
Vary|代理服务器缓存的管理信息
WWW-Authenticate|服务器对客户端的认证信息
</details>
<details>
<summary>实体首部字段</summary>

字段名|说明
--|--
Allow|资源可支持的HTTP方法
Content-Encoding|实体主体使用的编码方式
Content-Language|实体主体的自然语言
Content-Length|实体主体的大小，单位字节
Content-Location|替代对应资源的URI
Content-MD5|实体主体的报文摘要
Content-Range|实体主体的位置范围
Content-Type|实体主体的媒体类型
Expires|实体主体过期的日期时间
Last-Modified|资源最后修改的日期时间
</details>

除了以上47中首部字段，还有Cookie、Set-Cookie 和 Content-Disposition等在其他RFC中定义的首部字段。


### 🖊 请求方法
* GET : 获取资源（HTTP1.1、1.0支持）  
用来请求访问已被URI识别的资源。
* POST : 传输实体主体（HTTP1.1、1.0支持）  
用来传输实体的主体。
* PUT：传输文件（HTTP1.1、1.0支持）  
用来传输文件，鉴于HTTP/1.1的PUT方法自身不带验证机制，任何人都可以上传文件，存在安全性问题，需要配合应用程序的验证机制。
* HEAD： 获取报文首部（HTTP1.1、1.0支持）  
和GET方法类似，只是不返回报文主体部分，用于确认URI的有效性及资源更新的日期时间等
* DELETE: 删除文件（HTTP1.1、1.0支持）  
用来删除文件，与PUT方法相反。DELETE方法按请求URI删除指定的资源。但是HTTP/1.1的DELETE方法一样不带验证机制，需要借助web程序的验证机制。
* OPTIONS: 询问支持的方法（HTTP1.1支持）  
用来查询针对请求URI指定的资源支持的方法。
* TRACE: 追踪路径（HTTP1.1支持）  
让Web服务器将之前的请求通信环回给客户端的方法。

* CONNECT： 要求用隧道协议连接代理（HTTP1.1支持）   
要求在于代理服务器通信时建立隧道，实现用隧道协议进行TCP通信。主要使用SSL（Secure Sockets Layer）和TLS协议把通信内容加密后经网络隧道传输。

* LINK 建立和资源之间的联系 （HTTP1.0 支持）
* UNLINE 断开连接关系（HTTP1.0 支持）


### 🖊 持久连接
持久连接减少了TCP连接的重复建立和断开所造成的额外开销。在HTTP/1.1中，所有的连接默认都是持久连接，但在HTTP/1.0并未标准化。

## 📚HTTP报文中的HTTP信息
用于HTTP协议交互的信息被称为HTTP报文。请求报文和响应报文。HTTP报文本身是由多行（CR + LF作换行符）数据构成的字符串文本。  
HTTP报文大致可分为报文首部和报文主体两块。两者有空行划分。报文主体不是必须的。

### 🖊请求报文及响应报文的结构
![请求报文及响应报文的结构](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/HTTP_req_res.jpg)


## 📚状态码
||类别|原因短语
--|--|--
1XX|Informational 信息性状态码|接受的请求正在处理
2XX|Success 成功状态码|请求正常处理完毕
3XX|Redirection 重定向状态码|需要进行附加操作已完成请求
4XX|Client Error 客户端错误状态码|服务器无法处理请求
5XX|Server Error 服务器错误状态码|服务器处理请求出错

**200 OK** :请求成功  
**204 No Content**：请求成功处理返回的响应报文中不包含实体的主体部分。  
**206 Partial Content** 表示客户端进行了范围请求，响应报文中包含Content-Range指定范围的实体内容
***
**301 Moved Permanently**：永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指定的URI。  
**302 Found**：临时性重定向。  
**303 See Other**: 应使用GET方法定向获取请求的资源   
**304 Not Modified** 请求的内容未更新，调用缓存内容  

***
**400 Bad Request** 请求报文中存在错误。  
**401 Unauthorized** 该状态码表示发送的请求需要通过HTTP认证（BASIC认证、DIGEST认证）的认证信息。  
**403 Forbidden** 请求被拒绝  
**404 Not Found**  
***
**500 Internal Server Error** 服务器内部发生错误  
**503 Service Unavailable** 该状态码表示服务器暂时无法处理请求（停机或维护状态）

## 📚与http协作的web服务器
### 🖊代理
接收客户端发送的请求后转发给其他服务器。代理不改变请求URI，会直接发送给目标服务器。  
每次通过代理服务器转发请求或响应时都会追加写入Via首部信息。  
使用代理服务器的理由是：利用缓存技术减少网络带宽的流量，组织内部针对特定网站的访问控制，以获取访问日志为主要目的，等等。

### 🖊网关
网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的原服务器一样对请求进行处理。能使通信线路上的服务器提供非HTTP协议服务，利用网关可以提高通信的安全性。

### 🖊隧道
隧道可按要求建立起一条与其他服务器的通信线路，届时使用SSL等加密手段进行通信。隧道的目的是确保客户端能与服务器进行安全的通信。