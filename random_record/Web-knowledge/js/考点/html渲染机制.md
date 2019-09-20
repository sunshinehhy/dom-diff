在渲染树构建完成后，

- 浏览器会对这些元素进行定位和布局，这一步也叫做reflow或者layout。

- 浏览器绘制这些元素的样式，颜色，背景，大小及边框等，这一步也叫做repaint。

- 然后浏览器会将各层的信息发送给GPU，GPU会将各层合成；显示在屏幕上。

reflow => repaint => composite

reflow和repaint都是耗费浏览器性能的操作,为了仅发生composite，我们做动画的css property必须满足以下三个条件：
- 不影响文档流。
- 不依赖文档流。
- 不会造成重绘。

满足以上以上条件的css property只有transform和opacity

总结：使用transform 和 will-change能开启GPU。