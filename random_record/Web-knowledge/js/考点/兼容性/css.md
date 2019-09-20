CSS hack主要有三种：IE条件注释法、CSS属性前缀法、选择器前缀法。

1. IE条件注释法，即在正常代码之外添加判别IE浏览器或对应版本的条件注释，符合条件的浏览器或者版本号才回执行里边的代码。

<!--  lt是小于 gt是大于 lte是小于等于 gte是不小于 !是不等于 -->
```
<!-- [if IE]>
   你想要执行的代码 
<![endif]-->

<!-- [if lt IE 8]>
   你想要执行的代码 
<![endif]-->

<!-- [if ! IE 8]>
   你想要执行的代码 
<![endif]-->
```

2. CSS属性前缀法，即是给css的属性添加前缀。比如 * 可以被IE6/IE7识别，但 _ 只能被IE6识别，IE6-IE10都可以识别 "\9"，IE6不能识别!important  FireFox不能识别 * _  \9

```
可以先使用“\9"标记，将IE分离出来，再用”*"分离出IE6/IE7，最后可以用“_”分离出IE6

.type{
    color: #111; /* all */
    color: #222\9; /* IE */
    *color: #333; /* IE6/IE7 */
    _color: #444; /* IE6 */
}

所以可以按着优先级就能给特定的版本捎上特定颜色
```

```
可以先使用“\9"标记，将IE分离出来，再用”*"分离出IE6/IE7，最后可以用“_”分离出IE6

.type{
        color: #111; /* all */

        color: #222\9; /* IE */
        *color: #333; /* IE6/IE7 */
        _color: #444; /* IE6 */
        }

所以可以按着优先级就能给特定的版本捎上特定颜色
```
为什么说一般呢...你看看下面这个例子，IE6貌似还认得出!important 

其实也能看出来了，当属性一起写在{}里头时，前者肯定会被后者覆盖。要使!important有效，就应置于多个{}间。
```
    h1{color: #f00 !important; }
    h1{color: #000;}
    h2{color: #f00 !important; color: #000;}

    <h1>test1</h1>
    <h2>test2</h2>

    说明：在标准模式中

    “-″减号是IE6专有的hack
    “\9″ IE6/IE7/IE8/IE9/IE10都生效
    “\0″ IE8/IE9/IE10都生效，是IE8/9/10的hack
    “\9\0″ 只对IE9/IE10生效，是IE9/10的hack
```

3. 选择器前缀法，顾名思义，就是给选择器加上前缀。

IE6可识别 *div{color:red;}  

IE7可识别 *+div{color:red;}

@media screen\9{...}只对IE6/7生效

@media \0screen {body { background: red; }}只对IE8有效

@media \0screen\,screen\9{body { background: blue; }}只对IE6/7/8有效

@media screen\0 {body { background: green; }} 只对IE8/9/10有效

@media screen and (min-width:0\0) {body { background: gray; }} 只对IE9/10有效

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {body { background: orange; }} 只对IE10有效 等等

## 常见兼容性问题
- 要统一，就要进行CSS reset 

- IE6双边距bug: 块属性标签添加了浮动float之后，若在浮动方向上也有margin值，则margin值会加倍。其实这种问题主要就是会把某些元素挤到了第二行

```
<style type="text/css">
    html,body,div{ margin: 0;padding: 0;}
    .wrap{width: 200px; height: 200px; border: 1px solid #333;}
    .box{float: left; /* display:inline */ ;margin-left: 10px; width: 80px; height: 80px; background-color: green;}
</style>

<div class="wrap">
    <div class="box"></div>
    <div class="box"></div>
</div>

```
解决的方式有两个：

 1.给float元素添加display：inline 即可正常显示

 2.就是hack处理了，对IE6进行 _margin-left:5px;

- 跟上述差不多，也属于IE6双边距bug: 行内属性标签，为了设置宽高，我们经常就会设置成display：block; 这样一来就产生上述的问题。

解决办法也是添加display：inline; 但是这样一来我们就不能设置宽高了，所以呢需要再加个 display:table

所以你`设置display:block后，再添上display:inline和display:table`   

- 上下margin重合问题，相邻的两个div margin-left margin-right 不会重合，但相邻的margin-top margin-bottom会重合。 

解决办法：见，css/样式/margin塌陷问题.md

- 有些浏览器解析img标签也有不同，img是行内的，一般都会紧接着排放，但是在有些情况下还是会突然出现个间距。

解决办法：`是给它来个浮动  float` 

