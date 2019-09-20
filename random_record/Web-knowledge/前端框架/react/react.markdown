react-native中文网：https://reactnative.cn/docs/0.51/getting-started.html
React Router 使用教程： http://www.ruanyifeng.com/blog/2016/05/react_router.html
React Router：https://reacttraining.com/react-router/web/guides/basic-components
lession : https://github.com/reactjs/react-router-tutorial/tree/master/lessonss
demo: https://github.com/ruanyf/react-demos
React基础核心思想：https://zhuanlan.zhihu.com/p/29955363
React基础——react思想：https://www.jianshu.com/p/5e86a793fb3d
React 核心思想之声明式渲染：https://segmentfault.com/a/1190000007463108

英文api：https://reactjs.org/docs/react-dom.html

## React 特点
1. 声明式设计 −React采用声明范式，可以轻松描述应用。
2. 高效 −React通过对DOM的模拟，最大限度地减少与DOM的交互。
3. 灵活 −React可以与已知的库或框架很好地配合。
4. JSX − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
5. 组件 − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
6. 单向响应的数据流 − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。 单向数据流，只需要关心从数据怎么得出界面就行。由数据驱动页面的方式，可以轻松让用户界面和数据保持一致。当底层的数据变了，React 会自动处理所有用户界面的更新。可以让UI组件状态的维护管理更加清晰。

中文react文档： https://doc.react-china.org/      
http://www.reactchina.cn/tags/React%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3/

调试工具:https://github.com/facebook/react-devtools

+ 注意，原生 HTML 元素名以小写字母开头，而自定义的 React 类名以大写字母开头，比如 HelloMessage 不能写成 helloMessage。除此之外还需要注意组件类只能包含一个顶层标签，否则也会报错。
+ React 把组件看成是一个状态机（State Machines）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。
+ state 和 props 主要的区别在于 props 是不可变的，而 state 可以根据与用户交互来改变。这就是为什么有些容器组件需要定义 state 来更新和修改数据。 而子组件只能通过 props 来传递数据。


1. 不是一个完整的MVC,MVVM框架。React不是一个MVC框架，而是一个用于构建组件化UI的库，是一个`前端界面开发工具`。所以顶多算是MVC中的V（view）。
2. React跟Web Components不冲突。
3. React的特点就是“轻”。
4. 组件化的开发思路。
5. React最大的价值不是高性能的虚拟DOM、封装的事件机制、服务器端渲染，而是声明式的直观的编码方式。
6. React构建UI是使用组件化的方式，而不是常见的模板。组件并不是一个新概念，它是某个独立功能或者界面的封装，达到复用或者UI和业务松耦合的目的。

- 可组合：简单组件可以组合为复杂的组件
- 可重用：每个组件都是`独立的`，可以被多个组件使用
- 可维护：和组件相关的逻辑和UI都`封装在了组件的内部，方便维护`
- 可测试：因为组件的独立性，`测试组件就变得方便很多`。

在前端开发中都是需要特别尽量保持较小的DOM操作次数来提高性能。`虚拟DOM并没有完全实现DOM`，只是保留了元素直接的`层级关系和少量必要的属性`。因为减少了不必要的复杂性，实践校验的结果是虚拟DOM的性能比原生DOM高很多。

React尽管和我们`一直倡导的表现和逻辑分离的思想相违背`，但他是一个`主要的设计理念是编写简单容易理解的代码`。HTML模板的作用是让表现和逻辑分离，但是很多情况下模板还是严重依赖于业务逻辑，两者没有办法做到完全的松耦合。

基于React开发中构建的DOM都是通过虚拟DOM进行的。在React的实际的使用中，需要根据不同的数据展现不同的UI,当数据变化时，React会重新构建整个DOM树，然后`将当前的DOM树和之前的比较，得到DOM树的区别`，然后`仅仅把变化的部分反映到实际的浏览器UI更新上`。React会在同一个事件循环内合并DOM的变化，`只是会对比开始和结束的DOM变化，忽略中间过程的DOM变化`。尽管每次数据变化都是重新构建DOM树，但虚拟DOM的操作性能极高。这样使用React时，`开发者不在需要关心数据变化时页面上DOM元素的更新，而只是关心各个数据状态下页面实际展现的效果`。此外，因为React使用了由JavaScript实现的虚拟DOM，意味着可以在服务器端完成HTML结构的构建。

