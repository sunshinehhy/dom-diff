## bindActionCreators(actionCreators, dispatch)

参看实例便于理解：https://github.com/reduxjs/redux/blob/master/examples/universal/common/containers/App.js   

http://www.redux.org.cn/docs/api/applyMiddleware.html  （可以理解bindActionCreators和进一步理解react-redux）

- 把一个 value 为不同 action creator 的对象，`转成`拥有同名 key 的`对象`。
- actionCreators (Function or Object): `一个 action creator`，`或者一个 value 是 action creator 的对象`。
- 返回值(Function or Object): 一个`与原对象类似的对象`，只不过`这个对象的 value` 都是`会直接 dispatch 原 action creator 返回的结果的函数`。如果传入一个单独的函数作为 actionCreators，那么返回的结果也是一个单独的函数。
- 可以传入一个函数作为第一个参数，它会返回一个函数。传入对象，是返回对象 ，看以上链接实例

```
<!--CounterActions是所有的导出的action-->
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch)   //此处注入了dispatch
}
```

有些实例中这么写：let { dispatch } = this.props;   是由 react-redux 注入的 dispatch


## react
共用同一个组件，但是样式有点不一样，可以通过传入props.
所谓的 JSX 其实就是 JavaScript 对象。
ReactDOM.render 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上（在这里是 id 为 root 的 div 元素）。

