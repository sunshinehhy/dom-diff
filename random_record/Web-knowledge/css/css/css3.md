http://www.runoob.com/css3/css3-user-interface.html

1. 边框
2. 圆角
3. 背景
4. 渐变
5. 文字效果
6. 字体
7. 2d或者3d转换
8. 过渡
9. 弹性盒子
10. 多媒体查询
11. 动画
12. 多列
13. 用户界面



@keyframes 创建动画

animation-name:规定 @keyframes 动画的名称。

CSS filter 属性用为元素添加可视效果 (例如：模糊与饱和度) 。

box-shadow: h-shadow v-shadow blur spread color inset;
h-shadow	必需的。水平阴影的位置。允许负值
v-shadow	必需的。垂直阴影的位置。允许负值
blur	可选。模糊距离
spread	可选。阴影的大小
color	可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表
inset	可选。从外层的阴影（开始时）改变阴影内侧阴影

text-shadow
text-overflow
text-outline: thickness blur color;

transform

自适应：
1. 弹性模型flex
2. 百分比
3. 媒体查询


```
.div2 {
    width: 300px;
    height: 100px;    
    padding: 60px;
    border: 1px solid red;
    box-sizing: border-box;
}
<div class="div2">菜鸟教程!</div>

```

transition: property duration timing-function delay;
transition-duration	定义过渡效果花费的时间。
transition-delay 指定秒或毫秒数之前要等待切换效果开始

## outline-offset
outline-offset  属性对轮廓进行偏移，并在边框边缘进行绘制。

轮廓在两方面与边框不同：
1. 轮廓不占用空间
2. 轮廓可能是非矩形
```
div
{
border:2px solid black;
outline:2px solid red;
outline-offset:15px;
}
```

## overflow
overflow:scroll; 规定当内容溢出元素框时发生的事情。所有主流浏览器都支持 overflow 属性。
visible	默认值。内容不会被修剪，会呈现在元素框之外。
hidden	内容会被修剪，并且其余内容是不可见的。
scroll	内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
inherit	规定应该从父元素继承 overflow 属性的值。

overflow-scrolling
-webkit-overflow-scrolling 用来控制元素在移动设备上是否使用滚动回弹效果。
auto： 普通滚动，当手指从触摸屏上移开，滚动立即停止
touch：滚动回弹效果，当手指从触摸屏上移开，内容会保持一段时间的滚动效果，继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

-webkit-overflow-scrolling是真的创建了带有硬件加速的系统级控件，所以效率很高。但是这相对是耗更多内存的，最好在产生了非常大面积的overflow时才应用。
需求是需要手动设置滚动高度的，js代码是
el.scrollTop = 500;

## table-layout
fixed  列宽由表格宽度和列宽度设定。
automatic	默认。列宽度由单元格内容设定。
inherit	规定应该从父元素继承 table-layout 属性的值。



## 弹性布局
<https://developer.mozilla.org/en-US/docs/Glossary/Flex>

[Flex布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)<br>
[Flex布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)(内含骰子布局、网格布局、圣杯布局）<br>

display:flex:

<https://developer.mozilla.org/en-US/docs/Web/CSS/display>