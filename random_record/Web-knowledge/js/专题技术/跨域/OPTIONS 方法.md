http://www.ruanyifeng.com/blog/2016/04/cors.html

## OPTIONS 方法在跨域请求（CORS）中的应用

通过 OPTIONS 方法，可以询问服务器具体支持哪些方法，或者服务器会使用什么样的方法来处理一些特殊资源。可以说`这是一个探测性的方法`，`客户端`通过该方法`可以在不访问服务器上实际资源的情况下`就`知道处理该资源的最优方式`。

### 浏览器对简单跨域请求和复杂跨域请求的处理区别

https://blog.csdn.net/cc1314_/article/details/78272329

普通的请求:Access-Control-Allow-Origin: *

复杂跨域请求:preflighted request

```
headers: {  
    'GISTTOKEN': getToken()  
}
请求中设置了自定义的headers字段，出现了option请求。把自定义headers字段删掉后，只剩下get请求。

ajaxRequestGet: function (lastPath, requestParams, successFun) {  
            $.ajax({  
                headers: {  
                    'GISTTOKEN': getToken()  
                },  
                url : this.baseUrl+lastPath,  
                type : "get",  
                data: requestParams,  
                success : function(data){  
                    successFun(data);  
                }  
            });  
        },  
```

### 什么情况下请求会变成preflighted request呢? 

1. `请求方法不是GET/HEAD/POST`
2. POST请求的Content-Type并`非application/x-www-form-urlencoded, multipart/form-data, 或text/plain`
3. `请求设置了自定义的header字段`

## Preflighted Requests
CORS 通过一种叫做 Preflighted Requests 的透明服务器验证机制支持开发人员`使用自定义的头部`，`GET 或 POST 之外的方法`，以及`不同类型的主体内容`，在使用下列高级选项来发送请求时，就会像服务器发送一个 Preflight 请求。

这种请求`使用 OPTIONS 方法`，`发送下列头部`:

- Origin: 与简单的请求相同。
- Access-Control-Request-Method: 请求自身使用的方法。
- Access-Control-Request-Headers: (可选) 自定义的头部信息，多个头部以逗号分隔。

比如：

以下是一个带有`自定义头部的 NCZ` 的使用 POST 方法发送的请求。
```
Origin: http://www.nczonline.net
Access-Control-Request-Method: POST
Access-Control-Request-Headers: NCZ
```
发送这个请求后，`服务器可以决定是否允许这种类型的请求`。服务器通过在响应中发送如下头部与浏览器进行沟通。

Access-Control-Allow-Origin: 与简单的请求相同。
Access-Control-Allow-Method: 允许的方法，多个方法以逗号分隔。
Access-Control-Allow-Headers: 允许的头部，多个头部以逗号分隔。
Access-Control-Max-Age: 应该将这个 Preflight 请求缓存多长时间（以秒表示）。
例如：

Access-Control-Allow-Origin: http://www.nczonline.net
Access-Control-Allow-Method: GET,POST
Access-Control-Allow-Headers: NCZ
Access-Control-Max-Age: 1728000
Preflight 请求结束后，结果将按照响应中指定的事件缓存起来。而为此付出的代价只是第一次发送这种请求时`会多一次 HTTP 请求`。

支持 Preflight 请求的浏览器包括 Firefox3.5+， Sarari4+ 和 Chrome。IE10 及更早版本都不支持。

## 带凭据的请求（Requests with Credential）
`默认情况下，跨域请求不提供凭据`（Cookie、HTTP 认证及客户端 SSL 证明等）。通过将 withCredentials 属性设置为 true，`可以指定某个请求应该发送凭据`。如果`服务器接收带凭据的请求`，会用下面的 HTTP 头部来响应。

Access-Control-Allow-Credentials: true  (服务器响应)
如果发送的是带凭据的请求，单服务器的响应中`没有包含这个头部`，那么`浏览器就不会把响应交给 JS` （于是，responseText 中将是空字符串，status 的值为0，而且会调用 onerror() 事件处理程序）。

支持 withCredentials 属性的浏览器有 Firefox3.5+，Sarari4+ 和 Chrome。IE10 及更早版本都不支持。

下面这篇文章讲的特别好，介绍了简单地跨域请求、Preflight 请求和带凭据的请求三种请求的区别和请求流程。 文章地址：http://www.cnblogs.com/loveis715/p/4592246.html




