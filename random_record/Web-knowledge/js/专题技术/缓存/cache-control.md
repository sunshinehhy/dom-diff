https://baike.baidu.com/item/Cache-control/1885913?fr=aladdin

https://blog.csdn.net/liaozhongping/article/details/51114264

客户端可以在HTTP请求中使用的标准 Cache-Control 指令。

Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-control: no-cache 
Cache-control: no-store
Cache-control: no-transform
Cache-control: only-if-cached

服务器可以在响应中使用的标准 Cache-Control 指令。

Cache-control: must-revalidate
Cache-control: no-cache
Cache-control: no-store
Cache-control: no-transform
Cache-control: public
Cache-control: private
Cache-control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-control: s-maxage=<seconds>

Cache-Control是关于浏览器缓存的最重要的设置，因为`它覆盖其他设置，比如 Expires 和 Last-Modified`。另外，由于浏览器的行为基本相同，这个属性是处理跨浏览器缓存问题的`最有效的方法`。

##  请求头中的 If-Modified-Since（If-No-Match） 和响应头中的Last-Modified（ETag）

通过HTTP 请求头中的 If-Modified-Since（If-No-Match） 和响应头中的Last-Modified（ETag）来实现，HTTP请求把 If-Modified-Since（If-No-Match）传给服务器，服务器将其与Last-Modified（ETag）对比，若相同，则文件没有被改动过，则返回304，直接浏览器缓存中读取资源即可。

问题：虽然该方法减少了已缓存资源的下载时间，`但仍然发起了一次http请求`。

解决：`已缓存资源不再发起http请求，即HTTP的Expires和Cache-Control`。对一个网站而言，CSS、JavaScript、图片等静态资源更新的频率都比较低，而这些文件又几乎是每次HTTP请求都需要的，如果将这些文件缓存在浏览器中，可以极好的改善性能。通过设置http头中的cache-control和expires的属性，可设定浏览器缓存，将静态内容设为永不过期，或者很长时间后才过期。

### Cache-Control
Cache-Control属性是在服务器端配置的，不同的服务器有不同的配置，apache、nginx、IIS、tomcat等配置都不尽相同。

`问题：`浏览器缓存的资源，若又想更新资源，如何实现？

解决：通过修改该资源的名称来实现。修改了资源名称，浏览器会当做不同的资源。

### Expires

Expires属性也是在服务端配置的，具体的配置也根据服务器而定。

`问题：`可能存在客户端时间跟服务端时间不一致的问题。

解决：建议Expires结合Cache-Control一起使用。
## 常用 cache-directive 值
- public	所有内容都将被缓存(`客户端和代理服务器都可缓存`)
- private	内容只缓存到私有缓存中(`仅客户端可以缓存，代理服务器不可缓存`)
- no-cache	必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。
- no-store	`所有内容都不会被缓存`到缓存或 Internet 临时文件中
- must-revalidation/proxy-revalidation	如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证
- max-age=xxx (xxx is numeric)	缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高

Server 的 Cache-Control   
1. no-store, `提示客户端应该删除这个缓存`
2. no-cache, 提示客户端在重新验证这个缓存之前不应该使用，不能缓存
3. max-age, 表示缓存的新鲜时间, 在此时间内可以不发送 http 请求去验证缓存而直接使用它, 如果 max-age=0. 则表示要求不要缓存文档
4. s-maxage, 功能与 max-age 相同, 但`只对共享缓存生效`(CDN, 反向代理)
5. public, 指示响应可被`任何缓存`区缓存
6. private ， 指示对于单个用户的整个或部分响应消息，不能被共享缓存处理。这允许服务器仅仅描述当用户的部分响应消息，此响应消息对于其他用户的请求无效
7. no-transform
8. must-revalidate
9. proxy-revalidate

Client 的 Cache-Control
1. max-stale, `可以使用过期缓存`
2. max-stale=s, 在 s 秒内, `缓存可以过期`
3. min-fresh=s, 在 s 秒内, 缓存`不能过期`
4. max-age=s, 缓存的 age 必须小于 s 秒 
5. no-cache, `除非资源进行再验证, 否则不接受缓存`
6. no-store, 表示反向代理服务器`不应该缓存这个请求的 response`
7. only-if-cached, `只想要已缓存的数据, 否则返回 504`

