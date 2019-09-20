https://github.com/AurelioDeRosa/HTML5-API-demos

https://blog.csdn.net/qq_36140085/article/details/81544157  （h5新特性）
 
connection.type ：获取网络类型
### html5新添加的标签
HTML5 新增结构元素分为主体结构元素和非主体结构元素

1. 主体结构元素包括 article、section、nav、aside、time
2. 非主体结构元素包括 header、hgroup、footer、address
3. 用于媒介回放的 video 和 audio 元素 
4. 用于绘画的 canvas 元素 
5. 对本地离线存储的更好的支持
6. datalist 定义可选数据的列表。与 input 元素配合使用，就可以制作出输入值的下拉列表。
7. mark定义页面中需要突出显示或高亮显示的内容，通常在引用原文时 
8. audio 播放声音文件，比如音乐或其它音频流。
9. video 播放视频文件，比如电影或其它视频流。
10. source为媒介元素（比如 video 和 audio）指定多个播放格式与编码，浏览器会自动选择第一个可以识别的格式。
11. figure 对多个元素进行组合。
12. map定义客户端的图像映射。
13. mark定义页面中需要突出显示或高亮显示的内容，通常在引用原文时，使用此元素，目的就是引起当前用户的注意。闭合标签；行内元素；默认情况下，宽：内容的宽度；高：内容的高度； 
14. progress：进度条

支持HTML5浏览器默认的标签样式：
article, aside, footer, header, hgroup, main, nav, section { 
    display: block; 
}

section:
用于页面内容的独立分块，往往是文章的一段
通常由内容和标题组成，没有标题的内容不推荐使用 section

nav
nav 标签，从语义化上看为导航，其用法如下：
通常作为页面导航的链接组
侧边栏导航
使用频率高。

address
address 标签，从语义化上看为地址

footer
footer 标签，从语义化上看为文档的脚注，其用法如下：
一个内容块区的脚注
通常内容为联系信息、相关阅读、版权信息等
使用频率高，比较容易理解


hgroup
hgroup 标签，从语义化上看为标题组，其用法如下：
作为 header 标签的子元素
一个内容模块中包括了主标题和至少一个子标题才使用 hgroup
通常会将 h1~h6 元素进行分组
使用频率高。

time
time 标签，从语义化上看为时间，其用法如下：
代表 24 小时中的某个时刻或某个日期
表示时刻时允许带时间差
可定义很多格式的日期和时间
使用频率低。

### audio/vedio

https://www.cnblogs.com/lcddjm/p/5680109.html

Media.play();    //播放
Media.pause();    //暂停
Media.canPlayType(type); //是否能播放某种格式的资源
Media.networkState; //0.此元素未初始化  1.正常但没有使用网络  2.正在下载数据  3.没有找到资源
Media.load(); //重新加载src指定的资源


## dataset  
通过.dataset API，我们可以更方便的获取元素的所有data字段，并以对象的方式，方便存取和遍历。这样就没必要一个个循环出有data字段的属性
```
<script type="text/javascript">
  var mdoc=document.getElementById('music-latch');
  var ds=mdoc.dataset;
  alert(ds.date+'--'+ds.album);
  </script>
```

## h5中performance.timing轻松获取网页各个数据 如dom加载时间 渲染时长 加载完触发时间
在控制台中输入window.performance.timing(html5的属性);

各字段的含义：
·         navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。

·   unloadEventStart：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

·   unloadEventEnd：如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

·   redirectStart：返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

·   redirectEnd：返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

·   fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。

·   domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

·   domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

·   connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

·   connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

·   secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

·   requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

·   responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。

·   responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

·   domLoading：返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

·   domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

·   domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。

·   domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。

·   domComplete：返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。

·   loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。

·   loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0。通过while循环持续判断直到loadEventEnd>0则表示完全加载完毕了！网络不再有任何数据请求、dom也渲染完毕了！！！

## Notification
推送
## Speech 
实现语音文本互转