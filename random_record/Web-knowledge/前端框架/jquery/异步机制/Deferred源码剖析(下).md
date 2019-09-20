https://www.imooc.com/code/3773

在上一节中构建了deferred对象，实现了done/fail/process和resolve/reject/notify等方法，但是最重要的then,pipe管道接口我们还没有实现，我们考虑下：
```
var dfd = $.Deferred()
dfd.then(function(preVale) {
  return 2 * preVale   //4
}).then(function(preVale) {
  return 3 * preVale   //12
})
dfd.resolve(2)
```
`then就是pipe，我们可以想象是一个管道，可以对回调模式使用瀑布模型。`如案例所示，`下一个回调都能取到上一个回调的值`，这样一直可以叠加往后传递。

不难看出管道的风格就是链式的操作，每一个链上的结果都会反馈后下一个链，那么这个链式是不是传统的返回自身这个对象this呢？

常规的办法通过数组处理：右侧代码所示。
```
function aDeferred(）{
   //代码右侧代码
}
```
这样的结构当然是很简陋的，这里我们最终有一个本质的问题没有解决，jQuery中的then的返回还有可能是另一个新的异步模型对象,如ajax，因此还能实现done，fail,always,then等方法。所以采用简陋的数组的方式保存状态是很肤浅的了。

这时候jQuery采取了对象保存处理：

`我们可以把每一次的then操作，当做是创建一个新的deferred对象，那么每一个对象都够保存自己的状态与各自的处理方法。通过一个办法把所有的对象操作都串联起来，这就是then或者pipe管道设计的核心思路了。`
看jQuery的then结构：
```
then: function( /* fnDone, fnFail, fnProgress */ ) {
         var fns = arguments;
         return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(i, tuple) {
                        deferred[tuple[1]](function() {
                            // deferred[ done | fail | progress ]                   
                        });
               });
         }).promise()
```
其实在`内部创建了一个新的Deferred对象`，不过这里的不同是通过传递一个回调函数，参数是newDefer，其实`Deferred内部就是为了改变下上下文this为deferred`，然后传递deferred给这个回调函数了，所以newDefer就指向内部的deferred对象了。

那么对象之间如何关联？
```
jQuery.each(tuples, function(i, tuple) {
  //取出参数
  var fn = jQuery.isFunction(fns[i]) && fns[i];
  // deferred[ done | fail | progress ] for forwarding actions to newDefer
  // 添加done fail progress的处理方法
  // 针对延时对象直接做了处理
  deferred[tuple[1]](function() {
    var returned = fn && fn.apply(this, arguments);
    if (returned && jQuery.isFunction(returned.promise)) {
      returned.promise()
        .done(newDefer.resolve)
        .fail(newDefer.reject)
        .progress(newDefer.notify);
    } else {
      newDefer[tuple[0] + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
    }
});
```
把then的方法通过：
```
deferred.done
deferred.fail
deferred.progress
```
加入到上一个对象的各自的执行队列中保存了。这样就实现了不同对象之间的关联调用。

同样如果then返回的是一个promise对象（ajax）的时候：
```
if (returned && jQuery.isFunction(returned.promise)) {
  returned.promise()
    .done(newDefer.resolve)
    .fail(newDefer.reject)
    .progress(newDefer.notify);
```
也可以直接处理了。

## 实例
```
  //使用$.Deferred
  var dfd = $.Deferred()
  dfd.then(function(preVale) {
    return 2 * preVale; 
  }).then(function(preVale) {
    return 3 * preVale 
  }).then(function(preVale) {
    $('body').append('<li>使用$.Deferred代码结果:'+ preVale +'</li>')
  })

  dfd.resolve(2)


  //简单模拟
  function aDeferred() {
    var arr = [];
    return {
      then: function(fn) {
        arr.push(fn)
        return this;
      },
      resolve: function(args) {
        var returned;
        arr.forEach(function(fn, i) {
          var o = returned || args;
          returned = fn(o)
        })
      }
    }
  }


$("button").on("click", function() {
  var d = aDeferred();
  d.then(function(preVale) {
    return 2 * preVale //4
  }).then(function(preVale) {
    return 3 * preVale //4
  }).then(function(preVale) {
    $('body').append('<li>模拟代码结果:'+ preVale +'</li>')
  });
  d.resolve(2)
});
使用$.Deferred代码结果:12
模拟代码结果:12
```