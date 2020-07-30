https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import
(此链接讲import)
#### Module

+ CommonJS
    * `require()方式,require 是同步的，只适用于服务器。`之所以采用同步，是`因为模块文件都存放在服务器的各个硬盘上`，实际的加载时间就是硬盘的文件读取时间。
    * 用户服务器
    * 输出的是一个值的拷贝，加载时执行
    * 循环加载原理：一个CommonJS模块就是一个脚本文件，加载时执行，即脚本代码在require时就会全部执行。
    * 一旦出现某个模块被“循环执行”，就只输出已经执行的部分，还未执行的部分不会输出。
+ ES6模块：设计思想是尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
    * import  export
    * 输入时采用静态命令的形式
    * 效率比CommonJS模块的加载方式高
    * 不再需要UMD模式格式
    * `export命令可以出现在模块的任何位置，只要除于模块顶层即可。如果处于块级作用域内，会报错。`
    * export语句输出的值是动态绑定的，绑定其所在的模块
    * 优先考虑大括号输出一组变量
    * `import命令具有提升效果，会提升到整个模块的头部首先执行`
    * module命令可以取代import语句，达到整体输入模块的作用
    * `export default输出的，import命令后面不使用大括号`并且`可以自己定义任意名称指向输出的方法`，否则需要使用大括号
    * 一个模块只能有一个默认输出
    * 输出的是值的引用，需要开发者自己保证真正取值时能够取到值
+ AMD(Asynchronous Module Definition)（js中最典型的异步例子就是ajax）：`异步加载，在服务器和浏览器都可以运行`
    * 主要有两个Javascript库实现了AMD规范：require.js和curl.js。

+ CMD 
    * 如何实现一个 CMD 模块加载器：http://annn.me/how-to-realize-cmd-loader/
    
+ AMD和CMD之间的区别
    - AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块
    - CMD推崇就近依赖，只有在用到某个模块的时候再去require

### import和require区别
- import是ES6的，是`动态引用文件`，import语句只能写在代码最外层。`只有当后文使用到该import进来的模块时，该模块才会被导入`，因而会出现本项目 config\index.js中使用await的情况：
		
		import article from './article';
		const d = await article();
- `require是node的，它是静态引用文件`，即在一开始require的时候就已经将模块存入内存中了。故使后文使用该模块时直接用就行。


**import：**
参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import

该新特性属于 ES6规范 import语句用于导入从外部模块、其他脚本导出的函数。

 **语法**

 module-name可以不带.js扩展名。如果是export default，则导入文件不能用{}，但是可以跟导出名不一样。

import name from "module-name";
import { member } from "module-name";
import { member as alias } from "module-name";
import { member1 , member2 } from "module-name";
import { member1 , member2 as alias2 , [...] } from "module-name";
import name , { member [ , [...] ] } from "module-name";
import "module-name";
描述
name参数用于接收导出成员的对象名称。member参数指定独立成员，而name参数导入所有成员。`如果模块导出单个默认参数，而不是一系列成员，name也可以是函数。`

import * as name语法导入所有导出

举例
导入整个模块的内容。以下代码将myModule添加到当前作用域，其中包括所有导出绑定：

import myModule from "my-module.js";
导入模块的单个成员。以下代码将myMember添加到当前作用域。

import {myMember} from "my-module.js";
导入模块的多个成员。以下代码会将foo和bar都添加到当前作用域。

import {foo, bar} from "my-module.js";

**export**
参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export或http://es6.ruanyifeng.com/?search=exports&x=0&y=0#docs/module#export命令

export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

`一个模块就是一个独立的文件`。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量。

- export命令输出变量

```
    export var firstName = 'Michael';
    export var lastName = 'Jackson';
    export var year = 1958;
    或：

    var firstName = 'Michael';
    var lastName = 'Jackson';
    var year = 1958;

    export {firstName, lastName, year};
    应优先考虑第二种写法。
```
- export输出函数或类(class)
通常情况下，export输出的变量就是本来的名字，但是`可以使用as关键字重命名`。

function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
上面代码使用as关键字，重命名了函数v1和v2的对外接口。重命名后，v2可以用不同的名字输出两次。

默认导出
export default myFunctionOrClass
每个脚本只能有一个默认导出。

## ES6：export default 和 export 区别

1.export与export default均可用于导出常量、函数、文件、模块等
2.你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
3.在一个文件或模块中，export、import可以有多个，export default仅有一个
4.通过export方式导出，在导入时要加{ }，export default则不需要

## Node.js模块里exports与module.exports的区别?
https://www.jianshu.com/p/e452203d56c4

https://www.cnblogs.com/axl234/p/6405370.html

- `require方能看到的只有module.exports这个对象，它看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用。`
- `exports 是指向的 module.exports 的引用`
- module.exports 初始值为一个空对象 {}
- module.exports和exports属于引用类型。
- require() 返回的是 module.exports 而不是 exports
```
var module ={
    exports:{
        name:"我是module的exports属性"
    }
};
var exports = module.exports;
console.log(module.exports);  //{name:"我是module的exports属性"}
console.log(exports);   //{name:"我是module的exports属性"}

exports.name = "我想改一下名字";
console.log(module.exports);  //{name:"我想改一下名字"}
console.log(exports);   //{name:"我想改一下名字"}
//由此看出，module.exports和exports是引用同一个内存地址下的数据

var Circle = {
    name:"我是一个圆",
    func:function(x){
        return x*x;
    }
};
exports = Circle; 
console.log(module.exports);  //{name:"我想改一下名字"}
console.log(exports);   //{name:"我是一个圆" , func:[Function]}

//看清楚了，Circle这个object在内存中指向了新的地址，所以exports也指向了这个新的地址，和原来的地址没有关系了。
```
```
exports = function(x){
    console.log(x);
}
<!--上面的function是一块新的内存地址，导致exports与module.exports不存在任何关系，而require方能看到的只有module.exports这个对象，看不到exports对象，所以这样写是导不出去的。-->
<!--下面的写法是可以导出去。说句题外话，module.exports除了导出对象、函数，还可以导出所有的类型，比如字符串、数值等。-->
module.exports = function(x){
    console.log(x);
}
```
```
exports = module.exports = somethings
// 等价于
module.exports = somethings
exports = module.exports 
```

## CommonJS和ES6模块异同
参考《Interview Map》

- CommonJS支持动态导入，即支持require(${path}/xx.js);
ES6不支持。
- CommonJS是同步导入，`在运行时加载`; 
ES6是`异步导入，在编译时输出内容`，并会编译为require/exports来执行。
- CommonJS输出的是值拷贝，对导出值进行重新赋值不会影响导入的值；
ES6输出的是引用，导入导出的都指向同一个地址，导入的变量是`只读的，不能赋值`。

其他几种模块:

AMD: 由RequireJS提出，提前执行依赖，推崇依赖前置
CMD: 延迟执行依赖，推崇依赖就近

CommonJs 模块输出的是一个值的拷贝，ES6模块输出的是一个值的引用

CommonJS 模块是运行时加载，ES6模块是编译时输出接口

ES6输入的模块变量，只是一个符号链接，所以这个变量是只读的，对它进行重新赋值就会报错

## 模块加载AMD，CMD，CommonJS Modules/2.0 规范
- 这些规范的目的都是为了 JavaScript 的模块化开发，特别是在浏览器端的
- 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行
- CMD 推崇依赖就近，AMD 推崇依赖前置