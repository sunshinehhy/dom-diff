https://blog.csdn.net/hsany330/article/details/73505883 (为 Koa 框架封装 webpack-dev-middleware 中间件)

https://github.com/webxiaoma/webpack-demos

options：
headers：This property allows a user to pass custom HTTP headers on each request.

index："index.html", // The index path for web server, defaults to "index.html". // If falsy (but not undefined), the server will not respond to requests to the root URL.

lazy：This option instructs the module to operate in 'lazy' mode, meaning that it won't recompile when files change, but rather on each request.

此选项指示模块以“lazy”模式运行，这意味着在文件更改时不会重新编译，而是在每个请求上进行重新编译。