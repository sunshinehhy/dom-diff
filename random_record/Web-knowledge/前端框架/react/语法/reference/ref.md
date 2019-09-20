<http://www.runoob.com/react/react-refs.html>
React 支持一种非常特殊的属性 Ref ，你可以用来绑定到 render() 输出的任何组件上。

这个特殊的属性允许你引用 render() 返回的相应的支撑实例（ backing instance ）。这样就可以确保在任何时间总是拿到正确的实例。

```
绑定一个 ref 属性到 render 的返回值上：
<input ref="myInput" />

在其它代码中，通过 this.refs 获取支撑实例:

var input = this.refs.myInput;
var inputValue = input.value;
var inputRect = input.getBoundingClientRect();
```
