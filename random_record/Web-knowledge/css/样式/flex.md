Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

.box{
  display: flex;
}
弹性盒子由弹性容器(Flex container)和弹性子元素(Flex item)组成。
弹性容器通过设置 display 属性的值为 flex 或 inline-flex将其定义为弹性容器。
弹性容器内包含了一个或多个弹性子元素。
flex-direction 顺序指定了弹性子元素在父容器中的位置。

内容对齐（justify-content）属性应用在弹性容器上，把弹性项沿着弹性容器的主轴线（main axis）对齐。
justify-content: flex-start | flex-end | center | space-between | space-around

align-items 设置或检索弹性盒子元素在侧轴（纵轴）方向上的对齐方式
align-items: flex-start | flex-end | center | baseline | stretch

flex-wrap 属性用于指定弹性盒子的子元素换行方式。
flex-wrap: nowrap|wrap|wrap-reverse|initial|inherit;

align-content 属性用于修改 flex-wrap 属性的行为。类似于 align-items, 但它不是设置弹性子元素的对齐，而是设置各个行的对齐。
align-content: flex-start | flex-end | center | space-between | space-around | stretch

order: 
<integer>：用整数值来定义排列顺序，数值小的排在前面。可以为负值。
order 属性设置弹性容器内弹性子元素的属性

align-self
align-self 属性用于设置弹性元素自身在侧轴（纵轴）方向上的对齐方式。

## -webkit-flex
https://www.cnblogs.com/wangjiajun/p/3994263.html