## path.extname方法
方法说明：`返回path路径文件扩展名`，如果path以 ‘.' 为结尾，将返回 ‘.'，如果无扩展名 又 不以'.'结尾，将返回空值。

语法：
path.extname(p)
由于该方法属于path模块，使用前需要引入path模块（var path= require(“path”) ）

接收参数：p       path路径
```
path.extname('index.html')
// returns
'.html'
path.extname('index.')
// returns
'.'
path.extname('index')
// returns
''
```