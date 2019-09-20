https://github.com/webpack/webpack

https://www.jianshu.com/p/9724c47b406c  (webpack gulp整合)

https://github.com/webpack
## webpack
https://www.jianshu.com/p/ee88e9849a1b
https://www.jianshu.com/p/9724c47b406c
https://doc.webpack-china.org/concepts/loaders/
webpack并不强制你使用某种模块化方案，而是通过兼容所有模块化方案让你无痛接入项目，当然这也是webpack牛逼的地方。
特点：
✦ 可以兼容多模块风格，无痛迁移老项目。
✦ 一切皆模块，js/css/图片/字体都是模块。
✦ 静态解析，按需打包，动态加载。

webpack提供的loaders可以对文件做预处理，从而实现了一切皆模块。

gulp打造前端工程化方案，同时引入webpack来管理模块化代码。

gulp是一个基于流的构建工具，相对其他构件工具来说，更简洁更高效。

## webpack模块化原理
webpack模块化原理-commonjs: https://segmentfault.com/a/1190000010349749

在我们的模块中，就可以对外使用module.exports或exports进行导出，使用__webpack_require__导入需要的模块，代码跟commonjs完全一样。

这样，就完成了对第一个模块的require，然后第一个模块会根据自己对其他模块的require，依次加载其他模块，最终`形成一个依赖网状结构`。`webpack管理着这些模块的缓存，如果一个模块被require多次，那么只会有一次加载过程`，而返回的是缓存的内容，这也是commonjs的规范。

原理还是很简单的，其实就是实现exports和require，然后自动加载入口模块，控制缓存模块。

## webpack常用插件
http://www.css88.com/doc/webpack/loaders/css-loader/

http://www.css88.com/doc/webpack/loaders/sass-loader/
https://www.npmjs.com/package/extract-text-webpack-plugin  (插件用法)
var ExtractTextPlugin = require("extract-text-webpack-plugin");  mini-css-extract-plugin

{
 test: /\.css$/,
  loader: ExtractTextPlugin.extract("style-loader","css-loader")
},



```
webpack3使用extract-text-webpack-plugin
webpack4得使用mini-css-extract-plugin这个插件来单独打包css。
const MiniCssExtractPlugin = require("mini-css-extract-plugin") ;
{
      　　  test: /\.css$/,
      　　  use: [
        　　  　　MiniCssExtractPlugin.loader,
        　　 　　 "css-loader"
       　　 ]
    　　  }
```

autoprefixer, precss, cssnano, cssnext

也从所有附加块中提取(默认情况下，它只从初始块中提取)
当使用CommonsChunkPlugin并在commons chunk中有提取块(从ExtractTextPlugin.extract)时，必须将所有块设置为true

每个条目生成一个文件，因此在使用多个条目时必须使用[name]、[id]或[contenthash]。

从现有的装入器中创建提取加载程序。支持类型的加载器
{ loader: [name]-loader -> {String}, options: {} -> {Object} }.

```
test: /\.css$/,
use: ExtractTextPlugin.extract({
    fallback: "style-loader", // 编译后用什么loader来提取css文件
    use: "css-loader" // 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
})
```
use: 指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
fallback: 编译后用什么loader来提取css文件
publicfile:用来覆盖项目路径,生成该css文件的文件路径