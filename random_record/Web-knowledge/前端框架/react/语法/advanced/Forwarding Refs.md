https://reactjs.org/docs/forwarding-refs.html

## 转发参
Ref转发是一种技术，用于自动将Ref通过组件传递给它的一个子组件。对于应用程序中的大多数组件来说，这通常不是必需的。但是，它对于某些类型的组件是有用的，特别是在可重用的组件库中。最常见的场景描述如下。

将refs转发到DOM组件
考虑一个FancyButton组件，它呈现本机按钮DOM元素:
```
function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  );
}
```
React组件隐藏它们的实现细节，包括它们呈现的输出。使用FancyButton的其他组件通常不需要获取内部按钮DOM元素的ref。这很好，因为它阻止组件过多地依赖于彼此的DOM结构。

尽管这样的封装对于像FeedStory或Comment这样的应用程序级组件来说是可取的，但是对于高度可重用的“叶子”组件(如FancyButton或MyTextInput)来说是不方便的。这些组件在整个应用程序中使用的方式类似于常规的DOM按钮和输入，访问它们的DOM节点对于管理焦点、选择或动画可能是不可避免的。

Ref forwarding是一个可选特性，它允许一些组件获取它们接收到的Ref，并将其传递给子组件(换句话说，“forward”)。

在下面的示例中，FancyButton使用了React。为了获取传递给它的ref，然后将它转发到它所呈现的DOM按钮:
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
通过这种方式，使用FancyButton的组件可以获得指向底层按钮DOM节点的ref并在必要时访问它——就像直接使用DOM按钮一样。

下面是对上面例子中发生的事情的一步一步解释:

1. 我们通过调用React ref来创建一个React ref。将它分配给一个ref变量。
2. 通过将ref指定为JSX属性，我们将ref传递到<FancyButton ref={ref}>。
3. response将ref传递给(props, ref) =>…作为第二个参数在forward dref内函数。
4. 通过将这个ref参数指定为JSX属性，我们将其转发到<button ref={ref}>。
5. 当附加ref时，ref.current将指向<button> DOM节点。

请注意

第二个ref参数仅在定义带有React的组件时存在。forwardRef电话。常规的函数或类组件不接收ref参数，而且在道具中也不提供ref。

Ref转发不限于DOM组件。您也可以将refs转发到类组件实例。

## 组件库维护人员请注意
当您开始在组件库中使用forward dref时，您应该将它视为一个破坏性的更改，并发布一个新的主要库版本。这是因为您的库可能有一个明显不同的行为(比如分配给什么refs，导出什么类型)，这可能会破坏依赖于旧行为的应用程序和其他库。

有条件地应用反应。也不推荐存在forward dref，因为同样的原因:它会改变你的库的行为方式，并在用户升级时破坏他们的应用程序。

## 在高阶组件中转发refs
这种技术对于高阶组件(也称为HOCs)也特别有用。让我们从一个为控制台提供组件支持的例子开始:
```
function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
```
“logProps”特设将所有道具传递到它所包装的组件，因此呈现的输出将是相同的。例如，我们可以使用这个HOC来记录传递给我们的“花哨按钮”组件的所有道具:
```
class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// Rather than exporting FancyButton, we export LogProps.
// It will render a FancyButton though.
export default logProps(FancyButton);
```
上面的例子有一个警告:refs不会被通过。那是因为ref不是道具。和key一样，React的处理方式也不一样。如果向HOC添加ref, ref将引用最外层的容器组件，而不是包装组件。

这意味着用于FancyButton组件的refs实际上将附加到LogProps组件:
```
import FancyButton from './FancyButton';

const ref = React.createRef();

// The FancyButton component we imported is the LogProps HOC.
// Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component!
// This means we can't call e.g. ref.current.focus()
<FancyButton
  label="Click Me"
  handleClick={handleClick}
  ref={ref}
/>;
```
幸运的是，我们可以使用React显式地将refs转发到内部FancyButton组件。forwardRef API。反应。forwardRef接受一个呈现函数，该函数接收道具和ref参数，并返回一个React节点。例如:
```
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```
## 在DevTools中显示自定义名称
反应。forward dref接受呈现函数。React DevTools使用这个函数来确定要为ref转发组件显示什么。

例如，以下组件将在DevTools中显示为“forward dref”:
```
const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref} />;
});
```
如果你给渲染函数命名，DevTools也会包含它的名字(例如“ForwardRef(myFunction)”):
```
const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }
);
```
您甚至可以设置函数的displayName属性来包含正在包装的组件:
```
function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
```