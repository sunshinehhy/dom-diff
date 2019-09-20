http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

## React-Redux

`UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。`

`如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。`

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。

**为了定义业务逻辑，需要给出下面两方面的信息:**

1. 输入逻辑：外部的数据（即state对象）如何转换为 UI 组件的参数。
2. 输出逻辑：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。

**connect方法**
`实例见https://github.com/sunhannie/react-redux-test`

connect方法接受两个参数：mapStateToProps和mapDispatchToProps。它们定义了 UI 组件的业务逻辑。

mapStateToProps：`负责输入逻辑`，即将state映射到 UI 组件的参数（props）；
mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。
mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象。



mapDispatchToProps：`负责输出逻辑`，即将用户对 UI 组件的操作映射成 Action。
mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。
也就是说，`它定义了哪些用户的操作应该当作 Action`，传给 Store。它可以是一个函数，也可以是一个对象。
mapDispatchToProps`作为函数，应该返回一个对象`，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
如果mapDispatchToProps`是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数`，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出。

**Provider组件**

提供Provider组件，可以让容器组件拿到state。其所有子组件就默认都可以拿到state了。
它的原理是React组件的context属性。
Provider的唯一功能就是传入store对象。