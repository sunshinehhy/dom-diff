## ALPN
ALPN :Application Layer Protocol Negotiation  应用层协议协商

新的web协议(如HTTP/2)的开发提高了在传输层安全性(TLS)握手过程中协议协商的需要。已经定义了一个名为ALPN的协议协商(应用程序层协议协商- RFC7301)来完成这个任务。


到2016年，ALPN已经取代了旧的NPN(现在已完全弃用)NPN。


对于那些支持HTTP/2的浏览器，它们现在都支持ALPN。从Jetty 9.3.0开始，只有ALPN得到Jetty的支持。

举例：ALPN对后面版本的Chrome来说是开启HTTP2协议的必要条件

OpenSSL 是一个安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用。

Cipher Suite（密钥算法套件，后文简称Cipher