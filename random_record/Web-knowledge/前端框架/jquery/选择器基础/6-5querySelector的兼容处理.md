上一小节提到了querySelectorAll提供一个上下文范围，但是浏览器无视了这个上下文，默认还是类似document的处理。

那么针对这种情况如何兼容？

Andrew Dupont提出了一个解决方案，原理很简单：

`context.querySelector在上下文调用的context元素上指定一个id，通过这个限制范围，这个方法用的非常广泛。`

我们看来自jQuery2.1.1的代码：

先看看jQuery最终的实现context.querySelectorAll用的上下文调用：
```
$('#test2').click(function() {
 //代码右图
}
```
代码可见newContext可能是document || 提供的一个上下文。

如： var context = document.querySelector('.aaron'); 此时的上下文即是<div class= "aaron">节点。

context.querySelectorAll('.aaron span') 在文档内找全部符合选择器描述的节点不包括Element本身。

最关键的地方其实就是通过给<div class= "aaron">加一个id用来限制范围，所以处理就变成了：
```
<div class= "aaron" id="[id='sizzle-1405486760710']">
context.querySelectorAll('[id='sizzle-1405486760710'] .aaron span')
```
注意finally总是执行context.removeAttribute("id")，意味着我们在之前的处理强制加了一个id，反推hack的手法，selectors前面指定上下文的的id，限制匹配的范围。

**所以整个处理方式，我们可以总结几点：**

1. 关键是给context设置一个id，所以上下文content，就会存在这个id限制范围。

2. 拼接出查询的选择器，附上这个ID前缀

newSelector: "[id='sizzle-1405486760710'] div[class='text']"
3. 查询

newContext.querySelectorAll( newSelector )
4. 因为强制加了ID，所以需要删除

context.removeAttribute("id");
这样就达到目的范围限制context.querySelectorAll了。

querySelectorAll在选择器上存在的问题，具体我是看jQuery的源码相关处理，基本都是IE8上的问题。`jQuery对兼容的判断，都是采用的功能判断直接特性检测，伪造一个真实的环境测试支持度，针对querySelectorAll选取存在的问题之后分析。`