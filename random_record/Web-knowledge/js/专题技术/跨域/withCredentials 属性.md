## Access-Control-Allow-Credentials

该字段可选。`它的值是一个布尔值，表示是否允许发送Cookie`。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可。

##  withCredentials 属性
上面说到，`CORS请求默认不发送Cookie和HTTP认证信息`。如果要把Cookie发到服务器，

`一方面`要服务器同意，`指定Access-Control-Allow-Credentials字段`。


Access-Control-Allow-Credentials: true
`另一方面`，开发者必须在`AJAX请求中打开withCredentials属性`。


var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
否则，`即使服务器同意发送Cookie，浏览器也不会发送`。或者，服务器要求设置Cookie，浏览器也不会处理。

但是，如果省略withCredentials设置，有的浏览器还是会一起发送Cookie。这时，可以显式关闭withCredentials。


xhr.withCredentials = false;
需要注意的是，如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。