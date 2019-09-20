如何解析复杂的选择器？

div > div.Aaron input[name=ttt]

组合后的意思大概就是：

1. 选择所有div节点

2. 选择div的子元素之后的所有 <div>并且class="Aaron" 的所有元素

3. 之后选择 div.Aaron元素内部的所有input并且属性[name=ttt]的元素

就针对这个简单的结构，描述出整个解析的流程

我们用组合语句，在高级浏览器上jquery都是通过querySelectorAll处理的，所以我们讨论的都是在低版本上的实现，伪类选择器，XML要放到最后，本文暂不涉及这方便的处理。

需要用到的几个知识点:

1: CSS选择器的位置关系
2: CSS的浏览器实现的基本接口
3: CSS选择器从右到左扫描匹配

CSS选择器的位置关系

其实不难发现，一个节点跟另一个节点有以下几种关系：

祖宗和后代  
父亲和儿子
临近兄弟
普通兄弟
在CSS选择器里边分别是用：空格、>、+、~。

（其实还有一种关系：div.Aaron，中间没有空格表示了选取一个class为Aaron的div节点）
```
<div id="grandfather">
  <div id="father">
    <div id="child1"></div>
    <div id="child2"></div>
    <div id="child3"></div>
  </div>
</div>
```
爷爷grandfather与孙子child1属于祖宗与后代关系（空格表达）

父亲father与儿子child1属于父子关系，也算是祖先与后代关系（>表达）

哥哥child1与弟弟child2属于临近兄弟关系（+表达）

哥哥child1与弟弟child2，弟弟child3都属于普通兄弟关系（~表达）

在Sizzle里有一个对象是记录跟选择器相关的属性以及操作：Expr。它有以下属性：

```
relative = {
  ">": { dir: "parentNode", first: true },
  " ": { dir: "parentNode" },
  "+": { dir: "previousSibling", first: true },
  "~": { dir: "previousSibling" }
}
```
所以在Expr.relative里边定义了一个first属性，用来标识两个节点的“紧密”程度，例如父子关系和临近兄弟关系就是紧密的。在创建位置匹配器时，会根据first属性来匹配合适的节点

CSS的浏览器实现的基本接口

除去querySelector,querySelectorAll

HTML文档一共有这么四个API：

1、getElementById，上下文只能是HTML文档。

2、getElementsByName，上下文只能是HTML文档。

3、getElementsByTagName，上下文可以是HTML文档，XML文档及元素节点。

4、getElementsByClassName，上下文可以是HTML文档及元素节点。IE8还没有支持。

所以要兼容的话sizzle最终只会有三种完全靠谱的可用

```
Expr.find = {
      'ID'    : context.getElementById,
      'CLASS' : context.getElementsByClassName,
      'TAG'   : context.getElementsByTagName
}
```

所以最终总的原理：

1、支持高级API 直接调用querySelectorAll

2、降级通过sizzle处理，那么内部会有一个规则把选择器分组groups，然后通过`从右边往左边查找`，加入编译函数的方式节约重复查找的性能问题