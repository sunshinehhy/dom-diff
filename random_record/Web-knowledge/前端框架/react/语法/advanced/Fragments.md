https://reactjs.org/docs/fragments.html
## Fragments
React中的一个常见模式是让组件返回多个元素。片段允许您对子节点列表进行分组，而无需向DOM添加额外的节点。
```
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```
还有一种新的短语法用于声明它们，但并不是所有流行的工具都支持这种语法。

## Motivation
一个常见的模式是组件返回一组子元素。以React  snippet这个例子为例:
```
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```
<Columns />需要返回多个<td>元素才能使呈现的HTML有效。如果在<Columns />的render()中使用父div，则产生的HTML将无效。
```
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```
结果<Table />输出为:
```
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```
因此,我们引入碎片。
## Usage
```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
这导致了一个正确的<Table />输出:
```
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```
## 短的语法
有一种新的、更短的语法可以用于声明片段。它看起来像是空标签:
```
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```
您可以使用<></>，就像使用任何其他元素一样，`只是它不支持键或属性`。

注意，许多工具还不支持它，所以您可能需要显式地编写<React.Fragment>直到工具赶上。

## Keyed Fragments

使用显式<React.Fragment>的片段可能有键。一个用例是将一个集合映射到一个片段数组——例如，创建一个描述列表:
```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
键是唯一可以传递给片段的属性。将来，我们可能会添加对其他属性的支持，比如事件处理程序。