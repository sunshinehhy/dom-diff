## 发送同步请求
使用 XHR 时，首先要调用 open() 方法，传递三个参数：

要发送的请求类型（ get , post 等）
请求的 url
是否异步发送
要发送特定的请求，必需像下面这样调用 send() 方法

xhr.open("get","example.php",false);
xhr.send(null);
这里 send() 方法接收一个参数，作为请求主体发送的数据。如果不需要通过请求主体发送数据，这里必须传入 null ，因为这个参数对有些浏览器来说是必需的。调用 send() 之后，请求就会被分派到服务器。

由于这次请求是同步的，JavaScript 代码会等到服务器响应之后再继续执行。在收到响应之后，相应的数据会自动填充XHR对象的属性，相关的属性简介如下：

responseText: 作为响应主体被返回的文本。
responseXML: 如果响应的内容类型是 “text/xml”或”application/xml”，这个属性中将保存包含着相应数据的XML DOM文档。
status: 响应的HTTP状态。
statusText: HTTP状态的说明。
接受响应之后，第一步是检查 status 属性，以确定响应已经成功返回。状态码：

200 表示成功
304 表示请求的资源并没有修改，可以直接使用浏览器中缓存的版本，响应也是有效的

注意：`无论内容类型是什么，响应主体的内容都会保存到 responseText 属性中`；而对于非 XML 数据而言， responseXML 属性的值将为 null。

## 发送异步请求
向前面这样发送同步请求当然没问题，但多数情况下，我们还是要发送异步请求，才能让 JavaScript 继续执行而不必等待响应。此时，可以检测 XHR 对象的 readyState 属性，该属性表示请求/响应过程中的当前活动阶段。这个属性可取的值如下：

0：未初始化。尚未调用 open() 方法。
1：启动。已经调用 open() 方法，但尚未调用 send() 方法。
2：发送。已经调用 send() 方法，但尚未接收响应。
3：接收。已经接收到部分响应数据。
4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。

## HTTP头部信息
XHR 对象提供了操作请求头部和响应头部信息的方法。 默认情况下，在`发送 XHR 请求的同时，还会发送下列头部信息`。

Accept: 浏览器能够处理的内容类型。
Accept-Charset: 浏览器能够显示的字符集。
Accept-Encoding: 浏览器能够处理的压缩编码。
Accept-Language: 浏览器当前设置的语言。
Connection: 浏览器与服务器之间连接的类型。
Cookie: 当前页面设置的语言。
Host: 发出请求的页面所在的域。
Referer: 发出请求的页面的URI。
User-Agent: 浏览器的用户代理字符串。

setRequestHeader() 方法可以设置自定义的请求头部信息。这个方法接受两个参数：头部字段的名称和头部字段的值。
要成功发送请求头部信息，必须在`调用 open() 方法之后`且调用 `send() 方法之前`调用 `setRequestHeader()`,如下面的例子所示。

调用 XHR 对象的 getResponseHeader() 方法并传入头部字段名称，可以取得相应的响应头部信息。而调用 getAllResponseHeaders() 方法可以取得一个包含所有头部信息的长字符串。

## XMLHttpRequest2级
XMLHttpRequest 1级只是把已有的 XHR 对象的`实现细节描述了出来`。而 XMLHttpRequest2级则进一步发展了 XHR。`并非所有浏览器都完整地实现了 XMLHttpRequest2级规范`。

### FormData
现代 Web 应用中频繁使用的一项功能就是表单数据的序列化，XMLHttpRequest2级为此定义了 FormData 类型。FormData 为序列化表单以及创建与表单格式相同的数据提供了便利。下面代码创建了 FormData 对象，并向其中添加了一些数据。

var data = new FormData();
data.append("name","Nicholas");
这个 append() 方法接受两个参数：键和值，分别对应表单字段的名字和字段中包含的值。可以像这样添加任意多的键值对。而通过向 FormData 构造函数中传入表单元素，也可以用表单元素的数据预先向其中填入键值对：

var data=new FormData(document.forms[0]);
创建了 FormData 的实例后，可以将它直接传给 XHR 的 send() 方法，如下所示：

```
 1 function submitData(){
 2   var xhr = createXHR();
 3   xhr.onreadystatechange = function(){
 4     if(xhr.readyState == 4){
 5       if((xhr.status >= 200 && xhr.status < 300) || xhr.status = 304){
 6         alert(xhr.responseText);
 7       }else{
 8         alert("Request was unsuccessful: " + xhr.status);
 9       }
10     }
11   };
12 
13   xhr.open("post","example.php",true);
14   var form=document.getElementById("user-info");
15   xhr.send(new FormData(form));
16 }
```
使用 FormData 的方便之处在于`不必明确地在 XHR 对象上设置请求头部`。XHR 对象`能够识别传入的数据类型是 FormData 的实例`，并配置适当的头部信息。

支持 FormData 的浏览器有 Firefox4+，Safari5+，Chrome和Android3+版WebKit。