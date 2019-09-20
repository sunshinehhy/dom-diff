ES6标准引入的异步编程解决方案Promise，能够将层层嵌套的回调转化成扁平的Promise链式调用，优雅地解决了“回调地狱”的问题。 
当Promise链中抛出一个错误时，错误信息沿着链路向后传递，直至被捕获。利用这个特性能跳过链中函数的调用，直至链路终点，变相地结束Promise链。

```
Promise.resolve()
    .then(() => {
        console.log('[onFulfilled_1]');
        throw 'throw on onFulfilled_1';
    })
    .then(() => {  // 中间的函数不会被调用
        console.log('[onFulfilled_2]');
    })
    .catch(err => {
        console.log('[catch]', err);
    });
// => [onFulfilled_1]
// => [catch] throw on onFulfilled_1

```
第二个catch不会继续执行

```
Promise.resolve()
    .then(() => {
        console.log('[onFulfilled_1]');
        throw 'throw on onFulfilled_1';
    })
    .then(() => {  // 中间的函数不会被调用
        console.log('[onFulfilled_2]');
    })
    .catch(err => {
        console.log('[catch]', err);
    })
    .catch(err => {
        console.log('[catch]---', err);
    });
// => [onFulfilled_1]
// => [catch] throw on onFulfilled_1

```


然而，若链路中也对错误进行了捕获，则后续的函数可能会继续执行。
```
Promise.resolve()
    .then(() => {
        console.log('[onFulfilled_1]');
        throw 'throw on onFulfilled_1';
    })
    .then(() => {
        console.log('[onFulfilled_2]');
    }, err => {     // 捕获错误
        console.log('[onRejected_2]', err);
    })
    .then(() => {   // 该函数将被调用
        console.log('[onFulfilled_3]');
    })
    .catch(err => {
        console.log('[catch]', err);
    });
// => [onFulfilled_1]
// => [onRejected_2] throw on onFulfilled_1
// => [onFulfilled_3]

```

## 解决方案

Promise的then方法接收两个参数： 
Promise.prototype.then(onFulfilled, onRejected) 
若onFulfilled或onRejected是一个函数，当函数返回一个新Promise对象时，原Promise对象的状态将跟新对象保持一致，详见Promises/A+标准。 
因此，当新对象保持“pending”状态时，原Promise链将会中止执行。

```

Promise.resolve()
    .then(() => {
        console.log('[onFulfilled_1]');
        return new Promise(()=>{}); // 返回“pending”状态的Promise对象
    })
    .then(() => {                   // 后续的函数不会被调用
        console.log('[onFulfilled_2]');
    })
    .catch(err => {
        console.log('[catch]', err);
    });
// => [onFulfilled_1]

```