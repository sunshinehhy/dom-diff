## combineReducers 用法

- combineReducers 辅助函数的`作用`是，把一个由`多个不同 reducer 函数作为 value 的 object`，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore 方法。
- 合并后的 reducer 可以调用各个子 reducer，并把它们返回的结果合并成一个 state 对象。 
- 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名。

接收一个拆分后 reducer 函数组成的对象，返回一个新的 Reducer 函数。


```
示例：
rootReducer = combineReducers({potato: potatoReducer, tomato: tomatoReducer})
// rootReducer 将返回如下的 state 对象
{
  potato: {
    // ... potatoes, 和一些其他由 potatoReducer 管理的 state 对象 ... 
  },
  tomato: {
    // ... tomatoes, 和一些其他由 tomatoReducer 管理的 state 对象，比如说 sauce 属性 ...
  }
}
potatoReducer和tomatoReducer都是reducer，可以简写成combineReducers({potato,  tomato})

**通过为传入对象的 reducer 命名不同的 key 来控制返回 state key 的命名**。例如，你可以调用 combineReducers({ todos: myTodosReducer, counter: myCounterReducer }) 将 state 结构变为 { todos, counter }。
```
- 通过为传入对象的 reducer `命名不同的 key` 来`控制返回 state key 的命名`。（combineReducers 接收拆分之后的 reducer 函数组成的对象，并且`创建出具有相同键` `对应状态对象的函数`。）
- `通常的做法是命名 reducer`，然后 state 再去分割那些信息，这样你可以使用 ES6 的简写方法：`combineReducers({ counter, todos })。这与 combineReducers({ counter: counter, todos: todos }) `是等价的。

## 写法

- 参数  (对象---对象值是对应不同的 reducer 函数)
reducers (Object): `一个对象，它的值（value）对应不同的 reducer 函数`，`这些 reducer 函数后面会被合并成一个`。下面会介绍传入 reducer 函数需要满足的规则。
之前的文档曾建议使用 ES6 的 import * as reducers 语法来获得 reducer 对象。这一点造成了很多疑问，因此现在建议在 reducers/index.js 里使用 combineReducers() 来对外输出一个 reducer。下面有示例说明。

- 返回值 (state对象)
(Function)：一个调用 reducers 对象里所有 reducer 的 reducer，并且`构造一个与 reducers 对象结构相同的 state 对象`。

## 使用 combineReducer 的时候你需要重点注意下面几个方法：

1. 首先，`combineReducer 只是一个工具函数，用于简化编写 Redux reducer 时最常见的场景`。你没有必要一定在你的应用程序中使用它，他`不会处理每一种可能的场景`。你完全可以不使用它来编写 reducer，或者对于 combinerReducer 不能处理的情况编写自定义的 reducer。（参见 combineReducers 章节中的例子和建议）

2. 虽然 Redux 本身并不管你的 state 是如何组织的，但是 `combineReducer 强制地约定了几个规则来帮助使用者们避免常见的错误`（参见 combineReducer ---- redux/api.md中）

3. 一个常见的问题是 Reducer 在 dispatch action 的时候是否调用了所有的 reducer。当初你可能觉得“不是”，因为真的只有一个根 reducer 函数啊。但是 combineReducer 确实有着这样的特殊效果。在生成新的 state 树时，combinerReducers 将`调用每一个拆分之后的 reducer 和与当前的 Action`，如果有需要的话会使得每一个 reducer 有机会响应和更新拆分后的 state。所以，在这个意义上， `combineReducers 会调用所有的 reducer，严格来说是它包装的所有 reducer`。

4. 你`可以在任何级别的 reducer 中使用 combineReducer`，不仅仅是在创建根 reducer 的时候。在不同的地方有多个组合的 reducer 是非常常见的，他们组合到一起来创建根 reducer。

## 传入 combineReducers 的 reducer 都需满足以下规则

本函数设计的时候有点偏主观，就是为了避免新手犯一些常见错误。也因些我们故意设定一些规则，但如果你自己手动编写根 redcuer 时并不需要遵守这些规则。

每个传入 combineReducers 的 reducer 都需满足以下规则：

1. 所有`未匹配到的 action`，必须把它接收到的第一个参数也就是那个 state 原封不动返回。(`未匹配到的 action,返回原封不动的state`)

2. `永远不能返回 undefined`。当过早 return 时非常容易犯这个错误，为了避免错误扩散，遇到这种情况时 combineReducers 会抛异常。

3. `如果传入的 state 就是 undefined，一定要返回对应 reducer 的初始 state`。根据上一条规则，初始 state 禁止使用 undefined。`使用 ES6 的默认参数值语法来设置初始 state 很容易，但你也可以手动检查第一个参数是否为 undefined`。

## 提醒

虽然 combineReducers `自动帮你检查 reducer 是否符合以上规则，但你也应该牢记，并尽量遵守`。即使你通过 Redux.createStore(combineReducers(...), initialState) 指定初始 state，combineReducers 也会尝试通过传递 undefined 的 state 来检测你的 reducer 是否符合规则。因此，即使你在代码中不打算实际接收值为 undefined 的 state，也`必须保证你的 reducer 在接收到 undefined 时能够正常工作(在程序中写上undefined条件时做出的响应)`。


## 事例
```
//reducers/todos.js
export default function todos(state = [], action) {
  switch (action.type) {
  case 'ADD_TODO':
    return state.concat([action.text])
  default:
    return state
  }
}

//reducers/counter.js
export default function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

//reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import counter from './counter'

export default combineReducers({
  todos,
  counter
})

//App.js
import { createStore } from 'redux'
import reducer from './reducers/index'

let store = createStore(reducer)
console.log(store.getState())
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux'
})
console.log(store.getState())
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }

疑问：键counter和todos从哪里来的呢？顺序为什么先试counter？0是原封不动返回

getState()返回应用当前的 state 树。它与 store 的最后一个 reducer 返回值相同。

通过查找getState()的概念，我还是没有理解
```

```
import {combineReducers, createStore} from "redux";

// 将 default import 进来的名称重命名为任何我们想要的名称。我们也可以重命名 import 进来的名称。
import defaultState, {firstNamedReducer, secondNamedReducer as secondState} from "./reducers";

const rootReducer = combineReducers({
    defaultState,                   // key 的名称和 default export 的名称一样
    firstState : firstNamedReducer, // key 的名字是单独取的，而不是变量的名字
    secondState,                    // key 的名称和已经被重命名过的 export 的名称一样
});

const reducerInitializedStore = createStore(rootReducer);
console.log(reducerInitializedStore.getState());
// {defaultState : 0, firstState : 1, secondState : 2}

//这个输出顺序，我能理解；最后的 state 中 key 的名字和 import 进来的变量的名字一样
```

## 小贴士
本方法只是起辅助作用！你可以自行实现不同功能的 combineReducers，甚至像实现其它函数一样，明确地写一个根 reducer 函数，用它把子 reducer 手动组装成 state 对象。

在 reducer 层级的任何一级都可以调用 combineReducers。并不是一定要在最外层。实际上，你可以把一些复杂的子 reducer 拆分成单独的孙子级 reducer，甚至更多层。