## 配置
new HtmlWebpackPlugin({
    filename: __dirname+'/build/html/index-build.html',
    template:__dirname+'/src/tpl/index.html',
    inject:'body',
    hash:true,
    chunks:['index']   // 这个模板对应上面那个节点   
})

## new htmlWebpackPlugin(),参数一个配置数组

- title: 用来生成页面的 title 元素
- filename: 输出的 HTML 文件名，默认是 index.html, 也可以直接配置带有子目录。
- template: 模板文件路径，支持加载器，比如 html!./index.html
- inject: true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 - templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
- favicon: 添加特定的 favicon 路径到输出的 HTML 文件中。
- minify: {} | false , 传递 html-minifier 选项给 minify 输出
- hash: true | false, 如果为 true, 将添加一个唯一的 webpack 编译 hash 到所有包含的脚本和 CSS 文件，对于解除 cache 很有用。
- cache: true | false，如果为 true, 这是默认值，仅仅在文件修改之后才会发布文件。
- showErrors: true | false, 如果为 true, 这是默认值，错误信息会写入到 HTML 页面中
- chunks: 允许只添加某些块 (比如，仅仅 unit test 块)
- chunksSortMode: 允许控制块在添加到页面之前的排序方式，支持的值：'none' | 'default' | {function}-default:'auto'
- excludeChunks: 允许跳过某些块，(比如，跳过单元测试的块) 


https://github.com/jantimon/html-webpack-plugin#configuration

The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader.

HtmlWebpackPlugin简化了HTML文件的创建，以服务您的webpack包。这对于webpack包尤其有用，在文件名中它包含了散列，散列会改变每个编译。您可以让插件为您生成一个HTML文件，使用lodash模板提供自己的模板，或者使用自己的加载器。

If you have multiple webpack entry points, they will all be included with script tags in the generated HTML.
如果您有多个webpack入口点，它们都将包含在生成的HTML中的脚本标记中。

If you have any CSS assets in webpack's output (for example, CSS extracted with the ExtractTextPlugin) then these will be included with <link> tags in the HTML head.
如果您在webpack的输出中有任何CSS资产(例如，使用ExtractTextPlugin提取的CSS)，那么这些内容将包含在HTML head中的<link>标记中。

如果你有使用它的插件，html-webpack-plugin应该在任何一个集成插件之前先被订购。

To generate more than one HTML file, declare the plugin more than once in your plugins array
要生成多个HTML文件，请在插件数组中多次声明插件。
```
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      template: 'src/assets/test.html'
    })
  ]
}
```

htmlWebpackPlugin.files: a massaged representation of the assetsByChunkName attribute of webpack's stats object. It contains a mapping from entry point name to the bundle filename
htmlWebpackPlugin.files: 对webpack的stats对象的assetsByChunkName属性进行了一按摩表示。它包含从入口点名到包文件名的映射。
如果您在webpack配置中设置了publicPath，那么将在该资产散列中正确地反映这一点。
```
"htmlWebpackPlugin": {
  "files": {
    "css": [ "main.css" ],
    "js": [ "assets/head_bundle.js", "assets/main_bundle.js"],
    "chunks": {
      "head": {
        "entry": "assets/head_bundle.js",
        "css": [ "main.css" ]
      },
      "main": {
        "entry": "assets/main_bundle.js",
        "css": []
      },
    }
  }
}
```