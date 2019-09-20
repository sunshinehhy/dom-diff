http://school.10jqka.com.cn/gprm/

https://markyun.github.io/2015/Front-end-Developer-Questions/

https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/master/Translations/Chinese/README.md

https://wenku.baidu.com/view/b5baf920f121dd36a22d8238.html

https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers

GSML是标准通用标记语言（以下简称“通用标言”），是一种定义电子文档结构和描述其内容的国际标准语言

匹配/(\d)(?=(\d{3})+\.)/g数字后面是三个数字或者3的倍数个数字，后面跟小数点。d{3})+表示3的倍数个数字，如3个数字6个数字等，?=表示后面一定是3的倍数个数字

1. DOM结构 —— 两个节点之间可能存在哪些关系以及如何在节点之间任意移动。

https://www.cnblogs.com/dtdxrk/archive/2012/07/19/2599525.html

2. DOM操作 —— 如何添加、移除、移动、复制、创建和查找节点等。

3. 事件 —— 如何使用事件，以及IE和标准DOM事件模型之间存在的差别。

https://www.jianshu.com/p/94965b55489a

4. XMLHttpRequest —— 这是什么、怎样完整地执行一次GET请求、怎样检测错误。

XMLHttpRequest 对象提供了在网页加载后与服务器进行通信的方法。
onreadystatechange

5. 严格模式与混杂模式 —— 如何触发这两种模式，区分它们有何意义。

https://www.cnblogs.com/gavinzzh-firstday/p/5723708.html

6. 盒模型 —— 外边距、内边距和边框之间的关系，及IE8以下版本的浏览器中的盒模型

一个元素盒模型的层次从内到外分别为：内边距、边框和外边距
IE8以下浏览器的盒模型中定义的元素的宽高不包括内边距和边框

7. 块级元素与行内元素 —— 怎么用CSS控制它们、以及如何合理的使用它们

块级元素，用CSS中的display:inline;属性则变为行内元素
行内元素，用CSS中的display:block;属性则变为块级元素
影响：周围元素显示在同一行或换行显示，根据具体情况调整样式

8. 浮动元素 —— 怎么使用它们、它们有什么问题以及怎么解决这些问题。

需要浮动的元素可使用CSS中float属性来定义元素的浮动位置，left：往左浮动，right：往右浮动
浮动元素引起的问题：
（1）父元素的高度无法被撑开，影响与父元素同级的元素
（2）与浮动元素同级的非浮动元素会跟随其后
（3）若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
解决方法：
使用CSS中的clear:both;属性来清除元素的浮动可解决2、3问题，对于问题1，添加如下样式，给父元素添加clearfix样式：
.clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}
.clearfix{display: inline-block;}  /* for IE/Mac */

9. HTML与XHTML —— 二者有什么区别，你觉得应该使用哪一个并说出理由。

主要区别：
     XHTML 元素必须被正确地嵌套
     XHTML 元素必须被关闭，空标签也必须被关闭，如 <br> 必须写成 <br />
     XHTML 标签名必须用小写字母
     XHTML 文档必须拥有根元素
     XHTML 文档要求给所有属性赋一个值
     XHTML 要求所有的属性必须用引号""括起来
     XHTML 文档需要把所有 < 、>、& 等特殊符号用编码表示
     XHTML 文档不要在注释内容中使“--”
     XHTML 图片必须有说明文字
     XHTML 文档中用id属性代替name属性

10. JSON —— 作用、用途、设计结构。

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。
JSON建构于两种结构：
“名称/值”对的集合（A collection of name/value 
pairs）。不同的语言中，它被理解为对象（object），纪录（record），结构（struct），字典（dictionary），哈希表（hash table），有键列表（keyed list），或者关联数组 （associative array）。 
值的有序列表（An ordered list of values）。在大部分语言中，它被理解为数组（array）。

#### 页面编码和被请求的资源编码如果不一致如何处理？

比如：http://www.yyy.com/a.html 中嵌入了一个http://www.xxx.com/test.js
a.html 的编码是gbk或gb2312的。 而引入的js编码为utf-8的 ，那就需要在引入的时候\<script src="http://www.xxx.com/test.js" charset="utf-8">\</script>
同理，如果你的页面是utf-8的，引入的js是gbk的，那么就需要加上charset="gbk".

#### 服务器代理转发时，该如何处理cookie？

