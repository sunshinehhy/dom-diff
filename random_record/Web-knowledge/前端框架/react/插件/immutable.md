Immutable 是一个可实现持久数据结构的 JavaScript 库。

Redux 并不在意你如何存储 state，state 可以是普通对象，不可变对象，或者其它类型。

http://facebook.github.io/immutable-js/docs/#/

不可变数据鼓励纯函数(数据输入、数据输出)，并使其能够更简单地应用程序开发，并支持从unctional programming(如惰性评估)中获得的技术。

虽然它旨在将这些功能强大的功能概念引入JavaScript，但它呈现了JavaScript工程师所熟悉的面向对象的API，并与数组、Map和Set紧密地映射，转换成简单的JavaScript类型是很容易和有效的。

如何阅读这些文档?
为了更好地解释 Immutable.js API期望并产生什么类型的值，这种文档是用静态类型的JavaScript语言(比如流或打字稿)来呈现的。您不需要使用这些类型检查工具来使用Immutable.js。但是对其语法的熟悉将有助于您对这个API有更深入的了解。

## api

远不止这些，immutableJS提供了强大的api自己去看吧。由于是不可变的，可以放心的对对象进行任意操作。在React开发中，`频繁操作state对象或是store`，配合immutableJS快、安全、方便。

可变的好处是节省内存或是利用可变性做一些事情。
有7种不可变的数据结构，功能强大；操作复杂性能提升好多。
immutableJS ＋ 原生Javascript等于真正的函数式编程。
