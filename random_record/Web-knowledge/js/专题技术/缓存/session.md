https://blog.csdn.net/java_faep/article/details/78082802

## 保存session id的几种方式
1. 保存session id的方式可以采用cookie，这样在交互过程中浏览器可以自动的按照规则把这个标识发送给服务器。
2. 由于cookie可以被人为的禁止，必须有其它的机制以便在cookie被禁止时仍然能够把session id传递回服务器，经常采用的一种技术叫做URL重写，就是把session id附加在URL路径的后面，附加的方式也有两种，一种是作为URL路径的附加信息，另一种是作为查询字符串附加在URL后面。网络在整个交互过程中始终保持状态，就必须在每个客户端可能请求的路径后面都包含这个session id。
3. 另一种技术叫做`表单隐藏字段 `。就是服务器会自动修改表单，`添加一个隐藏字段`，以便在表单提交时能够把session id传递回服务器。

## session何时被删除
session在下列情况下被删除：
A．程序调用HttpSession.invalidate()
B．距离上一次收到客户端发送的session id时间间隔超过了session的最大有效时间
C．服务器进程被停止
再次注意关闭浏览器只会使存储在客户端浏览器内存中的session cookie失效，不会使服务器端的session对象失效。

## getSession()/getSession(true)、getSession(false)的区别
getSession()/getSession(true)：当session存在时返回该session，否则`新建一个session`并返回该对象
getSession(false)：当session存在时返回该session，否则`不会新建session`，返回null

## 解决session相关问题的技术方案
由上所述，session一共有两个问题需要解决：
1) session的存储应该独立于web容器，也要独立于部署web容器的服务器；
2）如何进行高效的session同步。

在讲到解决这些问题之前，我们首先要考虑下session如何存储才是高效，是存在内存、文件还是数据库了？文件和数据库的存储方式都是将session的数据固化到硬盘上，操作硬盘的方式就是IO，IO操作的效率是远远低于操作内存的数据，因此文件和数据库存储方式是不可取的，所以`将session数据存储到内存是最佳的选择`。因此最好的`解决方案`就是`使用分布式缓存技术`，例如：memcached和redis，将session信息的存储独立出来也是解决session同步问题的方法。