http://blog.csdn.net/kuangshp128/article/details/67632683

https://www.npmjs.com/package/redux-thunk

https://github.com/reduxjs/redux-thunk   （作用和用法）

redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，
这中间件可以用来延迟dispatch action或者仅仅在满足一些条件情况下去dispatch action。
`返回函数传递两个参数(dispatch,getState)`,在函数体内进行业务逻辑的封装。

激活redux-thunk中间件，只需要在createStore中加入applyMiddleware(thunk)就可以。

Any return value from the inner function will be available as the return value of dispatch itself. This is convenient for orchestrating an asynchronous control flow with thunk action creators dispatching each other and returning Promises to wait for each other’s completion:
`内部函数的任何返回值都将作为dispatch本身的返回值可用`。这对于编排异步控制流很方便，因为thunk action creators互相发送，并且返回 Promises等待对方完成:

## 作用：或者说是什么东西，面试时候可说出
Redux Thunk中间件`允许您写 返回一个函数而不是一个action的action creators`。thunk可以用来延迟一个动作的发送，或者只在满足一定条件时才发送。内部函数接收the store methods dispatch and getState 作为参数。

返回执行异步分派功能的操作创建者:
```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```

返回一个执行条件分派功能的动作创建者:
```
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```

“thunk”是一个用来包装表达式来延迟其评价的函数。
A thunk is a function that wraps an expression to delay its evaluation.
```
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;
```
内部函数的任何返回值都将作为dispatch本身的返回值可用。这对于编排异步控制流很方便，因为 thunk action creators dispatching each other，并且返回Promises等待对方完成:

```
//但是当你需要启动一个异步操作时，你会怎么做呢?
//比如API调用，或者路由器转换?

/ /遇到thunks.。
// thunk是返回一个函数的函数。
//这是一个thunk。
```