## cookie:name=value
这是发送回服务器的额外信息`可以用于唯一验证客户来自于发送的哪个请求`。
为每个请求添加cookie HTTP头将信息发送回服务器。这是cookie:name=value。

## 限制
- cookie`在性质上是绑定在特定的域名下的`。
- 当设定了一个cookie后，`再给创建它的域名发送请求时，都会包含这个cookie`。这个限制确保了存储在cookie中的信息只能让批准的接受者访问，而无法被其它域访问。
- cookie是存在客户端计算机上。

## set-Cookie
set-Cookie: name=value; domain=.wrox.com;path=/; secure

- 实践中最好将cookie名称看作是区分大小写的。cookie的名称必须是经过URL编码的
- 值必须是URL编码的
- secure标志是cookie中唯一一个非名值对儿的部分。它是安全标志，指定后，cookie只有在使用SSL连接的时候才发送搭配服务器。
- domain：cookie对于哪个域是有效的。所有向该域发送的请求中都会包含这个cookie信息。这个值可以包含子域（如www.wrox.com），也可以不包含它(如.wrox.com，则对于wrox.com的所有子域都有效)。如果没有明确设定，那么这个域会被认作来自设置cookie的那个域。
- path：对于指定域中的那个路劲，应该向服务器发送cookie。如：你可以指定cookie只有从http://www.wrox.com/books/ 中才能访问，那么http://www.wrox.com 的页面就不会发送cookie信息，即使请求都来自同一个域。
- expires：默认情况下，浏览器会话结束时即将所有cookie删除；不过可以自己设置删除时间。
如果不设置这个时间戳，浏览器会在页面关闭时即将删除所有cookie；不过也可以自己设置删除时间。这个值是GMT时间格式，如果客户端和服务器端时间不一致，使用expires就会存在偏差。
- domain、path、expires、secure都是服务器给浏览器的指示，以指定何时应该发送cookie。这些参数并不会作为发送到服务器的cookie信息的一部分，只有名值对儿才会被发送。
- HttpOnly: `告知浏览器不允许通过脚本document.cookie去更改这个值`，`同样这个值在document.cookie中也不可见`。但在`http请求张仍然会携带这个cookie`。注意这个值虽然在脚本中不可获取，但仍然在浏览器安装目录中以文件形式存在。`这项设置通常在服务器端设置`。

## documen.cookie
获取一系列由分号隔开的名值对儿。

所有名字和值都是经过URL编码的，所以必须使用decodeURIComponent来解码。

documen.cookie并不会覆盖cookie，除非设置的cookie名称已经存在。

## 服务器端响应的Cookie和客户端设置的Cookie有什么区别？
服务端和客户端的cookie是同一个东西，都是保存在浏览器的