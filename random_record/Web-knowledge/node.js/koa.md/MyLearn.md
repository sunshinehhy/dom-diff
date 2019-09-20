中文文档：<https://koa.bootcss.com/>

英文文档：<http://koajs.com/>

node中文文档:
<http://nodejs.cn/api/>

## 一、 koa API
### 1  Setting
应用配置是app实例的属性，目前支持以下配置：

#### 1.app.name

#### 2.app.env

#### 3.app.proxy  //当 app.proxy 设置为 true 时，支持 X-Forwarded-Host

#### 4.app.subdomainOffset

#### 5.app.listen(...)
该方法创建并返回一个 http server。

一个Koa应用跟HTTP server 不是1-to-1关系，一个或多个Koa应用可以被加载到一块，组成一个更大的包含一个HTTP server 的应用。


用法示例：

	var koa = require('koa');
	var app = koa();
	app.listen(3000);

其等价于：

	var http = require('http');
	var koa = require('koa');
	var app = koa();
	http.createServer(app.callback()).listen(3000);


## 二、 modules of koa
<https://github.com/koajs/koa/wiki>
### 1. koa-bodyparser模块： 
解析request body,支持json/form/text类型的request body。

用法示例：

	const koa = require('koa');
	const bodyParser = require('koa-bodyparser');
	
	const app = koa();
	app.use(bodyParser());
	
	app.use(function *(){
		// the parsed body will store in this.request.body
		this.body = this.request.body;
		console.log(this.body);
	});
	
	app.listen(3000);


### 2.koa-mount模块
为koa添加中间件。即将其他的koa应用程序作为中间件添加给koa。

用法示例：

	app.use(mount('/',signup));


### 3.koa-router模块：
 koa的路由器中间件。提供了RESTful软件架构风格的资源路由。

用法示例：

	var app = require('koa')();
	var router = require('koa-router')();
	 
	router.get('/', function *(next) {...});
	 
	app
	  .use(router.routes())
	  .use(router.allowedMethods());

### 4. koa-static模块：
用于serve静态文件的koa middleware

语法：

app.use(require('koa-static')(root,opts));


 @param root:root directory,nothing above this root can be served

 @param opt:options object
  opt={
			maxage:浏览器缓存的最大时间，ms为单位,
			hidden:是否允许隐藏文件的传输，默认为false,
			index:默认的文件名称，默认为'index.html'

		}


用法示例：

	const koa = require('koa');
	const app = koa();

	const serve = require('koa-static');

	app.use(serve('public',{
		index:false
	}));

### 5. koa-logger