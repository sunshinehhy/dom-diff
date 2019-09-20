https://nodejs.org/api/http.html

## Event: 'upgrade'
每次服务器响应请求并进行升级时发出。如果这个事件没有被监听，并且响应状态代码是101个交换协议，接收升级报头的客户端将关闭他们的连接。

## agent.maxSockets
默认设置为无穷大。确定每个源代理可以打开多少个并发套接字。Origin是agent.getName()的返回值。

## agent.requests
包含尚未分配给套接字的请求队列的对象。不要修改。

## agent.sockets
包含代理当前使用的套接字数组的对象。不要修改。

## request.socket
对基础套接字的引用。通常用户不希望访问此属性。特别是，由于协议解析器如何连接到套接字，套接字不会发出“可读”的事件。套接字也可以通过request.connection访问。

Reference to the underlying socket. Usually users will not want to access this property. In particular, the socket will not emit 'readable' events because of how the protocol parser attaches to the socket. The socket may also be accessed via request.connection.