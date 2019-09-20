http://nodejs.cn/api/util.html

util 模块主要用于支持 Node.js 内部 API 的需求。 

util.promisify(original)
original <Function>
Returns: <Function>
让一个遵循异常优先的回调风格的函数， 即 (err, value) => ... 回调函数是最后一个参数, 返回一个返回值是一个 promise 版本的函数。

```
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);
stat('.').then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});
```