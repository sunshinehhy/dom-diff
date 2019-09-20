### findDOMNode
<https://reactjs.org/docs/react-dom.html#finddomnode>

```
ReactDOM.findDOMNode(component)
```

### render()

### unmountComponnetAtNode()
Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

从DOM中删除挂起的响应组件，并清理其事件处理程序和状态。如果容器中没有安装组件，则调用此函数将不执行任何操作。如果组件未安装，返回true，如果没有组件卸载，则为false。

### hydrate()
Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.

与render()相同，但用于hydrate a container，该容器的HTML内容是由ReactDOMServer呈现的。React将尝试将事件监听器附加到现有的标记。

### findDOMNode()
- ReactDOM.findDOMNode(component)
If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. In most cases, you can attach a ref to the DOM node and avoid using findDOMNode at all.

如果该组件被安装到DOM中，则返回相应的本机浏览器DOM元素。该方法对于从DOM中读取值非常有用，比如表单字段值和执行DOM度量。在大多数情况下，您可以将ref附加到DOM节点，并避免使用findDOMNode。


When a component renders to null or false, findDOMNode returns null. When a component renders to a string, findDOMNode returns a text DOM node containing that value. As of React 16, a component may return a fragment with multiple children, in which case findDOMNode will return the DOM node corresponding to the first non-empty child.

当一个组件呈现为null或false时，findDOMNode返回null。当一个组件呈现给一个字符串时，findDOMNode将返回包含该值的文本DOM节点。在React 16中，一个组件可能会返回一个带多个子节点的片段，在这种情况下，findDOMNode将返回对应于第一个非空子节点的DOM节点。

findDOMNode is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction.

findDOMNode only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling findDOMNode() in render() on a component that has yet to be created) an exception will be thrown.

findDOMNode cannot be used on functional components.

findDOMNode是一个用于访问底层DOM节点的转义窗口。在大多数情况下，使用这个逃生舱口是不鼓励的，因为它刺穿了组件的抽象。


findDOMNode只对挂载的组件(即已被放置在DOM中的组件)进行工作。如果您试图在尚未安装的组件上调用该组件(比如在尚未创建的组件上调用findDOMNode())，将会抛出一个异常。


findDOMNode不能用于功能组件。

### createPortal()

- ReactDOM.createPortal(child, container)

Creates a portal. Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component.

创建一个门户。门户提供了一种方法，将子节点呈现在DOM组件的层次结构之外的DOM节点中。