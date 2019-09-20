ES5 的对象属性名都是字符串，这容易造成属性名的冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。这就是 ES6 引入Symbol的原因。

ES6 引入了一种`新的原始数据类型Symbol，表示独一无二的值`。它是 JavaScript 语言的`第七种数据类型`，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

Symbol 值`通过Symbol函数生成`。这就是说，`对象的属性名现在可以有两种类型`，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是`独一无二的`，可以保证不会与其他属性名产生冲突。

```
let s = Symbol();

typeof s
// "symbol"
```
## 概述
- Symbol函数前不能使用new命令，否则会报错
- Symbol 是一个原始类型的值，不是对象
- Symbol 值不是对象，所以不能添加属性
- Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述
```
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```
- 如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值
- `相同参数的Symbol函数的返回值是不相等的`
```
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false

```
- Symbol 值`不能与其他类型的值进行运算`
- Symbol 值`可以显式转为字符串`
- Symbol 值`可以转为布尔值，但是不能转为数值`
```
let sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

let sym = Symbol();
Boolean(sym) // true  可以转为布尔值
!sym  // false  可以转为布尔值
if (sym) {
  // ...
}
Number(sym) // TypeError   不能转为数值
sym + 2 // TypeError
```
## 作为属性名的symbol
- 每一个 Symbol 值都是不相等的
- Symbol 值可以作为标识符，用于对象的属性名，就能`保证不会出现同名的属性`。这对于一个对象由多个模块构成的情况非常有用，`能防止某一个键被不小心改写或覆盖。`

- Symbol 值作为对象属性名时，`不能用点运算符`
```
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';
a[mySymbol] // undefined
a['mySymbol'] // "Hello!"
因为点运算符后面总是字符串，所以不会读取mySymbol作为标识名所指代的那个值，导致a的属性名实际上是一个字符串，而不是一个 Symbol 值。
```

- 在对象的内部，使用 Symbol 值定义属性时，Symbol 值`必须放在方括号之`中
```
let s = Symbol();

let obj = {
  [s]: function (arg) { ... }
};

obj[s](123);
```
- 可以用于定义一组常量，保证这组常量的值都是不相等的
```
log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
log(log.levels.DEBUG, 'debug message');
log(log.levels.INFO, 'info message');
```
- Symbol 值`作为属性名时，该属性是公开属性，不是私有属性。`

## 属性名的遍历
- Symbol 作为属性名，该属性`不会出现在for...in、for...of循环`中，
- 不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
- `Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。`
- Object.getOwnPropertySymbols方法`返回一个数组`，成员是当前对象的所有用作属性名的 Symbol 值
- `Reflect.ownKeys方法可以返回所有类型的键名`，`包括常规键名和 Symbol 键名`。

## Symbol.for()
- 希望重新使用同一个 Symbol 值，Symbol.for方法可以
- 它接受一个字符串作为参数，搜索有没有以该参数作为名称的 Symbol 值
- `有，就返回这个 Symbol 值`，`否则就新建并返回一个以该字符串为名称的 Symbol 值`
- Symbol.for为 Symbol 值登记的名字，`是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值`

```
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true


iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);
iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')  // true    
可以在不同的 iframe中取到同一个值
```
## Symbol.for()与Symbol()的区别
- 都会生成新的 Symbol。
- Symbol.for()会被登记`在全局环境中供搜索`，Symbol()不会。
- Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
- 比如，如果你调用Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

## Symbol.keyFor()
- Symbol.keyFor方法返回一个`已登记的 Symbol 类型值的key`。
```
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

变量s2属于未登记的 Symbol 值，所以返回undefined
```

## 内置的 Symbol 值
1. Symbol.hasInstance
2. Symbol.isConcatSpreadable
3. Symbol.species
4. Symbol.match
5. Symbol.replace
6. Symbol.search
7. Symbol.split
8. Symbol.iterator
9. Symbol.toPrimitive
10. Symbol.toStringTag
11. Symbol.unscopables
