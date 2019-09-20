https://www.imooc.com/code/3747

前端项目的开发，不仅仅涉及到同步的概念，而且还会经常穿插各种异步的处理。一些大的操作，比如远程获取数据，操作一个大数据处理，这时候是不能马上获取到数据的。假设我们发送一个AJAX请求到接受到数据需要10秒钟，那么从发送到接受数据这个时间段中，前端的处理时间其实是空闲，但是对于开发者来说这种时间是不能浪费了，所以我们可以在10秒钟做很多同步的处理，同时等待异步的数据返回。所以`我们需要监听这个回调的数据在成功的时候能够获取到，或者设计一个返回后触发处理的机制，当然原生的JavaScript对这个机制几乎是没有的。为了优化这个形成统一的异步处理方案，jQuery就开始设计了一个Deferred异步模型。`

`Deferred 提供了一个抽象的非阻塞的解决方案（如异步请求的响应）`，它创建一个promise对象，其目的是在未来某个时间点返回一个响应。简单来说就是一个异步/同步回调函数的处理方案。
$.Deferred在jQuery代码内部有`四个模块`被使用，分别是“promise方法”、“DOM ready”、“Ajax模块”及“动画模块”。

`看看jQuery中的最常用的AJAX处理：`

## 一：Ajax的改造

传统的jQuery的AJAX操作的传统写法(1.5版之前)：
```
$.ajax({
  url: "aaron.html",
  success: function(){
     alert("成功！");
  },
  error:function(){
    alert("失败！");
  }
})
```
$.ajax()接受一个对象参数，这个对象包含两个方法：success方法指定操作成功后的回调函数，error方法指定操作失败后的回调函数。

在1.5版本后通过新的Deferred引入就改成了：
```
$.ajax("aaron.html")
.done(function(){ alert("成功"); })
.fail(function(){ alert("出错"); });
```
把传参的回调，`换成了链式的写法，这样可读性更高了`。在jquery 1.5版后，`通过$.ajax返回的不是XHR对象了`，`而是经过包装的Deferred对象`，所以就具有promise的一些规范。当然这种写法到底是怎么做的，我们在后续的教程中会详细的讲解到。

## 二：提供一种方法来执行一个或多个对象的回调函数

在实际开发中，我们可能要发送多个异步的请求操作，我们需要等所有的异步都处理完毕后，才能继续下一个动作。如右边代码所示。

所以我们这里要涉及一个等待的处理。我们自己要做一个计时器，每一个任务执行完毕后，都要触发一次任务的检测。当最后一个调用完毕了，我们就可以执行后面的动作，当前这里的写法也会有些问题，比如错误的时候没有处理。同样的功能，我们换成Deferred就会很简单了。
```
$.when($.ajax("a1.html"), $.ajax("a2.html"))
　　.done(function(){ alert('2次回调都正确返回了') })
　　.fail(function(){ alert('出错了'); });
```
这段代码的意思是：先执行两个操作$.ajax("a1.html")和$.ajax("a2.html")，如果`都成功了`，就运行done()指定的回调函数；如果有一个失败或都失败了，就执行fail()指定的回调函数。

## 三：可以混入任意的对象接口中

jQuery的Deferred最好用的地方，`就是模块化程度非常高，可以任意配合使用`。

function task(name) {
  var dtd = $.Deferred();
  setTimeout(function() {
    dtd.resolve(name)
  }, 1000)
  return dtd;
}
$.when(task('任务一'), task('任务二')).done(function() {
  alert('成功')
})
把需要处理的异步操作，用Deferred对象给包装一下，然后`通过when方法收集异步的操作`，最后再返回出done的成功，这样的处理太赞了！

所以说，Deferred的引入，为处理事件回调提供了更加强大并且更灵活的编程模型。

```
//提供一种方法来执行一个或多个对象的回调函数
//在实际开发中，我们可能要发送多个异步的请求操作，我们需要等所有的异步都处理完毕后，才能继续下一个动作

//案例一
function task1(name, fn) {
  setTimeout(function() {
    fn(name)
  }, 500)
}

function task2(name, fn) {
  setTimeout(function() {
    fn(name)
  }, 1000)
}

//任务数
var taskNuns = function() {
  var num = 2; //2个任务
  return function() {
    if (num === 1) {
      show('任务都完成了',$("#aaron1"))
    }
    num--;
  }
}()


$("#aaron1").click(function() {
  //常规处理
  task1('任务一', function() {
    show('task1', $("#aaron1"))
    taskNuns()
  })

  task2('任务二', function() {
    show('task2', $("#aaron1"))
    taskNuns();
  })
})

结果：
task1
task2
任务都完成了


//案例二
//通过Deferred改进
function task3(name) {
  var dtd = $.Deferred();
  setTimeout(function() {
    show('task3执行完毕',$("#aaron2"))
    dtd.resolve(name)
  }, 500)
  return dtd;
}

function task4(name) {
  var dtd = $.Deferred();
  setTimeout(function() {
    show('task4执行完毕',$("#aaron2"))
    dtd.resolve(name)
  }, 1000)
  return dtd;
}

$("#aaron2").click(function() {
  $.when(task3('task1'), task4('task2')).done(function() {
    show('when处理成功', $("#aaron2"))
  })
})

task3执行完毕
task4执行完毕
when处理成功
```