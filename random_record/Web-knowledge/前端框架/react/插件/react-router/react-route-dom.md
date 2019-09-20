https://reacttraining.com/react-router/

https://reacttraining.com/react-router/web/api/Route   (api用法，重要)

react-router-dom优雅的实现页面(路由)跳转, 而且保持当前页面状态

import { BrowserRouter, Route, Link } from 'react-router-dom'   //应放在顶处，否则会报错

## 我的理解
见实例：https://github.com/sunhannie/redux-async-fetch
此插件代替了低版本react-route
```
使用import { Router, IndexRoute, Route, browserHistory} from 'react-router'  会报以下错误
/**
 * index.js:2178 Warning: Failed prop type: The prop `history` is marked as required in `Router`, but its value is `undefined`.
 * 
 * browserHistory不是V4中的东西，所以会报错。它是V3的东西；最后面换成import 'react-router-dom'就能行得通
 */
 ```
```
 import { BrowserRouter as Router, Route } from 'react-router-dom'

 class Root extends Component {
    render() {
        return (
        <Router>
            <div>
                <Route exact path="/" component={App}/>
                <Route path="/about" component={About}/>
            </div>
        </Router>
        )
    }
}
export default Root
```
 假如不用BrowserRouter但是在其他地方用了link，报错：You should not use <Link> outside a <Router>

 ## 知识点
basename:
所有位置的基本URL。如果您的应用程序是从服务器上的子目录中服务的，您将希望将其设置为子目录。一个正确格式化的basename应该有一个领先的斜杠，但是`没有尾斜杠`。
```
<BrowserRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="/calendar/today">
```

forceRefresh:bool
如果为真，路由器将在页面导航上使用完整的页面刷新。您可能只想在不支持HTML5历史API的浏览器中使用它。

 ### <HashRouter>

使用URL的散列部分(即window.location.hash)来保持UI与URL同步的一个<路由器>。
```
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
```

### <Route>
Route render methods：

<Route component>
<Route render>
<Route children>
每个在不同的情况下都是有用的。在给定的<Route>中，您应该只使用其中的一个props。请参阅下面的解释，了解为什么有3个选项。大部分时间您将使用component。

### <Router>
<Router>是所有路由器组件的通用low-level 接口。通常，应用程序将使用高级路由器之一:
<BrowserRouter>
<HashRouter>
<MemoryRouter>
<NativeRouter>
<StaticRouter>

使用低级<Router>的最常见的用例是`与一个状态管理库，比如Redux或Mobx，同步一个自定义历史`。请注意，这并不需要使用状态管理libs与React Router一起使用，它只用于深度集成。
```
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

### <StaticRouter>
一个从不改变location的路由器。
This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.
Here’s an example node server that sends a 302 status code for <Redirect>s and regular HTML for other requests:
当用户没有实际点击时，这在服务器端呈现场景中是很有用的，所以location永远不会发生变化。因此,名称:静态的。当您只需要插入一个位置并在呈现输出上做出断言时，它在简单的测试中也很有用。
这里有一个示例节点服务器，它发送了一个302状态代码，用于<重定向>s和其他请求的常规HTML:
实例见api文档

### <Switch>
Renders the first child <Route> or <Redirect> that matches the location.
How is this different than just using a bunch of <Route>?

<Switch>是唯一的，它只呈现一条路由。相比之下，每一个与location相匹配的<Route> 都包含在内。考虑这段代码  (理解不是很深)
```
import { Switch, Route } from 'react-router'

<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```

## 我的理解
Link负责路由选择，Route负责视图展示
https://blog.csdn.net/mapbar_front/article/details/79605346