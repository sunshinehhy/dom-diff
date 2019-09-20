```
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // ES5 with npm
```
## 概述
When writing unit tests for React, shallow rendering can be helpful. Shallow rendering lets you render a component “one level deep” and assert facts about what its render method returns, without worrying about the behavior of child components, which are not instantiated or rendered. This does not require a DOM.

当编写单元测试时，shallow rendering可能会有帮助。浅呈现让您呈现一个组件“一个层次”，并断言其呈现方法返回的事实，而`不必担心子组件的行为`，`不必担心这些组件没有实例化或呈现。这并不需要DOM。`

For example, if you have the following component:

例如，如果您有以下组件:
```
function MyComponent() {
  return (
    <div>
      <span className="heading">Title</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

Then you can assert:

```
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Title</span>,
  <Subcomponent foo="bar" />
]);
```
Shallow testing currently has some limitations, namely not supporting refs.
We also recommend checking out Enzyme’s Shallow Rendering API. It provides a nicer higher-level API over the same functionality.

## Reference
- shallowRenderer.render()
You can think of the shallowRenderer as a “place” to render the component you’re testing, and from which you can extract the component’s output.
您可以将shallowRenderer作为一个“位置”来呈现您正在测试的组件，并从中提取组件的输出。

shallowRenderer.render() is similar to ReactDOM.render() but it doesn’t require DOM and only renders a single level deep. This means you can test components isolated from how their children are implemented.

shallowRenderer.render()类似于response .render()，但它不需要DOM，只呈现一个层次的深度。这意味着您可以测试与他们的孩子如何被实现隔离的组件。

- shallowRenderer.getRenderOutput()
After shallowRenderer.render() has been called, you can use shallowRenderer.getRenderOutput() to get the shallowly rendered output.

shallowRenderer.render()被调用后,您可以使用shallowRenderer.getRenderOutput()让浅浅地呈现输出。

You can then begin to assert facts about the output.

然后，您可以开始断言有关输出的事实。