DefinePlugin 允许`创建一个在编译时可以配置的全局常量`。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。如果在开发构建中，而不在发布构建中执行日志记录，则`可以使用全局常量来决定是否记录日志`。这就是 DefinePlugin 的用处，`设置它，就可以忘记开发和发布构建的规则`。

## 配置
每个传进 DefinePlugin 的`键值都是一个标志符或者多个用.连接起来的标志符` 。

- 如果这个值是`一个字符串`，它会被当作一个`代码片段来使用`。
- 如果这个值`不是字符串`，它会被`转化为字符串(包括函数)`。
- 如果这个值是`一个对象`，它所有的` key 会被同样的方式定义`。
- 如果在一个` key 前面加了 typeof`,它`会被定义为 typeof 调用`。
```
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify("5fa3b9"),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: "1+1",
  "typeof window": JSON.stringify("object")
})
```
## 注意
注意，因为这个插件直接执行文本替换，`给定的值必须包含字符串本身内的实际引号`。通常，有两种方式来达到这个效果，使用 '"production"', 或者使用 JSON.stringify('production')。