在请求消息或响应消息中设置Cache-Control并不会修改另一个消息处理过程中的缓存处理过程。

## no-cache

如果 no-cache 指令`没有规定 field-name`，那么一个缓存`不能使用响应`以`满足`接下来的、没有与源服务器重新验证的`请求`。这`可以让源服务器防止缓存`，甚至是已被配置的缓存，`返回给客户端陈旧的响应`。

如果 no-cache 指令`规定了一个或多个 field-names`，那么一个缓存`可以使用响应`来`满足`接下来的`请求`，遵守缓存的其他限制。然而，指定的 field-name 参数`不能在响应中被发送给`接下来的、没有与源服务器成功重新验证的`请求`。这`可以让源服务器防止重用响应中的某个头`，`而仍然可以缓存响应的其他部分`。

## Expires和max-age的区别
Expires和max-age都可以用来指定文档的过期时间，但是二者有一些细微差别

1. Expires在HTTP/1.0中已经定义，Cache-Control:max-age在HTTP/1.1中才有定义，为了向下兼容，仅使用max-age不够；

2. Expires指定一个绝对的过期时间(GMT格式),这么做会导致至少2个问题 
1) 客户端和服务器时间不同步导致Expires的配置出现问题 （这个值是GMT时间格式，如果客户端和服务器端时间不一致，使用expires就会存在偏差。）
2）很容易在配置后忘记具体的过期时间，导致过期来临出现浪涌现象；



3. max-age 指定的是`从文档被访问后的存活时间`，这个时间是个相对值(比如:3600s),相对的是`文档第一次被请求时服务器记录`的Request_time(请求时间)

4. Expires指定的时间可以是`相对文件的最后访问时间(Atime)或者修改时间(MTime)`,而max-age相对对的是`文档的请求时间`(Atime)

5. 在Apache中，max-age是根据Expires的时间来计算出来的max-age = expires- request_time:(mod_expires.c)

6. `当expires和max-age同时存在时,max-age的优先级会高于expires.`
### 过期机制
实体的过期时间可以由源服务器通过 Expires 头来指定
另一个方法是，在响应中使用 max-age 指令
如果一个响应既包含 Expires 头，又包含 max-age 指令，那么 `max-age 指令会覆盖 Expires 头`，即使 Expires 头更有限制性

### 测试实例：

1) 未使用expires和cache-control的测试demo：

打开网址：http://stevesouders.com/hpws/expiresoff.php

2) 使用expires和cache-control的测试demo：

打开网址：http://stevesouders.com/hpws/expireson.php

## Etag比Last-Modified的优势
Etag 主要为了解决 Last-Modified 无法解决的一些问题。
1. 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET;

2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是s级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)

3. 某些服务器不能精确的得到文件的最后修改时间；
为此，HTTP/1.1引入了 Etag(Entity Tags).Etag仅仅是一个和文件相关的标记，可以是一个版本标记,比如说v1.0.0或者说"2e681a-6-5d044840"这么一串看起来很神秘的编码。但是HTTP/1.1标准并没有规定Etag的内容是什么或者说要怎么实现，唯一规定的是Etag需要放在""内。

## 请求流程
请求流程
Etag由服务器端生成，客户端通过If-Match或者说If-None-Match这个条件判断请求来验证资源是否修改。`常见的是使用If-None-Match`.请求一个文件的流程可能如下：

====第一次请求===
1. 客户端发起 HTTP GET 请求一个文件；
2. 服务器处理请求，返回文件内容和一堆Header，当然包括Etag(例如"2e681a-6-5d044840")(假设服务器支持Etag生成和已经开启了Etag).状态码200

====第二次请求===
1. 客户端发起 HTTP GET 请求一个文件，注意这个时候客户端同时发送一个If-None-Match头，这个头的内容就是第一次请求时服务器返回的Etag：2e681a-6-5d044840
2. 服务器判断发送过来的Etag和计算出来的Etag匹配，因此If-None-Match为False，不返回200，返回304，客户端继续使用本地缓存；

流程很简单，问题是，如果服务器又设置了Cache-Control:max-age和Expires呢，怎么办？
答案是同时使用，也就是说在完全匹配If-Modified-Since和If-None-Match即检查完修改时间和Etag之后，服务器才能返回304.(不要陷入到底使用谁的问题怪圈)