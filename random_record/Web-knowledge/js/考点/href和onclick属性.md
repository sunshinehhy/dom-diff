- 链接的 onclick 事件被先执行，其次是 href 属性下的动作（页面跳转，或 javascript 伪链接）；
- 假设链接中同时存在 href 与 onclick，如果想让 href 属性下的动作不执行，onclick 必须得到一个 false 的返回值；
- 如果页面过长有滚动条，且希望通过链接的 onclick 事件执行操作。应将它的 href 属性设为
  javascript:void(0);，而不要是 #，这可以防止不必要的页面跳动；
- 如果在链接的 href 属性中调用一个有返回值的函数，当前页面的内容将被此函数的返回值代替； 在按住 Shift 键的情况下会有所区别。
- 今天我遇到的问题，在 IE6.0 里以 href 的形式访问不到 parentNode。
- 尽量不要用 javascript:协议做为 A 的 href 属性，这样不仅会导致不必要的触发 window.onbeforeunload 事件，在 IE 里面更会使 gif 动画图片停止播放。

在 Javascript 中 void 是一个操作符，该操作符指定要计算一个表达式但是不返回值。
void 操作符用法格式如下：

1. javascript:void (expression)
2. javascript:void expression
   expression 是一个要计算的 Javascript 标准的表达式。表达式外侧的圆括号是选的，但是写上去是一个好习惯。 (实现版本 Navigator 3.0) 你可以使用 void 操作符指定超级链接。表达式会被计算但是不会在当前文档处装入任何内容。

下面的代码创建了一个超级链接，当用户点击以后不会发生任何事。当用户链接时，void(0) 计算为 0，但 Javascript 上没有任何效果。

<A HREF="javascript:void(0)">单此处什么也不会发生</A>
1
下面的代码创建了一个超级链接，用户单击时会提交表单。

<A HREF="javascript:void(document.form.submit())"> 
1
单此处提交表单

下面代码则执行了 subgo()函数，

<a href="javascript:void(0)" onclick="subgo()">点我</a>
1
在这里，javascript:void(0),没启实质上的作用，它仅仅是一个死链接，执行的函数是 subgo()。

<a href="#" onclick="subgo()">点我</a>与<a href="javascript:void(0)" onclick="subgo()">点我</a>区别。
1
实际上 #包含了一个位置信息默认的锚是#top 也就是网页的上端 ，而 javascript:void(0) 仅仅表示一个死链接，没有任何信息。所以调用脚本的时候最好用 void(0)

href 一般是指向一个 URL 地址，也可以调用 javascript ,如 href=”javascript:xxx();”,文档中推荐这样写：xx,但是这种方法在复杂环境有时会产生奇怪的问题，尽量不要用 javascript:协议做为 A 的 href 属性，这样不仅会导致不必要的触发 window.onbeforeunload 事件，在 IE 里面更会使 gif 动画图片停止播放。

链接的 onclick 事件被先执行，其次是 href 属性下的动作（页面跳转，或 javascript 伪链接），如果不想让 href 属性下的动作执行，onclick 需要要返回 false ，一般是这样写 onclick=”xxx();return false;”.