https://www.cnblogs.com/hujunzheng/p/5744755.html

https://www.cnblogs.com/hojo/p/5325352.html

https://www.jianshu.com/p/aeed2a56a3eb

#### Node.js的适用场景？

https://www.cnblogs.com/hojo/p/5325352.html
基于这样的机制，理论上陆续有用户请求连接，NodeJS都可以进行响应，因此NodeJS能支持比Java、PHP程序更高的并发量虽然维护事件队列也需要成本，再由于NodeJS是单线程，事件队列越长，得到响应的时间就越长，并发量上去还是会力不从心。
总结一下NodeJS是怎么解决并发连接这个问题的：更改连接到服务器的方式，每个连接发射（emit）一个在NodeJS引擎进程中运行的事件（Event），放进事件队列当中，而不是为每个连接生成一个新的OS线程（并为其分配一些配套内存）。

#### 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?

1. 什么是前端路由？

路由是根据不同的 url 地址展示不同的内容或页面

前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

2. 什么时候使用前端路由？

在单页面应用，大部分页面结构不变，只改变部分内容的使用

3. 前端路由有什么优点和缺点？

- 优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户

- 缺点：

    + 使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存

    + 单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

#### 前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用?
我是用smarty模板和nunjucks

#### 简述一下 Handlebars 的基本用法？

Handlebars 是 JavaScript 一个语义模板库，通过对view和data的分离来快速构建Web模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译， 这样可以保证模板加载和运行的速度。Handlebars兼容Mustache，你可以在Handlebars中导入Mustache模板。

#### 检测浏览器版本版本有哪些方式？

功能检测、userAgent特征检测

#### What is a Polyfill?

polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。
  例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，
  所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，
  一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。

#### W3C下的冒泡和捕获机制。到底是冒泡呢。还是捕获呢。一个DOM元素绑定多个事件时如何执行。

冒泡就是从下往上，像鱼吐泡，泡泡是从下往上升的，也就是DOM元素被触法事件时(此时的dom元素为目标元素)，目标元素事件执行后，它的祖先元素所绑定的事件会向上顺序执行。
而捕获则相反。当触发目标元素时，会从目标元素的最顶层的祖先元素事件往下执行到目标元素为止。
了解到W3C的执行顺序是择中的。即
`任何发生在w3c事件模型中的事件，首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段。`
从上往下，如有捕获事件，则执行；一直向下到目标元素后，从目标元素开始向上执行冒泡元素，即第三个参数为false的绑定事件的元素。(在向上执行过程中，已经执行过的捕获事件不再执行，只执行冒泡事件。)

#### 请介绍一下JS之事件节流?
比较常用的： 
1.标志变量法： 
设置一个开关变量 开始可以设置为true 并且只有当变量为true的时候才能执行某事件，触发事件后立即设置变量为false（这是我工作中比较常用的方法，简单容易实现，不容易出错） 
2.函数节流： 
思想就是`指某些代码不可以在没有间断的的情况下连续重复执行。` 
第一次调用函数 创建一个延时器 指定时间间隔后触发事件；第二次执行该函数时会清除之前设定的延时器 并且设置一个新的延时器；如果之前的延时器已经执行完事件 则没有什么意义 但是当 前一个延时器没有执行的时候 就相当于 将之前的延时器给替换成了新的延时器 其目的就是 只有在执行函数的请求停止了一段时间之后才再一次执行 
3.函数防抖： 
`就是一个时间如果频繁触发，会隔一段时间执行一次 `
2中的做法可能会导致一个问题：如果在设定的延时时间内一直频繁的触发函数 将回导致某个事件永远不会被执行；函数防抖 将解决这一问题 隔一段时间清除延时器 隔一段时间执行一次函数

#### css-loader和style-loader
webpack的css-loader和style-loader，前者用于在js中加载css，后者把加载的css作为style标签内容插入到html中。另外，如果某些css要考虑到浏览器的兼容性(比如css3中的flex)，我们要webpack在打包的过程中自动为这些css属性加上浏览器前缀，这时就用到了postcss-loader和它对应的插件autoprefixer。

#### 原来公司工作流程是怎么样的，如何与其他人协作的？如何跨部门合作的？

需要跟UI和后台协作，有时候需要跟编辑、市场协作。了解他们的需求去一个个解决问题。

#### 你遇到过最有挑战的技术问题？

