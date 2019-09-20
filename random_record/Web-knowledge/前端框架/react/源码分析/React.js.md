https://github.com/facebook/react/tree/master/packages/react

Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_AsyncMode: REACT_ASYNC_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

## ReactNoopUpdateQueue.js

ReactNoopUpdateQueue

enqueueForceUpdate :function(publicInstance,callback,callerName,)
  迫使一个更新。只有当确定我们不在DOM事务中时，才应该调用它。当你知道组件的状态已更改，但未调用“setState”这些些更深层次的东西时，你可能会调用它。
   This will not invoke `shouldComponentUpdate`, but it will invoke `componentWillUpdate` and `componentDidUpdate`.

enqueueReplaceState :function(publicInstance,partialState,callback,callerName,)
*替换所有的状态。总是使用这个或' setState '来改变状态。
你应该对待`this.state`为immutable。
*无法保证 `this.state` 会立即更新，所以调用此方法之后访问`this.state`可能返回旧值。

enqueueSetState :function(publicInstance,partialState,callback,callerName,)
设置state的子集。之所以存在，是因为_pendingState是内部的。这提供了令人困惑的深度属性不可用的合并策略
*TODO:在合并期间暴露pendingState或不要使用它

## forwardRef.js
function forwardRef<Props, ElementType: React$ElementType>(
  render: (props: Props, ref: React$ElementRef<ElementType>) => React$Node,
) 

## ReactElementValidator.js
ReactElementValidator为元素工厂提供一个包装器
验证传递给元素的props。这目的只在开发中使用，可以用支持它的语言的静态类型检查器代替。

## ReactChildren.js
Escape and wrap 键，当使用作为reactid，使它是安全的
TODO:测试单个子元素和一个项目的数组是否具有相同的键模式。

这个函数的当前实现假设一个子函数在没有包装器的情况下被传递，但是这个助手函数的目的是抽象出子函数的特定结构。
## ReactBaseClasses.js
Component.prototype.setState = function(partialState, callback)
无法保证调用`this.state`会同步运行，因为它们最终可能会被打包在一起。您可以提供一个可选选项callback，在调用setState完成是执行。

*当一个函数被提供给setState时，它在未来(不同步)将被调用。它将在最新的组件参数(state, props, context)的时候被调用。这些值从this可能是不同的。*因为你的函数可能在收到props后调用，但在收到props前调用shouldComponentUpdate，以及这个新的状态、道具和上下文将不会再分配给这个。

Component.prototype.forceUpdate= function(callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

//避免对这些方法进行额外的原型跳转。
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

## ReactElement.js
 RESERVED_PROPS保留的道具

 创建新React元素的Factory方法。这一点不再坚持类模式，所以不要使用new调用它。同样,没有instanceof检查
将工作。相反，对Symbol.for(“react.element”)测试$typeof字段，以检查某个东西是否是一个React元素。
self: 临时助手，当React.createElement被调用，用于检测“this”与“owner”不同的地方。以便我们可以发出警告。我们想摆脱所有者，用箭头函数替换字符串' ref ' s，只要' this '和owner相同，行为就不会改变。

验证标志目前是可变的。我们把它放在一个外部后备存储器上，这样我们就可以把整个物体都冷冻起来。一旦它们在常用的开发环境中实现，就可以用WeakMap替换它。
## ReactCurrentOwner.js
跟踪当前的所有者。

当前所有者是应该拥有目前正在建造任何组件的组件。

## ReactDebugCurrentFrame.js
正在处理的组件