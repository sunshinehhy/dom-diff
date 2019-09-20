https://www.imooc.com/code/4523

sizzle受欢迎的原因有以下几点：

1.几乎支持大部分的css，还支持CSS3新的属性，同时又很高效。

一般选择器的匹配模式（包括老版本的jQuery），都是一个顺序的思维方式:

`在需要递进式匹配时，比如$("div a") 这样的匹配时，执行的操纵都是先匹配页面中div然后再匹配它的节点下的a标签，之后返回结果。我们知道CSS的匹配规则是从右边向左筛选，jQuery在Sizzle中延续了这样的算法，先搜寻页面中所有的a标签，在之后的操纵中再往后判定它的父节点（包括父节点以上）是否为div，一层一层往上过滤，最后返回该操纵序列。`

sizzle只能说是大体如此，此外在1.8中引入了编译的概念，大大提高了重复的选择的效率。

**浏览器渲染原理：**

浏览器从下载文档到显示页面的过程是个复杂的过程，这里包含了重绘和重排。各家浏览器引擎的工作原理略有差别，但也有一定规则。

`简单讲，通常在文档初次加载时，浏览器引擎会解析HTML文档来构建DOM树，之后根据DOM元素的几何属性构建一棵用于渲染的树。渲染树的每个节点都有大小和边距等属性，类似于盒子模型（由于隐藏元素不需要显示，渲染树中并不包含DOM树中隐藏的元素）。`

当渲染树构建完成后，浏览器就可以将元素放置到正确的位置了，再根据渲染树节点的样式属性绘制出页面。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成，所以我们知道浏览器最终会将HTML文档（或者说页面）解析成一棵DOM树，如下代码将会翻译成以下的DOM：
```
<div id="text">
  <p>
     <input type="text" />
  </p>
  <div class="aaron">
     <input type="checkbox" name="readme" />
     <input type="checkbox" name="ttt" />
     <input type="checkbox" name="aaa" />
     <p>Sizzle</p>
  </div>
</div>
```
如果想要操作到当中那个checkbox，我们需要有一种表述方式，使得通过这个表达式让浏览器知道我们是想要操作哪个DOM节点。
这个表述方式就是CSS选择器，它是这样表示的：

div > p + .aaron input[type="checkbox"]
表达的意思是：div底下的p的兄弟节点，该节点的class为aaron ，并且其属性type为checkbox。

常见的选择器：
```
#test表示id为test的DOM节点
.aaron 表示class为aaron的DOM节点
input表示节点名为input的DOM节点
div > p表示div底下的p的DOM节点
div + p表示div的兄弟DOM节点p
```
其实最终都是通过浏览器提供的接口实现的，由于低级浏览器并未提供这些高级点的接口，所以才有了Sizzle这个CSS选择器引擎。Sizzle引擎提供的接口跟document.querySelectorAll是一样的，其输入是一串选择器字符串，输出则是一个符合这个选择器规则的DOM节点列表，因此第一步骤是要分析这个输入的选择器。

通过sizzle与高级API获取的结果是一致的：

$('div > div.aaron input[name=ttt]')
document.querySelectorAll(' div > div.aaron input[name=ttt]')  
这个是相对复杂的CSS的组合了，涉及到了几种不同类型的选择器，除去querySelectorAll这种高级API，我们是无法直接获取到对应的节点引用的，因为Sizzle要实现这种查找也是非常复杂的，这里面就要涉及一系列的概念。

1. `拆分选择器，把每一个选择器组成能够处理的最小化单元。`

div.aaron这行代码原生的API不认识，但是div与.aaron都是有API能直接获取到的，所以拆分出后提供后面进行关联匹配筛选等等。这里sizzle就引入了词法分析器与种子合集。

2. Sizzle也是`遵循从右到左开始查找，但是不仅仅是这样`。

浏览器提供的查找接口，基本靠谱的就只有三个：
```
Expr.find = {
      'ID'    : context.getElementById,
      'CLASS' : context.getElementsByClassName,
      'TAG'   : context.getElementsByTagName
}
```
所以我们开始第一查找，从右到左边依次取出最小的单元选择器，通过ID、CLASS.TAG去查找，如果能找到就放到结果集中，这样第一时间定位到了最终的元素必须会存在的合集。

3. `这样只能找出可能存在的合集，但是没有精确到具体的选择器上`，所以还需要一个筛选的过程，这个过程也是最复杂的。

Sizzle从1.8后引入的“编译”的概念，用于提高性能。