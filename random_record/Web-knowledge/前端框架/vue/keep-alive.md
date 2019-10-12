通过keep-alive 保留数据值 填写数据时切换到其他页面，后返回当前页数据保留 ，`主要用于保留组件状态或避免重新渲染。`

activated()钩子
当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。在activated 比较上一次和本次的id，不相同则去请求对应id的数据。

```
mounted() {
  this.lastId = this.$route.params.id // 在 created 或 mounted 钩子中记录上一次的id
},
activated() {
  if (this.lastId !== this.$route.params.id) {
    this.lastId = this.$route.params.id // 重置上一次的 id
    this.getDetail() // 更新数据
  }
}
```

## created 和 activated 的区别
created()：在创建vue对象时，当html渲染之前就触发；但是注意，全局vue.js不强制刷新或者重启时只创建一次，也就是说，created()只会触发一次；

activated()：在vue对象存活的情况下，进入当前存在activated()函数的页面时，一进入页面就触发；可用于初始化页面数据等


被包含在 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
activated
在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用。
deactivated
在组件被停用时调用。
注意：只有组件被 keep-alive 包裹时，这两个生命周期才会被调用，如果作为正常组件使用，是不会被调用，以及在 2.1.0 版本之后，使用 exclude 排除之后，就算被包裹在 keep-alive 中，这两个钩子依然不会被调用！另外在服务端渲染时此钩子也不会被调用的。

作者：行走的羊驼驼
链接：https://juejin.im/post/5c14c1e4e51d45185d074e58
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。