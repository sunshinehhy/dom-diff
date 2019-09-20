- Accept：浏览器可接受的MIME类型。

- Accept-Charset：浏览器可接受的字符集。

- Accept-Encoding：浏览器能够进行解码的数据编码方式，比如gzip。Servlet能够向支持gzip的浏览器返回经gzip编码的HTML页面。许多情形下这可以减少5到10倍的下载时间。

- Accept-Language：浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到。

- Accept-Ranges：WEB服务器表明自己是否接受获取其某个实体的一部分（比如文件的一部分）的请求。bytes：表示接受，none：表示不接受。 


- Authorization：授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中。

- Connection：表示`是否需要持久连接`。如果Servlet看到这里的值为“Keep-Alive”，或者看到请求使用的是HTTP 1.1（HTTP 1.1默认进行持久连接），它就可以利用持久连接的优点，当页面包含多个元素时（例如Applet，图片），显著地减少下载所需要的时间。要实现这一点，Servlet需要在应答中发送一个Content-Length头，最简单的实现方法是：先把内容写入ByteArrayOutputStream，然后在正式写出内容之前计算它的大小。

- Content-Length：表示请求消息正文的长度。

- Cookie：`这是最重要的请求头信息之一`

- From：请求发送者的email地址，由一些特殊的Web客户程序使用，浏览器不会用到它。

- Host：初始URL中的主机和端口。

- If-Modified-Since：只有当所请求的内容在指定的日期之后又经过修改才返回它，否则返回304“Not Modified”应答。

- Pragma：指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝。

- `Referer`：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。

- User-Agent：浏览器类型，`如果Servlet返回的内容与浏览器类型有关则该值非常有用`。

- UA-Pixels，UA-Color，UA-OS，UA-CPU：由某些版本的IE浏览器所发送的非标准的请求头，表示屏幕大小、颜色深度、操作系统和CPU类型。



## Location响应头 

　Location响应头用于重定向接收者到一个新URI地址。

## Server响应头 

Server响应头包含处理请求的`原始服务器的软件信息`。此域能包含多个产品标识和注释，产品标识一般按照重要性排序。

## Referer
Referer，告诉服务器我是从哪个页面链接过来的，服务器基此可以获得一些信息用于处理。

## 请求ft图片
比如：

ft自定义了头文件：
ft-image-format: webp
ft-suppress-friendly-error: true

**response headers**
```
accept-ranges: bytes
access-control-allow-origin: *
age: 7149
cache-control: public, max-age=604800, stale-while-revalidate=604800, stale-if-error=604800
content-length: 15866
content-type: image/webp
date: Fri, 23 Mar 2018 01:10:23 GMT
etag: "0184bbecdd70e611f2010ead1cf2a915"
ft-image-format: webp
ft-suppress-friendly-error: true
last-modified: Mon, 04 Sep 2017 16:17:31 GMT
status: 200
vary: FT-image-format, Content-Dpr, FT-Site, Accept-Encoding
```
**request headers**
```
Provisional headers are shown  为什么出错这个？
Referer: http://www.ftchinese.com/
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36
```

## provisional headers are shown 原因分析
原因：（有待核实）

client发送请求后，由于各种原因，比如网络延迟，server端逻辑错误，导致client端长时间未收到响应。

可能有拦截屏蔽problem，也有可能是url错误，查到的一篇文章还说了还可能是缓存引用problem等；

解决方案：（需要进一步研究)

改正占用很长时间的server端程序。