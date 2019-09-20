https://www.imooc.com/code/4448

when也是一个非常有用的方法，`常用于合并多个异步操作`：
```
$.when(d1,d2,d3,d4......).done(function(v1, v2,v3...) {
    //等待所有异步加载完毕后执行
}); 
```
用法很简单，把所有的异步丢到when中，when会处理所有的结果。当然d1,d2,d3都是有规范的，都是通过Deferred产生的。

具体的用法见右侧代码编辑器中的代码。

如果向 jQuery.when() `传入延迟对象，那么会返回它的 Promise 对象(延迟方法的一个子集)`。可以继续绑定 Promise 对象的其它方法，例如， defered.then 。当延迟对象已经被解决（resolved）或被拒绝(rejected）（通常是由创建延迟对象的最初代码执行的），那么就会调用适当的回调函数。例如，由 jQuery.ajax() 返回的 jqXHR 对象是一个延迟对象，可以向下面这样使用：
```
$.when($.ajax("test.aspx")).then(function(data, textStatus, jqXHR) {
  alert(jqXHR.status); // alerts 200
});
```
我们通过模拟的代码，可以很简单的分析整个流程：

  1. 传递了多个异步对象，然后遍历每个异步对象给每一个对象绑定done、fail、progess方法，无非就是监听每一个异步的状态（成功，失败），如果是完成了自然会激活done方法。

  2. updateFunc是监听方法，通过`判断异步对象执行的次数来决定是不是已经完成了所有的处理或者是失败处理`

  3. 因为when也要形成异步操作，比如when().done()，所以内部必须新建一个jQuery.Deferred()对象，用来给后面链式调用。

  4. 此刻监听所有异步对象(d1,d2...)的updateFunc的处理都完毕了，会给一个正确的通知给when后面的done方法，因为done是通过第三步jQuery.Deferred()创建的，所以此时就需要发送消息到这个上面，即：

deferred.resolveWith(contexts, values);
  5. 内部的jQuery.Deferred()因为外部绑定了when().done(),所以done自然就收到了updateFunc给的消息了，可以继续之后的操作了。

所以整个执行流程就是这样简单，我们通过右边最简单的模拟出这个效果。

`整个when的设计其实最终还是依赖了jQuery.Deferred内部处理的机制，一层套一层。`当然jQuery的异步设计逻辑也确实很复杂，需要思维跳转很活跃，某一个时间在这里，下一个片段又要另一个地方去了，不是按照同步代码这样执行的。需要大家有一定的空间跳跃力了。