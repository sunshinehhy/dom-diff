https://blog.csdn.net/u010046318/article/details/75948835

https://blog.csdn.net/u010046318/article/details/75948835

## jQuery回调对象
$.Callbacks()模块的开发目的是为了给内部$.ajax() 和 $.Deferred()模块提供统一的基本功能组件。它可以用来作为`类似基础定义的新组件的功能`。
jQuery.Callbacks是jquery在1.7版本之后加入的，是从1.6版中的_Deferred对象中抽离的，`主要用来进行函数队列的add、remove、fire、lock等操作`，并提供once、memory、unique、stopOnFalse四个option进行一些特殊的控制。
这个函数`常见的应用场景是事件触发机制`，也就是设计模式中的观察者模式的`发布、订阅机制`，目前Callbacks对象用于queue、ajax、Deferred对象中，本小节主要是一些简单的例子去理解的使用。

☑  once: 确保这个回调列表只执行（ .fire() ）一次(像一个递延 Deferred)。

☑  memory: 保持以前的值，`将添加到这个列表的后面的最新的值立即执行调用任何回调` (像一个递延 Deferred)。

☑  unique: 确保一次只能添加一个回调(所以在列表中没有重复的回调)。

☑  stopOnFalse: 当一个回调返回false 时中断调用。

## jQuery回调模块结构
整个$.Callbacks()是一个工厂模式，使用函数调用（非new，它不是一个类）创建对象，它有一个可选参数flag用来设置回调函数的行为，对外的接口也就是self得返回。

jQuery.Callbacks函数主要是返回一个回调对象，这个回调对象通过一些方法来管理回调函数。

主要是通过将函数`加入到数组列表中`的方式，然后`一个个去执行从而达到管理函数`的目的。 

1. once               //只执行一遍函数，不会重复执行
2. memory             //会将所有add进函数列表的函数执行
3. unique             //不允许列表中有相同的函数，一个函数只能添加一次
4. stopOnFalse        //对于返回值为false的函数，执行之后停止对后面函数的执行

我的理解是：`为了减少内存的占用`。因为Callbacks函数最终是要返回一个回调对象的，而回调对象中有管理函数的一些方法，如果把这些方法直接写到回调对象中，也是可以的，但是这就意味着每个回调对象都会有一份自己的方法，只是这些方法都是同名的，这就导致内存的浪费。而把add和fire定义成两个私有的变量，不管调用多少次jQuery.Callbacks方法，返回的回调对象中的方法都会去调Callbacks函数中的私有方法，并且指向的是相同的内存地址。

add： 将fn加到list数组中
fire：将list数组中所有函数执行

源码分析
add函数中，将函数fn Push到list数组里，`同时会判断unique和memory两个参数`，如果unique参数为真，那么不会将相同的函数都push到数组里；如果memory为真，会add之后再调一次fire函数。

`fire函数中，将数组中所有的函数进行执行，同时会判断once和stopOnFalse两个参数`。如果once为真，只会将所有函数执行一遍；如果stopOnFalse为真，那么对于返回值为false的函数，执行之后不会再对后面的函数执行。

## 我的理解
jQuery.Callbacks 里面返回self对象，也是使用了闭包的方式