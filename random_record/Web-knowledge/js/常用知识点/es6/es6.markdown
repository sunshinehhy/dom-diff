资源： https://developer.mozilla.org

http://exploringjs.com/es6/ch_about-book.html http://exploringjs.com/es6/ch_core-features.html

https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/README.md#you-dont-know-js-es6--beyond

https://www.cnblogs.com/darrenji/p/4999646.html  (es6常用)

###es6关键点

- 有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
- async函数就是将 Generator 函数的星号（*）替换成async，将yield替换成await，仅此而已。
- async和await，比起星号和yield，语义更清楚了。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
- async函数的语法规则总体上比较简单，难点是错误处理机制。
- async函数内部return语句返回的值，会成为then方法回调函数的参数。
- 正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。
- 只要一个await语句后面的 Promise 变为reject，那么整个async函数都会中断执行。
- 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个await放在try...catch结构里面，这样不管这个异步操作是否成功，第二个await都会执行。
   另一种方法是await后面的 Promise 对象再跟一个catch方法，处理前面可能出现的错误。
- 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
- 防止出错的方法，也是将其放在try...catch代码块之中。如果有多个await命令，可以统一放在try...catch结构中。
- 前面介绍过，for...of循环用于遍历同步的 Iterator 接口。新引入的for await...of循环，则是用于遍历异步的 Iterator 接口。
- then方法返回的是一个新的Promise实例。Promise 是一个对象，从它可以获取异步操作的消息。
- async返回值是 Promise

知识点整理：
1.fetch
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

GlobalFetch的fetch()方法用于发起获取资源的请求。

它返回一个promise,这个promise会在请求响应后被resolve,并传回Response对象。

当遇到网络错误时，fetch()返回的promise会被reject,并传回TypeError。

成功的fetch()检查不仅要包括promise被resolve,还要包括Response.ok属性为true.

语法：
fetch(input, init).then(function(response){...});
params:
(1） input
定义要获取的资源。这可能是：

一个 USVString 字符串，包含要获取资源的 URL。
一个 Request 对象。
(2) init(可选）
一个配置项对象，包括所有对请求的设置。可选的参数有：

method: 请求使用的方法，如 GET、POST。
headers: 请求的头信息，形式为 Headers 对象或 ByteString。
body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。（也就是POST方法发送的信息）
mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
credentials: 请求的 credentials，如 omit、same-origin 或者 include。
cache: 请求的 cache 模式: default, no-store, reload, no-cache, force-cache, or only-if-cached.
返回值
一个 Promise，resolve 时回传 Response 对象。

用法示例
function postData(url, data) {
	return 	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log('Getting response from server');
		return response.json();
	});
}
补充说明：
fetch最开始是浏览器的东西，然后通过node-fetch可以用到node端
fetch在浏览器端的跨域规则是和Ajax一样的，所有的浏览器端的跨域请求能否实现是由其被请求的服务器决定的
在后端不涉及跨不跨域的问题， 在node端可以随便请求任何url.
2.yield
针对生成器函数。

3.promise
http://exploringjs.com/es6/ch_promises.html

Promises用于发送一个异步完成的结果，是替代回调函数的另一种选择。

以下函数通过一个Promise来异步地返回一个结果

function asyncFunc() {
    return new Promise(
        function (resolve, reject) {
            ···
            resolve(result);
            ···
            reject(error);
        });
}
你可以这样调用它：

asyncFunc()
.then(result => { ··· })
.catch(error => { ··· });
特别NOTE
promise正常情况下结果只能用.then(result =>)来获取。

特殊情况下，在co工具中,使用

yield Promise.all（...）
才能得到Promise的结果

1. Chaining then() calls(链式调用then)
then（）总是返回一个Promise,这使得你可以链式调用：

asyncFunc1()----设这是一个promise P
	.then(result1 => {
	    // Use result1
	    return asyncFunction2(); // (A)
	})
	.then(result2 => { // (B)
	    // Use result2
	})
	.catch(error => {
	    // Handle errors of asyncFunc1() and asyncFunc2()
	});
Promise P通过.then()返回了什么东西取决于then中的函数（即如上的xx => {}) 做了什么：

