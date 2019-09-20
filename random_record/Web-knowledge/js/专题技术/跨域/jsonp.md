SONP 原理：`JSONP 是通过动态script元素来使用的`，使用时可以作为 `src 属性指定一个跨域 URL`。 这里的script元素有能力不受限制地从其他域加载资源。因为 JSONP 是有效的 JavaScript 代码，所以在请求完成后，即`在 JSONP 响应加载到页面中以后，就会立即执行`。来看一个例子。

```
function handleResponse(response){
  alert("you are at IP address "+ response.ip+", which is in "+response.city+", "+response.region_name);
}

var script=document.createElement("script");
script.src="http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script,document.body.firstChild);
```
## CORS与JSONP的比较
CORS与JSONP的使用目的相同，但是比JSONP更强大。

JSONP只支持GET请求，CORS支持所有类型的HTTP请求。JSONP的优势在于支持老式浏览器，以及可以向不支持CORS的网站请求数据。