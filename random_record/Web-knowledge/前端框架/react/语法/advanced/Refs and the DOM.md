https://reactjs.org/docs/refs-and-the-dom.html

Refs提供了在render方法中访问DOM节点或创建的react元素的方法。

在典型的React dataflow中，props是父组件与其子组件交互的唯一方式。要修改一个孩子，你需要用新的props重新渲染它。但是，在一些情况下，您需要在典型的dataflow之外强制地修改子节点。要修改的子元素可以是React组件的实例，也可以是DOM元素。对于这两种情况，React都提供了一个逃生出口。

## 何时使用Refs
refs有几个很好的用例:
- 管理焦点、文本选择或媒体播放。
- 触发命令动画。
- 与第三方DOM库集成。
避免对任何可以以声明方式完成的事情使用refs。

例如，与其在对话框组件上公开open()和close()方法，不如将isOpen道具传递给它。

## 不要过度使用Refs
你的第一倾向可能是使用refs在你的应用程序中“让事情发生”。如果是这样，花点时间，更批判性地思考一下，在组件层次结构中，状态应该属于什么。通常，很明显，“拥有”该状态的适当位置位于层次结构的更高级别。参见“提升状态向上指南”中的示例。

请注意：下面的示例已经更新为使用React. createref () API。如果您正在使用早期的React版本，我们建议您使用回调refs。

## Creating Refs
Refs是使用React.createRef()创建的，并通过ref属性附加到反应式元素上。在构建组件时，通常将Refs分配给实例属性，以便在整个组件中引用它们。
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

## Accessing Refs
当将ref传递给呈现的元素时，在ref的当前属性中可以访问该节点的引用。
const node = this.myRef.current;

ref的值取决于节点的类型:

- 当在HTML元素上使用ref属性时，在构造函数中用ref.createref()创建的ref接收底层的DOM元素作为其当前属性。
- 当在自定义类组件上使用ref属性时，ref对象将接收组件的挂载实例作为其当前对象。
- 您可能不会在函数组件上使用ref属性，因为它们没有实例。
下面的示例演示了差异。

### 向DOM元素添加Ref

此代码使用ref存储对DOM节点的引用:
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />

        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```