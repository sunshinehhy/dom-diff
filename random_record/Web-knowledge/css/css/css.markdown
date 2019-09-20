https://www.w3cplus.com/preprocessor/sass-the-mixin-directive.html
属性选择器:https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors
### css
@extend指令通过继承从而简化了代码，但是它也有缺陷之处，首先是不够灵活，其次它还会将你不需要的其他地方具有相同类名的样式都继承过来。

@mixin指令是另一种简化代码的方法。Mixins可以包含任意内容且可以传递参数，因此比'@extend'更加灵活和强大。


box-shadow: h-shadow v-shadow blur spread color inset;
h-shadow    必需。水平阴影的位置。允许负值。    
v-shadow    必需。垂直阴影的位置。允许负值。    
blur    可选。模糊距离。    
spread  可选。阴影的尺寸。   
color   可选。阴影的颜色。请参阅 CSS 颜色值。   
inset   可选。将外部阴影 (outset) 改为内部阴影。

text-shadow: h-shadow v-shadow blur color;
h-shadow    必需。水平阴影的位置。允许负值。 
v-shadow    必需。垂直阴影的位置。允许负值。
blur    可选。模糊的距离。  
color   可选。阴影的颜色。
background: linear-gradient(rgba(250,234,221,0),rgba(250,234,221,1));

sass:加减乘除、颜色加减、变量、继承、字符运算、Mixins；还有函数：
> 
> unquote($string)：删除字符串中的引号；
quote($string)：给字符串添加引号。
percentage($value)：将一个不带单位的数转换成百分比值；
round($value)：将数值四舍五入，转换成一个最接近的整数；
ceil($value)：将大于自己的小数转换成下一位整数；
floor($value)：将一个数去除他的小数部分；
abs($value)：返回一个数的绝对值；
min($numbers…)：找出几个数值之间的最小值；
max($numbers…)：找出几个数值之间的最大值。

## base64图片用法

```
比如：
.pay-wxpay{
  display:block;
  width:80px;
  height:20px;
  margin: 0 10px;
  background-size: contain;
  background-repeat:no-repeat;
  background-image: url(data:image/png;base64）
}
使用此方法，按照高宽比例，设置高度或者宽度不会被单方向被拉伸或者收缩，是双方向同时拉缩
```
## css的权重规则

权重的规则：标签的权重为1，class的权重为10，id的权重为100。
如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现。

## visibility

visibility的第三种值collapse：
对于一般的元素，它的表现跟visibility:hidden是一样的。
但例外的是，如果这个元素是table相关的元素，例如table行，table group，table列，table column group，它的表现却跟display: none一样，也就是说，它们占用的空间也会释放。

在不同浏览器下的区别：
在谷歌浏览器里，使用collapse值和使用hidden值没有什么区别。
在火狐浏览器、Opera和IE11里，使用collapse值的效果就如它的字面意思：table的行会消失，它的下面一行会补充它的位置。

## containing block

一般来说，盒子本身就为其子孙建立了 containing block，用来计算内部盒子的位置、大小，而对内部的盒子，具体采用哪个 containing block 来计算，需要分情况来讨论：

根元素所在的 containing block 被称为 initial containing block，在我们常用的浏览器环境下，指的是原点与 canvas 重合，大小和 viewport 相同的矩形；

对于 position 为 static 或 relative 的元素，其 containing block 为祖先元素中最近的 block container box 的 content box (除 margin, border, padding 外的区域)；

对于 position:fixed 的元素，其 containing block 由 viewport 建立；

对于 position:absolute 的元素，则是先找到其祖先元素中最近的 position 属性非 static 的元素，然后判断：若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；

否则则由这个祖先元素的 padding box 构成。
如果都找不到，则为 initial containing block。

## zoom:1的原理和作用

清除浮动，触发hasLayout；

Zoom属性是IE浏览器的专有属性，它可以设置或检索对象的缩放比例。解决ie下比较奇葩的bug。
比如：外边距（margin）的重叠、浮动清除、触发ie的haslayout属性等。

zoom是 设置或检索对象的缩放比例。设置或更改一个已被呈递的对象的此属性值将导致环绕对象的内容重新流动。
虽然此属性不可继承，但是它会影响对象的所有子对象( children )。这种影响很像 background 和 filter 属性导致的变化。
此属性对于 currentStyle 对象而言是只读的，对于其他对象而言是可读写的。

**重点：**
当设置了zoom的值之后，所设置的元素就会就会扩大或者缩小，高度宽度就会重新计算了，这里一旦改变zoom值时其实也会发生重新渲染，运用这个原理，也就解决了ie下子元素浮动时候父元素不随着自动扩大的问题。

