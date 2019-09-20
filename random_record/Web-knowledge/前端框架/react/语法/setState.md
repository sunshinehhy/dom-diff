如果直接操作的state对象需要调用forceUpdate方法 如果用setState 就会自动重新渲染的。

状态（state） 和 属性（props） 类似，都是一个组件所需要的一些数据集合，但是`它是私有的`，并且由组件本身完全控制，可以认为它是`组件的“私有属性（或者是局部属性）”。`

## 关于 setState() 有三件事
1. 不要直接修改 state(状态)
```
this.state.comment = 'Hello';
```
上述代码并不会重新渲染组件，需要使用this.setState()代替：
```
this.setState({
  comment: 'Hello'
});
```
需要注意的是`唯一可以分配 this.state 的地方是构造函数`。

2. state(状态) 更新可能是异步的
React 为了优化性能，有`可能会将多个 setState() 调用合并为一次更新`。
因为this.props和this.state `可能是异步更新的，你不能依赖他们的值计算下一个state(状态)`。以下面的代码为例:
```
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

我们并不能通过上述代码得到想要的值，为了弥补这个问题，使用另一种 setState() 的形式，`接受一个函数。这个函数将接收前一个状态作为第一个参数`，应用更新时的 props 作为第二个参数，代码如下：
```
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```

3. state(状态)更新会被合并

当你调用 setState()， React 将`合并你提供的对象到当前的状态中`。所以`当State是一个多键值的结构`时，`可以单独更新其中的一个`，此时会进行“差分”更新，不会影响其他的属性值。

三、setState()的异步更新。

1. 执行setState()之后干了什么？

setState()方法`通过一个队列机制实现state更新`，当执行setState()的时候，会将需要更新的state`合并之后放入状态队列`，而`不会立即更新this.state`(可以和浏览器的事件队列类比)。如果我们不使用setState而是使用this.state.key来修改，将不会触发组件的re-render。如果将this.state赋值给一个新的对象引用，那么其他不在对象上的state将不会被放入状态队列中，当下次调用setState()并对状态队列进行合并时，直接造成了state丢失。

2. setState()可以接受一个函数作为参数？

setState() `不仅能够接受一个对象作为参数，还能够接受一个函数作为参数`。函数的参数即为 state 的前一个状态以及 props。
React文档中对setState的说明如下：
```
void setState (
      function|object nextState,
      [function callback]
)
```
上述代码的第二个参数是一个回调函数，在setState() 的`异步操作结束并且组件已经重新渲染的时候执行`。换句话说，我们可以通过这个回调来拿到更新的state的值。

3. 执行setState()后能拿到最新的state值吗？

以前在写代码时候，总是遇到明明执行过setState()，但是state的值却不是最新的，那么如何解决这个问题呢？

因为setState()函数接受两个参数，一个是一个对象，就是设置的状态，还有一个是一个回调函数，是`在设置状态成功之后执行的`，所以我们可以通过回调拿到最新的state值。代码如下：
```
updateData = (newData) => {
    this.setState(
        { data: newData },
        () => {
            //这里打印的是最新的state值
            console.log(that.state.data);
        }
    );
}

```
4. setState()一定是异步更新吗？
```
function incrementMultiple() {
      this.setState({count: this.state.count + 1});
      this.setState({count: this.state.count + 1});
      this.setState({count: this.state.count + 1});
}
```
直观上来看，当上面的 incrementMultiple 函数被调用时，组件状态的 count 值被增加了3次，每次增加1，那最后 count 被增加了3。但是，实际上的结果只给 state 增加了1。

事实上，setState 方法与包含在其中的执行是一个很复杂的过程，从 React 最初的版本到现在，也有无数次的修改。它的工作除了要更动 this.state 之外，还要负责触发重新渲染，这里面要经过 React 核心 diff 算法，最终才能决定是否要进行重渲染，以及如何渲染。而且为了批次与效能的理由，多个 setState 呼叫有可能在执行过程中还需要被合并，所以它`被设计以延时的来进行执行是相当合理的`。

`在 React 的 setState 函数实现中，会根据一个变量 isBatchingUpdates 判断是直接更新 this.state 还是放到队列中回头再说，而 isBatchingUpdates 默认是 false，也就表示 setState 会同步更新 this.state，但是，有一个函数 batchedUpdates，这个函数会把 isBatchingUpdates 修改为 true，而当 React 在调用事件处理函数之前就会调用这个 batchedUpdates，造成的后果，就是由 React 控制的事件处理过程 setState 不会同步更新 this.state`

由 React 控制的事件处理过程 setState 不会同步更新 this.state！
也就是说，在 React 控制之外的情况， setState 会同步更新 this.state！

但大部份的使用情况下，我们都是使用了 React 库中的表单组件，例如 select、input、button 等等，它们都是 React 库中人造的组件与事件，是处于 React 库的控制之下，比如组件原色 onClick 都是经过 React 包装。`在这个情况下，setState 就会以异步的方式执行`。

## 注意
https://segmentfault.com/a/1190000008271880

1. `和渲染无关的状态尽量不要放在state中来管理`，通常state中只来管理和渲染有关的状态，从而保证setState改变的状态都是和渲染有关的状态。

2. 避免不必要的修改，当state的值没有发生改变的时候，`尽量不要使用setState`。虽然shouldComponentUpdate和PureComponent可以避免不必要的重复渲染，但是还是增加了一层shallowEqual的调用，造成多余的浪费。

3. setState是不保证同步的

4. 传入对应的参数，不通过this.state获取，使用回调函数或者使用setTimeout

## 进一步分析
http://huziketang.mangojuice.top/books/react/lesson10
当你调用 setState 的时候，React.js `并不会马上修改 state。而是把这个对象放到一个更新队列里面`，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。
```
  handleClickOnLikeButton () {
    console.log(this.state.isLiked)
    this.setState({
      isLiked: !this.state.isLiked
    })
    console.log(this.state.isLiked)
  }
发现两次打印的都是 false，即使我们中间已经 setState 过一次了。这并不是什么 bug，只是 React.js 的 setState 把你的传进来的`状态缓存起来，稍后才会帮你更新到 state 上`。
```
利用上一次 setState 结果进行运算:接受一个函数作为参数。
同时进行了多次 setState，但是实际上组件只会重新渲染一次。这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都`进行合并以后再重新渲染组件`。
在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题。
```
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: 0 }
    })
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 最后的结果是 this.state.count 为 3
  }
只会出来3，进行一次渲染
```

https://baijiahao.baidu.com/s?id=1591092958596263955&wfr=spider&for=pc