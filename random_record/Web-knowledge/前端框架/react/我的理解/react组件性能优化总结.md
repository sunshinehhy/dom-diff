## 性能优化的思路
影响网页性能最大的因素是浏览器的重排(repaint)和重绘(reflow)。

React的Virtual DOM就是尽可能地减少浏览器的重排和重绘。

React的shouldComponentUpdate方法默认都返回true，即始终都会执行render方法，然后做virtual DOM比较，并得出是否需要做真实的DOM更新。这往往会带来许多不必要的渲染。如果shouldComponentUpdate返回false，那么就不再向下执行生命周期方法。

从React渲染过程来看，如何防止不必要的渲染是解决问题的关键。

## 性能优化的具体办法
### 1. 尽量多使用无状态函数构建组件
无状态组件只有props和context两个参数。它不存在state，没有生命周期方法，组件本身即有状态组件构建方法中的render方法。

在合适的情况下，都应该必须使用无状态组件。**无状态组件不会像React.createClass和ES6 class会在调用时创建新实例，它创建时始终保持了一个实例，避免了不必要的检查和内存分配，做到了内部优化。**


### 2. 拆分组件为子组件，对组件做更细粒度的控制
#### 相关重要概念： 纯函数
纯函数的三大构成原则:
- 给定相同的输入，它总是返回相同的输出： 比如反例有 Math.random(), New Date()
- 过程没有副作用：即不能改变外部状态
- 没有额外的状态依赖：即方法内部的状态都只能在方法的生命周期内存活，这意味着不能在方法内使用共享的变量。

纯函数非常方便进行方法级别的测试及重构，它可以让程序具有良好的扩展性及适应性。纯函数是函数式编程的基础。

React组件本身就是纯函数，即传入指定props得到一定的Virtual DOM，整个过程都是可预测的。

#### 具体办法
拆分组件为子组件，对组件做更细粒度的控制。保持纯净状态，可以让方法或组件更加专注(focus)，体积更小(small)，更独立(independent)，更具有复用性(reusability)和可测试性(testability)。



### 3. 运用PureRender，对变更做出最少的渲染
#### 相关重要概念: PureRender
PureRender的Pure即是指满足纯函数的条件，即组件被相同的props和state渲染会得到相同的结果。

在React中实现PureRender需要重新实现shouldComponentUpdate生命周期方法。shouldComponentUpdate是一个特别的方法，它接收需要更新的props和state，其本质是用来进行正确的组件渲染。当其返回false的时候，不再向下执行生命周期方法；当其返回true时，继续向下执行。

组件在初始化过程中会渲染一个树状结构，当父节点props改变的时候，在理想情况下只需渲染一条链路上有关props改变的节点即可；但是，**在默认情况下shouldComponentUpdate方法返回true,React会重新渲染所有的节点**。

有一些官方插件实现了对shouldComponentUpdate的重写，然后自己也可以做一些代码的优化来运用PureRender。

#### 具体办法
##### (1) 运用PureRender
使用官方插件react-addons-pure-render-mixin实现对shouldComponentUpdate的重写
```js
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return <div className={this.props.className}>foo</div>
  }
}
```
它的原理是对object(包括props和state)做浅比较，即引用比较，非