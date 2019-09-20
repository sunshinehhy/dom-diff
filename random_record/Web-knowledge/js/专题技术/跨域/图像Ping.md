## 图像Ping
- 动态创建图像经常用于图像ping，图像ping是与服务器进行简单、单项的跨域通讯的一种方式。
- 请求的数据是通过查询字符串形式发送的，而响应可以是任何内容，但通常是像素图或204.
- 通过图像ping，浏览器得不到任何具体的数据，但通过监听load和error事件，它能知道响应是什么时候接收到的。
- 图像Ping最常用于跟踪用户点击页面或动态广告曝光次数。

缺点：
1. 只能发送get请求
2. 无法访问服务器的响应文本
3. 只能用于浏览器与服务器间的单项通讯
```
var img = new Image();
img.onload=function(){
    alert('done');
}
img.onerror=function(){
    alert('fail');
}
img.src = "http://www.example.com/test"
```

## <img/>
- 一个网页可以从任何网页中加载图像，不用担心跨域不跨域。
- 在线广告跟踪浏览量的主要方式。
- 可以动态创建图像，使用onload和onerror事件处理程序来确定是否接收到了响应。
