
```
UnhandledPromiseRejectionWarning: Unhandled promise rejection

errorError: You must supply options.name for IIFE bundles 
//test.js
export default function test(){
    console.log('test');
}

import test from './test.js';
// var test = require('./test.js');
test();
```

为什么rollup打包赘余代码比较少?

在 Rollup 编译模块的过程中，通过 Tree-shacking 的方式来剔除各模块中最终未被引用到的方法，通过仅保留被调用到的代码块来缩减 bundle 的大小。

rollup 中，babel 的预设不像 webpack 可以直接写在配置文件里，而还是得独立写个“src/.babelrc”。

rollup.rollup()”返回一个带着 bundle 作为 resolve 回调参数的 Promise 对象，我们常规直接使用语法糖 bundle.write 来打包输出文件。

Rollup 虽然利用 ES6 的特性帮咱节省了不少文件大小，但它并没有类似 webpack 的 -p 参数帮你压缩混淆文件。

因此即使是官方文档也推荐配合使用 UglifyJS 来进一步缩小 bundle 体积。

https://www.jb51.net/article/142157.htm

这样就可以做到对所有helper都使用import的形式来引入，而且使用rollup打包后的代码更可读。
使用rollup打包，设置external(当然webpack也可以)外联helper函数