Zoom属是IE浏览器的专有属性，火狐和老版本的webkit核心的浏览器都不支持这个属性。然而，zoom现在已经被逐步标准化，出现在 CSS 3.0 规范草案中，也就是CSS3中的transform: scale这个属性来实现

用法：ie下子元素浮动时候父元素不随着自动扩大的问题，使用下面的CSS写法：

.父元素 {overflow: auto; zoom: 1}

目前非ie由于不支持这个属性，它们又是通过什么属性来实现元素的缩放呢？
可以通过css3里面的动画属性scale进行缩放。


## 抽离样式模块

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。
最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }（建议）

## background-attachment 

background-attachment 属性设置背景图像是否固定或者随着页面的其余部分滚动。

## 关于移动端rem 布局的一些总结
1.rem是什么?

rem(font size of the root element)是指相对于根元素的字体大小的单位

2.为什么web app要使用rem？

实现强大的屏幕适配布局(淘宝,腾讯,网易等网站都是rem布局适配)rem能等比例适配所有屏幕,根据变化html的字体大小来控制rem的大小,如不同html字体大小的计算下,rem值不同

flex布局： https://www.cnblogs.com/sxz2008/p/6635196.html

rem 布局，可以告别了。迎接 flex 布局吧。

## 去除inline-block元素间间距的N种方法

http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/

移除空格、使用margin负值、使用font-size:0、letter-spacing、word-spacing

## overflow: scroll时不能平滑滚动的问题怎么处理？

1、阻止所有能导致页面滚动的事件。//scroll不能阻止，只能阻止mousewheel，鼠标拽滚动条就悲剧了； 
2、body overflow:hidden//win下右侧滚动条会消失导致页面横移，移动端阻止不了；
3、把滚动部分单独放在一个div里，和弹出部分同级，body和window同高。//所有涉及offset/scrollTop的方法都要修改。fix并且width100%的元素(比如微博顶栏)会压在内容区滚动条上； 
4、弹出时算scrollTop，给内容区fix然后top移动到目前位置，同时body给一个overflow-y:scroll强撑出滚动条。

在移动端html中经常出现横向/纵向滚动的效果,但是在iPhone中滚动速度很慢,感觉不流畅,有种卡卡的感觉,但是在安卓设备上没有这种感觉;   要解决这个问题很简单:
一行代码搞定:-webkit-overflow-scrolling : touch;

## box-sizing 

box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。

- *content-box*
这是由 CSS2.1 规定的宽度高度行为。

宽度和高度分别应用到元素的内容框。

`在宽度和高度之外绘制元素的内边距和边框。`

- *border-box*	
为元素设定的宽度和高度决定了元素的`边框盒`。

就是说，为元素指定的任何`内边距和边框都将`在已设定的宽度和高度内进行绘制。

通过从已设定的宽度和高度分别减去边框和内边距才能得到内容的宽度和高度。

- *inherit*	
规定应从父元素继承 box-sizing 属性的值。

## box-flex 
box-flex 属性规定框的子元素是否可伸缩其尺寸。
目前没有浏览器支持 box-flex 属性。

Firefox 支持替代的 -moz-box-flex 属性。

Safari、Opera 以及 Chrome 支持替代的 -webkit-box-flex 属性。

IE 不支持 box-flex 属性。

## CSS flex 属性
flex 属性用于设置或检索弹性盒模型对象的子元素如何分配空间。

flex 属性是 flex-grow、flex-shrink 和 flex-basis 属性的简写属性

- align-items  /* 垂直居中 */
align-items 属性定义`flex子项`在`flex容器`的当前行的侧轴（`纵轴`）方向上的对齐方式。

```
<style>
#main {
    width: 220px;
    height: 300px;
    border: 1px solid black;
    display: -webkit-flex; /* Safari */
    -webkit-align-items: center; /* Safari 7.0+ */
    **display: flex;**
    **align-items: center;**
}

#main div {
   -webkit-flex: 1; /* Safari 6.1+ */
   **flex: 1;**
}
</style>

<div id="main">
  <div style="background-color:coral;">RED</div>
  <div style="background-color:lightblue;">BLUE</div>
  <div style="background-color:lightgreen;">Green div with more content.</div>
</div>

```

- justify-content  /* 水平居中 */

justify-content 用于设置或检索弹性盒子元素在主轴（`横轴`）方向上的对齐方式。

http://www.runoob.com/cssref/css3-pr-justify-content.html




## 隐藏video下载标志
问题
Chrome浏览器下使用video元素会自动出现下载标志，但一般不想让用户下载视频。

解决方案
添加这三个样式：

video::-internal-media-controls-download-button {
	display:none;
}
video::-webkit-media-controls-enclosure {  
    overflow:hidden;  
}  
video::-webkit-media-controls-panel {  
    width: calc(100% + 30px);  
} 

## 文本溢出显示省略号
.word {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}