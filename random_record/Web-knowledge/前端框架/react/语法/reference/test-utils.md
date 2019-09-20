```
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // ES5 with npm
```

## Simulate
```
Simulate.{eventName}(
  element,
  [eventData]
)
```
使用可选的eventData事件数据模拟一个DOM节点上的事件分派。

模拟对每个发生react的事件都有一个方法。(https://reactjs.org/docs/events.html#supported-events)

```
比如：
//点击一元素

// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);


// 更改输入字段的值，然后按ENTER键。

// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

You will have to provide any event property that you’re using in your component (e.g. keyCode, which, etc…) as React is not creating any of these for you.
你需要提供您正在使用您的组件(例如键码,等…)任何事件属性,尽管react不创建任何这些给你。

## enderIntoDocument()
```
renderIntoDocument(element)
```
Render a React element into a detached DOM node in the document. This function requires a DOM.
将一个React元素呈现在文档中的独立DOM节点中。这个函数需要DOM。

Note:You will need to have window, window.document and window.document.createElement globally available before you import React. Otherwise React will think it can’t access the DOM and methods like setState won’t work.

注意:在导入响应之前，你需要有全局变量window, window.document and window.document.createElement，否则，react就会认为它无法访问DOM，而setState这样的方法不起作用。

## mockComponent()
```
mockComponent(
  componentClass,
  [mockTagName]
)
```
Pass a mocked component module to this method to augment it with useful methods that allow it to be used as a dummy React component. Instead of rendering as usual, the component will become a simple <div> (or other tag if mockTagName is provided) containing any provided children.
将mocked component module传递给这个方法，以增加它的有用的方法，允许它作为一个虚拟的React component。该组件将不再像往常一样呈现，而是成为一个简单的<div>(如果提供了mockTagName提供的其他标记)，其中包含任何提供的子元素。
mockComponent() is a legacy API. We recommend using shallow rendering or jest.mock() instead.
mockComponent()是一个遗留API。我们建议使用浅呈现或jest.mock()。
## isElement()
```
isElement(element)
```
Returns true if element is any React element.
## isElementOfType()
```
isElementOfType(
  element,
  componentClass
)
```
Returns true if element is a React element whose type is of a React componentClass.
## isDOMComponent()
```
isDOMComponent(instance)
```
Returns true if instance is a DOM component (such as a <div> or <span>).
## isCompositeComponent()
```
isCompositeComponent(instance)
```
Returns true if instance is a user-defined component, such as a class or a function.
## isCompositeComponentWithType()
```
isCompositeComponentWithType(
  instance,
  componentClass
)
```
Returns true if instance is a component whose type is of a React componentClass.
## findAllInRenderedTree()
```
findAllInRenderedTree(
  tree,
  test
)
```
Traverse all components in tree and accumulate all components where test(component) is true. This is not that useful on its own, but it’s used as a primitive for other test utils.
在测试(组件)的地方，遍历树中的所有组件并累积所有组件为true。它本身并不是很有用，但是它用作其他测试utils的原始代码。
## scryRenderedDOMComponentsWithClass()
```
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```
Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching className.
在呈现树中找到组件的所有DOM元素，这些元素都是类名匹配className的DOM组件。
## findRenderedDOMComponentWithClass()
```
findRenderedDOMComponentWithClass(
  tree,
  className
)
```
Like scryRenderedDOMComponentsWithClass() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.
像scryRenderedDOMComponentsWithClass(),但是如果任何其他的一个匹配排斥，希望有一个结果,并返回一个结果,或抛出异常。

## scryRenderedDOMComponentsWithTag()
```
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```
Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching tagName.
在呈现树中找到组件的所有DOM元素，这些元素都是带有标签名称的DOM组件。
## findRenderedDOMComponentWithTag()
```
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```
Like scryRenderedDOMComponentsWithTag() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.
像scryRenderedDOMComponentsWithTag(),但是如果任何其他的一个匹配排斥，希望有一个结果,并返回一个结果,或抛出异常。
## scryRenderedComponentsWithType()
```
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```
Finds all instances of components with type equal to componentClass.
## findRenderedComponentWithType()
```
findRenderedComponentWithType(
  tree,
  componentClass
)
```
Same as scryRenderedComponentsWithType() but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.
像scryRenderedComponentsWithType(),但是如果任何其他的一个匹配排斥，希望有一个结果,并返回一个结果,或抛出异常。