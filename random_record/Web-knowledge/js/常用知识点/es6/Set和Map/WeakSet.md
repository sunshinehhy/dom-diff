- WeakSet 结构与 Set 类似，也是不重复的值的集合。
- WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构
- WeakSet 可以接受一个数组或类似数组的对象作为参数。
- 实际上，任何具有 Iterable 接口的`对象`，都可以作为 WeakSet 的参数。

```
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

const b = [3, 4];
const ws = new WeakSet(b);   报错是因为b的成员不是对象
// Uncaught TypeError: Invalid value used in weak set(…)
```
`a的成员会自动成为 WeakSet 的成员,而不是a数组本身。`这意味着，数组的成员只能是对象。

## WeakSet与 Set 有两个区别。
1. WeakSet 的`成员只能是对象`，而不能是其他类型的值(包括Symbol)。
2. WeakSet 中的对象都是弱引用，即`垃圾回收机制不考虑 WeakSet 对该对象的引用`，也就是说，如果其他对象都不再引用该对象，那么`垃圾回收机制会自动回收该对象所占用的内存`，不考虑该对象还存在于 WeakSet 之中。


## 方法和属性
- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。
- WeakSet `没有size属性，没有办法遍历它的成员`，所以`不能用forEach`

```
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

ws.size // undefined      不能用size
ws.forEach // undefined    不能用forEach

ws.forEach(function(item){ console.log('WeakSet has ' + item)})
// TypeError: undefined is not a function
```

+ 注意：`WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失`，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
+ 用处: `储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏`。