http://blog.csdn.net/c_kite/article/details/71279853
## webpack配置
https://www.webpackjs.com/concepts/entry-points/

http://www.css88.com/doc/webpack/

https://webpack.js.org/configuration/  （官网配置设置 英文版）

https://webpack.js.org/concepts/loaders/#example

webpack.config.js是默认文件名，也可以相应修改。（此文件自己建立，目前不知道命令行）。
入口文件它可以进行资源导入。
入口文件：应该比如./app/index.js（表示是我们的文件目录）,如果是app/index.js会去node_modules里去找。

多页面应用程序
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};

output:{
	path:./dist
	filename:bundle.js
}
entry： 是 页面入口文件配置 （html文件引入唯一的js 文件）
output：对应输出项配置 
path ：入口文件最终要输出到哪里，
filename：输出文件的名称
publicPath：公共资源路径

## 盲点
第二、如果配置文件webpack.config.js被修改成别的名字(如webpack.dev.config.js)，执行webpack打包命令，是不能正常打包的(命令行会提示，找不到配置文件)，所以需要在打包的时候，通过--config指定配置文件的名字（webpack --config webpack.dev.config.js）才能正常打包

```
webpack打包，后面可以跟很多参数，如:

--progress: 打包进度

--display-modules: 打包的模块 

--colors: 是否彩色显示 打包提示信息

--display-reasons: 打包原因

--watch: 自动监控文件变化
```

## webpack-dev-server
webpack-dev-server是一个小型的node express服务器，它为通过webpack打包生成的资源文件提供web服务。可以搭建本地服务器，可以自动刷新。

## webpack loader加载器
告知 webpack 每一种文件都需要使用什么加载器来处理.

比如：npm install babel-loader babel babel-core css-loader style-loader  url-loader file-loader less-loader less  --save-dev

## plugins:[]
为不同的html模板指定不同的配置节点


`[name]是entry键的值`
```
// entry: [
//     path.join(__dirname, 'index.js')
// ],  //一个文件可以这么写，不可以写成path.join(__dirname, '*.js')，即不能写成blob
entry:
{
    'main':'./src/main.js',
    'user':['./src/login.js','./src/reg.js'],
    'index':['./src/index.js']
},
output:{
    path: __dirname+'/build/js', // 输出到那个目录下（__dirname当前项目目录）
    filename:'[name].js' //最终打包生产的文件名    (输出要用绝对路劲，__dirname是webpack.config.js所在的绝对路劲)
},
devtool: "eval-source-map", // enum
//通过为浏览器devtools添加元信息来增强调试功能。
// source-map最详细的代价是构建速度。
plugins:[   
new HtmlWebpackPlugin({
    filename: __dirname+'/build/html/login-build.html',
    template:__dirname+'/src/tpl/login.html',
    inject:'body',
    hash:true,
    chunks:['main','user']   // 这个模板对应上面那个节点
}),
new HtmlWebpackPlugin({
    filename: __dirname+'/build/html/index-build.html',
    template:__dirname+'/src/tpl/index.html',
    inject:'body',
    hash:true,
    chunks:['index']   // 这个模板对应上面那个节点   
}),  //如果不用chunks，生成的2个目标文件（index-build.html，login-build.html）都引入了所有的js和css
// 拆分插件
new webpack.optimize.CommonsChunkPlugin({
    name:'user', // 上面入口定义的节点组
    filename:'build-user.js' //最后生成的文件名
}),
// css抽取
new extractTextPlugin("[name].css"),   //[name]是entry键的值
// 提供公共代码
new webpack.optimize.CommonsChunkPlugin('common.js'), // 默认会把所有入口节点的公共代码提取出来,生成一个common.js
]
```
执行webpack之后，查看index-build.html中只引入了index.css和index.js

## webpack4.0以后配置步骤：
从 webpack v4.0.0 开始，可以不用引入一个配置文件。
入口文件（entry）默认值为 ./src

1、创建工程目录； 
2、初始化工程目录：npm init。 
3、全局安装webpack-cli。 （安装了它执行npm run dev/build才能有效。仅仅项目中安装不可以）
4、全局安装webpack。 
5、webpack –mode development或webpack –mode production进行打包，可在package.json中配置dev和build的脚本，便只需运行npm run dev/build，作用相同。


node server --watch  需要去考虑加 --watch原因

webpack --config XXX.js //使用另一份配置文件（比如webpack.config2.js）来打包
 
webpack --watch //监听变动并自动打包
 
webpack -p//压缩混淆脚本，这个非常非常重要！
 
webpack -d//生成map映射文件，告知哪些模块被最终打包到哪里了

//react-hot-loader 是一款非常好用的 React 热插拔的加载插件，通过它可以实现修改-运行同步的效果，配合 webpack-dev-server 使用更佳！

## webpack-dev-server
使用webpack-dev-server中遇到不能浏览器无法自动刷新的问题；寻找多方答案后明白了一些；

下面有一些需要注意的点：

1.webpack-dev-server并不能读取你的webpack.config.js的配置output！！
你在webpack.config.js里面的配置output属性是你用webpack打包时候才起作用的，对webpack-dev-server并不起作用

2.webpack-dev-server打包生产的文件并不会添加在你的项目目录中！！
它默认打包的文件名是bundle.js，不会真的出现在你的项目目录中，据推测应该是保存在自己的环境中