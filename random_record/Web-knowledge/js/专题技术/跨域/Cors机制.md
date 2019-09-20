https://www.cnblogs.com/jiechen/p/5524693.html

## cors：cross-orign resource sharing 跨域资源共享

cors背后的基本思想：使用自定义的http头部让浏览器与服务器进行沟通，从而决定请求或响应是应该成功，还是应该失败。

比如:
一个简单地使用 GET 或 POST 发送的请求，它没有自定义的头部，而主题内容是 text/plain。在发送该请求时，`需要给它附加一个额外的 Origin 头部`，其中包括请求页面的源信息（协议、域名、端口），以便服务器根据这个头部信息来决定是否给予响应，下面是 Oringin 头部的一个示例：

Origin: http://www.nczonline.net
如果服务器认为这个请求可以接受，就在 Access-Control-Allow-Origin 头部中回发相同的源信息（如果是公共资源，可以回发 “*”）。例如：

Access-Control-Allow-Origin: http://www.nczonline.net
如果没有这个头部，或者有这个头部但源信息不匹配，浏览器就会驳回请求。正常情况下，浏览器会处理请求。

`注意，请求和响应都不包含 cookie 信息。`


## IE对CORS的实现
微软在 IE8 中引入了 XDR (XDomainRequest) 类型。这个对象`与 XHR 类似`，`但能实现安全可靠的跨域通信`。XDR 对象的安全机制`部分实现了 W3C 的 CORS 规范`。以下是 XDR 与 XHR 的一些不同之处。

- `cookie 不会随请求发送，也不会随响应返回`。
- `只能设置请求头部信息的 Content-Type 字段`。
- `不能访问响应头部信息`。
- `只支持GET和POST请求`。

- 所有的 XDR 请求都是异步执行的，不能用它来创建同步请求。
- 请求返回之后，会触发 load 事件，响应的数据也会保存在 responseText 属性中。
- 在接收到响应后，你只能访问响应的原始文本；没有办法确定响应的状态代码。
- 只要响应有效就会触发 load 事件，如果失败（包括响应中缺少 Access-Control-Allow-Origin头部），就会触发 error 事件
- 遗憾的是，除了错误本身之外，没有其他信息可用，因此唯一能够确定的就只有请求未成功了。
- 要检测错误，可以像下面这样指定一个 onerror 事件处理程序。

```
var xdr=new XDomainRequest();
xdr.onload=function(){
   alert(xdr.responseText);
};
xdr.onerror=function(){
  alert("An erro occurred.");
};
xdr.open("get","http://www.somewhere-else.com/page");
xdr.send(null);

```

## 跨浏览器的 CORS (兼容性 CORS的写法)
即使浏览器对 CORS 的支持程度并不都一样，但所有浏览器都支持简单地（非 Preflight 和不带凭据的）请求，因此有必要实现一个跨浏览器的方案。`检测 XHR 是否支持 CORS 的最简单的方式`，`就是检查是否存在 withCredentials 属性`，`再结合检测 XDomainRequest 对象是否存在，就可以兼顾所有浏览器了`。
```
 function createCORSRequest(method,url){
 2   var xhr=new XMLHttpRequest();
 3   if("withCredentials" in xhr){
 4     xhr.open(method,url,true);
 5   }else if(typeof XDomainRequest != "undefined"){
 6     xhr = new XDomainRequest();
 7     xhr.open(method,url);
 8   }else {
 9     xhr = null;
10   }
11   return xhr;
12 }
13 
14 var request = createCORSRequest("get","http://www.somewhere-else.com/page/");
15 if(request){
16   request.onload = function(){
17     //对request。responseText进行处理
18   };
19   request.send();
20 }
```