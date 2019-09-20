https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

apply() 方法调用一个函数, 其`具有一个指定的this值，以及作为一个数组`（或类似数组的对象）提供的参数。

## 语法
func.apply(thisArg, [argsArray])
- 参数
thisArg

可选的。`在 func 函数运行时使用的 this 值`。需要注意的是，使用的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则`指定为 null 或 undefined 时会自动替换为指向全局对象`（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的包装对象。

argsArray

可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。浏览器兼容性请参阅本文底部内容。
- 返回值
`调用有指定this值和参数的函数的结果`。


## 使用apply来链接构造器
你可以`使用apply来链接一个对象构造器`，类似于Java。在接下来的例子中我们会创建一个全局Function 对象的construct方法 ，来使你能够在构造器中使用一个类数组对象而非参数列表。
```
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};  
有多种方法，见链接
```
```
function MyConstructor () {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"
```
## 使用apply和`内置函数`
```
/* min/max number in an array */
var numbers = [5, 6, 2, 3, 7];

/* using Math.min/Math.max apply */
var max = Math.max.apply(null, numbers); /* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* vs. simple loop based algorithm */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min) 
    min = numbers[i];
}
```
详情见链接

## 在"monkey-patching"中使用apply
Apply可以作为monkey-patch一个Firefox或JS库内建函数的最好方式。对于someobject.foo 函数，你可以用一种旁门左道的方式来修改这个函数，像这样：
```
var originalfoo = someobject.foo;
someobject.foo = function() {
  //在调用函数前干些什么
  console.log(arguments);
  //像正常调用这个函数一样来进行调用：
  originalfoo.apply(this,arguments);
  //在这里做一些调用之后的事情。
}
```