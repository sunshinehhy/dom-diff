路由是指如何定义应用的端点（URIs）以及如何响应客户端的请求。
express中间件机制补充说明: https://cnodejs.org/topic/582656dee885ce5a39382831
Express 4.x API 中文手册:
http://www.expressjs.com.cn/4x/api.html

app.use(path,callback)中的callback既可以是router对象又可以是函数

app.get(path,callback)中的callback只能是函数

这说明，给app.get(app.post、app.put同理)赋个路由对象是不行的，其实，可以将app.get()看作app.use的特定请求(get)的简要写法。即
```
var express = require('express');
var app = express();
app.get('/hello',function(req,res,next){
    res.send('hello test2');

});
等同于：

var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hello world!');
});
app.use('/hello',router);
```
### 什么时用app.use，什么时用app.get呢？

路由规则是app.use(path,router)定义的，router代表一个由express.Router()创建的对象，在路由对象中可定义多个路由规则。可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用app.get或app.post方法。即

当一个路径有多个匹配规则时，使用app.use，否则使用相应的app.method(get、post)

### use（）方法的参数类型

1. app.use(express.static(path.join(__dirname, ‘public’)));将静态文件目录设置为项目根目录+/public
2. app.use(require(‘express-formidable’)({
    uploadDir:path.join(__dirname, ‘public/img’),//上传文件目录
    keepExtensions:true//保留后缀
    }));
3. app.use(flash());
4. app.use(function (req, res, next) {
        res.locals.user = req.session.user;
            res.locals.success = req.flash(‘success’).toString();
        res.locals.error = req.flash(‘error’).toString();
            next();
    });
5. app.use(’/signin’, require(’./signin’));//第二个参数应该时 express.Router对象