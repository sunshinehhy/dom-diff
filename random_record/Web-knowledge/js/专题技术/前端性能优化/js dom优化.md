JS对DOM的操作优化法则： https://www.cnblogs.com/nightstarsky/p/5853978.html

高性能js-DOM优化：https://www.cnblogs.com/wz0107/p/4947027.html

JavaScript性能优化之小知识总结:http://www.jb51.net/article/75186.htm

- 如果文档中存在现成的样板节点，应该是用cloneNode()方法，因为使用createElement()方法之后，你需要设置多次元素的属性，使用cloneNode()则可以减少属性的设置次数——同样如果需要创建很多元素，应该先准备一个样板节点。
- 尽量少使用eval函数
- 展开循环:当循环次数是确定的，消除循环并使用多次函数调用往往会更快。
- 批量修改DOM:当批量修改DOM的时候，若用传统的方法，每次都会发生重排，但可以通过`以下步骤减少重排`。

1. 元素脱离文档。

2. 改变元素。

3. 元素添加会文档。

怎么让元素脱离文档呢？有3种方法

1. 先隐藏元素，修改完再显示。

2. 使用文档碎片。(document fragment)
使用DocumentFragment优化多次append
一旦需要更新DOM,请考虑使用文档碎片来构建DOM结构，然后再将其添加到现存的文档中。
3. 先创建一个文档元素的备份，修改备份，再添加会文档中

- 使用一次innerHTML赋值代替构建dom元素
对于大的DOM更改，使用innerHTML要比使用标准的DOM方法创建同样的DOM结构快得多。

- 通过模板元素clone，替代createElement

- 使用firstChild和nextSibling代替childNodes遍历dom元素

- 使用事件代理:对于内容动态增加并且子节点都需要相同的事件处理函数的情况，可以把事件注册`提到父节点上`，这样就不需要为每个子节点注册事件监听了。

- 删除DOM节点:删除dom节点之前,一定要删除注册在该节点上的事件,不管是用observe方式还是用attachEvent方式注册的事件,否则将会产生无法回收的内存。

- 重复使用的调用结果，事先保存到局部变量

- 元素节点的获取

一般用childnodes，但这个效率低，还或获得文字节点，这些我们一般用不到，还要写代码删去。麻烦。。。

建议用children属性，直接获得nodelist的元素节点，效率也高。IE6都支持啊.

- 选择器API

超好用的选择器api,document.querySelectorAll('#a .a');

- 尽可能减少重排和重绘

- 优化循环

- 不要使用Function构造器:不要给setTimeout或者setInterval传递字符串参数

- 缩短否定检测

- 避免全局查找

- 字符串连接: 如果要连接多个字符串，应该少使用+=

- 避免with语句: with语句会创建自己的作用域，因此会增加其中执行的代码的作用域链的长度，由于额外的作用域链的查找，在with语句中执行的代码肯定会比外面执行的代码要慢，在能不使用with语句的时候尽量不要使用with语句。

- 数字转换成字符串
般最好用'' + 1来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：

('' +) > String() > .toString() > new String()

- 浮点数转换成整型
很多人喜欢使用parseInt()，其实parseInt()是用于将字符串转换成数字，而不是浮点数和整型之间的转换，我们应该使用Math.floor()或者Math.round()
