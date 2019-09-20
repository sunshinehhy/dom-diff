https://reactjs.org/docs/code-splitting.html

## Bundling
大多数React应用都会使用Webpack或Browserify之类的工具将文件“捆绑”起来。绑定是跟踪导入文件并将其合并到单个文件中的过程:“bundle”。然后可以将这个包包含在网页上，同时加载整个应用程序。
```
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
// math.js
export function add(a, b) {
  return a + b;
}
```
Bundle:
```
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```
注意:你的包最终看起来会和这个大不相同。

如果你用的是Create React App，Next.js, Gatsby或者类似的工具，你将会有一个Webpack设置来打包你的应用。

如果没有，您需要设置绑定自己。例如，在Webpack文档中查看安装和入门指南。

## 代码分离
捆绑销售很好，但随着应用程序的增长，捆绑销售也会增长。特别是如果您包含大型第三方库。你需要关注你的包中包含的代码，这样你就不会不小心把它弄得太大，以至于你的应用需要很长时间才能加载。

为了避免使用一个大的捆绑包，最好先解决这个问题，然后开始“分割”你的包。代码拆分是一个由bundlers支持的特性，比如Webpack和Browserify(通过factor-bundle)，它可以创建多个bundle，可以在运行时动态加载。

代码分隔应用程序可以帮助你“延迟加载”的事情目前所需的用户,可以极大地提高应用程序的性能。当你没有了整体应用程序的代码量,你避免加载用户可能不需要的代码,并减少了在初始加载所需的代码量。

## import()
在应用程序中引入代码拆分的最佳方式是使用dynamic import()语法。

Before:
```
import { add } from './math';

console.log(add(16, 26));
```
After:
```
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
动态导入()语法是一种ECMAScript (JavaScript)建议，而不是当前语言标准的一部分。它有望在不久的将来被接受。

当Webpack遇到这种语法时，它会自动地开始拆分你的应用程序。从盒子中它在Next.js中也被支持。

如果您正在自己设置Webpack，您可能需要阅读Webpack关于代码分割的指南。你的Webpack配置应该大致像这样。

在使用Babel时，您需要确保Babel能够解析动态导入语法，但不进行转换。为此，您将需要babel-plugin-syntax-dynamic-import。

## Libraries

- React Loadable
React Loadable将动态导入封装在一个友好的API中，用于在给定组件的应用程序中引入代码分割。

Before:
```
import OtherComponent from './OtherComponent';

const MyComponent = () => (
  <OtherComponent/>
);
```
After:
```
import Loadable from 'react-loadable';

const LoadableOtherComponent = Loadable({
  loader: () => import('./OtherComponent'),
  loading: () => <div>Loading...</div>,
});

const MyComponent = () => (
  <LoadableOtherComponent/>
);
```
React Loadable可以帮助您创建加载状态、错误状态、超时、预加载等等。它甚至可以帮助您在服务器端呈现具有大量代码分割的应用程序。

## 基于路径的代码分离
决定在应用程序中引入代码拆分的位置可能有点棘手。您希望确保您选择的位置将均匀地分割包，但不会破坏用户体验。

一个好的起点是路线。web上的大多数人都习惯于页面转换，需要花费一定的时间来加载。您还倾向于同时重新呈现整个页面，因此您的用户不太可能同时与页面上的其他元素交互。

这里有一个例子，说明如何在应用程序中设置基于路由器的代码，使用诸如React Router 和 React Loadable之类的库。

```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./routes/Home'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./routes/About'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
    </Switch>
  </Router>
);
```