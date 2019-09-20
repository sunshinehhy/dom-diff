https://www.imooc.com/code/4442

用下面的例子分析（见右侧代码编辑器）：
```
var defer = $.Deferred();
defer.resolve(5);
defer.done(function(value) {})
var filtered = defer.then(function(value) {
  return value * 2;
});
filtered.done(function(value) {});
```
这里有几个关键的问题：

1、defer延时对象通过resolved触发done成功回调，调用在添加done之前，那么靠什么延时处理？

2、为什么defer.then对象返回的给filtered.done的数据可以类似管道风格的顺序叠加给后面的done处理？

一般来说，javascript要实现异步的收集，就需要“等待”，比如defer.resolve(5)虽然触发了，但是done的处理还没添加，我们必须要等待done、then等方法先添加了后才能执行了resolve，那么常规的的用法就是在resolve内部用setTimeout 0，image.onerror行成一个异步的等待操作处理。

但是jQuery很巧妙的绕过了这个收集方式，

`defer.resolve(5)方法实际就是触发了callback回到函数的fireWith方法，这样可以接受一个上下文deferred与参数5`
```
deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
```
`之前 done | fail | progress方法都是通过jQuery.Callbacks("once memory") 或 jQuery.Callbacks("memory")生成的。`

实际上在Callback源码fire方法有一句 memory = options.memory && data;`这样就很巧妙的缓存当前参数5的值，提供给下一个使用，这个就是then，pipe链式数据的一个基础了，此刻的操作，我们把memory保存了这个数据的值。`

重点来了，下一个defer.done的操作也是走的add的处理，把done的回调函数加入到list队列中的之后，接着就会触发。
```
 // With memory, if we're not firing then
 // we should call right away
} else if (memory) {
  firingStart = start;
  fire(memory);
}
```
因为memory在上一个resolve操作的时候，缓存了5了，所以memory的判断显示是为真的，所以立刻就触发了fire(memory)的代码了，`所以就算触发的循序与添加的循序不一致，也不会导致错误`。 而且jquery很巧妙的避免了异步收集的问题，这样处理更可靠了。`可见回调函数模块就是为Deferred模块量身定做的了`。

第二个问题，是关于then，pipe管道风格的处理，这样也是一个很复杂的设计，在后面一章就提到了。