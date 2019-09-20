## ExecutionEnvironment.js
```
export const canUseDOM: boolean = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);
```

## invariant.js
*假设你的程序为true，使用invariant()来推断状态
*提供sprintf-style格式(只支持% s)和参数来提供broke和你的期望信息。
*invariant消息在生产中将被剥夺了,但invariant将继续确保在生产中不同的逻辑。

缩小异常发生;使用非小型化的dev环境获取完整的错误消息和附加的有用警告

## ReactElementType.js
https://github.com/facebook/react/blob/master/packages/shared/ReactElementType.js

 React$Element<any>   这是属于泛型吗？哪里来的？
## invokeGuardedCallback.js
func: (a: A, b: B, c: C, d: D, e: E, f: F) => mixed,
func.apply(context, funcArgs);
func是用来干什么的？
## ReactErrorUtils.js
## ReactTreeTraversal.js
如果这是HostRoot，我们可能想摆脱它。这取决于我们是否希望嵌套子树(层)将事件气泡传递给它们的父树。我们也可以在主机节点上通过parentNode，但这对React Native来说行不通，也不允许我们做门户特性。
function getParent(inst) 

返回A和B的最低公共祖先，如果它们在不同的树中，则返回null
export function getLowestCommonAncestor(instA, instB) {}

如果A是B的祖先，则返回。
export function isAncestor(instA, instB) {}

模拟两阶段的遍历，捕获/气泡事件分派。
export function traverseTwoPhase(inst, fn, arg) {}

遍历ID层次结构并在任何应该接收“mouseEnter”或“mouseLeave”事件的ID上调用提供的“cb”。没有调用最近的公共祖先上的回调是因为没有“进入”或“离开”该元素。
export function traverseEnterLeave(from, to, fn, argFrom, argTo) {}

## shallowEqual.js   （这个函数我们平时可以经常用）
Object.is to avoid requiring consumers ship their own  （没看懂）
function is(x, y)
通过遍历对象上的键来执行相等
当任何键的值在参数之间不完全相等时返回false。当所有键的值严格相等时返回true。
function shallowEqual(objA: mixed, objB: mixed): boolean

## ReactTypeOfWork.js
定义不同的工作类型

## describeComponentFrame.js
## reactProdInvariant.js
警告:不要手动引入这个模块。这是错误代码系统使用的“invariant(…)”的替换，仅仅被对应的babel pass引用。它总是抛出。
function reactProdInvariant(code: string): void {}

## lowPriorityWarning.js
## getComponentName.js
## ReactInstanceMap.js
```
export function remove(key) {
  key._reactInternalFiber = undefined;
}

export function get(key) {
  return key._reactInternalFiber;
}

export function has(key) {
  return key._reactInternalFiber !== undefined;
}

export function set(key, value) {
  key._reactInternalFiber = value;
}
```