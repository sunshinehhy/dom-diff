https://www.npmjs.com/package/react-router-redux  （下面有好多实例）

实例：
https://github.com/ToNiQian/react-redux-router （实例代码）

https://www.jianshu.com/p/4c52c30193cc  （实例解析）

https://www.jianshu.com/p/d6edfe9b4893

https://github.com/reactGo/reactGo

## 文档
保持你的路由器与应用程序状态同步

在使用Redux和React Router时，不需要这个库。您可以同时使用这两个库，而不需要任何其他库。如果您关心使用时间旅行记录、持久化和回放用户操作，那么它是非常有用的。如果您不关心这些特性，只需直接使用Redux and React Router。

这个库允许您在文件中使用React Router的api。你可以像平常一样使用redux，只有一个应用状态。此库只是对历史实例进行了增强，以允许它将接收到的任何更改同步到应用程序状态。

history + store (redux) → react-router-redux → enhanced history → react-router

Now any time you navigate, which can come from pressing browser buttons or navigating in your application code, the enhanced history will first pass the new location through the Redux store and then on to React Router to update the component tree. If you time travel, it will also pass the new state to React Router to update the component tree again.
现在，每当您导航时(可以通过按浏览器按钮或在应用程序代码中导航)，增强的历史将首先通过Redux存储区传递新位置，然后对路由器进行响应以更新组件树。如果您进行时间旅行，它还将传递新的状态以响应路由器以再次更新组件树。


### How do I access router state in a container component?
React Router provides route information via a route component's props. This makes it easy to access them from a container component. When using react-redux to connect() your components to state, you can access the router's props from the 2nd argument of mapStateToProps:

如何访问容器组件中的路由器状态?
React Router通过`路由组件`(可以抽成成普通组件)的props提供路由信息。这使得从容器组件访问它们变得很容易。使用react-redux connect()组件到状态时，可以从mapStateToProps的第二个参数中访问路由器的props:
```
function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.params.id,
    filter: ownProps.location.query.filter
  };
}
```

You should not read the location state directly from the Redux store. This is because React Router operates asynchronously (to handle things such as dynamically-loaded components) and your component tree may not yet be updated in sync with your Redux state. You should rely on the props passed by React Router, as they are only updated after it has processed all asynchronous code.
`不应该直接从Redux store读取the location state。这是因为React Router是异步操作的(用来处理动态加载的组件)，而且您的组件树可能还没有与Redux状态同步更新。您应该依赖于React Router传递的props，因为它们只有在它处理完所有异步代码之后才会更新。`

### What if I want to issue navigation events via Redux actions?
React Router provides singleton versions of history (browserHistory and hashHistory) that you can import and use from anywhere in your application. However, if you prefer Redux style actions, the library also provides a set of action creators and a middleware to capture them and redirect them to your history instance.
如果我想通过Redux actions发出导航事件，该怎么办?
React Router提供单例历史(browserHistory和hashHistory)版本，您可以从应用程序的任何地方导入和使用它们。但是，如果您喜欢Redux样式的操作，库还提供了一组操作创建者和一个中间件来捕获它们并将它们重定向到历史实例。

```
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerMiddleware, push } from 'react-router-redux'
 
// Apply the middleware to the store
const middleware = routerMiddleware(browserHistory)
const store = createStore(
  reducers,
  applyMiddleware(middleware)
)
 
// Dispatch from anywhere like normal.
store.dispatch(push('/foo'))
```