https://doc.webpack-china.org/plugins/commons-chunk-plugin

https://stackoverflow.com/questions/49017682/webpack-4-migration-commonschunkplugin

https://webpack.js.org/plugins/split-chunks-plugin/  (可以使用此来代替commons-chunk-plugin)

CommonsChunkPlugin 插件，是一个可选的`用于建立一个独立文件(又称作 chunk)的功能`，这个文件包括多个入口 chunk 的公共模块。`通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次`，便`存到缓存中供后续使用`。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。

如何分别打包公共代码和第三方库

拆分插件

多页面分离资源引用,按需引用JS和css：

+ 方式一，传入字符串参数 
```
// 提供公共代码
// 默认会把所有入口节点的公共代码提取出来,生成一个common.js
new webpack.optimize.CommonsChunkPlugin('common.js'), 
```
+ 方式二，有选择的提取公共代码
```
// 提供公共代码
// 默认会把所有入口节点的公共代码提取出来,生成一个common.js
// 只提取main节点和index节点
new webpack.optimize.CommonsChunkPlugin('common.js',['main','index']),
```

+ 方式三，有选择性的提取（对象方式传参）
```
new webpack.optimize.CommonsChunkPlugin({
    name:'common', // 注意不要.js后缀
    chunks:['main','user','index']
}),
```
通过CommonsChunkPlugin，我们把公共代码专门抽取到一个common.js，这样业务代码只在index.js，main.js，user.js