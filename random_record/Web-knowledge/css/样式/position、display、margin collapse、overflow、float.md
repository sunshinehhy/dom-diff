display 属性规定元素应该生成的框的类型。 block 象块类型元素一样显示，none 缺省值。象行内元素类型一样显示， inline-block 象行内元素一样显示，但其内容象块类型元素一样显示，list-item 象块类型元素一样显示，并添加样式列表标记。

"position:absolute" 和 "position:fixed" 优先级最高，有它存在的时候，浮动不起作用。

浮动元素会生成一个块级框，而不论它本身是何种元素。

浮动或绝对定位的元素，只能是块元素或表格。

如果 'display' 的值为 'none'，那么 'position' 和 'float' 不起作用。在这种情况下，元素不产生框。因此浮动和定位无效。

如果 'position' 的值是 'absolute' 或 'fixed'，框就是绝对定位的，'float' 计算后的值应该是 'none'。框的位置将由 'top'，'right'，'bottom' 和 'left' 属性和该框的包含块确定。

两个或多个毗邻的普通流中的块元素垂直方向上的 margin 会折叠。

浮动元素、inline-block 元素、绝对定位元素的 margin 不会和垂直方向上其他元素的 margin 折叠。

创建了块级格式化上下文的元素，不和它的子元素发生 margin 折叠。

元素自身的 margin-bottom 和 margin-top 相邻时也会折叠，自身 margin-bottom 和 margin-top 相邻，只能是自身内容为空，垂直方向上 border、padding 为 0。


## 绝对定位和相对定位的区别
 相对定位：是相对于该块元素在文档流中的位置的，相对定位的元素是会占据文档流空间的，
        我们元素的position属性的值默认为static 就是没有定位，元素出现在正常的文档流中，这个时候你给这个元素设置的left,right,bottom,top这些偏移属性都是没有效果的，不会生效，比如你设置一个距离左边距偏移100px的声明：left:100px 那么这条声明不会起到任何效果。还有z-index属性在这时也不会生效。
         我们平时如果不给某元素一个position属性的声明，那么它默认的就是我上述的这种情况，不过因为有了浮动，所以通常情况下我们还真不需要给元素设置position属性！

绝对定位：是相对于设置了除static定位之外的定位（比如position:relative、position:absolute以及position:fixed）的第一个祖先元素。
	绝对定位是不会占据文档流空间的。
        如果所有的祖先元素都没有以上三种定位中的其中一种定位，那么它就会相对于文档body来定位（并非窗口,相对于窗口定位的是fixed）


设置了position: fixed;，才能设置高度和宽度
1、static（静态定位）：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
2、relative（相对定位）：生成相对定位的元素，通过top,bottom,left,right的设置相对于其正常（原先本身）位置进行定位。可通过z-index进行层次分级。
relative定位的层总是相对于其最近的父元素，无论其父元素是何种定位方式
3、absolute（绝对定位）：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。
4、fixed（固定定位）：生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。
https://www.cnblogs.com/theWayToAce/p/5264436.html