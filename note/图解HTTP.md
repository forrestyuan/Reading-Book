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
请求报文是由请求方法、请求URI、协议版本、可选的请求首部字段和内容实体构成。

响应报文基本由协议版本、状态码、原因短语、可选的响应首部字段以及实体

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