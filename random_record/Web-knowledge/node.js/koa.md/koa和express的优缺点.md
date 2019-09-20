https://github.com/koajs/koa/wiki

1. Koa 虽然同它哥 Express 说的一样，是 Web Framework。不过从架构功能设计和架构设计上看，它更像它舅舅（原谅我亲戚关系懵了）── Connect。更多是一个中间件框架，其提供的是一个架子，而几乎所有的功能都需要由第三方中间件完成。

2. Express 更为贴近 Web Framework 这一概念，比如自带 Router、路由规则等（在没有剥离bodyParser之前更为贴切）；相比之下 Koa 则更为宽松，光是 Router 就有 20+ 个，自由选择嘛（Home · koajs/koa Wiki · GitHub），更为灵活。 @死马 （Koa 的 maintainer 之一）也发布了一个推荐的常用中间件合集包 koa-middlewares(http://npmjs.org/package/koa-middlewares)。

3. Express 和 Koa `最明显的差别就是 Handler 的处理方法`，一个是普通的回调函数，一个是利用生成器函数（Generator Function）来作为响应器。往里头儿说就是 Express 是在同一线程上完成当前进程的所有 HTTP 请求，而 Koa 利用 co 作为底层运行框架，`利用 Generator 的特性，实现“协程响应”（并不能将 Generator 等价于协程`，在 V8 的邮件列表中对 Generator 的定义基本是 `coroutine-like`），然而 co 这个库对 Generator 的使用方法并非当初 Generator 的设计初衷。详细可以看这里：Koa, co and coroutine

4. 还是要感谢 TJ 创造了 co 这个大杀器吧，让我们基本完全忘记了什么是回调函数或者 callbacks hell。虽然实现方法略微取巧，但是就大大加速了开发速度这一点而言，已经足以让我们跪舔了。

Express：
优点：历史更久，文档更完整，资料更多，深入人心
缺点：不能忍的 callback

Koa：
优点：No Callback! No Callback! No Callback! 重要的事情说三遍！
缺点：`Connect/Express 的中间件基本不能重用，基本要重写；依然需要更多人的支持和学习`

目前已经大面积使用 Koa 作为 Web 开发框架的产品：（需补充请评论）
我家的柚木时尚 柚木时尚
CNPM cnpmjs.org: Private npm registry and web for Company
支付宝、天猫中的某些产品线

=========================
更新关于 Koa 2.0 的看法

Koa 2.0 与 Koa 1.x 版本的最大区别就是使用了 ES7 中 Async/Await 的特性，代替了 co 的 Generator Function，好处是摆脱了 co 的“暧昧”实现方法，改而使用原生的 Coroutine-like(maybe) 语法。缺点是与从 connect/express 迁移到 Koa 1.x 一样，很弱的向前兼容，需要用一个 wrapper 来继续使用 1.x 的中间件：gyson/koa-convert · GitHub。不过好在，Koa 团队表示在 ES7 标准正式落地之前，不会切换到 2.0 版本上去，所以暂时可以放心使用 1.x 版本。