querySelector和querySelectorAll是W3C提供的 `新的查询接口`。

目前几乎主流浏览器均支持了他们，包括 IE8(含) 以上版本、 Firefox、 Chrome、Safari、Opera。

`万能的sizzle在高版本的浏览器中复杂的选择器尽量走querySelectorAll，前提是这个匹配的节点没有兼容问题。`

从IE8开始虽然支持querySelectorAll的API，但是会有各式各样的BUG，所以sizzle拿rbuggyQSA用来记录这个BUG问题。
```
if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {    
    //newContext.querySelectorAll( newSelector )
}
```
zepto的选择器则更直接：
```
zepto.qsa = function(element, selector) {
    return element.querySelectorAll(selector)
}
```
`jQuery的选择器当然都是优先选择querySelectorAll，否则的话就走sizzle的逻辑`，当然IE6 7是必须的，IE8虽然实现了querySelectorAll，但是也有一些问题，具体我们后面分析。

关于querySelectorAll接口定义：
```
partial interface Document {
  Element?  querySelector(DOMString selectors);
  NodeList  querySelectorAll(DOMString selectors);
};
partial interface DocumentFragment {
  Element?  querySelector(DOMString selectors);
  NodeList  querySelectorAll(DOMString selectors);
};
partial interface Element {
  Element?  querySelector(DOMString selectors);
  NodeList  querySelectorAll(DOMString selectors);
};
```
`从接口定义可以看到Document、DocumentFragment、Element都实现了NodeSelector接口。即这三种类型的元素都拥有者两个方法。`

querySelector和querySelectorAll的参数须是符合 css selector 的字符串。

`不同的是querySelector返回的是一个对象，querySelectorAll返回的一个集合(NodeList)。`

所以选择querySelectorAll更符合jQuery这个合集对象的习惯。

## document.querySelectorAll 与 element.querySelectorAll区别？

`当调用上下文是document的时候，没有什么问题，各浏览器的实现基本一致，如果调用的上下文是element，dom Node的时候，浏览器的实现有点不同。`

具体就是表现在：

element.querySelectorAll 在文档内找全部符合选择器描述的节点包括Element本身
 对照一组代码：
```
//通过一个上下文查找
var aaRoot = document.getElementById('aaronId');
var element = aaRoot.querySelector('.aaron span');
//直接查找
var elementList = document.querySelectorAll('.aaron span');
```
问题出在aaRoot.querySelector尽然还有返回值！因为上下文查找的范围包含了自身了。

`选择上下文是在aaRoot里面，选择器是.aaron就父节点，理论是找不到对应的节点的。`

所以逻辑上是不合理的，因为根本找不到，但是结果跟document调用如出一辙，所以此时node ele类似document了。

可能的查找机制是这样的：

`首先在document的范围内进行查找所有满足选择器条件的元素，在上面这段代码中，我们的选择器是.aaron span，就是所有的直接父元素类名为aaron的元素。然后，再看哪些元素是调用querySelector/querySelectorAll的元素的子元素，这些元素将会被返回。这也就说明了为什么element会一同返回。`