碰到的问题：
重复请求数据，刚开始使用setTimeout不可以，因为出现第一次请求，后期很快就请求完毕，后期改成异步和setTimeout可以，跟js运行机制有关。
靠google和stackoverflow解决问题。

一台电脑使用2个github配置。
gulpfile文件配置，运行出现多种错误，比如gulp-sass很难下载，跟网络有关。
做启动startapp过程中，如果不能读取正确网址，会出现safari打开不正确。后面通过onload方式同时加载网址解决了问题。


比如说最近新学习了一门技术xxx，在把这门技术应用于实战的时候发现自己太naive，知道很多理论但是不知道怎么动手。总结原因，是因为自己的实践经验太少了，考虑用xxx做一个程序。google之后发现ooo很适合现阶段的我去做。于是开始用xxx来做ooo。期间碰到了很多难以解决的问题，比如对xxx的api不熟悉，底层实现不了解，编码规范不知道，导致了开发速度慢、出了bug无法解决、写出来的代码不能直视。这些问题需要一项一项的针对性去克服，下载了离线api硬着头皮去啃难懂的英语，看源代码和相关博客文章探索底层实现，学习代码规范并严格遵守。最后，ooo终于做出来了。

#### 常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件？

jquery,swiper,bootstrap,jshint
sublime，vsc
开发房地产、前端页面生成器组件

#### 为什么使用CDN进行资源访问加速？
CDN（内容分发网络），利用许多分散在全球各地的服务器，是的用户的访问速度更加快捷。现在许许多多的应用都基于CDN来进行，以往集中的一台或者几台服务器提供资源的场景早就木有了。 
比如常见的：视频的播放，文件的下载，网页静态资源的访问等等，都在通过CDN进行加速。

现在网站很多都会使用类似JQuery、bootstrap来方便网站的开发。但现在这些js或css框架都比较大，min再gz之后仍然有较大占用，影响网站打开速度。

所以现在一般都会使用CDN上提供的这些资源，一方面，因为域名不同，可以让这些资源与网站其它内容同时下载；另一方面，这些cdn有缓存、带宽大，访问速度快；最后，当然，这样也可以减少主机流量。

#### 什么叫优雅降级和渐进增强？

  优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。
  如：border-shadow

  渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
  如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；

#### 是否了解公钥加密和私钥加密。

  一般情况下是指`私钥用于对数据进行签名，公钥用于对签名进行验证`;
  `HTTP网站在浏览器端用公钥加密敏感数据，然后在服务器端再用私钥解密`。

#### WEB应用从服务器主动推送Data到客户端有那些方式？

  html5提供的Websocket
  不可见的iframe
  WebSocket通过Flash
  XHR长时间连接
  XHR Multipart Streaming
  \<script>标签的长时间连接(可跨域)

#### 对前端工程师这个职位是怎么样理解的？它的前景会怎么样？

  前端是最贴近用户的程序员，比后端、数据库、产品经理、运营、安全都近。
  1、实现界面交互
  2、提升用户体验
  3、有了Node.js，前端可以实现服务端的一些事情


  前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好，

  参与项目，快速高质量完成实现效果图，精确到1px；

  与团队成员，UI设计，产品经理的沟通；

  做好的页面结构，页面重构和用户体验；

  处理hack，兼容、写出优美的代码格式；

  针对服务器的优化、拥抱最新前端技术。

#### 移动前端开发和 Web 前端开发的区别是什么？

https://www.zhihu.com/question/20269059

#### position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

https://www.cnblogs.com/jackyWHJ/p/3756087.html

#### http缓存

cache-control：no-cache 
last-modifided
If-Modified-Since
ETag  304
对比缓存和强制缓存

#### CSS预处理器

Sass、LESS 和 Stylus

#### 移动端的布局用过媒体查询吗？

用过媒体查询，或针对移动端的布局/CSS 
@media screen and (min-width: 400px) and (max-width: 700px) { … }

#### 全屏滚动的原理是什么？用到了CSS的那些属性？

```
<div id="wrap">  
    <div id="main">  
        <div id="page1" class="page"></div>  
        <div id="page2" class="page"></div>  
        <div id="page3" class="page"></div>  
        <div id="page4" class="page"></div>  
    </div>      
</div>  
```

