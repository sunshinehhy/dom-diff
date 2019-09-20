https://nodejs.org/api/http2.html


核心API提供了一个底层接口，专门围绕对HTTP/2协议特性的支持而设计。它特别不是为与现有的HTTP/1模块API兼容而设计的。但是，ompatibility API是。

与http API相比，http2核心API在客户端和服务器之间更加对称。例如，大多数事件，如“错误”、“连接”和“流”，都可以通过客户端代码或服务器端代码发出。

## Server-side example
下面演示了一个使用核心API的简单HTTP/2服务器。由于没有已知的浏览器支持 unencrypted HTTP/2，所以在与浏览器客户机通信时，需要使用http2.createSecureServer()。

要为本例生成证书和密钥，请运行:
```
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

## Class: Http2Session
http2.Http2Session类的实例表示HTTP/2客户机和服务器之间的活动通信会话。该类的实例不打算由用户代码直接构造。

每个Http2Session实例将显示稍微不同的行为，这取决于它是作为服务器还是作为客户端操作。http2session.type属性可用于确定Http2Session操作的模式。在服务器端，用户代码应该很少有机会直接使用Http2Session对象，大多数操作通常是通过与Http2Server或Http2Stream对象的交互进行的。