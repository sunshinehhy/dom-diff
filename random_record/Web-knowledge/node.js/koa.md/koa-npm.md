https://www.npmjs.com/package/koa-router

Koa提供一个响应对象作为上下文的响应属性。
Koa的响应对象提供了处理http响应的有用方法，该方法委托给一个服务器响应。

Koa将其委托给Node的请求和响应对象，而不是扩展它们，提供了一个更简洁的接口，减少了不同中间件和节点本身之间的冲突，并为流处理提供了更好的支持。IncomingMessage仍然可以被直接访问，因为Context上的req属性和ServerResponse可以作为上下文中的res属性直接访问。

这里有一个例子，使用Koa的响应对象将一个文件作为响应体流。

路由可以选择有名称。这允许在开发期间生成url并轻松重命名url。
```
router.get('user', '/users/:id', (ctx, next) => {
 // ...
});
 
router.url('user', 3);
// => "/users/3"
```

