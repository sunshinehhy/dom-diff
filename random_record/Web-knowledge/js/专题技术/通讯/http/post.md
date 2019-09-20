如果需要像 HTML 表单那样 POST 数据，使用 setRequestHeader() 来添加 HTTP 头。然后在 send() 方法中规定您希望发送的数据：
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

post请求 发送的数据写在 send方法中
```
比如：格式 name=jack&age=18 字符串的格式
ajax.send('name=jack&age=998');
```