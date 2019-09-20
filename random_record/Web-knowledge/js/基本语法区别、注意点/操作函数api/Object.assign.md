## 特点
- 将源对象（source）的`所有可枚举属性`，复制到目标对象（target）

- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

- Object.assign拷贝的属性是有限制的，`只拷贝源对象的自身属性`（不拷贝继承属性），也`不拷贝不可枚举的属性`（enumerable: false）。

- 属性名为 Symbol 值的属性，会被Object.assign拷贝

- Object.assign方法实行的是浅拷贝，而不是深拷贝

```
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```
```
由于undefined和null无法转成对象，所以如果它们作为参数
Object.assign(undefined) // 报错
Object.assign(null) // 报错 


如果undefined和null不在首参数，就不会报错。
let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true
```

只有字符串的包装对象，会产生可枚举属性。所以，布尔值和数值不会合入目标对象。
```
const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj);
```

```
只有字符串的包装对象，会产生可枚举属性。
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。
```

```
只拷贝源对象的自身属性
Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }
```
## 注意点
- 浅拷贝  （见深浅拷贝）
- 同名属性的替换

```
const target = { a: { b: 'c', d: 'e' } }
const source = { a: { b: 'hello' } }
Object.assign(target, source)
// { a: { b: 'hello' } }
target对象的a属性被source对象的a属性整个替换掉了
```
- 数组的处理

Object.assign可以用来处理数组，但是会把数组视为对象。

`此功能可以替换数组前面几位元素`。（我自己想的）
```
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
```
- 取值函数的处理

Object.assign`只能进行值的复制`，如果要复制的值是一个取值函数，那么将`求值后再复制`。
```
const source = {
  get foo() { return 1 }
};
const target = {};

Object.assign(target, source)
// { foo: 1 }
```

## 用途
- **为对象添加属性**
```
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```
- **为对象添加方法**
```
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ···
  },
  anotherMethod() {
    ···
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```
- **克隆对象**
采用这种方法克隆，`只能克隆原始对象自身的值，不能克隆它继承的值`。
```
function clone(origin) {
  return Object.assign({}, origin);
}

如果想要保持继承链，可以采用下面的代码。
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}

```
- **合并多个对象**
```
将多个对象合并到某个对象。
const merge =
  (target, ...sources) => Object.assign(target, ...sources);
```
- **为属性指定默认值**

DEFAULTS对象和options对象的所有属性的值，最好都是简单类型，不要指向另一个对象。否则，DEFAULTS对象的该属性很可能不起作用。
```
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};

function processContent(options) {
  options = Object.assign({}, DEFAULTS, options);
  console.log(options);
  // ...
}
```
```
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
var options = {
  a:1,
  b:2
}
options = Object.assign({}, DEFAULTS, options);  //{logLevel: 0, outputFormat: "html", a: 1, b: 2}
```
```
const DEFAULTS = {
  logLevel: 0,
  outputFormat: 'html'
};
var options = {
  logLevel:1,
  outputFormat:2
}
options = Object.assign({}, DEFAULTS, options);  //{logLevel: 1, outputFormat: 2}
```