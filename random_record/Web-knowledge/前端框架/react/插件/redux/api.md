## createStore(reducer, [preloadedState], enhancer)
创建一个 Redux store 来以存放应用中所有的 state。
应用中应有且仅有一个 store。

reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。

[preloadedState] (any): `初始时的 state`。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。

enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，`返回一个新的强化过的 store creator`。这与 middleware 相似，它也允许你通过复合函数改变 store 接口。

返回值
(Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UI。


## bindActionCreators(actionCreators, dispatch)
actionCreators： (Function or Object)，一个 action creator，或者一个 value 是 action creator 的对象。

dispatch (Function): 一个由 Store 实例提供的 dispatch 函数。

可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。

`把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象`。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。

`惟一会使用到 bindActionCreators 的场景`是当你需要把 action creator 往下传到一个组件上，却不想让这个组件觉察到 Redux 的存在，而且不希望把 dispatch 或 Redux store 传给它。
## Store
- getState()
返回应用当前的 state 树。`它与 store 的最后一个 reducer 返回值相同`。

- dispatch(action)
分发 action。这是触发 state 变化的惟一途径。

- subscribe(listener)
添加一个变化监听器。`每当 dispatch action 的时候就会执行`，state 树中的一部分可能已经变化。你`可以在回调函数里调用 getState() 来拿到当前 state。`

你`可以在变化监听器里面进行 dispatch()`，但你需要注意下面的事项：

1. 监听器调用 dispatch() `仅仅应当发生在响应用户的 actions 或者特殊的条件限制下`（比如： 在 store 有一个特殊的字段时 dispatch action）。虽然没有任何条件去调用 dispatch() 在技术上是可行的，但是随着每次 dispatch() 改变 store 可能会导致陷入无穷的循环。
2. 订阅器（subscriptions） `在每次 dispatch() 调用之前都会保存一份快照`。当你在正在调用监听器（listener）的时候订阅(subscribe)或者去掉订阅（unsubscribe），对当前的 dispatch() 不会有任何影响。但是对于下一次的 dispatch()，无论嵌套与否，都会使用订阅列表里最近的一次快照。
3. `订阅器不应该注意到所有 state 的变化，在订阅器被调用之前，往往由于嵌套的 dispatch() 导致 state 发生多次的改变`。`保证所有的监听器都注册在 dispatch() 启动之前`，这样，在调用监听器的时候就会传入监听器所存在时间里最新的一次 state。

- replaceReducer(nextReducer)
`替换 store 当前用来计算 state 的 reducer。`

这是一个高级 API。`只有在你需要实现代码分隔，而且需要立即加载一些 reducer 的时候才可能会用到它`。在实现 Redux 热加载机制的时候也可能会用到。

## combineReducers(reducers)
combineReducers接收一个拆分后 reducer 函数组成的对象，返回一个新的 Reducer 函数。
使用 combineReducer 的时候你需要重点注意下面几个方法：
1. 它只是一个工具函数，用于简化编写 Redux reducer 时最常见的场景。没有必要一定在你的应用程序中使用它
2. 虽然 Redux 本身并不管你的 state 是如何组织的，但是 combineReducer 强制地约定了几个规则来帮助使用者们避免常见的错误
3. 你可以在任何级别的 reducer 中使用 combineReducer，不仅仅是在创建根 reducer 的时候。
4. 会调用所有的 reducer，严格来说是它包装的所有 reducer。

combineReducers 不是 必须的，它仅仅是通过简单的 JavaScript 对象作为数据，`让 state 层能与 reducer 一一关联的函数而已`。

## applyMiddleware(...middlewares)
http://www.redux.org.cn/docs/api/applyMiddleware.html
使用包含自定义功能的 middleware 来`扩展 Redux` 是一种推荐的方式。Middleware `可以让你包装 store 的 dispatch 方法来达到你想要的目的`。

`Middleware 并不需要和 createStore 绑在一起使用`，也不是 Redux 架构的基础组成部分，但它带来的益处让我们认为有必要在 Redux 核心中包含对它的支持。因此，虽然不同的 middleware 可能在易用性和用法上有所不同，`它仍被作为扩展 dispatch 的唯一标准的方式`。

每个 middleware `接受 Store 的 dispatch 和 getState 函数作为命名参数`，并返回一个函数。(middleware的参数是函数，并且返回一个函数；返回的函数会被传入 被称为next 下一个middleware的dispatch方法，并返回一个接收action的新函数，这个函数可以直接调用 next(action))

调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。

`middleware 的函数签名是 ({ getState, dispatch }) => next => action`
`next为下一个middleware的dispatch方法。action是返回的新函数的参数`

盲点：怎么理解这个写法
```
import { createStore, applyMiddleware } from 'redux'
import todos from './reducers'
function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
<!--next和action都是参数 return function (next){return function (action){}}-->
    // 调用 middleware 链中下一个 middleware 的 dispatch。
    let returnValue = next(action)   //返回的这个函数可以直接调用 next(action)

    console.log('state after dispatch', getState())

    // 一般会是 action 本身，除非后面的 middleware 修改了它。
    return returnValue
  }
}

let store = createStore(
  todos,
  [ 'Use Redux' ],
  applyMiddleware(logger)
)
//dispatch后面传入的是action
store.dispatch({
  type: 'ADD_TODO',
  text: 'Understand the middleware'
})
// (将打印如下信息:)
// will dispatch: { type: 'ADD_TODO', text: 'Understand the middleware' }
// state after dispatch: [ 'Use Redux', 'Understand the middleware' ] 
<!--这个getState()是怎么来的？为什么出现这个结果？现在还不明白-->
```

```
比如：
let store = createStore(reducer, applyMiddleware(thunk))
Thunk middleware 可以让我们像 dispatch 普通 action一样 dispatch 异步的 thunk action。
```
applyMiddleware 只是被称为 Redux 最强大的扩展机制的 store enhancer 中的一个范例而已。你不太可能需要实现自己的 store enhancer。
## compose(...functions)
http://www.redux.org.cn/docs/api/compose.html

从右到左来组合多个函数。
这是函数式编程中的方法，为了方便，被放到了 Redux 里。
`当需要把多个 store 增强器 依次执行的时候，需要用到它。`

**参数**

(arguments): 需要合成的多个函数。预计每个函数都接收一个参数。`它的返回值将作为一个参数提供给它左边的函数`，以此类推。例外是最右边的参数可以接受多个参数，因为它将为由此产生的函数提供签名。（译者注：compose(funcA, funcB, funcC) 形象为 compose(funcA(funcB(funcC())))）

**返回值**

(Function): 从右到左把接收到的函数合成后的最终函数。

compose `做的只是让你在写深度嵌套的函数时，避免了代码的向右偏移`（译者注：可以参考上述的译者注）。不要觉得它很复杂。

```
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from './containers/DevTools'
import reducer from '../reducers/index'

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )
)
```