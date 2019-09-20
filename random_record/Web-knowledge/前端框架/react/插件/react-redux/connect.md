在./React-Redux.md中也有一部分文档

connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
连接 React 组件与 Redux store。

`连接操作不会改变`原来的组件类。反而`返回一个新的已与 Redux store 连接的组件类`。

### [mapStateToProps(state, [ownProps]): stateProps] (Function): 
- 如果定义该参数，`组件将会监听 Redux store 的变化`。
- 任何时候，只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
- 该回调函数必须`返回一个纯对象`，`这个对象会与组件的 props 合并`。
- 如果你`省略了这个参数`，你的组件将`不会监听 Redux store`。
- 如果指定了该回调函数中的第二个参数 ownProps，则该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用（例如，当 props 接收到来自父组件一个小小的改动，那么你所使用的 ownProps 参数，mapStateToProps 都会被重新计算）。

注意：在高级章节中，你需要更好地去控制渲染的性能，所用到的 mapStateToProps() 会`返回一个函数`。在这种情况下，那个函数将被作为 mapStateToProps() `在独有的组件实例中调用`。这样就允许你在每一个实例中去记录。你可以参考 #279 去测试和了解其中的详细内容。但在绝大多数的应用中不会用到。

```
const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
//todos会与组件的 props 合并
```
### [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function): 
- 如果`传递的是一个对象`，那么每个定义在该对象的函数都将被当作 Redux action creator，`对象所定义的方法名将作为属性名`；
- 每个方法将`返回一个新的函数`，函数中dispatch方法会将action creator的返回值作为参数执行。
- `这些属性会被合并到组件的 props 中`。
- http://www.redux.org.cn/docs/basics/ExampleTodoList.html  （实例）
- 如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你`也许会用到` Redux 的辅助函数 `bindActionCreators()`）。
- 如果你`省略这个 mapDispatchToProps 参数`，`默认情况下，dispatch 会注入到你的组件 props 中`。
- 如果`指定了该回调函数中第二个参数 ownProps`，该参数的值为`传递到组件的 props`，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。

注意：在高级章节中，你需要更好地去控制渲染的性能，所用到的 mapStateToProps() 会返回一个函数。但在这个例子中，这个函数将被 mapStateToProps() 在独有的组件实例中调用。这样就`允许你在每一个实例中去记录`。你可以参考 #279 去测试和了解其中的详细内容。但在绝大多数的应用中不会用到。

### [mergeProps(stateProps, dispatchProps, ownProps): props] (Function):
 - 如果指定了这个参数，mapStateToProps() 与 mapDispatchToProps() 的`执行结果`和`组件自身的 props` 将传入到这个回调函数中。
 - 该回调函数`返回的对象将作为 props 传递到被包装的组件`中。
 - 你也许`可以用这个回调函数，根据组件的 props 来筛选部分的 state 数据`，或者`把 props 中的某个特定变量与 action creator 绑定在一起`。
 - 如果你`省略这个参数`，`默认`情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。

### [options] (Object) 如果指定这个参数，可以定制 connector 的行为。

- [pure = true] (Boolean): 如果为 true，`connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新`，前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。默认值为 true。
- [withRef = false] (Boolean): 如果为 true，`connector 会保存一个对被包装组件实例的引用`，该引用通过 getWrappedInstance() 方法获得。默认值为 false。

```
export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

//传递对象
const mapDispatchToProps = {
   onTodoClick: id => {
      dispatch(toggleTodo(id))   
    }
}
//传递函数
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
//onTodoClick会被合并到组件的 props 中
//toggleTodo是一个action

```

