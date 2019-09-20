http://browserstate.github.io/history.js/demo/

history对象提供了一系列方法，允许在浏览历史之间移动。

back()：移动到上一个访问页面，等同于浏览器的后退键。

forward()：移动到下一个访问页面，等同于浏览器的前进键。

go()：接受一个整数作为参数，移动到该整数指定的页面，比如go(1)相当于forward()，go(-1)相当于back()。

注意，`返回上一页时，页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页。`

HTML5为history对象添加了两个新方法，history.pushState()和history.replaceState()，用来在浏览历史中添加和修改记录
函数参数：
- state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。

- title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。

- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

`pushState方法不会触发页面刷新，只是导致history对象发生变化，地址栏会有反应。`

如果pushState的url参数，`设置了一个新的锚点值（即hash），并不会触发hashchange事件`。如果设置了一个跨域网址，则会报错。

每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件。

需要注意的是，仅仅调用pushState方法或replaceState方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用JavaScript`调用back、forward、go方法时才会触发`。另外，`该事件只针对同一个文档`，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。

