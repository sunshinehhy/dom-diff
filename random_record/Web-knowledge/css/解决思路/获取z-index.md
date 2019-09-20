# z-index

参考博客:<https://www.jianshu.com/p/cdd90d28380b>
更好的博客:<https://www.cnblogs.com/ForEvErNoME/p/3373641.html>

## 概念

z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。

## 层级关系的比较

1. 对于同级元素，默认(或position:static)情况下文档流后面的元素会覆盖前面的。

2. 对于同级元素，position **不为static** 且 **z-index存在** 的情况下z-index大的元素会覆盖z-index小的元素，即z-index越大优先级越高。

3. IE6/7下position不为static，且z-index不存在时z-index为0，除此之外的浏览器z-index默认为auto。

4. z-index为auto的元素不参与层级关系的比较，**由向上遍历至此且z-index不为auto的元素来参与比较**。

## 定位规则

1. 如果不对节点设定position属性，（那么position就都为默认的static),位于文档流后面的节点会遮盖前面的节点。

2. 如果将position设为static, 那么位于文档流后面的节点依然会遮盖前面的节点，故postion:static不影响节点的遮盖关系。

3. 如果postion设为relative、absolute或fixed， 这样的节点会覆盖没有设置position属性或者属性值为static的节点。

4. 在没有z-index属性的干扰下，如果A和B都不设定position, 在文档流中B在A的后面，那么B会覆盖A; A具有子节点A-1, 且设置A-1的position为relative,那么A-1又会覆盖B。

## 默认值规则

如果所有节点都定义了 position:relative——

- z-index 为 0 的节点与没有定义 z-index 在同一层级内没有高低之分;
- 但 z-index 大于等于 1 的节点会遮盖没有定义 z-index 的节点;
- z-index 的值为负数的节点将被没有定义 z-index 的节点覆盖。

## 从父规则

如果A,B节点都定义了position: relative ——

- A节点的z-index比B节点大，那么A的子节点必定覆盖在B的子节点前面。
- A节点的z-index和B节点一样大，但因为顺序规则，文档流中B在A的后面，那么B就会覆盖在A上，就算A的子节点z-index值比B的子节点z-index值大，B的子节点还是会覆盖在A的子节点前面。

很多人将 z-index 设得很大, 9999 什么的都出来了, 如果不考虑父节点的影响, 设得再大也没用, 那是无法逾越的层级。