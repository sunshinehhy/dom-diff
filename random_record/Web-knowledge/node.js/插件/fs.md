## fs.stat
方法说明：获取文件信息。

接收参数：

path   文件路径
callback  回调，传递两个参数，异常参数err, 文件信息数组 stats
```
var fs = require('fs');
fs.stat('content.txt', function(err, stats){
 if(err){
  throw err;
 }else{
  console.log(stats);
 }
})
```

## fs.createReadStream(fpath)
方法说明：返回一个readStream（文件读取流，输入流）对象。（可读流）

语法：
fs.createReadStream(path, [options])
由于该方法属于fs模块，使用前需要引入fs模块（var fs= require(“fs”) ）

接收参数：
path: (string) 欲读取的文件路径

options : (object) 数组对象包含以下属性
```
{ flags: 'r',
  encoding: null,
  fd: null,
  mode: 0666,
  autoClose: true
}
```
options 可以通过start 和 end 设置 文件 可读取的字节数范围，而不是读取整个文件。
如果start 和 end都被包含的情况下 ，将从0开始。

encodeing 可以是 ‘utf8′, ‘ascii', 或 ‘base64′三种格式。

如果autoClose为false时，文件描述符将不会被关闭，即使他们报错了。

最好把它关闭掉 并确保不会出现文件描述符泄漏。

如果autoClose为true时(默认的行为)，对错误或结束的文件描述符将自动关闭。