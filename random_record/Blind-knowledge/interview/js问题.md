
## [面向对象、闭包]在JavaScript中如何实现类的私有变量（面向对象的封装）？
http://justcoding.iteye.com/blog/2310730
构造函数、类都可以实现封装

## 在JavaScript中如何实现类的继承？你了解多少种实现方法？
https://www.jb51.net/article/81766.htm

## 冒泡和捕获
https://www.cnblogs.com/greatluoluo/p/5882508.html

## 是否了解LocalStorage、IndexedDB、WebSocket、WebGL、WebRTC、WebAssembly等

## 如何使用服务器渲染
https://blog.csdn.net/DeepLies/article/details/78007731
使用过koa
Next.js

react.js在服务器端渲染好处：

提升性能是需要再浏览器端的性能提升还是服务端的 性能提升，是两个概念，服务端渲染会给服务端造成一定的压力，减轻客户端的压力；好处：`在整个页面级别的应用会使得浏览器在解析dom完成之后马上有东西可以渲染`。再者就是对seo比较友好一些；

渲染的流程主要是：

1. 准备数据，一般从数据库或外部API获得 (一般要先 render React 一次，去触发所需的API)

2. 数据和React结合生成HTML Markup

3. 除了把HMTL Markup输出外， 还要把'State'输出，这要在客户端才能保留'State'

