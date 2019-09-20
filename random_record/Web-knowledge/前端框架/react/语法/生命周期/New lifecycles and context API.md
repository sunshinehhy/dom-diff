https://reactjs.org/blog/2018/03/29/react-v-16-3.html

几天前，我们写了一篇关于遗留生命周期方法即将发生变化的文章，其中包括渐进迁移策略。在React 16.3.0中，我们添加了一些新的生命周期方法来帮助进行迁移。我们还为长期请求的特性引入了新的API:官方上下文API、ref转发API和ergonomic ref API。
继续阅读以了解更多关于版本的信息。

## 官方上下文API
多年来，React公司为context提供了一种实验性API。尽管它是一个强大的工具，但是由于API中固有的问题，以及我们总是打算用一个更好的API来替代实验API，所以不鼓励使用它。

版本16.3引入了一个新的上下文API，它更高效，支持静态类型检查和深度更新。

请注意

旧的上下文API将继续为all React 16服务。x发行版，所以您将有时间迁移。

下面是一个示例，演示如何使用新的上下文API注入“主题”:
```
const ThemeContext = React.createContext('light');

class ThemeProvider extends React.Component {
  state = {theme: 'light'};

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {theme => <Button theme={theme} />}
      </ThemeContext.Consumer>
    );
  }
}
```

## createRef API
以前，React提供了两种管理refs的方法:遗留字符串ref API和回调API。尽管string ref API比这两个更方便，但是它有一些缺点，所以我们的官方建议是使用回调表单。

版本16.3增加了一个管理refs的新选项，提供了字符串ref的便利，没有任何缺点:
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```

注意:

除了新的createRef API外，还将继续支持回调refs。

您不需要替换组件中的回调refs。它们稍微灵活一些，因此它们仍将是高级特性。
https://reactjs.org/docs/refs-and-the-dom.html

## forwardRef API
通常，React组件是声明性的，但有时必须访问组件实例和底层DOM节点。这对于管理焦点、选择或动画等用例来说是很常见的。React公司为解决这一问题提供了参考意见。然而，组件封装对refs带来了一些挑战。

例如，如果您将<button>替换为定制的<FancyButton>组件，其上的ref属性将开始指向包装器组件，而不是DOM节点(对于函数组件将为null)。虽然这对于需要封装的“应用程序级”组件(如FeedStory或注释)来说是可取的，但是对于FancyButton或MyTextInput这样的“叶子”组件(通常与它们的DOM对应组件一样使用)来说就很烦人，并且可能需要公开它们的DOM节点。

Ref转发是一个新的可选特性，它允许一些组件获取它们接收到的Ref，并将其进一步传递给子组件(换句话说，“转发”它)。在下面的示例中，FancyButton将其ref转发给它呈现的DOM按钮:
```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
通过这种方式，使用FancyButton的组件可以获得底层按钮DOM节点的引用并在必要时访问它——就像直接使用DOM按钮一样。

Ref转发并不仅限于呈现DOM节点的“叶子”组件。如果您编写高阶组件，我们建议使用ref转发将ref自动传递到包装的类组件实例。

## Component Lifecycle Changes
React的类组件API已经存在多年，几乎没有什么变化。然而，当我们添加对更高级特性的支持(比如错误边界和即将到来的异步呈现模式)时，我们以一种本不打算的方式扩展了这个模型。

例如，对于当前的API，用非必需的逻辑阻塞初始呈现太容易了。在某种程度上，这是因为完成一项任务有太多的方法，而且不清楚哪一个是最好的。我们注意到，错误处理的中断行为通常没有考虑到，并且可能导致内存泄漏(这也会影响即将到来的异步呈现模式)。当前的类组件API还使其他工作复杂化，比如我们对React编译器原型化的工作。

组件生命周期的子集(componentWillMount、componentWillReceiveProps和componentWillUpdate)加剧了许多此类问题。这些也恰好是导致React社区内最混乱的生命周期。由于这些原因，我们将弃用这些方法而采用更好的替代方法。

我们认识到这种变化将影响许多现有组件。由于这一点，迁移路径将尽可能地缓慢，并将提供逃生舱口。(在Facebook，我们维护超过50,000个React组件。我们也依赖于一个渐进的发布周期!
```
注意:

弃用警告将在未来的16中启用。但是遗留生命周期将继续工作到版本17。

即使在版本17中，仍然可以使用它们，但是它们将被加一个“UNSAFE_”前缀表示可能会引起问题。我们还准备了一个自动脚本，以便在现有代码中重命名它们。
```

除了不安全的生命周期，我们还添加了一些新的生命周期:

getDerivedStateFromProps作为遗留组件willreceiveprops的更安全的替代选项被添加。(请注意，`在大多数情况下，您不需要它们中的任何一个`。)
`正在添加getSnapshotBeforeUpdate以支持在更新之前安全地从DOM读取属性`。

## StrictMode Component
StrictMode是一个工具，用于强调应用程序中的潜在问题。像Fragment一样，StrictMode不会呈现任何可见的UI。它会为后代启动额外的检查和警告。

```
注意:

严格模式检查仅在开发模式下运行;它们不会影响生产构建。
```
虽然严格模式不可能捕获所有问题(例如某些类型的突变)，但它可以帮助解决许多问题。如果您在严格模式下看到警告，这些东西可能会导致异步呈现的bug。

在16.3版中，StrictMode帮助:

1. 识别生命周期不安全的组件
2. 警告遗留字符串ref API的使用
3. 检测意想不到的副作用
在未来的React版本中会添加其他功能。