- 标签属性min-height是不兼容的，所以使用的时候也要稍微改改。这样吧：**这个还不太懂，需要深入研究**
```
.box{
    min-height:100px;
    height:auto !important;
    height:100px; 
    overflow:visible;
}
```

- 很多时候可能会纳闷超链接访问过后 样式就混乱了，hover样式不出现了。其实主要是其CSS属性的排序问题。一般来说，最好按照这个顺序：L-V-H-A
```
简单的记法是  love  hate 

a:link{}  a:visited{}  a:hover{}  a:active{}
```

- chrome下默认会将小于12px的文本强制按照12px来解析。

解决办法：给其添加属性：-webkit-text-size-adjust: none; 

- png24位的图片在IE6下面会出现背景，所以最好还是使用png8格式的

- 因为存在两种盒子模式：IE盒子模式和W3C标准模式，所以对象的实际宽度也要注意。

IE/Opera：`对象的实际宽度` = (margin-left) + width + (margin-right)

Firefox/Mozilla：`对象的实际宽度`= (margin-left) + (border-left-width) + (padding- left) + width + (padding-right) + (border-right-width) + (margin-right)

- 鼠标的手势也有问题：FireFox的cursor属性不支持hand，但是支持pointer，IE两个都支持；所以为了兼容都用pointer

- 有个说法是：FireFox无法解析简写的padding属性设置。

如padding 5px 4px 3px 1px；必须改为 padding-top:5px; padding-right:4px; padding-bottom:3px; padding-left:1px。但我试了一下，发现还是可以解析的，**难道是版本的原因**？

- 消除ul、ol等列表的缩进时，样式应写成:`list-style:none;margin:0px;padding:0px;` 其中margin属性对IE有效，padding属性对FireFox有效

- CSS控制透明度问题：一般就直接 opacity: 0.6 ; IE就 filter: alpha(opacity=60)

但在IE6下又有问题，所以又得弄成 filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60);
```
transparent_class {   

    filter:alpha(opacity=50);   

       -moz-opacity:0.5;   

       -khtml-opacity: 0.5;   

       opacity: 0.5;   

 } 
```
- 有些时候图片下方会出现一条间隙，通常会出现在FF和IE6下面比如
```
<div><img src="1.jpg"/></div>
一般给img添加vertical-align属性即可，比如top middle
img{verticle-align:center;}
```
- IE6下div高度无法小于10px 

　比如定义一条高2px的线条，FF和IE7都正常

解决的办法有两种：添加overflow属性或设置fontsize大小为高度大小  如：
```
<div style="height:2px;overflow:hidden;background:#000000;width:778px;"></div>

<div style="height:2px;font-size:2px;background:#000000;width:778px;">&nbps;</div>
```
-  IE6中的列表li楼梯状bug

描述：通常在li中的元素（比如a）设置了浮动float，但li本身不浮动。

解决办法：ul li{float:left;} 或 ul li{display:inline;}

- li空白间距

描述：在IE下，会增加li和li之间的垂直间距

解决办法：给li里的a显式的添加宽度或者高度
```
li a{width:20px;}

或者

li a{display:block;float:left;clear:left;}

或者

li {display:inline;}

li a{display:block;}

或者

在每个列表li上设置一个实线的底边，颜色和li的背景色相同

```
- overflow：auto;和position:relative的碰撞

描述：此bug只出现在IE6和IE7中，有两个块级元素，父元素设置了overflow：auto;子元素设置了position:relative;且高度大于父元素，在IE6-7中子元素不会被隐藏而是溢出。

解决方案：给父元素也设置position:relative;

- 浮动层的错位

描述：当内容超出外包容器定义的宽度时会导致浮动层错位问题。在Firefox、IE7、IE8及其他标准浏览器里,超出的内容仅仅只是超出边缘;但在IE6中容器会忽视定义的width值,宽度会错误地随内容宽度增长而增长。如果在这个浮动元素之后还跟着一个浮动元素,那么就会导致错位问题。

解决方案：overflow：hidden;

- IE的图片缩放

描述：图片在IE下缩放有时会影响其质量

解决方案：img{ -mg-interpolation-mode:bicubic;}

- <iframe>透明背景bug

描述：在IE浏览器中，<iframe>框架不会自动把背景设为透明

解决方案：

<iframe src="content.html"allowTransparency="true"></iframe>

在iframe调用的content.html页面中设置

body{background-color: transparent;}

- 禁用IE默认的垂直滚动条

解决方案：
```
html{
   overflow:auto;
}
```