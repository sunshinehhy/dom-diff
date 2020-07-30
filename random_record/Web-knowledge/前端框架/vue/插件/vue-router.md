https://www.npmjs.com/package/vue-router

https://router.vuejs.org/zh/installation.html

https://router.vuejs.org/zh/api/#router-link （api）

https://github.com/pillarjs/path-to-regexp#parameters （path-to-regexp）

可以在任何组件内通过 this.$router 访问路由器，也可以通过 this.$route 访问当前路由

https://www.jishux.com/p/14dcb1412bc98a6e


https://blog.csdn.net/caoxinhui521/article/details/77688512?utm_source=app

 

 normalizeLocation 函数，它是一个辅助函数，会将调用 router.push / router.replace 时跳转的路由地址转为一个 location 对象

 normalizeLocation(this.to, current, this.append)




视图的更新是怎么实现的呢，看下 transitionTo()方法

一旦 history 发生改变就会触发更新机制调用应用实例的 render 方法进行重新渲染。


pushState和replaceState两种方法的共同特点：当调用他们修改浏览器历史栈后，虽然当前url改变了，但浏览器不会立即发送请求该url，这就为单页应用前端路由，更新视图但不重新请求页面提供了基础。

**单页面应用(SPA)的核心之一是:**

1.更新视图而不重新请求页面;

2.vue-router在实现单页面前端路由时，提供了三种方式：Hash模式、History模式、abstract模式，根据mode参数来决定采用哪一种方式。

vue-router 提供了三种运行模式：

● hash: 使用 URL hash 值来作路由。默认模式。（传复杂的数据，会有限制，比如体积）

● history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式。

● abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。

hash和history两种模式比较：

一般的需求场景中，hash模式与history模式是差不多的，根据MDN的介绍，调用history.pushState()相比于直接修改hash主要有以下优势：

• pushState设置的新url可以是与当前url同源的任意url,而hash只可修改#后面的部分，故只可设置与当前同文档的url

• pushState设置的新url可以与当前url一模一样，这样也会把记录添加到栈中，而hash设置的新值必须与原来不一样才会触发记录添加到栈中

• pushState通过stateObject可以添加任意类型的数据记录中，而hash只可添加短字符串 pushState可额外设置title属性供后续使用

'abstract'模式，不涉及和浏览器地址的相关记录，流程跟'HashHistory'是一样的，其原理是通过数组模拟浏览器历史记录栈的功能

根据平台差异可以看出，在 Weex 环境中只支持使用 abstract 模式。 不过，vue-router 自身会对环境做校验，`如果发现没有浏览器的 API`，vue-router 会自动强制进入 abstract 模式，所以 在使用 vue-router 时只要不写 mode 配置即可，默认会在浏览器环境中使用 hash 模式，在移动端原生环境中使用 abstract 模式。

走一遍 match 逻辑，再调用 transitionTo


## hash和history实现以及区别
从用户角度看 前端路由实现了两个功能（使用ajax更新页面状态的情况下）
1、记录当前页面的状态（保存或分享当前页的url，再次打开该url时，网页还是保存的（分享）时的状态）；
2、可是使用浏览器的前进后退功能（如点击后退按钮，可以使页面回到ajax更新页面之前的状态，url也回到之前的状态）

作为开发者，要实现这两个功能，我们需要做到：
1、改变url且不让浏览器向服务器发出请求；
2、监测url的变化；
3、截获url地址，并解析出需要的信息来匹配路由规则。

我们路由常用的hash模式和history模式实际上就是实现了上面的功能。

## hash模式

window.addEventListener('hashchange',function(){
  //监听hash变化，点击浏览器的前进后退会触发
  <!-- 可以直接在浏览器地址栏中输入改变路由，监听hash变化 -->

  hash改变就会触发hashchange事件
})

## history模式
history模式不仅可以在url里放参数，还可以将数据存放在一个特定的对象中。
history———利用了HTML5 History Interface 中新增的pushState（）和replaceState（）方法。（需要特定浏览器的支持）history不能运用与IE8一下


```
window.history.pushState(state,title,url)
//state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
//title：标题，基本没用，一般传null
//url：设定新的历史纪录的url。新的url与当前url的origin必须是一样的，否则会抛出错误。url可以时绝对路径，也可以是相对路径。
//如 当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/，
//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
//与pushState 基本相同，但她是修改当前历史纪录，而 pushState 是创建新的历史纪录

window.addEventListener("popstate",function(){
 //监听浏览器前进后退事件，pushState与replaceState方法不会触发
})
window.history.back()//后退
window.history.forward()//前进
window.history.go(1)//前进一部，-2回退两不，window.history.length可以查看当前历史堆栈中页面的数量

```

当活动历史记录条目更改时，将触发popstate事件。如果被激活的历史记录条目是通过对history.pushState（）的调用创建的，或者受到对history.replaceState（）的调用的影响，popstate事件的state属性包含历史条目的状态对象的副本。

`需要注意的是调用history.pushState()或history.replaceState()不会触发popstate事件。只有在做出浏览器动作时，才会触发该事件，如用户点击浏览器的回退按钮（或者在Javascript代码中调用history.back()或者history.forward()方法）`

不同的浏览器在加载页面时处理popstate事件的形式存在差异。页面加载时Chrome和Safari通常会触发(emit )popstate事件，但Firefox则不会。