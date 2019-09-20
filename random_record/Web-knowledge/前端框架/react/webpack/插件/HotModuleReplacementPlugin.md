启用热替换模块(Hot Module Replacement)，也被称为 HMR。

模块热替换(HMR - Hot Module Replacement)功能会`在应用程序运行过程中替换、添加或删除模块`，而`无需重新加载整个页面`。
**主要是通过以下几种方式，来显著加快开发速度：**

- `保留在完全重新加载页面时丢失的应用程序状态`。
- `只更新变更内容`，以节省宝贵的开发时间。
- `调整样式更加快速` - 几乎相当于在浏览器调试器中更改样式。

## 配置
`在大多数情况下也不需要设置选项`
```
new webpack.HotModuleReplacementPlugin({
  // Options...
})
```

#### **选项(Options)**

包含如下选项：

- multiStep (boolean)：`设置为 true 时，插件会分成两步构建文件`。首先编译热加载 chunks，之后再编译剩余的通常的资源。
- fullBuildTimeout (number)：当 multiStep 启用时，`表示两步构建之间的延时`。
- requestTimeout (number)：`下载 manifest 的延时`（webpack 3.0.0 后的版本支持）。