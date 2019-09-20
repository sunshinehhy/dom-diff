 `repaint就是重绘，reflow就是回流`

  严重性：

   在性能优先的前提下，`reflow的性能消耗要比repaint的大`。

  体现：

  `repaint是某个dom元素进行重绘，reflow是整个页面进行重排`，也就是对页面所有的dom元素渲染。

  ## 如何触发reflow和repaint

  repaint的触发：

  1）不涉及任何dom元素的排版问题的变动为repaint，`例如元素的color、text-align等改变`。

  2）color的修改，text-align的修改，a：hover也会造成重绘，伪类引起的颜色等变化不会导致页面的回流，仅仅会触发重绘。

 ## reflow的触发：

 1）width、height、border、margin、padding的修改

 2）通过hover造成元素表现的改动，如`display:none会导致回流`

 3）appendChild等dom元素操作。

 4）font类style 的修改。

 5)background的修改，现在经过浏览器厂家的优化，部分background的修改只会触发repaint。

## 如何尽量避免回流reflow：

a、尽可能`在dom末稍通过修改class来修改元素的style属性`，尽可能减少受影响的dom元素。

b、`避免设置多项内联样式，使用常用的class方式进行设置样式，以避免设置样式时访问dom的低效率。`

c、`设置动画元素position属性为fixed或absolute`：由于当前元素从dom流中独立出来，因此受影响的只有当前元素。

d、牺牲平滑度满足性能：动画精度太强，会造成更多的repaint/reflow，牺牲精度，能满足性能的损耗，获取性能和平滑度的平衡。

f、`避免使用table进行布局`，table每个元素的大小以及内容的改变，都会导致整个table进行重新计算，造成大幅度的repaint或者reflow。改用div则可以针对性的repaint和避免不必要的reflow。

g、避免在css中使用运算式