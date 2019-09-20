https://github.com/alexmingoia/koa-router

RESTful resource router. RESTful风格的路由中间件

router.all() 可以用来匹配所有的方法。

### Multiple middleware
可以提供多个中间件:
```
router.get(
  '/users/:id',
  (ctx, next) => {
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      next();
    });
  },
  ctx => {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```

## Nested routers 嵌套的路由器
```
var forums = new Router();
var posts = new Router();
 
posts.get('/', (ctx, next) => {...});
posts.get('/:pid', (ctx, next) => {...});
forums.use('/forums/:fid/posts', posts.routes(), posts.allowedMethods());
 
// responds to "/forums/123/posts" and "/forums/123/posts/123"
app.use(forums.routes());
```

## Router prefixes

## router.redirect(source, destination, [code]) ⇒ Router
Redirect source to destination URL with optional 30x status code.

Both source and destination can be route names.
```
router.redirect('/login', 'sign-in');
```
This is equivalent to:
```
router.all('/login', ctx => {
  ctx.redirect('/sign-in');
  ctx.status = 301;
});
```

## router.param(param, middleware) ⇒ Router
为命名路由参数运行中间件。自动加载或验证是有用的。

## Router.url(path, params) ⇒ String
Generate URL from url pattern and given params.
从URL模式和被给予的params生成URL。
```
var url = Router.url('/users/:id', {id: 1});
// => "/users/1"
```

## 路劲
```
//入口文件
router.use('/ftc-user', ftcUser);

//ftcUser.js中文件
router.get('/', async (ctx, next) => {
  const baseUrl = `${ctx.protocol}://${ctx.host}${ctx.path}`;
  ctx.body = {   
    search: `${baseUrl}/search?{email=<foo@bar.com>} | {name=username}`,
    invidual: `${baseUrl}/profile/:id`,
    newsletter: `${baseUrl}/newsletter/:id`,
    statistics: `${baseUrl}/stats`
  }
});
//http://10.148.126.11:8100/ftc-user 获取以上body内容

router.get('/search', async (ctx, next) => {
    //http://10.148.126.11:8100/ftc-user/search 获取body内容
});

意味着use和get中路劲叠加
```