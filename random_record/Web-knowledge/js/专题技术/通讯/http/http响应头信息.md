## HTTP应答头概述（HttpServletResponse）

Web服务器的HTTP应答一般由以下几项构成：一个状态行，一个或多个应答头，一个空行，内容文档。设置HTTP应答头往往和设置状态行中的状态代码结合起来。例如，`有好几个表示“文档位置已经改变”的状态代码都伴随着一个Location头`，而`401（Unauthorized）状态代码则必须伴随一个WWW-Authenticate头`。

然而，即使在没有设置特殊含义的状态代码时，指定应答头也是很有用的。应答头可以用来完成：设置Cookie，指定修改日期，指示浏览器按照指定的间隔刷新页面，声明文档的长度以便利用持久HTTP连接，……等等许多其他任务。

设置应答头最常用的方法是HttpServletResponse的setHeader，该方法有两个参数，分别表示应答头的名字和值。和设置状态代码相似，`设置应答头应该在发送任何文档内容之前`进行。

setDateHeader方法和setIntHeadr方法专门用来设置包含日期和整数值的应答头，前者避免了把Java时间转换为GMT时间字符串的麻烦，后者则避免了把整数转换为字符串的麻烦。

HttpServletResponse还提供了许多设置
setContentType：设置Content-Type头。大多数Servlet都要用到这个方法。
setContentLength：设置Content-Length头。对于支持持久HTTP连接的浏览器来说，这个函数是很有用的。
addCookie：设置一个Cookie（Servlet API中没有setCookie方法，因为应答往往包含多个Set-Cookie头）。
另外，如上节介绍，sendRedirect方法设置状态代码302时也会设置Location头。

### HTTP响应头说明

- Allow 服务器支持哪些请求方法（如GET、POST等）。

- Content-Encoding 文档的编码（Encode）方法。只有在解码之后才可以得到Content-Type头指定的内容类型。利用gzip压缩文档能够显著地减少HTML文档的下载时间。Java的GZIPOutputStream可以很方便地进行gzip压缩，但只有Unix上的Netscape和Windows上的IE 4、IE 5才支持它。因此，Servlet应该通过查看Accept-Encoding头（即request.getHeader("Accept-Encoding")）检查浏览器是否支持gzip，为支持gzip的浏览器返回经gzip压缩的HTML页面，为其他浏览器返回普通页面。

- Content-Length 表示内容长度。只有`当浏览器使用持久HTTP连接时才需要这个数据`。如果你想要利用持久连接的优势，可以把输出文档写入ByteArrayOutputStram，完成后查看其大小，然后把该值放入- Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容。

- Content-Type 表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。

- Date 当前的GMT时间。你可以用setDateHeader来设置这个头以避免转换时间格式的麻烦。

- Expires 应该在什么时候认为文档已经过期，从而不再缓存它

- Last-Modified 文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304（Not Modified）状态。Last-Modified也可用setDateHeader方法来设置。

- Location 表示`客户应当到哪里去提取文档`。Location通常不是直接设置的，而是通过HttpServletResponse的sendRedirect方法，该方法同时设置状态代码为302。

- Refresh 表示浏览器应该在多少时间之后刷新文档，以秒计。除了刷新当前文档之外，你还可以通过setHeader("Refresh", "5; URL=http://host/path")让浏览器读取指定的页面。注意这种功能通常是通过设置HTML页面HEAD区的<META HTTP-EQUIV="Refresh" CONTENT="5;URL=http://host/path">实现，这是因为，`自动刷新或重定向对于那些不能使用CGI或Servlet的HTML编写者十分重要`。但是，对于Servlet来说，直接设置Refresh头更加方便。注意Refresh的意义是“N秒之后刷新本页面或访问指定页面”，而不是“每隔N秒刷新本页面或访问指定页面”。因此，连续刷新要求每次都发送一个Refresh头，而发送204状态代码则可以阻止浏览器继续刷新，不管是使用Refresh头还是<META HTTP-EQUIV="Refresh" ...>。注意Refresh头不属于HTTP 1.1正式规范的一部分，而是一个扩展，但Netscape和IE都支持它。

- Server 服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置。

- Set-Cookie 设置和页面关联的Cookie。Servlet不应使用response.setHeader("Set-Cookie", ...)，而是应使用HttpServletResponse提供的专用方法addCookie。

- WWW-Authenticate 客户应该在Authorization头中提供什么类型的授权信息？在包含401（Unauthorized）状态行的应答中这个头是必需的。例如，response.setHeader("WWW-Authenticate", "BASIC realm=\"executives\"")。注意Servlet一般不进行这方面的处理，而是让Web服务器的专门机制来控制受密码保护页面的访问（例如.htaccess）。

- Pragma:用来包含实现特定的指令，最常用的是Pragma:no-cache。在http/1.1协议中，它的含义和Cache-Control:no-cache相同。

