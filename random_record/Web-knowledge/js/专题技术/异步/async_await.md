<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function>

https://segmentfault.com/a/1190000011526612?utm_source=tag-newest

async function 声明了一个异步函数，并返回了一个 AsyncFunction 对象。

#### 语法

async function name([param[, param[, ... param]]]) {
statements
}

-name 方法的名字。

- param 传递给方法的参数名。
- statements 方法体的语句。

#### 描述

调用异步函数时会返回一个 promise 对象。当这个异步函数返回一个值时，promise 的 resolve 方法将会处理这个返回值；当异步函数抛出的是异常或者非法值时，promise 的 reject 方法将处理这个异常值。

异步函数可能会包括 await 表达式，`这将会使异步函数暂停执行并等待 promise 解析传值后`，继续执行异步函数并返回解析值。

#### 使用例子

```
	function resolveAfter2Seconds(x) {
	  return new Promise(resolve => {
	    setTimeout(() => {
	      resolve(x);
	    }, 2000);
	  });
	}

	async function add1(x) {
		var c = await resolveAfter2Seconds(40);  //40
	  var a = resolveAfter2Seconds(20);
	  var b = resolveAfter2Seconds(c);  //认证在逻辑比较简单的时候，可以直接用promise；只有当promise的链式操作不连续地使用resolve的结果时，才有必要用async/await,比如第一步promise产生的resolve的值只能在下一个then中使用，那么如果再第三个then中使用的话，就无法直接采用promise的办法了。
		console.log(a);  //Promise {<pending>}
		console.log(await a);  //Promise {<pending>}  20  既返回Promise，又返回值20，所以需要写await
		console.log(x + await a + await b);  //122040
	  return x + await a + await b;
	}
	add1('12');
```

### 4.await

<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await>

The await operator is used to wait for a promise returned by an async function.

#### 语法

    [rv] = await expression

###### expression

A promise or any value to wait for the resolution.

###### return

Returns the resolved value of the promise, or the value itself if it's not a promise.(**如果是 promise 就返回 promise 的 resovled 的值**；如果不是 promise，就返回值本身)

#### Examples

```
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
	<!--此例子是返回promise的resovled的值-->
```

#### 总结

- **_await 一定要放在 async 函数里面，否则 node 不认识，node7.4.0 以后才认识 async/await_**
- **_async 一定要写在包含 await 语句的最内层函数函数名前_**,不能 async function A ( ) { function B () { await ...}}
- async 可以用于箭头函数
- 如果 await 的这个 promise 无 resolve 的值，那么可以直接写 await xxxx(xx)
- 它和 co yield 组合的作用一模一样，co yield 就是为了模仿它
- 在逻辑比较简单的时候，可以直接用 promise；只有当 promise 的链式操作不连续地使用 resolve 的结果时，才有必要用 async/await,比如第一步 promise 产生的 resolve 的值只能在下一个 then 中使用，那么如果再第三个 then 中使用的话，就无法直接采用 promise 的办法了。

## 终极解决

异步操作是 JavaScript 编程的麻烦事，麻烦到一直有人提出各种各样的方案，试图解决这个问题。

从最早的回调函数，到 Promise 对象，再到 Generator 函数，每次都有所改进，但又让人觉得不彻底。它们都有额外的复杂性，都需要理解抽象的底层运行机制。

异步 I/O 不就是读取一个文件吗，干嘛要搞得这么复杂？异步编程的最高境界，就是根本不用关心它是不是异步。

async 函数就是隧道尽头的亮光，很多人认为它是异步操作的终极解决方案。

## async 函数是什么？

一句话，async 函数就是 Generator 函数的语法糖。

前文有一个 Generator 函数，依次读取两个文件。

```
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

写成 async 函数，就是下面这样。

```
var asyncReadFile = async function (){
  var f1 = await readFile('/etc/fstab');
  var f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

一比较就会发现，async 函数就是将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await，仅此而已。

## async 函数的优点

async 函数对 Generator 函数的改进，体现在以下三点。

（1）内置执行器。 Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样，只要一行。
var result = asyncReadFile();

（2）更好的语义。 async 和 await，比起星号和 yield，语义更清楚了。async 表示函数里有异步操作，await 表示紧跟在后面的表达式需要等待结果。

（3）更广的适用性。 co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）。

## async 函数的实现

async 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。

```
async function fn(args){
  // ...
}

// 等同于

function fn(args){
  return spawn(function*() {
    // ...
  });
}
```

所有的 async 函数都可以写成上面的第二种形式，其中的 spawn 函数就是自动执行器。

下面给出 spawn 函数的实现，基本就是前文自动执行器的翻版。

```
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    var gen = genF();
    function step(nextF) {
      try {
        var next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

async 函数是非常新的语法功能，新到都不属于 ES6，而是属于 ES7。目前，它仍处于提案阶段，但是转码器 Babel 和 regenerator 都已经支持，转码后就能使用。

## async 函数的用法

同 Generator 函数一样，async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再接着执行函数体内后面的语句。

下面是一个例子。

```
async function getStockPriceByName(name) {
  var symbol = await getStockSymbol(name);
  var stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result){
  console.log(result);
});
```

上面代码是一个获取股票报价的函数，函数前面的 async 关键字，表明该函数内部有异步操作。调用该函数时，会立即返回一个 Promise 对象。

下面的例子，指定多少毫秒后输出一个值。

```
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);
```

上面代码指定 50 毫秒以后，输出”hello world”。

## 注意点

await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try…catch 代码块中。

```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。


async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
```

上面代码会报错，因为 await 用在普通函数之中了。但是，如果将 forEach 方法的参数改成 async 函数，也有问题。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```

上面代码可能不会正常工作，原因是这时三个 db.post 操作将是并发执行，也就是`同时执行，而不是继发执行`。正确的写法是采用 for 循环。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];

  for (let doc of docs) {
    await db.post(doc);
  }
}
```

如果确实`希望多个请求并发执行，可以使用 Promise.all 方法`。

```
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```
