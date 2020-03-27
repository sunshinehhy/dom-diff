### 实战

```
关于bind传递参数
th.addEventListener('click', this.sortByColumn.bind(this,columnIndex))

sortByColumn(columnIndex, e) {

}
```

更多：<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind>

`bind()方法创建一个新的函数`, 当被调用时，`将其this关键字设置为提供的值`，在调用新函数时，在任何提供之前提供一个给定的参数序列。

- 语法
  fun.bind(thisArg[, arg1[, arg2[, ...]]])

- 参数
  thisArg
  当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。`当使用new 操作符调用绑定函数时，该参数无效`。
  arg1, arg2, ...
  当绑定函数被调用时，这些参数将置于实参之前传递给被绑定的方法。

- 返回值
  返回由指定的 this 值和初始化参数改造的原函数拷贝

## 创建绑定函数

bind() 最简单的用法是创建一个函数，`使这个函数不论怎么调用都有同样的 this 值`。JavaScript 新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，`希望方法中的 this 是原来的对象`（比如在回调中传入这个方法）。如果不做特殊处理的话，一般会丢失原来的对象。`从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：`

```
this.x = 9;
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 返回 81

var retrieveX = module.getX;
retrieveX(); // 返回 9, 在这种情况下，"this"指向全局作用域

// 创建一个新函数，将"this"绑定到module对象
// 新手可能会被全局的x变量和module里的属性x所迷惑
var boundGetX = retrieveX.bind(module);
boundGetX(); // 返回 81

module是原来的对象，retrieveX是原来的函数
```

## 偏函数

bind()的另一个最简单的用法是`使一个函数拥有预设的初始参数`。`这些参数（如果有的话）作为 bind()的第二个参数跟在 this（或其他对象）后面`，之后它们会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们的后面。

```
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]

// Create a function with a preset leading argument 使用预设的前置参数创建一个函数
var leadingThirtysevenList = list.bind(undefined, 37);

var list2 = leadingThirtysevenList(); // [37]
var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
leadingThirtysevenList 是目标函数，bind是绑定函数
```

## 配合 setTimeout

在默认情况下，使用 window.setTimeout() 时，this 关键字会指向 window （或全局）对象。当使用类的方法时，需要 this 引用类的实例，你`可能需要显式地把 this 绑定到回调函数以便继续使用实例`。

```
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

## 作为构造函数使用的绑定函数

## 快捷调用

在你想要为一个`需要特定的 this 值的函数创建一个捷径（shortcut）的时候`，bind() 方法也很好用。

你可以用 Array.prototype.slice 来将一个类似于数组的对象（array-like object）`转换成一个真正的数组`，就拿它来举例子吧。你可以创建这样一个捷径：

```
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```

用 bind()可以使这个过程变得简单。在下面这段代码里面，`slice 是 Function.prototype 的 apply() 方法的绑定函数`，并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。

```
// same as "slice" in the previous example
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```

```
var slice = Function.prototype.apply.bind([1,2].shift);  //可见bind的第一个参数可以是函数，重新生成一个slice函数。
slice([21,2324,56]) //21

var slice = Function.prototype.toString.bind([1,2].shift);
slice([21,2324,56]) //"function shift() { [native code] }"


var slice = Function.prototype.toString.bind(Array.prototype.slice);
slice([21,2324,56])  //"function slice() { [native code] }"
console.log(Function.prototype.toString.bind(Array.prototype.slice))  //function () { [native code] }

var slice = Function.prototype.hasOwnProperty.bind(Array.prototype.slice);
slice([21,2324,56]) //false
通过以上toString、hasOwnProperty，能够了解到apply是没有处理slice函数，所以调用slice([21,2324,56]) 直接是调用的是[1,2].shift函数功能
```

## 因为 ie8 之下的浏览器不支持 Function.prototype.bind，所以要进行重写

```

var obj={
    a:1
}

var fn = function(a){
    console.log(a);
    console.log(this.a);
}


if (!Function.prototype.bind) {
 Function.prototype.bind = function() {
    var self = this, // 保存原函数
    context = [].shift.call(arguments), // 需要绑定的this上下文，shift把数组的第一个元素从其中删除,并返回第一个元素的值
    args = [].slice.call(arguments); // 剩余的参数转成数组
    console.log(context);  //{a: 1}
    console.log(args);    //["call"]
    return function() {
      console.log([].concat.call(args, [].slice.call(arguments)) )  //["call", "122"]
      // 返回一个新函数
      // 执行新函数时，将传入的上下文context作为新函数的this
      // 并且组合两次分别传入的参数，作为新函数的参数
      return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
  };
}

var f1 = fn.bind(obj,'call');
f1('122');//我认为一般不会在此函数上继续加参数

举例：
var arguments = [1,2,3]
var context = [].shift.call(arguments),
    args = [].slice.call(arguments);
context // 1
args // [2, 3]
```

## 实例

- 时间间隔函数

```
var notify = {
 text: "Hello World！",
 beforeRender: function() {
  alert(this.text);
 },
 render: function() {

  // 错误方法：  this指向window
  setTimeout(this.beforeRender, 0); // undefined

  // 正确方法：  this指向notify
  setTimeout(this.beforeRender.bind(this), 0); // "Hello World！"
 }
};

notify.render();
```

- 借用 Array 的原生方法

```
var a = {};
Array.prototype.push.bind(a, "hello", "world")();

console.log(a); // {0: "hello", 1: "world", length: 2}
```

- 事件处理

```
var paint = {
 color: "red",
 count: 0,
 updateCount: function() {
  this.count++;
  console.log(this.count);
 }
};

// 事件处理函数绑定的错误方法：
document.querySelector('button')
 .addEventListener('click', paint.updateCount); // paint.updateCount函数的this指向变成了该DOM对象

// 事件处理函数绑定的正确方法：
document.querySelector('button')
 .addEventListener('click', paint.updateCount.bind(paint)); // paint.updateCount函数的this指向变成了paint

```

- 实现对象继承

```
var A = function(name) {
 this.name = name;
}

var B = function() {
 A.bind(this, arguments);
}

B.prototype.getName = function() {
 return this.name;
}

var b = new B("hello");
console.log(b.getName()); // "hello"
```
