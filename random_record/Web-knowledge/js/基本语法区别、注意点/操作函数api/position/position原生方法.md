参考https://segmentfault.com/a/1190000002879406

获取元素绝对、相对位置：http://blog.csdn.net/inuyasha1121/article/details/49148171

获取各种宽度高度：http://qiaolevip.iteye.com/blog/2076034

实现表头固定: http://www.html-js.com/article/cssyanjiu-css3shixiangudingbiaogetoubuerwuxushezhidanyuangetddikuandu%204019

# 原生方法

## 要获取当前页面的滚动条纵坐标位置  scrollY  和 scrollTop
var scrollTop = window.scrollY || document.documentElement.scrollTop;

要获取当前页面的滚动条纵坐标位置，用：
document.documentElement.scrollTop;
而不是：
document.body.scrollTop;
documentElement 对应的是 html 标签，而 body 对应的是 body 标签。

在`标准w3c下，document.body.scrollTop恒为0`，需要用document.documentElement.scrollTop来代替;

如果你`想定位鼠标相对于页面的绝对位置`时，你会发现google里面1000篇文章里面有999.99篇会让你使用`event.clientX+document.body.scrollLeft，event.clientY+document.body.scrollTop`，如果你发现你的鼠标定位偏离了你的想象，请不要奇怪，这是再正常不过的事情。

ie5.5之后已经不支持document.body.scrollX对象了。
所以在编程的时候，`请加上这样的判断`
```
if (document.body && document.body.scrollTop && document.body.scrollLeft)
{
    top=document.body.scrollTop;
    left=document.body.scrollleft;    
}
if (document.documentElement && document.documentElement.scrollTop && document.documentElement.scrollLeft)
{
    top=document.documentElement.scrollTop;
    left=document.documentElement.scrollLeft;
}
```
```
由于在不同情况下，document.body.scrollTop与document.documentElement.scrollTop都有可能取不到值，那到底网页的scrollTop值怎么得到呢？
技巧：var sTop=document.body.scrollTop+document.documentElement.scrollTop;
这两个值总会有一个恒为0，所以不用担心会对真正的scrollTop造成影响。
```

## window.pageYOffset和window.scrollY
（IE>=9）建议使用window.pageYOffset来代替window.scrollY，使用 window.pageXOffset 代替 window.scrollX

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollY

返回文档在垂直方向已滚动的像素值。

var y = window.scrollY;
y 是文档从顶部开始滚动过的像素值。
```
// 保证刚好滚动到第二页
if (window.scrollY) {
  window.scroll(0, 0);  // 重置滚动位置为文档的左上角
}

window.scrollByPages(1);
```

如果正在使用相对滚动函数，如 window.scrollBy、window.scrollByLines 或 window.scrollByPages，则`需要使用window.scrollY或者window.pageYOffset来检测文档是否已被滚动了某段距离`。

pageYOffset 属性是 scrollY 属性的别名：

`window.pageYOffset == window.scrollY; // 总是返回 true`

为了跨浏览器兼容，请`使用 window.pageYOffset 代替 window.scrollY`。另外，`旧版本IE（<9）两个属性都不支持`，必须使用其他的非标准属性。完整的兼容性代码如下：
```
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
```
`document.documentElement.scrollTop 和 window.pageYOffset和window.scrollY值一样`

## 相对滚动函数
如 window.scrollBy、window.scrollByLines 或 window.scrollByPages

### window.scrollBy
把内容滚动指定的像素数。
```
scrollBy(xnum,ynum)
xnum	必需。把文档向右滚动的像素数。
ynum	必需。把文档向下滚动的像素数。
```

### window.scrollByLines

DOM规范中并没有规定各浏览器需要实现怎样的滚动页面区域，各浏览器实现了相应的方法，可以使用不同的方式控制页面区域的滚动。这些方法作为HTMLElement类型的扩展存在，所以它能在所有元素上使用。

- `scrollIntoView(alignWithTop) ` 滚动浏览器窗口或容器元素，以便在当前视窗的可见范围看见当前元素。如果alignWithTop为true，或者省略它，窗口会尽可能滚动到自身顶部与元素顶部平齐。-------目前各浏览器均支持

- `scrollIntoViewIfNeeded(alignCenter)` 只在当前元素在视窗的可见范围内`不可见`的情况下，`才滚动浏览器窗口或容器元素`，最终让当前元素可见。如果当前元素在视窗中可见，这个方法不做任何处理。如 果将可选参数alignCenter设置为true，则表示尽量将元素显示在视窗中部（垂直方向）------Safari、Chrome实现了这个方法

- `scrollByLines(lineCount)` 将元素的内容滚动`指定的行数的高度`，lineCount的值可以为正值或是负值。---Safari、Chrome实现了这个方法

- `scrollByPages(pageCount)` 将元素的内容滚动`指定的页面的高度`，具体高度由元素的高度决定。---Safari、Chrome实现了这个方法

 
`scrollIntoView()和scrollIntoVIewIfNeeded()作用的是元素的窗口`，而`scrollByLines()、scrollByPages()影响元素自身`，下面是几个示例：

```
//将页面主体滚动5行
document.body.scrollByLines(5);

//确保当前元素可见
document.getElementByIdx_x(“test”).scrollIntoView();

//确保只在当前元素不可见的情况下才使其可见
document.getElementByIdx_x(“test”).scrollIntoViewIfNeeded();

//将页面主体往回滚1页
doument.body.scrollByPages(-1);

```
`由于只有scrollIntoView被各浏览器均支持，所以这个方法最为常用`