Flux是另外一个独立于React的架构。之所以说Flux`是一个架构而不是框架或者类库`，是因为Flux仅仅用于配合React框架来`处理组件和数据之间的交互`。简单来说Flux就是用于管理数据流。

React的应用场景：
1. 复杂场景下的高性能。
2. 重用组件库，组件组合。
3. “懒”

JSX  
XML  :facebook特意为react开发的语法糖
CoffeeScript：
TypeScript：微软出的
都是最终解析成js

JSX解析库，用react的能力，同时引入react解析库
自定义  jsfiddle
构造函数
调用函数对象apply call bind，改变对象的调用对象
指向bind对象的外面this

## 挂载
将组件渲染，并构建DOM元素然后插入页面的过程。

React组件生命周期小结:
https://www.jianshu.com/p/4784216b8194

状态与属性十分相似，但是状态是私有的，完全受控于当前组件。

## 状态提升
当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，`用 props 传递数据或者函数来管理这种依赖或着影响的行为`。

# react-native

## StyleSheet样式表

1. HTML5以;结尾，react以,结尾
2. HTML5中key、value都不加引号，
react中属于javascript对象，key的名字不能出现"-"，需要使用驼峰命名法。如果value以字符串，需要加引号
3. HTML5中，value如果是数字，需要带单位；react中不需要单位。

## Flexbox布局

https://www.jianshu.com/p/10e8eb9bdaa5
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
http://www.ruanyifeng.com/blog/2015/07/flex-examples.html
弹性盒模型介绍
ReactNative中使用Flexbox

可以给组件指定flex，flex的值是数字。
flex：1表示，组件可以撑满父组件所有的剩余空间，同时存在多个并列的子组件，flex：1，均分

如果这些并列的子组件的flex值不一样，则谁的值更大，谁占据剩余空间的比例就更大（即占据剩余空间的比等于并列组件间flex值的比）

## View组件

在web开发中，div是最重要的一个元素，是页面布局的基础。在ReactNative开发中，View组件的作用类似于div，是最基本的组件，被看做是容器组件

## 参数或者函数
this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。

this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children的时候要小心。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

## 理解虚拟DOM：

虚拟 DOM 是在 DOM 的基础上建立了一个抽象层，我们对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟 DOM，最后再批量同步到 DOM 中。React 会在内存中维护一个虚拟 DOM 树，当我们对这个树进行读或写的时候，实际上是对虚拟 DOM 进行的。当数据变化时，然后 React 会自动更新虚拟 DOM，然后拿新的虚拟 DOM 和旧的虚拟 DOM 进行对比，找到有变更的部分，得出一个Patch，然后将这个 Patch 放到一个队列里，最终批量更新这些 Patch 到 DOM 中。

这样的机制可以保证即便是根节点数据的变化，最终表现在 DOM 上的修改也只是受这个数据影响的部分，可以保证非常高效的渲染。



## 常用属性或者函数

{props.children}

- `props和组合`在保证安全的前提下灵活的为您提供了任何你想要的组件外观以及行为。请记住`组件接收任何的props。包括原始值、React元素以及函数。`

- 如果要在组件之间`重用非UI功能，我们建议将其提取到单独的JavaScript模块中`。 组件可以导入它并使用该函数，对象或类，而不是扩展。

- 组件中的render方法返回 null 时，不会影响生命周期方法的触发。
- 要编写一个`非受控组件`，而非为每个状态更新编写事件处理程序，你可以 使用 `ref 从 DOM 获取表单值`。
https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/ （非受控和受控）
- 使用非受控组件时，通常你希望 React `可以为其指定初始值`，但不再控制后续更新。要解决这个问题，你可以指定一个 `defaultValue` 属性而不是 value。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

## ref


react.children.map


## 要记住几个点：

- JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
- React.js 可以用 JSX 来描述你的组件长什么样的。
- JSX 在编译的时候会变成相应的 JavaScript 对象描述。
- react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。
- 如果你在`表达式插入里面返回 null ，那么 React.js 会什么都不显示`，相当于忽略了该表达式插入。
- 自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。
- 不能改变一个组件被渲染的时候传进来的 props，每个组件都可以接受一个 props 参数，它是一个对象，包含了所有你对这个组件的配置。如果 props 渲染过程中可以被修改，那么就会导致这个组件显示形态和行为变得不可预测，这样会可能会给组件使用者带来困惑。但这并不意味着由 props 决定的显示形态不能被修改。组件的使用者可以`主动地通过重新渲染的方式把新的 props 传入组件当中`，这样这个组件中由 props 决定的显示形态也会得到相应的改变。
```
比如：
<LikeButton
likedText={this.state.likedText}
unlikedText={this.state.unlikedText} />
由于 setState 会导致 Index 重新渲染，所以 LikedButton 会接收到新的 props，并且重新渲染，于是它的显示形态也会得到更新
```
- 对于用表达式套数组罗列到页面上的元素，都要`为每个元素加上 key 属性`，这个 key 必须是每个元素唯一的标识。

## 为什么不直接从 JSX 直接渲染构造 DOM 结构，而是要经过中间这么一层呢？
第一个原因是，`当我们拿到一个表示 UI 的结构和信息的对象以后，不一定会把元素渲染到浏览器的普通页面上，我们有可能把这个结构渲染到 canvas 上，或者是手机 App 上`。所以这也是为什么会要把 react-dom 单独抽离出来的原因，可以想象有一个叫 react-canvas 可以帮我们把 UI 渲染到 canvas 上，或者是有一个叫 react-app 可以帮我们把它转换成原生的 App（实际上这玩意叫 ReactNative）。

第二个原因是，有了这样一个对象。当数据变化，需要更新组件的时候，就可以`用比较快的算法操作这个 JavaScript 对象`，而不用直接操作页面上的 DOM，这样可以尽量少的减少浏览器重排，极大地优化性能。这个在以后的章节中我们会提到。

## this
如果你想`在事件函数当中使用当前的实例`，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js。
```
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this) ; //打印出当前实例
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
    )
  }
}

```
`bind 会把实例方法绑定到当前实例上`，然后我们再把绑定后的函数传给 React.js 的 onClick 事件监听。这时候你再看看，点击 h1 的时候，就会把当前的实例打印出来：

```
class Title extends Component {
  handleClickOnTitle (e) {
    console.log(this); // => null or undefined
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle}>React 小书</h1>
    )
  }
}
```
你也可以在 bind 的时候给事件监听函数传入一些参数：

```
class Title extends Component {
  handleClickOnTitle (word, e) {
    console.log(this, word)
  }

  render () {
    return (
      <h1 onClick={this.handleClickOnTitle.bind(this, 'Hello')}>React 小书</h1>
    )
  }
}
```
## 时间监听
为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 on* 方法即可。

React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。

React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。

## 我的理解
React在MVC里就是V，至于M和C怎么实现随便，不过React自己也有管理状态的功能，对小项目不用MVC框架也行。
React就是view，如果要用到MVC模式中的话，应该是前后端分离的吧，那么MC应该放在后端。
现在都是前后端分离+RESTful，那么数据处理应该在前端。

代码直接github搜.net+reactReact 只是view层,但是可以通过React社区配套的redux等拓展,React并不强制规定你如何选择.
是否由React直接处理数据取决于项目大小,中大型项目或者以后立志于发展成一个中大型项目的建议上redux,如果只是想快速做一个玩具出来直接可以在React处理,因为引入redux这种东西成本还是挺大的(代码啰嗦,但是条理清晰,越是大项目它的优势越明显).
目前react开发标配就是react+redux(mobx),redux负责关于数据大部分的东西,react专注view.

提取公共传入的部分

**dispatch**
调用dispatch，除了会调用数据修改，还会调用listeners数组里面的函数，然后一个个地去调用。
```
function createStore (state, stateChanger) {
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    stateChanger(state, action)
    listeners.forEach((listener) => listener())
  }
  return { getState, dispatch, subscribe }
}
相当于我们可以通过 subscribe 传入数据变化的监听函数，每当 dispatch 的时候，监听函数就会被调用，这样我们就可以在每当数据变化时候进行重新渲染

const store = createStore(appState, stateChanger)
store.subscribe(() => renderApp(store.getState()))

renderApp(store.getState()) // 首次渲染页面
store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) // 修改标题文本
store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }) // 修改标题颜色
// ...后面不管如何 store.dispatch，都不需要重新调用 renderApp
```

