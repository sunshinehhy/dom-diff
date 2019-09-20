https://www.imooc.com/code/3774

Deferred对接口的设计别出心裁，不是常规的直接定义的，我们可以看tuples这个数组的定义。

Deferred自身则围绕这三组数据进行更高层次的抽象

  ☑ 触发回调函数列表执行(函数名)

  ☑ 添加回调函数（函数名）

  ☑ 回调函数列表（jQuery.Callbacks对象）

  ☑ Deferred最终状态（第三组数据除外）
```
var tuples = [
  // action, add listener, listener list, final state
  ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
  ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
  ["notify", "progress", jQuery.Callbacks("memory")]
]
```
这里抽象出2组阵营：

1组：回调方法/事件订阅 
```
done、fail、progress
```
2组：通知方法/事件发布
```    
resolve、reject、notify、resolveWith、rejectWith、notifyWith
```
Tuples元素集，其实是把相同有共同特性的代码的给合并成一种结构，然后来一次处理。
```
jQuery.each(tuples, function(i, tuple) {
  //代码请看右边代码区域
})
```
对于Tuples的3条数据集是分2部分处理的：

**第一部分将回调函数存入**
```
promise[ tuple[1] ] = list.add;
```
其实就是给promise赋予3个回调函数。
```
promise.done = $.Callbacks("once memory").add
promise.fail = $.Callbacks("once memory").add
promise.progressl = $.Callbacks("memory").add
```
`如果存在Deferred最终状态，默认会预先向doneList，failList中的list添加三个回调函数。`
```
if (stateString) {
  list.add(function() {
    state = stateString;
  }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
}
```
这里有个小技巧：

`i ^ 1 按位异或运算符，所以实际上第二个传参数是1、0索引对调了`，所以取值是failList.disable与doneList.disable。

通过stateString有值这个条件，预先向doneList,failList中的list添加三个回调函数，分别是:
```
doneList : [changeState, failList.disable, processList.lock]
failList : [changeState, doneList.disable, processList.lock]
```
  ☑ changeState 改变状态的匿名函数，deferred的状态，分为三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)；

  ☑ 不论deferred对象最终是resolve（还是reject），在首先改变对象状态之后，都会disable另一个函数列表failList(或者doneList)；

  ☑ 然后lock processList保持其状态，最后执行剩下的之前done（或者fail）进来的回调函数。

所以第一步最终都是围绕这add方法：

  ☑ done/fail/是list.add也就是callbacks.add，将回调函数存入回调对象中。

**第二部分很简单，给Deferred对象扩充6个方法：**

  ☑ resolve/reject/notify 是 callbacks.fireWith，执行回调函数；

  ☑ resolveWith/rejectWith/notifyWith 是 callbacks.fireWith 队列方法引用。

最后合并promise到Deferred。
```
promise.promise( deferred );
jQuery.extend( obj, promise );
```
所以最终通过工厂方法Deferred构建的异步对象带的所有的方法了，return内部的deferred对象了。

```
    function Deferred(){
      //内部deferred对象
      var deferred = {};

      //定义的基本接口
      //Callbacks(once memory)的用法，就是只执行一次，并且保持以前的值
      // 每个元组分别包含一些与当前deferred相关的信息: 
      // 分别是：触发回调函数列表执行(函数名)，添加回调函数（函数名），回调函数列表（jQuery.Callbacks对象），deferred最终状态（第三组数据除外）
      // 总体而言，三个元组会有对应的三个callbacklist对应于doneList, failList, processList
      var tuples = [
        ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
        ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
        ["notify", "progress", jQuery.Callbacks("memory")]
      ];

      //deferred的状态，三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)
      //其实就是tuples最后定义的
      var state = "pending";

      //内部promise对象,作用：
      //1：通过promise.promise( deferred );混入到deferred中使用
      //2：可以生成一个受限的deferred对象，
      //   不在拥有resolve(With), reject(With), notify(With)这些能改变deferred对象状态并且执行callbacklist的方法了
      //   换句话只能读，不能改变了
      //扩展
      //  done fail pipe process 
      var promise = {
        state: function() {},
        always: function() {},
        then: function() {},
        promise: function(obj) {
          return obj != null ? jQuery.extend(obj, promise) : promise;
        }
      }

      //管道接口,API别名
      promise.pipe = promise.then;

      //遍历tuples
      //把定义的接口混入到deferred中
      jQuery.each(tuples, function(i, tuple) {
        var list = tuple[2],
          stateString = tuple[3];

          // 给上面的promise对象添加done，fail，process方法
          // 分别引用三个不同 jQuery.Callbacks("once memory")对象的add方法，在初始化就构建成了对象
          // 向各自的回调函数列表list（各自闭包中）中添加回调函数，互不干扰
          // promise = {
          //    done:
          //    fail:
          //    process
          // }
          promise[tuple[1]] = list.add;

        if (stateString) {
          list.add(function() {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function() {
          deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      });
      //混入方法
      promise.promise(deferred);

      return deferred;
    }


  $("button").on("click", function() {
    var dtd = Deferred();
    // 给deferred注册一个成功后的回调通知
    dtd.done(function() {
       $('body').append('<li>Deferred成功</li>')
    })
    // 开始执行一段代码
    setTimeout(function() {
      dtd.resolve(); // 改变deferred对象的执行状态
    }, 500);
  })
  ```