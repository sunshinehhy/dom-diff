JavaScript拥有许多可以操作浏览器历史记录的方法，不管是普通页面跳转，还是单页应用哈希值变化，我们都会经常与这些方法打交道，尤其在单页应用中这些方法几乎是页面路由的核心方法。本文将详细讨论这些方法。

1. document.location
location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。事实上，location对象既是window对象的属性，又是document对象的属性。换句话说，window.location和document.location是同一个对象。这里推荐大家使用document.location的写法，以适应非浏览器文档环境。 
除去为a标签设置的href属性，大家最常用的跳转方式一定就是:window.location.href=”xxx”;实际上，上面这句代码真正执行的是location.assign方法。简而言之，下面三中URL跳转的写法完全等同，都会立即打开新的URL并在浏览器的历史记录中生成一条记录：

document.location.assign("xxx");
document.location="xxx";
document.location.href="xxx";

需要注意的是，如果通过这种方式跳转的URL与当前URL完全相同，则页面会刷新，但是浏览器历史记录不会新增。

2. location.replace
功能几乎与location.href=”xxx”;完全相同，只有一个区别，location.replace会在浏览器的历史记录中生成一条记录，并替换前一条记录。举个例子，当我们打开“a.html”页面，页面内有如下两行代码：

document.location.href="c.html";
document.location.replace("b.html");

浏览器先通过location.href的方式跳转到c.html，接着又使用location.replace跳转到b.html。此时点击浏览器的后退按钮，浏览器会直接返回a.html，因为c.html这条历史记录被replace覆盖了。

3. window.onhashchange
我们可以通过如下代码形式来监听浏览器URL的哈希值变化：

window.addEventListener("hashchange",function(){
    //do something
},false);
//以下代码都会触发hashchange事件
document.location.hash="#a=1";
document.location.href="b.html#b=1";
document.location.replace("c.html#c=1");

当我们通过改写location的方式引起浏览器URL哈希值变化时，hashchange事件就会触发。如果URL重写导致了页面刷新（例如改变了URL查询参数，或者直接跳向一个跨域地址），hashchange事件会直接被跳过。请注意，URL哈希值变化不一定总是会触发hashchange事件，下面要介绍的方法就是改动URL但不触发hashchange。

4. history.pushState
pushState方法接收三个参数：一个记录历史状态的对象（该对象会在popstate事件触发时被传入，有640K的大小限制）；一个代表历史记录标题的字符串；一个与当前URL同源的地址。典型的使用方式如下：

history.pushState({}, "", "b.html");

history.pushState()方法会将URL设置为一个同源URL值，在此之后发送的Ajax请求的Referrer头部都会使用这个新的值，同时在浏览器历史记录中生成一条新的历史记录。但是pushState方法不会刷新页面，pushState引起的URL哈希值变化也不会触发hashchange事件。pushState如果设置了一条与当前URL完全相同的地址，浏览器的历史记录中仍然会新增一条记录。

5. history.replaceState
该方法与history.pushState基本相同，唯一的区别就是replaceState会像location.replace一样覆盖先前历史记录。 
关于history.pushState和history.replaceState的更多介绍： 
https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history

6. window.onpopstate
我们可以通过如下代码形式来监听浏览器的popstate事件：

window.addEventListener("popstate",function(event){
    //do something
},false);

与hashchange事件类似，`popstate会在任何URL变化时触发（hashchange只会在哈希值变化时触发）`，并且history.pushState和history.replaceState也不会触发popstate事件。只有在浏览器后退、前进、重写哈希值的情况下才会触发popstate事件。如果URL重写导致了页面刷新（例如改变了URL查询参数，或者直接跳向一个跨域地址），popstate事件会直接被跳过。 
这里请注意一下代码中传给事件函数的参数“event”，`event参数中包含state对象，这个state对象就是在调用history.pushState和history.replaceState方法是传入的第一个状态参数`，我们可以通过这种状态传递方式来对历史记录进行一定处理。