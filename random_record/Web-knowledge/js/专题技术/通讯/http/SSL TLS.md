http://blog.csdn.net/mrpre/article/details/77978293

http://www.techug.com/post/https-ssl-tls.html

SSL 是洋文“Secure Sockets Layer”的缩写，中文叫做“安全套接层”。

IETF 就在那年把 SSL 标准化。标准化之后的名称改为 TLS（是“Transport Layer Security”的缩写），中文叫做“传输层安全协议”。
很多相关的文章都把这两者并列称呼（SSL/TLS），因为这两者可`以视作同一个东西的不同阶段`。

在网络分层模型中，TCP 被称为“传输层协议”，而 HTTP 被称为“应用层协议”。

HTTP 协议如何使用 TCP 连接？

HTTP 对 TCP 连接的使用，分为两种方式：俗称“短连接”和“长连接”（“长连接”又称“持久连接”，洋文叫做“Keep-Alive”或“Persistent Connection”）

引入 HTTPS 之后，【不能】导致性能变得太差。否则的话，谁还愿意用？
为了确保性能，SSL 的设计者至少要考虑如下几点：
1. 如何选择加密算法（“对称”or“非对称”）？
2. 如何兼顾 HTTP 采用的“短连接”TCP 方式？
（SSL 是在1995年之前开始设计的，那时候的 HTTP 版本还是 1.0，默认使用的是“短连接”的 TCP 方式——默认不启用 Keep-Alive）