wrap块为窗口可看到的部分，我们可以通过js获取窗口可视区的大小，并为其设置overflow: hidden属性，使得窗口不出现滚动条，只显示窗口大小的一页内容；
设置main定位为`relative`，`通过改变main块的top属性实现不同页面的切换`
js代码的主要部分就是对滚动事件的函数绑定，大多数浏览器提供了 “mousewheel” 事件，Firefox 3.5+不支持，但支持相同作用的事件：”DOMMouseScroll”；
mousewheel事件“event.wheelDelta” 属性值：返回的如果是正值说明滚轮是向上滚动；

DOMMouseScroll事件“event.detail” 属性值：返回的如果是负值说明滚轮是向上滚动;每页高度为document.body.clientHeight+’px’;

#### 探讨兼容IE低版本的PC端响应式布局

IE6、7 不支持 Media Queries

使用插件：Respond.js
发现淘宝和天猫的新版首页也用到了PC端响应式,他们用的是取屏幕宽度，然后通过resize方法来实现PC端响应式
```
$(window).resize(function () {
    screenRespond();
});
screenRespond();
function screenRespond(){
  var screenWidth = $(window).width(); 
  if(screenWidth <= 1800){
    $("body").attr("class","w1800");
  }
  if(screenWidth <= 1400){
    $("body").attr("class","w1400");
  }
  if(screenWidth > 1800){
    $("body").attr("class","");
  }
}
```

#### style标签写在body后与body前有什么区别？

写在head标签中利于浏览器逐步渲染（resources downloading->CSSOM+DOM->RenderTree(composite)->Layout->paint）。具体渲染过程请参考
http://blog.csdn.net/wozaixia...
写在body标签后由于浏览器以逐行方式对html文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

这跟浏览器爬虫有关，载入页面爬虫进入html模式，写在body前，页面还未开始展示，不会出现页面白屏效果；写在body后，爬到css代码的时候，爬虫进入css模式，可能会出现白屏的情况。

#### 如何做到 Cookie 隔离?

网站向服务器请求的时候，会自动带上cookie，这样增加 表头信息量，使得请求变慢，可以
用静态资源放 CDN ，用 cookie free domain

如果静态文件都放在主域名下，那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，
所以不如隔离开。

因为cookie有域的限制，因此`不能跨域提交请求`，故使用非主要域名的时候，请求头中就不会带有cookie数据，
这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
提高了webserver的http请求的解析速度。

#### png、jpg、gif 这些图片格式解释一下，分别什么时候用?

格式	压缩模式	交错支持	透明支持	动画支持
JPG	 有损压缩	 支持	     不支持	 不支持
PNG	 无损压缩	 支持	     支持	    不支持

#### 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度。
https://segmentfault.com/q/1010000000762512/a-1020000000762933

#### CSS3新增伪类有那些？

  举例：
  p:first-of-type	选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
  p:last-of-type	选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
  p:only-of-type	选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
  p:only-child		选择属于其父元素的唯一子元素的每个 <p> 元素。
  p:nth-child(2)	选择属于其父元素的第二个子元素的每个 <p> 元素。

  ::after			在元素之前添加内容,也可以用来做清除浮动。
  ::before			在元素之后添加内容
  :enabled  		
  :disabled 		控制表单控件的禁用状态。
  :checked        单选框或复选框被选中。

#### CSS优先级算法如何计算？

  *   优先级就近原则，同权重情况下样式定义最近者为准;
  *   载入样式以最后载入的定位为准;

  优先级为:
  	同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
  	!important >  id > class > tag
  	important 比 内联优先级高

#### 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

  （1）有两种， IE 盒子模型、W3C 盒子模型；
  （2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
  （3）区  别： IE的content部分把 border 和 padding计算了进去;

#### 使用link和@import有什么区别？

https://www.jianshu.com/p/c39f007c3299

（1）link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;

（2）页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

（3）import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

#### 常见的浏览器内核有哪些？

  Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]
  Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等
  Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]
  Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]

