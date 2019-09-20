https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call

## 用处：
1. 改变this的指向
2. 实现继承
3. 调用匿名函数

call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数(参数的列表)。

注意：该方法的作用和 apply() 方法类似，只有一个区别，就是`call()方法接受的是若干个参数的列表`，而`apply()方法接受的是一个包含多个参数的数组`。

## 语法
fun.call(thisArg, arg1, arg2, ...)

- 参数
thisArg
在fun函数运行时指定的this值。需要注意的是，指定的this值并不一定是该函数执行时真正的this值，如果这个函数处于非严格模式下，则指定为`null和undefined的this值会自动指向全局对象(浏览器中就是window对象)`，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象。
arg1, arg2, ...
指定的参数列表。

- 返回值
`返回值是你调用的方法的返回值，若该方法没有返回值，则返回undefined。`

- 描述
可以`让call()中的对象调用当前对象所拥有的function`。你`可以使用call()来实现继承`：写一个方法，然后让另外一个新的对象来继承它（而不是在新对象中再写一次这个方法）。

## 使用call方法调用父构造函数
在一个子构造函数中，你`可以通过调用父构造函数的call方法来实现继承`，类似于Java中的写法。下例中，使用Food和Toy构造函数创建的对象实例都会拥有在Product构造函数中添加的name属性和price属性,但category属性是在各自的构造函数中定义的。
```
function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError(
      'Cannot create product ' + this.name + ' with a negative price'
    );
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

//等同于
function Food(name, price) {
  this.name = name;
  this.price = price;
  if (price < 0) {
    throw RangeError(
      'Cannot create product ' + this.name + ' with a negative price'
    );
  }

  this.category = 'food';
}

//function Toy 同上
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
```

## 使用call方法调用匿名函数
在下例中的for循环体内，我们创建了一个匿名函数，然后通过`调用该函数的call方法`，`将每个数组元素作为指定的this值执行了那个匿名函数`。这个`匿名函数的主要目的是给每个数组元素对象添加一个print方法`，这个print方法可以打印出各元素在数组中的正确索引号。当然，这里不是必须得让数组元素作为this值传入那个匿名函数（普通参数就可以），目的是为了演示call的用法。
```
var animals = [
  {species: 'Lion', name: 'King'},
  {species: 'Whale', name: 'Fail'},
  [1,2]
];

for (var i = 0; i < animals.length; i++) {
  (function (a) { 
    this.print = function () { 
      console.log('#' + a  + ' ' + this.species + ': ' + this.name); 
    } 
    this.print();
  }).call(animals[i], i);
}

输出：
//#0 Lion: King
//#1 Whale: Fail
//#2 undefined: undefined
```
## 使用call方法调用函数并且指定上下文的'this'

在下面的例子中，当调用greet方法的时候，`该方法的this值会绑定到obj对象`。
```
function greet() {
  var reply = [this.person, 'Is An Awesome', this.role].join(' ');
  console.log(reply);
}

var obj = {
  person: 'Douglas Crockford', role: 'Javascript Developer'
};

greet.call(obj); // Douglas Crockford Is An Awesome Javascript Developer

this值会绑定到i对象
```

## 实例（设计场景）
```
var obj={
    a:1
}
var str = '1';
var fn = function(a){
    console.log(a);
    console.log(this.a);
    console.log(this);
}
fn('a');  //a   undefined   window
fn.call(obj,'call'); //call   1
fn.call(null,'call'); //call   undefined   window
fn.call(1,'call'); //call   undefined    Number {1}
fn.call(false,'call'); //call   undefined  Boolean {false}
fn.call(str,'call'); //call   undefined  String {"1"}

null和undefined的this值会自动指向全局对象(浏览器中就是window对象)`，同时值为原始值(数字，字符串，布尔值)的this会指向该原始值的自动包装对象
```