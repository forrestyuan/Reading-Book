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
* GET : 获取资源  
用来请求访问已被URI识别的资源。
* POST : 传输实体主体  
用来传输实体的主体。
* PUT：传输文件  
用来传输文件，鉴于HTTP/1.1的PUT方法自身不带验证机制，任何人都可以上传文件，存在安全性问题，需要配合应用程序的验证机制。
* HEAD： 获取报文首部  
和GET方法类似，只是不返回报文主体部分，用于确认URI的有效性及资源更新的日期时间等
* DELETE: 删除文件  
用来删除文件，与PUT方法相反。DELETE方法按请求URI删除指定的资源。但是HTTP/1.1的DELETE方法一样不带验证机制，需要借助web程序的验证机制。
* OPTIONS: 询问支持的方法  
用来查询针对请求URI指定的资源支持的方法。
* TRACE: 追踪路径  
让Web服务器将之前的请求通信环回给客户端的方法。