详细文章：[浏览器内核的解析和对比](http://www.cnblogs.com/fullhouse/archive/2011/12/19/2293455.html)

#### iframe有那些缺点？

  *iframe会阻塞主页面的Onload事件；
  *搜索引擎的检索程序无法解读这种页面，不利于SEO;

  *iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

  使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
  动态给iframe添加src属性值，这样可以绕开以上两个问题。

#### webSocket如何兼容低浏览器？(阿里)

  Adobe Flash Socket 、
  ActiveX HTMLFile (IE) 、
  基于 multipart 编码发送 XHR 、
  基于长轮询的 XHR
  
#### 页面可见性（Page Visibility API） 可以有哪些用途？

  通过 visibilityState 的值检测页面当前是否可见，以及打开网页的时间等;
  在页面被切换到其他后台进程的时候，自动暂停音乐或视频的播放；

#### vue react jquery angular区别
https://cn.vuejs.org/v2/guide/comparison.html
https://www.jianshu.com/p/8b94f1b98578
jquery`频繁操作dom节点`，对复杂项目部适合，它可应用于性能要求不是很高的前端项目.
数据双向绑定:

http://www.jqhtml.com/category/article/framework

`ReactJS和VueJS`的对比应该是比较适合的，感觉这哥俩就是好基友，不管是单向数据流、组件化思想、还是构建大型应用的路由和状态管理都有些许`相似`之处。而`AngularJS与Jquery对比我个人觉着比较合适`。

##### react组件之间的数据流：
1. 父子组件之间的数据通信
2. 非父子组件之间的数据通信。
在React中，父与子之间的数据通信是`通过props属性`就行传递的；
而子与父之间的数据通信可以通过`父组件定义事件`，`子组件触发父组件中的事件`时，`通过实参的形式`来改变父组件中的数据来通信;
在获取表单控件内的数据时，我们利用了一个`refs对象，该对象用于获取真实DOM结构`。具体来说就是，在React中组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟DOM 。
只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff （详细了解diff 算法），它可以极大提高网页的性能表现。

Flux和Redux实现数据之间的通讯：
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html

##### Vue中的组件和数据流
父子组件之间的数据通信是通过`Prop和自定义事件`实现的，而非父子组件可以使用`订阅/发布模式`实现（类似于Angualr中的非父子指令之间的通信），再复杂一点也是建议使用状态管理（vuex）。

对比React和Vue的组件及数据流的时候，都提到了当非父子组件之间嵌套过深的时候都建议使用`状态管理来维护数据的变化`
Vue比React出来的要晚一些,`Vue默认的是单向数据流`，这是Vue直接提出来说明的，父组件默认可以向子组件传递数据，但是子组件向父组件传递数据就需要`额外设置`了。


个人感觉Flux和Vue中的vuex思想基本相同，因为Vuex就是借鉴的Flux。



react状态管理使用：redux
flux状态管理使用： vuex

react数据流：双向
vue数据流：单向
Vue比React出来的要晚一些,`Vue默认的是单向数据流`，这是Vue直接提出来说明的，父组件默认可以向子组件传递数据，但是子组件向父组件传递数据就需要`额外设置`了。
Vue中有`模板的概念`，所以，`数据和模板进行数据绑定需要分别来做`。

react表单是双向绑定：react中通过`将state（Model层）与View层数据`进行双向绑定达到数据的实时更新变化，具体来说就是`在View层直接写JS代码将Model层中的数据拿过来渲染`，一旦像表单操作、触发事件、ajax请求等触发数据变化，则进行双向同步。
vue表单是双向绑定：可以通过使用 v-model 指令，在表单 input 和 textarea 元素上创建双向数据绑定。


路由：两者的路由也很相似，都是利用各自的组件实现思想来实现的。
react： react-router
vue：vue-router

**比较了几个方面的区别，但细学仅仅学了react**

##### 怎么实现web标准、可用性、可访问性？
https://wenku.baidu.com/view/7df8d26a83d049649a6658dd.html


可以问什么问题
多问一些与职位及部门、或者公司相关的问题——
“公司对我这个职位的期望是什么？”
“入职后是否有相关的职位技能培训？”
“团队成员有多少人？核心工作有哪些？”
“贵公司未来的发展方向是什么？”

## 自我推荐
我拥有前端开发经验2年，第一年通过自学转行到前端开发，虽然不是计算机科班出生但是研究生以来一直从事软件开发的工作，在现公司做过一段时间的ios原生开发，使用过react开发，你也可以问我一些react开发，我觉得自己现在能够胜任react框架的前端开发。
研究一个node开发，学习过node。
今晚跟lv练习原型熟悉度。垂直居中和水平居中的各种办法。react的diff算法原理。
还没来得及研究各种框架，但是我觉得知识都是想通的，通过自己一段时间的努力肯定会很快学会。