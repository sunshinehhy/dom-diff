## React.Children
<https://reactjs.org/docs/react-api.html#reactchildren>

React.Children提供了用于处理this.props.children的一系列方法

### React.Children.map
```
React.Children.map(children, function(child));
```

### React.Children.forEach
```
React.Children.forEach(children, function(child));
```

### React.Children.count
```
React.Children.count(children)
```
返回children中的components个数

## React.cloneElement()
```
React.cloneElement(
  element,
  [props],
  [...children]
)

```

克隆并返回一个新的element,返回的element将得到原始element的props，也将得到该方法中新提供的props。新的children将替代已经存在的children。原始element上的key和ref将被保留。

和下面这种写法等价:

```
<element.type {...element.props} {...props}>{children}</element.type>

```

## React.Children.toArray(children)

Returns the children opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice this.props.children before passing it down.

将不透明的数据结构作为一个带键的平面数组返回给每个子节点。如果您想要在呈现方法中操作集合的子集合，特别是在传下去之前，如果您想要重新排序或slice this.props.children。

React.Children.toArray() changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, toArray prefixes each key in the returned array so that each element’s key is scoped to the input array containing it.

当把孩子的列表变平时，React.Children.toArray()改变键来保存嵌套数组的语义。也就是说，toArray在返回的数组中前缀每个键，这样每个元素的键就被限定在包含它的输入数组中。

## React.Fragment
段组件允许在render()方法中返回多个元素，而无需创建额外的DOM元素:
```
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