如果then()中的函数返回的是一个Promise（如line A）, 则这个 Promise的resolve的结果值传递为P的resolve结果值。
如果then()中的函数返回了一个不同的值,则这个值会变成P的resolve值。
如果then()中的函数抛出了一个意外，则P会因为这个意外而被rejected。
2. Executing asynchronous functions in parallel(并行执行异步函数）
如果你通过then()链式调用then()，它们就会按顺序执行，一个时间只执行一个：

	asyncFunc1()
	.then(()=>asyncFunc2());
如果你不这样采用链式调用，而是立即调用它们，则它们会并行执行。

而Promise.all()使得你可以一次性获得所有结果。其输入是一个由一系列Promises组成的数组，其输出是一个单个的Promise,其resolve的结果值是一个由一系列结果组成的数组。

  Promise.all([
	asyncFunc1(),
	asyncFunc2(),
  ])
  .then(([result1,result2]) => {

  })
  .catch(err => {
		// Receives first rejection among the Promises
	});
3. 术语解释：Promises
4.async
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

async function 声明了一个异步函数，并返回了一个 AsyncFunction 对象。

语法
async function name([param[, param[, ... param]]]) { statements }

-name 方法的名字。

param 传递给方法的参数名。
statements 方法体的语句。
描述
调用异步函数时会返回一个 promise 对象。当这个异步函数返回一个值时，promise 的 resolve 方法将会处理这个返回值；当异步函数抛出的是异常或者非法值时，promise 的 reject 方法将处理这个异常值。

异步函数可能会包括 await 表达式，这将会使异步函数暂停执行并等待 promise 解析传值后，继续执行异步函数并返回解析值。

使用例子
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function add1(x) {
  var a = resolveAfter2Seconds(20);
  var b = resolveAfter2Seconds(30);
  return x + await a + await b;
}
4.await
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await

The await operator is used to wait for a promise returned by an async function.

语法
[rv] = await expression
expression
A promise or any value to wait for the resolution.

rv
Returns the resolved value of the promise, or the value itself if it's not a promise.

Examples
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}

async function f1() {
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}
f1();
5.Arraw functions
http://exploringjs.com/es6/ch_arrow-functions.html#ch_arrow-functions

1. Overview
使用箭头函数的两个好处：

比传统函数的写法更简略 const arr = [1, 2, 3]; const squares = arr.map(x => x * x);

 // Traditional function expression:
 const squares = arr.map(function (x) { return x * x });
其内的this是来自其外部环境的，即取消了传统函数屏蔽外部环境的this的作用。

2. 对于好处2的细致说明
暂略，待整理

3. 箭头函数的语法
指定参数：

() => {...} // 没有参数
 x => {...} // 一个参数
(x,y) =>｛...｝//两个参数
指定函数体：

x => {return x*x} //使用block
x => x*x //使用表达式，等价于上面一行的写法
（1） 当参数只有1个时可省略圆括号
[1,2,3].map(x=>2*x)
result:[2,4,6]
但需要注意，有些例外情况，即使只有一个参数，你也需要加上括弧。例如，

如果你要destructure一个单个参数的时候：

[[1,2],[3,4]].map(([a,b]) => a+b) result:[3,7]

如果这个单一参数具有一个默认值的时候（当参数值为undefined的时候采用默认值）

[1,undefined,3].map((x='yes') => x) result: [1,'yes',3]

