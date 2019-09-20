react-router文档: https://github.com/ReactTraining/react-router/tree/v3/docs
https://github.com/ReactTraining/react-router/tree/v3/examples

https://reacttraining.com/react-router/web/api/HashRouter  实例或者说明
https://reacttraining.com/react-router/web/guides/philosophy

https://github.com/ReactTraining/react-router
https://reacttraining.com/react-router/

http://react-guide.github.io/react-router-cn/docs/API.html  中文api文档
# React Router 3 API Reference


## Components

##### `createElement(Component, props)`
When the router is ready to render a branch of route components, it will use this function to create the elements. You may want to take control of creating the elements when you're using some sort of data abstraction, like setting up subscriptions to stores, or passing in some sort of application module to each component via props.

当路由器准备呈现路由组件的一个分支时，它将使用这个函数来创建元素。当您使用某种数据抽象时，您可能想要控制创建元素，比如设置订阅到商店，或者通过道具将某种应用程序模块传递给每个组件。
```js
<Router createElement={createElement} />

// default behavior
function createElement(Component, props) {
  // make sure you pass all the props in!
  return <Component {...props} />
}

// maybe you're using something like Relay
function createElement(Component, props) {
  // make sure you pass all the props in!
  return <RelayContainer Component={Component} routerProps={props} />
}
```


## Utilities

### `match({ routes, location, [history], [...options] }, cb)`

This function is to be used for server-side rendering. It matches a set of routes to a location, without rendering, and calls a `callback(error, redirectLocation, renderProps)` when it's done.

此函数将用于服务器端呈现。它将一组路由匹配到一个位置，而不呈现，并在完成时调用回调(错误、重定向位置、renderProps)。

The function will create a `history` for you, passing the additional `options` along to create it. These options can include `basename` to control the base name for URLs, as well as the pair of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing. You can also pass in an already instantiated `history` object, which can be constructed however you like.

该函数将为您创建一个历史记录，并通过其他选项来创建它。这些选项可以包括basename来控制url的基本名称，以及用于控制查询字符串解析和序列化的parseQueryString和stringifyQuery。您还可以传入已实例化的历史对象，它可以根据您的喜好构建。

The three arguments to the callback function you pass to `match` are:
- `error`: A Javascript `Error` object if an error occurred, `undefined` otherwise.
- `redirectLocation`: A [Location](/docs/Glossary.md#location) object if the route is a redirect, `undefined` otherwise.
- `renderProps`: The props you should pass to the routing context if the route matched, `undefined` otherwise.

If all three parameters are `undefined`, this means that there was no route found matching the given location.

*Note: You probably don't want to use this in a browser unless you're doing server-side rendering of async routes.*
###  Redirect组件 

有些时候，我们匹配一个路径，但是可能这个路径，我们更希望它指向一个新的展示界面，而不是它原本的路径匹配界面。
Redirect组件的必须属性是to属性，表示重定向的新地址。

Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.
呈现一个<重定向>将导航到一个新的位置。新的位置将覆盖历史堆栈中的当前位置，比如服务器端重定向(HTTP 3xx)。


注意:这个包为React Router提供了核心路由功能，但是您可能不想直接安装它。如果您正在编写一个将在浏览器中运行的应用程序，那么您应该安装反应式路由dom。类似地，如果您正在编写一个React Native应用程序，那么您应该安装response -router- Native。两者都将把堆路由器作为一个依赖项来安装。