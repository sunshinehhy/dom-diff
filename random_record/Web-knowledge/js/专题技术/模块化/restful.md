RESTful API 设计指南:http://www.ruanyifeng.com/blog/2014/05/restful_api

理解OAuth 2.0:http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html

https://developer.github.com/v3/media/#request-specific-version

REST API v3 ：https://developer.github.com/v3/
RESTFul API已经是现在互联网里对外开放接口的主流模式
RESTful API浅谈：https://www.cnblogs.com/imyalost/p/7923230.html

REST与RESTFul API最佳实践：http://blog.csdn.net/u013063153/article/details/72811976

**RESTFul API的一些最佳实践原则：**

使用HTTP动词表示增删改查资源， GET：查询，POST：新增，PUT：更新，DELETE：删除
返回结果必须使用JSON
HTTP状态码，在REST中都有特定的意义：200，201,202,204,400,401,403,500。比如401表示用户身份认证失败，403表示你验证身份通过了，但这个资源你不能操作。
如果出现错误，返回一个错误码。

### OAuth

OAuth is an open standard for access delegation, commonly used as a way for Internet users to grant websites or applications access to their information on other websites but without giving them the passwordss.
OAuth是访问代理的一个开放的标准，经常用于尽管没有给他们密码，但对于互联网用户去授权网站或者应用程序在其他网站上可以访问他们的信息的方式。

### 我的理解
https://blog.csdn.net/chenxiaochan/article/details/73716617

restful：访问服务器api的模式

在 REST 样式的 Web 服务中，每个资源都有一个地址。资源本身都是方法调用的目标，方法列表对所有资源都是一样的。这些方法都是标准方法，包括 HTTP GET、POST、PUT、DELETE，还可能包括 HEADER 和 OPTIONS。

什么是Restful:
对应的中文是rest式的;Restful web service是一种常见的rest的应用,是遵守了rest风格的web服务;rest式的web服务是一种ROA(The Resource-Oriented Architecture)(面向资源的架构).