- Age：当代理服务器用`自己缓存的实体去响应请求`时，用该头部表明该实体`从产生到现在经过多长时间`了。 

- Cache-Control：请求：no-cache（不要缓存的实体，要求现在从WEB服务器去取）

Cache-Control属性是在服务器端配置的，不同的服务器有不同的配置，apache、nginx、IIS、tomcat等配置都不尽相同。

``` 
max-age：（只接受 Age 值小于 max-age 值，并且没有过期的对象） 
max-stale：（可以接受过去的对象，但是过期时间必须小于 max-stale 值） 
min-fresh：（接受其新鲜生命期大于其当前 Age 跟 min-fresh 值之和的缓存对象） 
响应：public(可以用 Cached 内容回应任何用户) 
private（只能用缓存内容回应先前请求该内容的那个用户） 
no-cache（可以缓存，但是只有在跟WEB服务器验证了其有效后，才能返回给客户端） 
max-age：（本响应包含的对象的过期时间） 
ALL: no-store（不允许缓存） 

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

```
实体信息一般由实体头域和实体组成。实体头域包含关于实体的原信息。
实体头包含：Allow、Content-Base、Content-Encoding、Content-Language、Content-Length、Content-Location、Content-MD5、Content-Range、Content-Type、Etag、Expires、Last-Modified、extension-header

## X-Cache 和 X-Cache-Lookup headers

http://blog.haohtml.com/archives/4783

总结：X-Cache和x-cache-lookup项常见于squid做代理服务器软件的网站的http header。依据上面的现象推测:
- x-cache-lookup项指专门`查看代理服务器中是否有某个网页缓存`。有就返回HIT,没有返回MISS。
- 而x-cache项指浏览器`从何处、是在哪个代理缓存载入的网页文件`。服务器名后的3128指服务器端口。

Content-Type在请求头和响应头中都有 
text/html 返回的内容是文本类型

application/x-www-form-urlencoded   在发送前编码所有字符（默认）

multipart/form-data            不对字符编码。在`使用包含文件上传控件的表单时，必须使用该值`。

text/plain                                       空格转换为 "+" 加号，但不对特殊字符编码。

post请求里Content-Type方式:

application/x-www-form-urlencoded：数据`被编码为名称/值对`。这是标准的编码格式。
multipart/form-data： `数据被编码为一条消息`，页上的每个控件对应消息中的一个部分。
text/plain： 数据`以纯文本形式(text/json/xml/html)进行编码`，其中不含任何控件或格式字符。postman软件里标的是RAW。 一般`向服务端发送json数据会使用这种方式`。

form的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded

## Date响应头
HTTP/1.1要求源服务器的每一个响应都包含一个Date头信息，表示这个`响应被源服务器创建的时间`，我们用date_value表示这个Date头的值。

## Age响应头
用now表示当前主机的当前时间，用request_time表示缓存发起请求的时间，用response_time表示缓存收到响应的时间。

HTTP/1.1使用Age响应头表示`响应从缓存中拿到时响应的寿命`，我们用age_value表示Age头的值。

缓存中响应的寿命可以通过两种完全独立的方式计算：

1.  直接用response_time（缓存收到响应的时间）减去date_value（响应被创建的时间），如果为负数，用0替代。

2.  如果响应路径上的所有缓存实现了HTTP/1.1，则直接用age_value值。

但实际上，我们很难保证响应路径上的所有缓存都实现了HTTP/1.1，所以，同时使用这两种方式，然后进行修正，结果会更可靠：

corrected_received_age= max(response_time - date_value, age_value);

到这里还没有完成最终计算，corrected_received_age只是缓存收到响应时，响应的寿命，没有考虑响应到下一个缓存或客户端的网络延迟时间。

因为网络会有延迟，在传输过程中寿命已经增加了，下一个缓存就得考虑这个因素。对于这个因素，HTTP/1.1采用了一种比较保守的计算方法，假设从请求发起到收到响应的时间就是网络延迟的时间（结果不一定就是实际经过的时间），用response_delay表示：

response_delay= response_time – request_time;

corrected_initial_age= corrected_received_age + response_delay;

response_delay一般指最后一个缓存到客户端的延误时间，如果响应路径上有多个缓存，不需要迭代，因为corrected_received_age是根据缓存收到响应的时间，已经减去了前面的网络延迟。

以上还只是计算响应第一次出现在缓存中时已经拥有的寿命，响应一旦被缓存，就可能被多次使用，这个时候，响应的寿命就得由缓存来计算了。我们用resident_time表示响应在缓存中贮存的时间，用current_age表示响应的当前寿命：

resident_time= now - response_time;

current_age= corrected_initial_age + resident_time;

如果响应路径中有缓存，请求最终受到的响应头Age对应的值是current_age，而不是服务器最初给的Age，因为这个值被缓存已经修改过了。