4.Lexical variables(词法变量）
暂略，待整理

5.Syntax pitfalls(语法陷阱)
1. 箭头函数捆绑是很松散的
你需要将箭头函数用()括起来：
	
	console.log(typeof () => {}) //SyntaxError
	console.log(typeof (() => {})) // OK
2. 不能在箭头函数的参数后面换行
	const func1 = (x, y) // SyntaxError
=> {
    return x + y;
};
const func2 = (x, y) => // OK
{
    return x + y;
};
const func3 = (x, y) => { // OK
    return x + y;
};

const func4 = (x, y) // SyntaxError
=> x + y;
const func5 = (x, y) => // OK
x + y;
Line breaks inside parameter definitions are OK:

const func6 = ( // OK
    x,
    y
) => {
  	return x+y;
}		
3. You can’t use statements as expression bodies
Expressions vs statements
Expressions(表达式)产生值,eg:
	 
	3 + 4
	foo(7)
	'abc'.length

statements(声明)做事情，eg:

	while (true) { ··· }
	return 123;

大多数表达式可以作为声明使用，只需在声明的位置提及它们：
	
	function bar() {
	    3 + 4;
	    foo(7);
	    'abc'.length;
	}
箭头函数的函数体
如果expression箭头函数的函数体，你不需要{}，eg:

asyncFunc.then(x => console.log(x));
如果statements是就函数的主体，你需要{}，eg:

asyncFunc.catch(x=> {throw x});
4.返回对象字面量
除expression(表达式）外，你需要使用{}，这意味着：如果你想要函数体是一个对象字面量，那么你需要{}（因为对象字面量是statement，而不是expression)

The body of this arrow function is a block with the label bar and the expression statement 123.

	const f = x => { bar: 123 }
The body of this arrow function is an expression, an object literal:

	const f = x => ({ bar: 123 })
6. New features of Object Literals
http://exploringjs.com/es6/ch_oop-besides-classes.html#_new-object-literal-features

14.2.2 Property value shorthands 如果指定属性值的变量名刚好是属性的键，那么你可以省略键。

Eg:

const x = 4;
const y = 1;
const obj = { x, y };
The last line is equivalent to:

const obj = { x: x, y: y };
Property value shorthands work well together with destructuring:

const obj = { x: 4, y: 1 };
const {x,y} = obj;
console.log(x); // 4
console.log(y); // 1
7. 关于ES6的转化问题--babel node
node 本身只支持一部分的ES6，不支持ES7。

在本项目中gulpfile文件的命名方式是gulpfile.babel.js, 即 使该node环境可以完全兼容ES6/7。故遇到类似...obj的spread对象的语句时，自动使用babel进行了转换后才得以顺利运行。

而在之前的项目中gulpfile文件命名方式就是gulpfile.js，则其不自动使用babel。其是在webpack中使用了babel。

***待学习：webpack/babel***

1.Promise对象
http://es6.ruanyifeng.com/#docs/promise

1.Promise的含义
Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步操作的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

Promise对象有以下两个特点：

（1）对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending（进行中）、Resolved（已完成，又称Fulfilled）和Rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。

（2）一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从Pending变为Resolved和从Pending变为Rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果。就算改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了Promise对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易。

Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于Pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用stream模式是比部署Promise更好的选择。

2. 基本用法
ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

下面代码创造了一个Promise实例。

var promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由JavaScript引擎提供，不用自己部署。

resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从Pending变为Resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从Pending变为Rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

Promise实例生成以后，可以用then方法分别指定Resolved状态和Reject状态的回调函数。

promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
3. promise.All（）
Promise.all方法用于将多个Promise实例，包装成一个新的Promise实例。

var p = Promise.all([p1, p2, p3]);
p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

4. promise.resolve()
将现有对象转为Promise对象。

Promise.resolve方法的参数分成四种情况。

（1）参数是一个Promise实例
若参数本身就是Promise实例，则Promise.resolve将不做任何修改、原封不动地返回这个实例。

####（2）参数是一个thenable对象 thenable对象指的是具有then方法的对象。

Promise.resolve方法会将这个对象转为Promise对象，然后就立即执行thenable对象的then方法。

####（3）参数不是具有then方法的对象，或根本就不是对象

如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的Promise对象，状态为Resolved。

eg:

var p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});//Hello
上面代码生成一个新的Promise对象的实例p。由于字符串Hello不属于异步操作（判断方法是它不是具有then方法的对象），返回Promise实例的状态从一生成就是Resolved，所以回调函数会立即执行。Promise.resolve方法的参数，会同时传给回调函数。

（4）不带有任何参数
Promise.resolve方法允许调用时不带参数，直接返回一个Resolved状态的Promise对象。

所以，如果希望得到一个Promise对象，比较方便的方法就是直接调用Promise.resolve方法。

setTimeout(function () {
  console.log('three');
}, 0);

Promise.resolve().then(function () {
  console.log('two');
});

console.log('one');

// one
// two
// three
上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log(’one‘)则是立即执行，因此最先输出。注意

2.函数
1. =>语法
那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了this。

示例：

// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
箭头函数取代Function.prototype.bind，不应再用self/_this/that绑定 this。

// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}

// acceptable
const boundMethod = method.bind(this);

// best
const boundMethod = (...params) => method.apply(this, params);
2. 运算符（...）
不要在函数体内使用arguments变量，使用rest运算符（...）代替。因为rest运算符显式表明你想要获取参数，而且arguments是一个类似数组的对象，而rest运算符可以提供一个真正的数组。

// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
3.默认值语法
使用默认值语法设置函数参数的默认值。

// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}
3. class
参见http://es6.ruanyifeng.com/#docs/class或

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

及红宝书P159

1. 基本语法
类的定义
JavaScript传统定义类的方法：组合使用构造函数模式和原型模式

eg:

function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
ES6提供了更接近传统语言的写法，引入了Class(类）这个概念，作为对象的模板。通过class关键字，可以定义类。class的绝大部分功能ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。以上代码用ES6的“类”改写，就是下面这样：

class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return '('+this.x+','+this.y+')';
	}
}
以上代码定义了一个类Point，constructor就是构造方法，而this关键字代表实例对象。即ES5的构造函数Point，对应ES6的Point类的构造方法。

除了constructor构造方法外，Point类还定义了一个toString方法。事实上，类的所有方法都定义在类的prototype属性上面。

注意：

定义“类”的方法时，前面不需要加上funciton关键字
方法之间不需要逗号分隔，加了逗号会报错
类的实例对象
也是使用new命令：

var p=new Point(2，3);
与ES5一样，实例的属性除非显示定义在其本身（即定义在this对象上），否则都定义在原型上（即定义在class上）。

class Point{
	constructor(x,y){
		this.x=x;
		this.y=y;
	}
	toString(){
		return '('+this.x+','+this.y+')';
	}
}

var point=new Point(2,3);

console.log(point.toString());//(2,3)

console.log(point.hasOwnProperty('x'));//true

console.log(point.hasOwnProperty('y'));//true

console.log(point.hasOwnProperty('toString'));//false

console.log(point.__proto__.hasOwnProperty('toString'));//true
上面代码中，x和y都是实例对象point自身的属性（因为定义在this变量上），所以hasOwnProperty方法返回true，而toString是原型对象的属性（因为定义在Point类上），所以hasOwnProperty方法返回false。这些都与ES5的行为保持一致。

可以通过实例的__proto__属性为Class添加方法。

var p1=new Point(2,3);
var p2=new Point(3,2);

p1.__proto__.printName=function(){
	return 'Oops';

}

console.log(p1.printName());//Oops
console.log(p2.printName());//Oops

var p3=new Point(4,2);
console.log(p3.printName());//Oops
上面代码在p1的原型上添加了一个printName方法，由于p1的原型就是p2的原型，因此p2也可以调用这个方法。而且，此后新建的实例p3也可以调用这个方法。这意味着，使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变Class的原始定义，影响到所有实例。

不存在变量提升
Class不存在变量提升（hoist),这点与ES5完全不同。

类必须先定义后使用。如果类使用在前，定义在后，则会报错，如下列所示。

new Foo();//ReferenceError:Foo is not defined
class Foo{};
6.Class的静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。

class Foo{
	static classMethod(){
		return 'hello';
	}
}

console.log(Foo.classMethod());//hello

var foo=new Foo();

console.log(foo.classMethod());//TypeError:foo.classMethod is not a function
以上代码中，Foo类的classMethod方法前有static关键字，表明该方法是一个静态方法，要直接在Foo类上调用（Foo.classMethod()),而不能在Foo类的实例上调用。

4. let命令
ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

Eg:

{
	let a=10;
	var b=1;
}
console.log(b);1
console.log(a);//Referenceerror:a is not defined
5.const命令
const声明一个只读的常量。一旦声明，常量的值就不能改变。

Eg1:改变常量的值会报错

const PI=3.1415;
console.log(PI);//3.1415

PI=3;//TypeError:Assignment to constant variable
对const来说，只声明不赋值，也会报错。

Eg2:

const foo;//SyntaxError:Missing initializer in const declaration
const的作用域和let相同，只在声明所在的块级作用域内有效:

Eg3:

if(true){
	const MAX=5;
}

console.log(MAX);//ReferenceError:MAX is not defined
const声明的常量也是不提升，存在暂时性死去，只能在声明的位置后面使用:

Eg4:

if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
const声明的常量，与let一样不可重复声明：

Eg5：

var message = "Hello!";
let age = 25;

// 以下两行都会报错
const message = "Goodbye!";
const age = 30;
**对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变。**所以将一个对象声明为常量必须非常小心:

Eg6:

const foo = {};
foo.prop = 123;

foo.prop
// 123

foo = {}; // TypeError: "foo" is read-only
上面代码中，常量foo储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把foo指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

Eg6:

