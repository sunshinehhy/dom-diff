## redux
redux解决不断变化的 state 

Redux 可以用这三个基本原则来描述: http://www.redux.org.cn/docs/introduction/ThreePrinciples.html

1. `单一数据源`: 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于`唯一一个 store` 中。
2. `State 是只读的`: 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
3. `使用纯函数来执行修改`: 为了描述 action 如何改变 state tree ，你需要编写 reducers。`reducer 只是函数`，你可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如分页器。

Action 就是一个普通 JavaScript 对象。

所有state都以一个对象树的形式存储在一个单一的store中。唯一改变state的办法是触发action，一个描述发生什么的对象。为了描述action如果改变state树，需要编写reducers。

reducer函数：决定每个 action 如何改变应用的 state。
Redux 没有 Dispatcher 且不支持多个 store。相反，只有一个单一的 store 和一个根级的 reduce 函数（reducer）。
随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，`分别独立地操作 state 树的不同部分`，而不是添加新的 stores。

store: getState()   dispatch   distrbute

let store = createStore(counter);  //counter是reducers函数
```
store.dispatch({ type: 'INCREMENT' });   //action.type为'INCREMENT'

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() =>
  console.log(store.getState())
);

```
## 区别
Redux 的灵感来源于 Flux 的几个重要特性。Redux 并没有 dispatcher 的概念。原因是它依赖纯函数来替代事件处理器。

## Reducer
时刻谨记永远不要在克隆 state 前修改它。

## Middleware

## combineReducers


## 用法
- reducer在createStore中
- dispatch后面传入action
- store是存储整个状态对象
- getState()可以通过reducer中得到（合并的或者单独的）


## 面试
使用Redux管理React数据流的过程如图所示，Store作为唯一的state树，管理所有组件的state。组件所有的行为通过Actions来触发，然后Action更新Store中的state,Store根据state的变化同步更新React视图组件。

https://www.cnblogs.com/rudylemon/p/redux.html