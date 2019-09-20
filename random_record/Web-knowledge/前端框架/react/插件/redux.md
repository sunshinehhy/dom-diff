http://www.redux.org.cn/

https://github.com/xgrommx/awesome-redux

https://github.com/reactjs/redux  (实例)

Redux 入门教程（一）：基本用法:
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html

### 什么时候使用redux
如果随着时间的推移，数据处于合理的变动之中、需要一个单一的数据源、在 React 顶层组件 state 中维护所有内容的办法已经无法满足需求，这个时候就需要使用 Redux 了。
是为了解决 “当有确定的状态发生改变时，数据从哪里来” 这种可预测行为的问题的。

`Redux 的设计思想很简单，就两句话`:

（1）Web 应用是一个状态机，视图与状态是一一对应的。

（2）所有的状态，保存在一个对象里面。

### Store 
Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供createStore这个函数，用来生成 Store。

import { createStore } from 'redux';
const store = createStore(fn);
上面代码中，createStore函数接受`另一个函数作为参数`，返回新生成的 Store 对象。

### State
Store对象包含所有数据。如果想得到`某个时点`的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。

当前时刻的 State，可以通过store.getState()拿到。

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

### Action
Action 是一个对象。其中的`type属性是必须的，表示 Action 的名称`,`其他属性可以自由设置`。
```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```
### store.dispatch()

`store.dispatch()是 View 发出 Action 的唯一方法。`

### Reducer
Store `收到 Action 以后`，`必须给出一个新的 State，这样 View 才会发生变化`。这种 State 的计算过程就叫做 `Reducer`。
`将 Reducer 传入createStore方法，store.dispatch方法会触发 Reducer 的自动执行。`
```
    比如：
    const reducer = function (state, action) {
        // ...
        return new_state;
    };
    export default function counter(state = 0, action) {
        // ...
        return new_state;
    }
    const defaultState = 0;
    const reducer = (state = defaultState, action) => {
        // ...
        return new_state;
    }
    整个应用的初始状态，可以作为 State 的默认值，也可以设默认值
```

### createStore
createStore方法还可以接受`第二个参数，表示 State 的最初状态`。这通常是服务器给出的。

let store = createStore(todoApp, window.STATE_FROM_SERVER)
window.STATE_FROM_SERVER就是整个应用的状态初始值。注意，如果提供了这个参数，`它会覆盖Reducer函数的默认初始值`。

### applyMiddlewares()
它是 Redux 的原生方法，作用是将所有中间件组成一个数组，依次执行。

- **Store 提供了三个方法:**
```
    store.getState()
    store.dispatch()
    store.subscribe()
    let { subscribe, dispatch, getState } = createStore(reducer);
```
### combineReducers
Redux 提供了一个combineReducers方法，`用于 Reducer 的拆分`。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。

### 小例子分析
redux加减数字功能的小例子分析: https://www.2cto.com/kf/201711/695062.html   
比如用法，几个关键语句：
```
import counter from './reducer/index.js'; 
const store = createStore(counter);//以counter为参数创建store,counter为一函数
store.subscribe(render);
```
用户发出action，使用组件属性中的onIncrement方法处理，里面包含了store.dispatch(action)；

store.getState()方法获取当前状态state的值

store.subscribe()方法监听state是否变化，变化后调用监听函数

reducer，本质是一个纯函数，传入state，action两个参数返回一个新的state

## 为什么需要Redux
修改统一的数据源，减少状态/属性传递的成本；
渲染性能还能够得到进一步的提升
## Redux的三大原则

https://blog.csdn.net/shenlei19911210/article/details/52679570

单一数据源:

`整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中`。这让同构应用(同构应用通俗的理解：前后端使用同一语言或技术进行开发)开发变得非常容易。来自服务端的 state `可以在无需编写更多代码的情况下被序列化并注入到客户端中`。由于是单一的 state tree ，调试也变得非常容易。在开发中，通常将应用的 state 保存在本地，从而加快开发速度。
```
console.log(store.getState())

/* Prints
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
}
*/
```

State 是只读的:

state的改变`只能通过触发特定的action完成`（action 是一个用于描述已发生事件的普通对象）。这样设计的好处在于，`确保了视图和网络请求都不能直接修改 state`，相反它们只能表达想要修改的意图。因为所有的修改都被集中化处理，且`严格按照一个接一个的顺序执行`，因此不用担心 race condition 的出现。 Action 就是普通对象而已。同时通过这样的设计开发后期调试或测试时对于复现问题。
```
store.dispatch({
  type: 'COMPLETE_TODO',
  index: 1
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
```

使用纯函数来执行修改:

为了可控的，详细的描述 action 如何改变 state tree ，需要开发人员自己完成 reducers 的编写工作。 Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的state。良好的应用设计实现中每一个educer应该被设计为，分别独立地操作 state tree 的不同部分。因为reducer只是函数，所以开发人员可以控制它们被调用的顺序，传入附加数据，甚至编写可复用的 reducer 来处理一些通用任务，如数据加载，分页等等。

```
function visibilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case 'COMPLETE_TODO':
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: true
          })
        }
        return todo
      })
    default:
      return state
  }
}

import { combineReducers, createStore } from 'redux';

let reducer = combineReducers({ visibilityFilter, todos });
let store = createStore(reducer);
```


总结
通过上面三个原则的理解学习，我们知道。想要开发一个设计良好的React应用，需要对业务逻辑又一个良好的感知与理解，这样便于在项目初期就构建好 object tree， `明确数据流向`。有效的`划分每一个 state ， action，reducer`。达到事半功倍的作用。

## 再次总结
redux：所有的状态变化都拘束到reducer(s)中进行，`修改统一的数据源`，然后再`自上而下的重新分发`，`减少状态/属性传递的成本`，也从根源上杜绝了状态震荡，而且`redux将数据从react中分离`，则理论上所有的react component都可以是无状态组件，那么渲染性能还能够得到进一步的提升。