const a=[];
a.push('hello');//可执行
a.length=0;//可执行
a=['Dave'];//报错
以上代码中，常量a是一个数组，这个数组本身是可写的，但如果将另一个数组赋值给a，就会报错。



书籍二：Exploringjs
http://exploringjs.com/es6/ch_about-book.html

What do you need to know about this book?（关于本书你需要知道什么？）
Glossary(名词解释）
Strict mode VS sloppy mode
ECMAScript5 引入了语言模式:

Strict 模式:通过改变JavaScript的语义，执行更多checks和抛出更多的异常等方法，使得 JavaScript的语言更干净。
non-strict模式或sloppy模式：即使遗留\默认模式
Strict 模式是通过下面这句话开启的（在ES5之前是没有任何用的）：

'use strict';
如果你把这句话放在一个文件的开始处，文件中所有的代码都会出于严格模式。如果你把这句话放在一个函数的第一行，则只有这个函数出于严格模式。

使用一个指令来开启一个模式对用户是不太友好的，而且这是严格模式为什么在ES5中并不像它应该的那样受欢迎的原因之一。然而，ES6模块暗中使用严格模式。因为大多数ES6代码需要在各种模块中可用，所以严格模式成为ES6的实际默认模式。

Protocal
在编程语言和API设计情景下，protocal术语是这个意思：

一个protocal 定义了接口和使用它们的规则。
意思是指明了一个服务是怎样被执行的。

Receiver(of a method call)
给出一个方法的调用 obj.m(...),obj即是这个调用的方法的receiver，且其(obj)在方法内部通过this关键字访问。

Signature of a function(or a method)
一个函数的Signature描述了这个函数是怎样被调用的，它的输入输出分别是什么。Eg:

parseInt(string : string, radix? : number) : number
这表示parseInt()需要一个String和一个Number的输入，并返回一个Number。

Internal properties（内置属性）
ES6的specification使用"internal properties"来描述JavaScript是怎样工作的。只有spec中有这个名词，在JavaScript中是没有的。它们在语言的实际应用中可能存在也可能不存在。internal properties的名字写在双层方括号中。

Example:一个对象和它的原型之间的联系就是internal property:[[Prototype]]。这个属性值不能直接通过JavaScript访问，但是你可以通过Object.getPrototypeOf()实现访问。

Bindings and environments
binding是一个变量的存储空间。ECMAScript说明书使用一种叫做"environment"的数据结构来存储作用域之中的变量。这种environment是一个字典，建立者变量名和变量值之间的映射关系。binding是environment的入口。

Conventions(一些约定）
描述classes(类）
class C的API通常会这样描述：

C 的constructor
C 的static methods
C 的prototype methods
大写的用法
我这样对一些JavaScript术语使用大写：

原生实体的名称不用大写：一个布尔值，一个Number值，一个symbol(是什么 ），一个字符串。 这样 做的原因是为了区分TypeString和Flow:(待查书复习）

String类型：它的成员是objects。
string类型：它的成员是原生值。
数据结构Map是大写的。合理性在于：与Array的方法map()区分开。

数据结构Set是大写的。合理性在于：与动词 set 区分开。

Array和Promise是大写的。合理性在于：如果不大写会和英语单词混淆。

不大写的有：object,generator,proxy。

Github上的Demo代码
略

SideBars
SideBars是一些用图标标记的文字框。它们补充了正文。

Footnotes
有时，我会通过脚注来说明我的参考资料。通过把首部单词放进方括号来标记。

1. About ECMAScript 6
http://exploringjs.com/es6/ch_about-es6.html

Goals for ES6
1.成为一门更好的语言
2.提高交互性
Eg:

Classes:基于当前使用的构造函数
Modules:从CommonJs的模块格式
箭头函数：从CoffeeScript借鉴来的语法
命名函数参数
3.版本控制
目标是让版本控制尽可能的简单和线性。

ES6通过“一个JavaScript"原则避免管理多个版本：在ES6代码基础上，所有都是ES6,没有哪一部分是ES5的。

ES6功能分类
ES6说明书的引言列出了所有的新功能：

主要的提升包括模块，class声明，作用域，迭代器和generators,用来进行异步编程的promise对象，拆解路径，适当的尾部调用。内置的ECMA库邮件扩展到支持额外的数据抽象概念，包括maps,sets,二进制数值的arrays,以及strings和正则表达式中对扩充的Unicode字符的支持。

主要有三辆功能：

对于已有功能的更好的语法。Eg:
Classes
Modules
标准库中的新功能。Eg:
strings和Arrays的新方法
Promises
Maps,Sets
全新的功能。Eg:
Generators
Proxies
WeakMaps
2.FAQ:ECMAScript 6
我该怎样把ECMAScript5迁移为ECMAScript6?
不用做任何事：ES6是ES5的超集。就是说，你所有的ES5代码都自动是ES6代码。这对于接收ES6这个新版本帮助很大。

学ES6是否还仍然有意义？
你不应该再学ES5了吗？并不是，原因如下：

ES6是ES5的超集——新的JS版本必须永远不能打破已经存在的代码。所以，你学的ES5没有任何一点是白费的。
有几个ES6的功能是代替的ES5的功能，但仍然以ES5为基础。理解这些基础是非常重要的。Eg:classes在内部是转化为构造函数的，方法都仍然还是函数。
ES6是不是太大了？
有一种对ES6的质疑是，ES6太大了而且引入了太多没什么用的语法。

然而，在很多方面，JS现在正在追赶Python和Ruby。这二者有更多的feature，并且具有更大的标准库。

3. One JavaScript:avoiding versioning in ECMAScript6
暂略

4. First steps with ECMAScript6
http://exploringjs.com/es6/ch_first-steps.html

这章是学习ES6的第一步：它列出了ES6的一些接收起来比较简单的功能，并通过ES5代码来解释。

4.1 由var到let/const
在ES5中，你通过var来声明变量。这种变量是函数级作用域的。

var的行为有时候很令人困惑。Eg:

var x=3;
function func(randomize){
	console.log(x)//undefined
	if(randomize){
		var x=Math.random();
		console.log(x);
		return x;
	}
	console.log(x);//undefined
	return x;
}

console.log(func(false));//undefined
以下代码更接近真实执行的（为什么）：

var x=3;
function func(randomize){
	var x;
	if(randomize){
		var x=Math.random();
		console.log(x);
		return x;
	}
	console.log(x);
	return x;
}

console.log(func(false));
对比如下代码：

var x=3;
function func(randomize){
	console.log(x);//3
	if(randomize){
		x=Math.random();
		console.log(x);
		return x;
	}
	console.log(x);//3
	return x;
}

console.log(func(false));//3
在ES6中，你可以另外通过let和const来声明变量。它们声明的变量是块级作用域的。其作用域是最内层的包围块。let大体上就是var的块级作用域版本。const作用和let相似，但创建的变量的值不能被改变。

let和const的行为更严格，且能够跑出更多异常（e.g.在变量的作用域内，你先访问后申明变量）。块级作用域帮助使得代码片段的影响更加本地化，且比函数级作用域更主流，其减少了JavaScript和其他编程语言之间的差异。

使用let代替最上面的代码：

let x=3;
function func(randomize){
	console.log(x);//3
	if(randomize){
		let x=Math.random();
		console.log(x);
		return x;
	}
	console.log(x);//3
	return x;
}

console.log(func(false));//3
这说明你不能在现有代码中将var盲目地替换为let或const。你需要在代码重构的时候很小心。

我的建议如下：

首选const。你能为所有值永远不改变的变量使用它。
接着，使用let。为那些值需要改变的变量使用它。
避免使用var。
4.2 从IIFEs到blocks
在ES5中，如果你想要限制变量tmp的作用域为一个block，你就不得不使用一种叫做IIFE(立即执行的函数表达式）的模式：

(function(){
	var tmp=100;
})();

console.log(tmp);//ReferenceError 
这里教程代码有误

在ES6中，你可以轻松地使用block和let声明（或const):

{
	let tmp=100;
}
console.log(tmp);//ReferenceError
4.3 从拼接字符串到模板文字
在ES6中，JavaScript最终可以用获取文字来代替字符串拼接和多行字符串。

4.3.1 字符串插值
在ES5中，采用字符串拼接：

function printCoord(x,y){
	console.log('('+x+','+y+')');
}

printCoord(1,2);//(1,2)
在ES6中，你可以通过模板文字进行字符串插值：

function printCoord(x,y){
	console.log(`(${x},${y})`);//`是通过键盘左上角那个按键打出来的
}

printCoord(1,2);
4.3.2 多行字符串
在ES5中:

var HTML5_SKELETON='<!doctypehtml>\n'+
	'<html>\n'+
	'<head>\n'+
	'  <meta charset="utf-8">\n'+
	'  <title></title>\n'+
	'</head>\n'+
	'<body>\n'+
	'</body>\n'+
	'</html>\n';

console.log(HTML5_SKELETON);
或者：

var HTML5_SKELETON='\
	<!doctypehtml>\n\
	<html>\n\
	<head>\n\
	   <meta charset="utf-8">\n\
	   <title></title>\n\
	</head>\n\
	<body>\n\
	</body>\n\
	</html>';

console.log(HTML5_SKELETON);
ES6的模板文字可以跨越多行：

var HTML5_SKELETON=`
	<!doctypehtml>
	<html>
	<head>
	   <meta charset="utf-8">
	   <title></title>
	</head>
	<body>
	</body>
	</html>`;

console.log(HTML5_SKELETON);
4.4 从函数表达式到箭头函数
（1）箭头函数不遮蔽外层函数的this
在ES5代码中，无论何时你使用函数表达式，你都不得不对于this格外小心。

在如下例子中，需要创建一个辅助变量_this来使得在内部函数还能获取指向UiComponent的this:

function UiComponent(){
	var _this=this;
	var button=document.getElementById('myButton');
	button.addEventListener('click',function(){
		console.log('CLICK');
		_this.handleClick();
	})
}
UiComponent.prototype.handleClick=function(){
	console.log('handleCLick');
}
var component1=new UiComponent();
在ES6中，你可以使用箭头函数，它不会遮蔽外层函数的this：

function UiComponent(){
	var button=document.getElementById('myButton');
	button.addEventListener('click',()=>{
		console.log('CLICK');
		this.handleClick();
	})
}
UiComponent.prototype.handleClick=function(){
	console.log('handleCLick');
}
var component1=new UiComponent();
（说明：在ES6中，你也可以选择使用class来代替构造函数，这将在后面说明）

（2）箭头函数尤其适用只返回表达式结果的函数
箭头函数对于短的只是返回表达式结果的return函数尤其便利：

var arr=[1,2,3];
var squares=arr.map(function(x){
	return x*x;
})

console.log(squares);//[1,4,9]
在ES6中，箭头函数更加简明：

var arr=[1,2,3];
var squares=arr.map(x => x*x);

console.log(squares);
在定义参数时，如果参数是一个简单的标识符，你甚至可以省略圆括号。即(x)=>xx 和 x=>xx 都是可以的。

4.5 处理多个返回值
一些函数或方法通过arrays或objects返回多个值。在ES5中，如果你想要获取这些值，你通常都需要创建中间变量。在ES6中，你可以通过析构来避免中间变量。

4.5.1 通过arrays返回多个变量
exec()通过类数组对象返回捕获组。在ES5中，你需要一个中间变量（下例中是matchObj),即使你只对捕获组感兴趣：

var matchObj=/^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');
var year=matchObj[1];
var month=matchObj[2];
var day=matchObj[3];
console.log(year);//2999
console.log(month);//12
console.log(day);//31
在ES6中，析构让代码变得更简单：

const [,year,month,day]=/^(\d\d\d\d)-(\d\d)-(\d\d)$/.exec('2999-12-31');

console.log(year);
console.log(month);
console.log(day);
数组模式开头处的空位置是跳过了index为0的数组元素（即匹配的整个字符串'2999-12-31'）。

4.5.2 通过objects返回多个值
Object.getOwnPropertyDescriptor()返回一个属性描述对象。

在ES5中，即使你只对对象的属性感兴趣，你仍然需要一个中间变量，就像如下例子：

var obj={foo:123};

var propDesc=Object.getOwnPropertyDescriptor(obj,'foo');
var writable=propDesc.writable;
var configurable=propDesc.configurable;

console.log(writable,configurable);//true true
在ES6中，你可以使用析构：

const obj = { foo: 123 };

const {writable, configurable} =
    Object.getOwnPropertyDescriptor(obj, 'foo');

console.log(writable, configurable); // true true
**注意：node必须切换成6.2.2版才有效！！！不然低版本node执行这种析构会报错的。

4.6 从for到forEach()再到for-of
ES5中是这样迭代的：

var arr=['a','b','c'];

for(var i=0;i<arr.length;i++){
	var elem=arr[i];
	console.log(elem);
}
在ES5中，你还可以使用数组方法forEach():

var arr=['a','b','c'];

arr.forEach(function(elem){
	console.log(elem);
})
说明：Array方法foreach(func)：对数组中的每一项运行给定函数，该方法没有返回值（于map(func)方法形成对比）。

在ES6中，for-of循环整合了以上两种优点：

const arr=['a','b','c'];

for(const elem of arr){
	console.log(elem);//a b c
}
如果你想要得到array每项的index和value，使用**entries()**方法可以析构：

const arr=['a','b','c'];

for(const [index,elem] of arr.entries()){
	console.log(`${index}. ${elem}`);
}//0.a 1.b 2.c
4.7 处理有默认值的参数
在ES5中，你这样来指定参数的默认值：

function foo(x,y){
	x=x||0;
	y=y||0;
	console.log(x,y);//0 0

}
ES6有更好的语法：

function foo(x=0,y=0){
	console.log(x,y);//0 0
}
ES6此处另外还有一个优点，即参数只有在其没定义的情况下才使用默认值;而在ES5中参数在定义了false值的情况下就会使用默认值。

4.8 处理命名参数
JavaScript中命名参数的常用方式是通过对象字面量：

selectEntries({ start: 0, end: -1 });
在ES5中，你可以这样写selectEntries

function selectEntries(options) {
    var start = options.start || 0;
    var end = options.end || -1;
    var step = options.step || 1;
    ···
}
在ES6中，你可以使用析构的方式来定义参数，然后代码就更简单了：

function selectEntries({ start=0, end=-1, step=1 }) {
    ···
}
***不知所云***待看其对应的详细讲解章节http://exploringjs.com/es6/ch_parameter-handling.html#sec_named-parameters。

4.9 从参数到剩余参数
在ES5中，如果你想要一个函数（或方法）接受任意数量的参数，你必须使用特殊的变量arguments:

function logAllArguments() {
    for (var i=0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}
在ES6中，你可以通过...运算符来声明剩余参数：

11 Parameter handling
11.5.3 Simulating Named Parameters in JavaScript(模仿命名参数）
和其他语言不同，JS对于命名参数没有原生支持。但是有一个相当优雅的模拟：每个实参都是一个对象字面量的属性，该对象字面量会作为一个单一的正式的参数传递给别调用函数。

使用该技术时，你可以像这样调用selectEntris函数：

selectEntries({start:3, end:20, step:2});
这个函数接收一个带有属性start,end,step的对象。你可以省略其中任意属性：

selectEntries({ step: 2 });
selectEntries({ end: 20, start: 3 });
selectEntries();
在ES5中，你得这样定义selectEntries():

function selectEntries(options) {
    options = options || {};
    var start = options.start || 0;
    var end = options.end || -1;
    var step = options.step || 1;
    ···
}
在ES6中，你可以使用destructing（解构赋值）来定义，像这样：

function selectEntries({ start=0, end=-1, step=1 }) {
    ···
}
但是如果你不带任何参数调用selectEntries()，这个解构赋值就失败了，因为你不能用undefinded来给object赋值。 这个问题可以通过默认值来修复。在下面的code中，如果调用时不带参数的话，这个object会获取{}

function selectEntries({start=0,end=-1,step=1}={}){
 ...
}
你也可以将positional parameters和named parameters一起使用。

someFunc(posArg1, { namedArg1:7, name2Arg2:true } )
ES6的类
参见https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes

关于super()的用法https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super



### Promise:
为了防止不可预知的bug，在生产项目中最好还是不要使用原生的或者自己编写的Promise（目前为止并不是所有浏览器都能很好的兼容ES6），而是使用已经较为成熟的有大量小伙伴使用的第三方Promise库，下面就为小伙伴推荐一个—— Bluebird
https://www.jianshu.com/p/c98eb98bd00c

Object.assign方法用于对象的合并，将源对象（ source ）的所有可枚举属性，复制到目标对象

async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。async 函数返回的是一个 Promise 对象。
https://www.cnblogs.com/CreateMyself/p/5983208.html

### redis:
npm install redis是安装Redis的Node.js客户端，你的Node.js程序就可以连接到Redis服务器并进行操作；
Redis是一个基于BSD开源的使用ANSI C语言编写、支持网络、可基于内存亦可持久化的日志型、Key-Value数据库，并提供多种语言的API.

### koa：
koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。 使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。
https://koa.bootcss.com/