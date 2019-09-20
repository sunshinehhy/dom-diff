ReduxMiddleware:http://www.jqhtml.com/10774.html

http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html

使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。

redux-logger是中间件 ：https://github.com/evgenyrodionov/redux-logger
redux-logger必须是链中的最后一个中间件。

### 异步操作的基本思路
同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。

操作发起时的 Action
操作成功时的 Action
操作失败时的 Action