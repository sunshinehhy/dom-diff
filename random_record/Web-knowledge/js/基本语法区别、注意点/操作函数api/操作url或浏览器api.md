## <font color="#AA7A53">获取浏览器信息：</font>

var browser=navigator.appName中的 browser 变量存有浏览器的名称，比如，"Netscape" 或者 "Microsoft Internet Explorer"。

## <font color="#AA7A53">location.hash详解：</font>

http://blog.csdn.net/baidu_31333625/article/details/54288223


## Location
<https://developer.mozilla.org/zh-CN/docs/Web/API/Location>

Location接口表示其关联的对象所展示的页面的地址等信息，对该对象的修改会反映到关联的对象上。 Document 和 Window 接口都有一个关联的Location，可以分别用Document.location和Window.location来访问它们对应的Location。

### Location.reload()
重新加载来自当前 URL的资源。他有一个特殊的可选参数，类型为 Boolean，该参数为true时会导致该方法引发的刷新一定会从服务器上加载数据。如果是 false或没有制定这个参数，浏览器可能从缓存当中加载页面。

## document.referrer

https://www.cnblogs.com/baiyygynui/p/6426621.html

获取前一页面的URL地址的方法