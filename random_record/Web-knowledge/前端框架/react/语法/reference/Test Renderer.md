```
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // ES5 with npm
```
## 概述
This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

这个包提供了一个React renderer，可以用来将响应组件呈现为纯JavaScript对象，而不依赖于DOM或本机移动环境。

Essentially, this package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a React DOM or React Native component without using a browser or jsdom.

从本质上说，在不使用浏览器或jsdom的情况下，这个包可以很容易地获取一个由a React DOM or React Native component渲染的平台视图层次结构的快照(类似于DOM树)。
```
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```
You can use Jest’s snapshot testing feature to automatically save a copy of the JSON tree to a file and check in your tests that it hasn’t changed: Learn more about it.

您可以使用Jest的快照测试特性，将JSON树的副本自动保存到文件中，并在测试中检查它没有改变。

You can also traverse the output to find specific nodes and make assertions about them.

您还可以遍历输出以查找特定的节点并对其进行断言。
```
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Hello</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

## TestRenderer
- TestRenderer.create()
```
TestRenderer.create(element, options);
```
Create a TestRenderer instance with the passed React element. It doesn’t use the real DOM, but it still fully renders the component tree into memory so you can make assertions about it. The returned instance has the following methods and properties.

传递React元素创建一个TestRenderer实例。它不使用真正的DOM，但是它仍然将组件树完全呈现到内存中，这样您就可以对其进行断言。返回的实例有以下方法和属性。

## TestRenderer instance
- **testRenderer.toJSON()**
```
testRenderer.toJSON()
```
Return an object representing the rendered tree. This tree only contains the platform-specific nodes like <div> or <View> and their props, but doesn’t contain any user-written components. This is handy for snapshot testing.

返回代表已呈现树的对象。此树只包含特定于平台的节点，如<div>或<View>及其their props，但不包含任何用户编写的组件。这对于快照测试非常方便。
- **testRenderer.toTree()**
```
testRenderer.toTree()
```
Return an object representing the rendered tree. Unlike toJSON(), the representation is more detailed than the one provided by toJSON(), and includes the user-written components. You probably don’t need this method unless you’re writing your own assertion library on top of the test rendererer.

返回表示已呈现树的对象。与toJSON()不同，表示比toJSON()提供的更详细，包括用户编写的组件。您可能不需要这种方法，除非您在测试rendererer之上编写自己的断言库。

- **testRenderer.update()**
```
testRenderer.update(element)
```
Re-render the in-memory tree with a new root element. This simulates a React update at the root. If the new element has the same type and key as the previous element, the tree will be updated; otherwise, it will re-mount a new tree.

用一个新的根元素重新呈现内存树。这模拟了React对root的更新。如果新元素具有与前一个元素相同的type and key，则将更新树;否则，它将重新挂载一棵新树。

- **testRenderer.unmount()**
```
testRenderer.unmount()
```
Unmount the in-memory tree, triggering the appropriate lifecycle events.

卸载内存中的树，触发适当的生命周期事件。

- **testRenderer.getInstance()**
```
testRenderer.getInstance()
```
Return the instance corresponding to the root element, if available. This will not work if the root element is a functional component because they don’t have instances.

如果可用，返回对应于根元素的实例。如果根元素是一个函数组件，这将不起作用，因为它们没有实例。

- **testRenderer.root**
```
testRenderer.root
```
Returns the root “test instance” object that is useful for making assertions about specific nodes in the tree. You can use it to find other “test instances” deeper below.

返回根“测试实例”对象，该对象用于对树中的特定节点进行断言。您可以使用它来找到更深层的其他“测试实例”。


## TestInstance
- **testInstance.find()**
```
testInstance.find(test)
```
Find a single descendant test instance for which test(testInstance) returns true. If test(testInstance) does not return true for exactly one test instance, it will throw an error.

找到一个用于测试(testInstance)的单一后代测试实例。如果测试(testInstance)不返回true，只返回一个测试实例，它将抛出一个错误。

- **testInstance.findByType()**
```
testInstance.findByType(type)
```
Find a single descendant test instance with the provided type. If there is not exactly one test instance with the provided type, it will throw an error.

使用所提供的类型找到一个单一的后代测试实例。如果没有一个带有提供类型的测试实例，它将抛出一个错误。

- **testInstance.findByProps()**
```
testInstance.findByProps(props)
```
Find a single descendant test instance with the provided props. If there is not exactly one test instance with the provided props, it will throw an error.

使用提供的道具找到一个单一的后代测试实例。如果没有一个测试实例与提供的支持，它将抛出一个错误。

- **testInstance.findAll()**
```
testInstance.findAll(test)
```
Find all descendant test instances for which test(testInstance) returns true.

找到所有测试(testInstance)返回true的后代测试实例。

- **testInstance.findAllByType()**
```
testInstance.findAllByType(type)
```
Find all descendant test instances with the provided type.

找到具有所提供类型的所有后代测试实例。

- **testInstance.findAllByProps()**
```
testInstance.findAllByProps(props)
```
Find all descendant test instances with the provided props.

使用提供的props找到所有的后代测试实例。

- **testInstance.instance**
```
testInstance.instance
```
The component instance corresponding to this test instance. It is only available for class components, as functional components don’t have instances. It matches the this value inside the given component.

与此测试实例相对应的组件实例。它只能用于类组件，因为功能组件没有实例。它与给定组件内的这个值相匹配。
- **testInstance.type**
```
testInstance.type
```
The component type corresponding to this test instance. For example, a <Button /> component has a type of Button.

与此测试实例相对应的组件类型。例如，<Button />组件有一个按钮类型。
- **testInstance.props**
```
testInstance.props
```
The props corresponding to this test instance. For example, a <Button size="small /> component has {size: 'small'} as props.

The props 与此测试实例相对应。例如，<Button size="small />组件有{size: 'small'}作为props。
- **testInstance.parent**
```
testInstance.parent
```
The parent test instance of this test instance.

这个测试实例的父测试实例。
- **testInstance.children**
```
testInstance.children
```
The children test instances of this test instance.

这个测试实例的孩子们测试实例。

## Ideas

You can pass createNodeMock function to TestRenderer.create as the option, which allows for custom mock refs. createNodeMock accepts the current element and should return a mock ref object. This is useful when you test a component that relies on refs.

您可以通过createNodeMock函数给TestRenderer.create作为选项，允许定制自定义模拟参考。createNodeMock接受当前元素并返回一个mock ref object。当您测试依赖于refs的组件时，这很有用。

```
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // mock a focus function
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```