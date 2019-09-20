

## 

cookie 跨域访问的解决方案:https://www.cnblogs.com/sueris/p/5674169.html
支持跨域及相关cookie设置:https://www.jianshu.com/p/6a0e9e53a944

`cookie是不能跨域访问的，但是在二级域名是可以共享cookie的。`

单点登录：多个不同系统整合到统一加载个平台，用户在任何一个系统登录后，可以访问这个统一加载上的所有系统。

在默认情况下，出于安全方面的考虑，只有与创建 cookie 的页面处于同一个目录或在创建cookie页面的子目录下的网页才可以访问。那么此时如果希望其父级或者整个网页都能够使用cookie，就需要进行路径的设置。

cookie的名/值对中的值不允许出现分号、逗号和空白符，因此在设置cookie前要用encodeURIComponent()编码，读取时再用decodeURIComponent()解码。

1、domain
`子可以访问父，父不能访问子`
表示cookie所在的域，默认为请求的地址，如网址为JavaScript.exam.cn/JavaScript/read.html，那么domain默认为JavaScript.exam.cn。如域A为catagory.exam.cn，域B为JavaScript.exam.cn，那么在域A生产一个令域A和域B都能访问的cookie就要将该`cookie的domain设置为.exam.co`m；如果要在域A生产一个令`域A不能访问而域B能访问的cookie`就要将该cookie的domain设置为JavaScript.test.com。

2、path
`子可以访问父，父不能访问子`
表示cookie所在的目录，默认为/，就是根目录。如在同一个服务器上有目录/JavaScript/,/JavaScript/dir1/,/JavaScript/dir2/，现设一个cookie1的path为/JavaScript/，cookie2的path为/JavaScript/dir1/，那么JavaScript下的所有页面都可以访问到cookie1，而/JavaScript/和/JavaScript/dir2/的子页面不能访问cookie2。这是因为cookie能让其path路径下的页面访问。

默认情况下，cookie对创建它的页面和域与创建它的页面在`同一目录的其他页面以及创建它的页面所在目录的子目录的其他页面可见`，例如，localhost/JavaScript/write.html创建的cookie对localhost/JavaScript/read.html和localhost/JavaScript/catagory/read.html都是可见的，但对localhost/read.html不可见。

`相同域名都能可见cookie`
可以设置cookie的path属性，`只要以path指定的路径前缀开始的同一服务器的页面均可见cookie`，例如，设置path=/JavaScript，则localhost/JavaScript/catagory/write.html创建的cookie对localhost/JavaScript/read.html也是可见的；设置path=/，则cookie对localhost这台服务器上的页面均可见。

实现单点登录：
1. `在Ａ系统下成功登录后，利用JS动态创建一个隐藏的iframe，通过iframe的src属性将Ａ域下的cookie值作为 get参数重定向到Ｂ系统下b.aspx页面上。`
```
    var _frm = document.createElement("iframe"); 
    _frm.style.display="none";  
    _frm.src="http://b.com/b.jsp?test_cookie=xxxxx";  
    document.body.appendChild(_frm); 

    **test_cookie=xxxxx 可以传入A域下的cookie值**
```  
2. `在Ｂ系统的b.aspx页面中来获取Ａ系统中所传过来的cookie值，并将所获取到值写入cookie中，这样就简单的实现了cookie跨域的访问；　不过这其中有个问题需要注意，就是在IE浏览器下这样操作不能成功，需要在b.aspx页面中设置P3P HTTP Header就可以解决了 `

# 如何支持跨域
### JSONP：
基本思想为：网页通过`添加一个\<script>元素，向服务器请求JSON数据`，`服务器收到请求后，将数据放在一个指定名字的回调函数里传回来`。
用src属性请求资源的标签，比如\<link>，\<img>，\<script>...都不受同源策略的限制。

`从Web页面产生的文件请求都会带上cookie。`

`JSONP的缺点很明显了：`
- 只支持GET请求;
- 只能带本域下的cookies。

### CORS

CORS是一个W3C标准，全称是"跨域资源共享"。它运行浏览器向跨域服务器发送AJAX请求。

IE10以上用XMLHttpRequest对象实现CORS；

IE8，IE9用XDomainRequest支持CORS。

默认情况下，跨域请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。检查XHR是否支持CORS的最简单方式，就是检查是否存在withCredentials属性。

用JS/JQuery启动AJAX请求时，必须设置withCredentials头为true，写法如下：
```
JS:
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open('POST', ‘a.com’, true);
xhr.send();

JQuery:
$.ajax({
  url: a_cross_domain_url,
  xhrFields: {
    withCredentials: true
  }
});
这时，后台设置response header时，需要返回：

Access-Control-Allow-Credentials: true;
Access-Control-Allow-Origin: a.com; //必须为具体域名，不能是*

```
request请求中可以携带的cookies，`不仅仅有本域下的cookies，还包括跨域服务器下设置的cookies`（注意：`跨域服务器下的cookies，是无法通过JS代码document.cookie访问，该cookies只能被远程服务器控制`）。

可见，`在安全性上，CORS比JSONP强悍很多`！

CORS缺点是，低版本的IE浏览器支持不好。


xhr.withCredentials = true;  // 前端开关：浏览器是否读写cookie