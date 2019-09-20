彻底弄懂HTTP缓存机制及原理: https://www.cnblogs.com/chenqf/p/6386163.html

HTTP缓存及众多的web储存概念小整理:https://www.jianshu.com/p/b41126e8a042

http://securityevaluators.com/knowledge/case_studies/caching/

在 http1.0 时代，给客户端设定缓存方式可通过两个字段——“Pragma”和“Expires”来规范。虽然这两个字段早可抛弃，但为了做http协议的向下兼容，你还是可以看到很多网站依旧会带上这两个字段。

Expires时间是相对服务器而言，无法保证和客户端时间统一。

Expires 是HTTP 1.0的东西，现在默认浏览器均默认使用HTTP 1.1，所以它的作用基本忽略。
另一个问题是，到期时间是由服务端生成的，但是客户端时间可能跟服务端时间有误差，这就会导致缓存命中的`误差`。
所以HTTP 1.1 的版本，`使用Cache-Control替代`。若报文中同时出现了 Pragma、Expires 和 Cache-Control，会以 Cache-Control 为准。

**对比缓存**，顾名思义，需要进行比较判断是否可以使用缓存。它在请求header和响应header间进行传递，
一共分为两种标识传递。
`Last-Modified / If-Modified-Since`
`Etag / If-None-Match（优先级高于Last-Modified  /  If-Modified-Since）`

- response headers:
Last-Modified:
expires:
cache-control:
X-Cache:
eTag:
Age
Date
 Age 也是响应报文中的首部字段，它表示该文件在代理服务器中存在的时间（秒），如文件被修改或替换，Age会重新由0开始累计。
 Date 理所当然是原服务器发送该资源响应报文的时间（GMT格式），如果你发现 Date 的时间与“当前时间”差别较大，或者连续F5刷新发现 Date 的值都没变化，则说明你当前请求是命中了代理服务器的缓存。

- request headers:
If-Modified-Since:
If-Unmodified-Since:
If-None-Match:
If-Match:

via是http协议里面的一个header,记录了一次http请求所经过的代理和网关；
`x-cache是squid代理的自定义header,用来记录缓存的命中与否。`
X-Cache:其实就个就是真实本机的HIT和MISS.
X-Cache-Lookup:这个就是向父，还有sibling模式的查询，比如ICP。之类命中的数据。

**强制缓存**：响应header中会有两个字段来标明失效规则（Expires/Cache-Control）

Pragma属于通用首部字段，在客户端上使用时，常规要求我们往html上加上这段meta元标签（而且可能还得做些hack放到body后面去）：
\<meta http-equiv="Pragma" content="no-cache">

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
链接:http://caibaojian.com/http-cache.html
来源:http://caibaojian.com

**缓存的好处：**

1. 减少了冗余的数据传输，节省了网费。

2. 减少了服务器的负担， 大大提高了网站的性能

3. 加快了客户端加载网页的速度