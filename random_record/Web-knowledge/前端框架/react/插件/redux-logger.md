https://github.com/evgenyrodionov/redux-logger

LogRocket is a production Redux logging tool that lets you replay problems as if they happened in your own browser. Instead of guessing why errors happen, or asking users for screenshots and log dumps, LogRocket lets you replay Redux actions + state, network requests, console logs, and see a video of what the user saw.
LogRocket是一个生产的Redux日志工具，它可以让您重放问题，就好像它们发生在您自己的浏览器中一样。与其猜测错误发生的原因，或者询问用户屏幕截图和日志转储，LogRocket允许您重放Redux操作+状态、网络请求、控制台日志，并查看用户所看到的视频。

Note: logger must be the last middleware in chain, otherwise it will log thunk and promise, not actual actions.
注意:logger 必须是链中的最后一个中间件，否则它将记录thunk和promise，而不是实际的操作。

Log batched actions 日志批处理操作

## Options
```
{
  predicate, // if specified this function will be called before each action is processed with this middleware.如果指定此函数，则在使用此中间件处理每个操作之前调用该函数。
  collapsed, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.取一个布尔或可选的函数，该函数接收“getState”函数，以访问当前存储状态和“action”对象作为参数。如果日志组应该崩溃，则返回“true”，否则为“false”。
  duration = false: Boolean, // print the duration of each action?打印每个动作的持续时间?
  timestamp = true: Boolean, // print the timestamp with each action?用每个动作打印时间戳?

  level = 'log': 'log' | 'console' | 'warn' | 'error' | 'info', // console's level控制台的级别
  colors: ColorsObject, // colors for title, prev state, action and next state: https://github.com/evgenyrodionov/redux-logger/blob/master/src/defaults.js#L12-L18

  titleFormatter, // Format the title used when logging actions.在日志记录操作时使用的标题格式。

  stateTransformer, // Transform state before print. Eg. convert Immutable object to plain JSON.打印之前转换状态。如：将不可变对象转换为纯JSON。
  actionTransformer, // Transform action before print. Eg. convert Immutable object to plain JSON.
  errorTransformer, // Transform error before print. Eg. convert Immutable object to plain JSON.

  logger = console: LoggerObject, // implementation of the `console` API.“console”API的实现。
  logErrors = true: Boolean, // should the logger catch, log, and re-throw errors?日志记录器是否应该捕获、记录和重新抛出错误?

  diff = false: Boolean, // (alpha) show diff between states?(alpha)显示状态之间的差异?
  diffPredicate // (alpha) filter function for showing states diff, similar to `predicate`(alpha)显示状态diff的filter函数，类似于“谓词”
}
```

```
//predicate后面跟一个函数实例：
createLogger({
  predicate: (getState, action) => action.type !== AUTH_REMOVE_TOKEN
});
```