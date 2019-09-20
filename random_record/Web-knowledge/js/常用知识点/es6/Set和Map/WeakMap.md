- WeakMap结构与Map结构类似，也是用于生成键值对的集合。

## WeakMap与Map的区别
1. WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
2. WeakMap的键名`所指向的对象，不计入垃圾回收机制`
3.  API 上的区别:
   - 一是`没有遍历操作（即没有key()、values()和entries()方法），也没有size属性`。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
   - 二是`无法清空，即不支持clear方法`。因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

```
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

- 如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。
- 一个典型应用场景是，`在网页的 DOM 元素上添加数据，就可以使用WeakMap结构`。当该 DOM 元素被清除，其所对应的WeakMap记录就会自动被移除。
- WeakMap的专用场合就是，`它的键所对应的对象，可能会在将来消失。WeakMap结构有助于防止内存泄漏。`
- WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。
```
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}

键值obj是正常引用
```