优化思路：先context全局变量，担心会被污染获取值的时候，不是自己想要的值。然后考虑用action，
因为没变化的值也会重新渲染，所以需要加判断条件，假如变化了才渲染，还有状态变化不影响上一次的状态，需要用浅复制对象引用的方式（扩展运算符）。

state和stateChanger合并的思想很好，设置初始state为null，触发dispatch，这样就会触发stateChanger中default （见 http://huziketang.mangojuice.top/books/react/lesson34）
stateChanger其实就是reducer，是一个纯函数，接受state和action参数。reducer `是不允许有副作用的`。你不能在里面操作 DOM，也不能发 Ajax 请求，更不能直接修改 state，它要做的`仅仅是 —— 初始化和计算新的 state`。

```
套路：
// 定一个 reducer
function reducer (state, action) {
  /* 初始化 state 和 switch case */
}

// 生成 store
const store = createStore(reducer)

// 监听数据变化重新渲染页面
store.subscribe(() => renderApp(store.getState()))

// 首次渲染页面
renderApp(store.getState()) 

// 后面可以随意 dispatch 了，页面自动更新
store.dispatch(...)
```
```
function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
<!--dispatch会调用reducer返回新的state-->
```
## React-redux分析

subscribe不要忘记写，但是仅仅是初始化的时候写一遍，因为调用dispatch会自动调用subscribe

redux原理是把 store 放到  context 里面
```
 getChildContext () {
    return { store }
  }
```
可以把一些可复用的逻辑放在高阶组件当中，`高阶组件包装的新组件和原来组件之间通过 props 传递信息`，减少代码的重复程度。

如果一个组件的渲染`只依赖于外界传进去的 props 和自己的 state`，而并不依赖于其他的外界的任何数据，也就是说像纯函数一样，给它什么，它就吐出（渲染）什么出来。这种组件的复用性是最强的。
高阶组件和 context 打交道，把里面数据取出来通过 props 传给 Dumb 组件。


`每个传进去的组件需要 store 里面的数据都不一样的`，所以除了给高阶组件传入 Dumb 组件以外，还需要告诉高级组件我们需要什么数据，高阶组件才能正确地去取数据。为了解决这个问题，我们可以给高阶组件传入类似下面这样的函数：
```
const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
    themeName: state.themeName,
    fullName: `${state.firstName} ${state.lastName}`
    ...
  }
}
```
这个函数会`接受 store.getState() 的结果作为参数，然后返回一个对象，这个对象是根据 state 生成的。mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据`，然后可以把这个函数的返回结果传给被包装的组件：

```
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    render () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState())
      // {...stateProps} 意思是把这个对象里面的属性全部通过 `props` 方式传递进去
      return <WrappedComponent {...stateProps} />
    }
  }

  return Connect
}
把 store 里面的数据取出来通过 props 传给 WrappedComponent
```

`connect 现在是接受一个参数 mapStateToProps，然后返回一个函数`，这个返回的函数才是高阶组件。它会接受一个组件作为参数，然后用 Connect 把组件包装以后再返回。 connect 的用法是：
```

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}
Header = connect(mapStateToProps)(Header)

```
http://huziketang.mangojuice.top/books/react/lesson38 和 http://huziketang.mangojuice.top/books/react/lesson37 代码对比，很快能明白mapStateToProps的用法

```
export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = { allProps: {} }
    }

    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    <!--_updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
      this.setState({
        allProps: { // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...this.props
        }
      })
    }-->
    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps
        ? mapStateToProps(store.getState(), this.props)
        : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch, this.props)
        : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    <!--把store.dispatch 作为参数传给 mapDispatchToProps ，它会返回一个对象 dispatchProps-->

    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }

  return Connect
}
把 stateProps 和 this.props 合并到 this.state.allProps 里面。mapStateToProps 也发生点变化，它现在可以接受两个参数了，我们会把传给 Connect 组件的 props 参数也传给它，那么它生成的对象配置性就更强了，我们可以根据 store 里面的 state 和外界传入的 props 生成我们想传给被包装组件的参数。
```

Provider会把外界传给它的 props.store 放到 context，这样子组件 connect 的时候都可以获取到。

## 写法
<!--两种写法，用单引号括起来会变成字符串-->
```
<div class={`reslut-container  ${this.state.answered ? 'active' : 'notActive'} `}>

<div class={`reslut-container  ${`${this.state.answered}`=='true' ? 'active' : 'notActive'} `}>
```