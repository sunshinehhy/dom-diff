https://reactjs.org/docs/context.html

## 上下文
上下文提供了一种通过组件树传递数据的方法，而不必在每个级别手工传递道具。

在典型的React应用程序中，数据是通过prop自上而下(父到子)传递的，但对于应用程序中许多组件需要的某些类型的prop(比如locale preference、UI theme)来说，这可能比较麻烦。上下文提供了一种方法，可以在组件之间共享这些值，而不必显式地通过树的每个级别传递一个prop。

## 何时使用上下文
上下文被设计为共享可以被认为是react组件树的“全局”的数据，例如当前经过身份验证的用户、主题或首选语言。例如，在下面的代码中，我们手动地通过一个“主题”prop来创建按钮组件的样式:
```
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

function ThemedButton(props) {
  return <Button theme={props.theme} />;
}
```
通过上下文，我们可以避免通过中间元素传递道具:
```
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton(props) {
  // Use a Consumer to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <ThemeContext.Consumer>
      {theme => <Button {...props} theme={theme} />}
    </ThemeContext.Consumer>
  );
}
```
请注意:不要仅仅为了避免把道具传下去而使用上下文。在多个级别的多个组件中需要访问相同数据的情况，坚持使用。

## API
- React.createContext
const {Provider, Consumer} = response . createcontext (defaultValue);
创建一个{Provider, Consumer}对。当React呈现上下文使用者时，它将从树中最接近的匹配提供者读取当前上下文值。

只有当使用者在树中没有匹配的提供者时，才使用defaultValue参数。这有助于在不包装组件的情况下对组件进行隔离测试。注意:将未定义的值作为提供者值传递不会导致使用者使用defaultValue。

- Provider
<Provider value={/*某些值*/}>
允许消费者订阅上下文更改的React组件。

接受要传递给该Provider后代的Consumers的值prop。一个Provider可以连接到许多Consumers。提供程序可以嵌套以覆盖树内更深的值。

- Consumer
```
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```
订阅上下文更改的响应组件。

需要一个作为孩子的函数。该函数接收当前上下文值并返回一个React节点。传递给函数的值参数将等于树中最近的提供者的值支柱。如果上面的上下文没有提供程序，那么值参数将等于传递给createContext()的defaultValue。

请注意：有关“作为孩子的功能”模式的更多信息，请参见渲染道具。

当提供者的值支持更改时，提供者的后代都将重新呈现。从提供者到其后代消费者的传播不受shouldComponentUpdate方法的约束，因此即使祖先组件从更新中传出，消费者也会被更新。

更改是通过使用与Object.is相同的算法比较新值和旧值来确定的。

## 实例
看网页
##遗留的API
请注意

使用实验上下文API进行响应。旧的API将在所有16.x版本中得到支持，但是使用它的应用程序应该迁移到新版本。遗留API将在以后的主要React版本中删除。在这里阅读遗留上下文文档。