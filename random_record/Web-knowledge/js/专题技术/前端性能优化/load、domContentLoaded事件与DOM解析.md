## DOMContentLoaded 与 load事件
关于load和DOMContentLoaded事件，mdn对于它们是这样描述的：

### DOMContentLoaded
mdn文档地址:<https://developer.mozilla.org/zh-CN/docs/Web/Events/DOMContentLoaded>

The DOMContentLoaded event is fired when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

意思就是：当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

### load
mdn文档地址:<https://developer.mozilla.org/zh-CN/docs/Web/Events/load>

The load event is fired when a resource and its dependent resources have finished loading.

意思就是：当一个资源及其依赖资源已完成加载时，将触发load事件。

### 区别小结
简而言之，二者触发时间的区别在于：DOMContentLoaded在HTML文档被解析完成之后触发，而load是在HTML所有相关资源被加载完成后触发。

为了感受这两个事件，可以使用Chrome打开一个任意一个网页。打开控制台的Network面板。以下是[FT中文网首页](http://www.ftchinese.com)的Network面板Waterfall截图：

<img src="image/DOMContentLoaded&load.png">

可以看到图上有两条线：一条蓝线，代表DOMContentLoaded事件，触发时间为1.50s;一条红线，代表load事件，触发时间为5.54s。

如果想要更直观地感受二者的区别，还可以点击这个页面：<https://testdrive-archive.azurewebsites.net/HTML5/DOMContentLoaded/Default.html>



## HTML解析与DOMContentLoaded触发时机
我们已经知道DOMContentLoaded的触发时间为：当 HTML文档被加载和解析完成。那么我们还需要理解HTML的解析过程。

### 1.在既没有CSS也没有JS的情况下，HTML文档的解析过程为：
<img src="image/DOM parse 1.jpg">
DOMContentLoaded事件的触发时机为:HTML解析为DOM之后。

### 2.有CSS无JS的情况下，HTML文档解析过程为：

<img src="image/DOM parse 2.jpg">
这里与1.不同的地方在于，渲染树的生成是基于DOM和CSSOM的。但是触发DOMContentLoaded的时间依然是在HTML解析为DOM后，无论此时CSS解析为CSSOM的过程是否完成。

### 3.当有JS时，HTML文档解析过程为：
<img src="image/DOM parse 3.jpg">


###  有一个问题：首屏时间？
“计算这个网页从空白到出现内容所花费的时间”。那怎么计算这段时间？HTML5 规范已经帮我们完成了相应的工作，就是当一个 HTML 文档被加载和解析完成后，DOMContentLoaded 事件便会被触发。

那岂不是js放在前面和后面都是一样的。。。。***待查资料***


## 异步脚本和延迟脚本与load和DOMContentLoaded的关系
### async
一定会在load事件之前执行，可能会在DOMContentLoaded之前或之后执行

### defer
按照h5规范，两个defer脚本会安装它们出现的先后顺序执行，两个脚本会在DOMContentLoaded之前执行。

但事实上，defer脚本不一定会按顺序执行，也不一定会在DOMContentLoaded之前执行。**疑问：在load之前还是之后执行呢？**

## 相关博客

Using setTimeout to speed up window.onload: <https://mathiasbynens.be/notes/settimeout-onload>

<http://www.cnblogs.com/coco1s/p/4010310.html>

你不知道的DOMContentLoaded:<https://zhuanlan.zhihu.com/p/25876048>

<https://www.cnblogs.com/lhb25/p/how-browsers-work.html>
原文:<https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/>