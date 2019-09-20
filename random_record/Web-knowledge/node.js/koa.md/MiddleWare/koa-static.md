<https://github.com/koajs/static>

处理静态文件的中间件

用于serve静态文件的koa middleware

语法：
```
app.use(require('koa-static')(root,opts));


 @param root:root directory,nothing above this root can be served

 @param opt:options object
  opt={
			maxage:浏览器缓存的最大时间，ms为单位,
			hidden:是否允许隐藏文件的传输，默认为false,
			index:默认的文件名称，默认为'index.html'
			defer:如果是true，则在返回next()之后，允许任何下游中间件先响应。
			gzip:当gzip由客户端支持时，gzip会自动地服务于gzip版本的文件，如果请求的文件有.gz扩展，则会自动执行。默认值为true。
			setHeaders:用来设置响应的自定义标头。
			extensions:扩展尝试从传递的数组中匹配扩展来搜索文件，如果URL没有扩展的话。第一次发现。(默认值为false)Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. (defaults to false)
		}

```

用法示例：
```
	const koa = require('koa');
	const app = koa();

	const serve = require('koa-static');

	app.use(serve('public',{
		index:false
	}));
```
