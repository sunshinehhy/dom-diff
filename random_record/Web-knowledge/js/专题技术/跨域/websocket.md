http://www.ruanyifeng.com/blog/2017/05/websocket.html

http://cdn.bootcss.com/socket.io/1.7.2/socket.io.min.js

WebSocket:通信可以由客户端发起，服务器也可以主动向客户端推送信息

HTTP 协议有一个缺陷：通信只能由客户端发起。

## WebSocket特点包括:

1）建立在 TCP 协议之上，服务器端的实现比较容易。

（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

（3）数据格式比较轻量，性能开销小，通信高效。

（4）可以发送文本，也可以发送二进制数据。

（5）没有同源限制，客户端可以与任意服务器通信。

（6）协议标识符是ws（如果加密，则为wss），服务器网址就是 URL。

```
ws://example.com:80/some/path

```
## websocket与http
WebSocket是HTML5中的协议，支持持久连接；而Http协议不支持持久连接。

首先HTMl5指的是一系列新的API,或者说新规范，新技术。WebSocket是HTML5中新协议、新API.跟HTTP协议基本没有关系。

Http协议本身只有1.0和1.1，也就是所谓的Keep-alive，把多个Http请求合并为一个。

## webSocket的作用

（1）ajax轮询

ajax轮询的原理非常简单，让浏览器隔个几秒就发送一次请求，询问服务器是否有新信息。

（2）long poll（长轮询）

long poll 其实原理跟 ajax轮询 差不多，都是采用轮询的方式，不过采取的是阻塞模型（一直打电话，没收到就不挂电话），也就是说，客户端发起连接后，如果没消息，就一直不返回Response给客户端（对于PHP有最大执行时间，建议没消息，执行到一定时间也返回）。直到有消息才返回，返回完之后，客户端再次建立连接，周而复始。

从上面可以看出其实这两种方式，都是在不断地建立HTTP连接，关闭HTTP协议，由于HTTP是非状态性的，每次都要重新传输 identity info （鉴别信息），来告诉服务端你是谁。然后等待服务端处理，可以体现HTTP协议的另外一个特点，被动性。

何为被动性呢，其实就是，服务端不能主动联系客户端，只能有客户端发起。从上面很容易看出来，不管怎么样，上面这两种都是非常消耗资源的。

ajax轮询 需要服务器有很快的处理速度和资源。（速度）long poll 需要有很高的并发，也就是说同时接待客户的能力。（场地大小）

（3）WebSocket

`Websocket解决了HTTP的这几个难题`。首先，被动性，当服务器完成协议升级后（HTTP->Websocket），服务端就可以主动推送信息给客户端啦。解决了上面同步有延迟的问题。

`解决服务器上消耗资源的问题`：其实我们所用的程序是要经过两层代理的，即HTTP协议在Nginx等服务器的解析下，然后再传送给相应的Handler（php等）来处理。简单地说，我们有一个非常快速的 接线员（Nginx） ，他负责把问题转交给相应的 客服（Handler） 。Websocket就解决了这样一个难题，建立后，可以直接跟接线员建立持久连接，有信息的时候客服想办法通知接线员，然后接线员在统一转交给客户。

`由于Websocket只需要一次HTTP握手`，所以说整个通讯过程是建立在一次连接/状态中，也就避免了HTTP的非状态性，服务端会一直知道你的信息，直到你关闭请求，这样就解决了接线员要反复解析HTTP协议，还要查看identity info的信息。

`目前唯一的问题是：不兼容低版本的IE`

## Websocket是什么样的协议，具体有什么优点
首先，Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说

HTTP的生命周期通过 Request 来界定，也就是一个 Request 一个 Response ，那么在 HTTP1.0 中，这次HTTP请求就结束了。

在HTTP1.1中进行了改进，使得有一个keep-alive，也就是说，在一个HTTP连接中，可以发送多个Request，接收多个Response。但是请记住 Request = Response ， 在HTTP中永远是这样，也就是说一个request只能有一个response。而且这个response也是被动的，不能主动发起。

https://www.jianshu.com/p/4e80b931cdea

[基于vue和websocket的多人在线聊天室](https://www.imooc.com/article/13400)

[利用socket.io实现多人聊天室(基于Nodejs)](https://blog.csdn.net/newpidian/article/details/51043415)
