
### 好博推荐
<https://segmentfault.com/a/1190000012412299>

<https://github.com/koajs/session>

https://www.jianshu.com/p/8f4cc45d712e

Simple session middleware for Koa. Defaults to cookie-based sessions and supports external stores.

Koa的简单会话中间件。默认为基于cookie的会话并支持外部存储。


## Example
```
  const session = require('koa-session');
  const Koa = require('koa');
  const app = new Koa();

  app.keys = ['some secret hurr'];

  const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) cookie名称*/
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  };

  app.use(session(CONFIG, app));
  // or if you prefer all default config, just use => app.use(session(app));

  app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;

    let n = ctx.session.views || 0;
    ctx.session.views = ++n;
    ctx.body = n + ' views';
  });

  app.listen(3000);
  console.log('listening on port 3000');
```

- maxAge,这个是确定cookie的有效期，默认是一天。
- rolling, renew，这两个都是涉及到cookie有效期的更新策略
- httpOnly，表示是否可以通过javascript来修改，设成true会更加安全
- signed，这个涉及到cookie的安全性，signed设为true的时候，会自动给cookie加上一个sha256的签名，类似koa:sess.sig=pjadZtLAVtiO6-Haw1vnZZWrRm8，从而防止cookie被篡改。
- store，可以传入一个用于session的外部存储

