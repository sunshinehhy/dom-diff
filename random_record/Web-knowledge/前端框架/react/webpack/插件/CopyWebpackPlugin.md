CopyWebpackPlugin ： 将from指定的文件copy 到to指定的位置

```
new CopyWebpackPlugin([{
    from: __dirname + '/src/public'
}]);
```
- from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
- to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
- toType  file 或者 dir         可选，默认是文件
- force   强制覆盖先前的插件           可选 默认false
- context                         可选 默认base context可用specific context
- flatten 只拷贝文件不管文件夹      默认是false
- ignore  忽略拷贝指定的文件           可以用模糊匹配