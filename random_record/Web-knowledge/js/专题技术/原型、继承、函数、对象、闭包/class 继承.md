## 静态
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
```
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```
目前，只有这种写法可行，因为ES6 明确规定，Class 内部只有静态方法，没有静态属性。

## es6 class中的new.target属性（见阮一峰的class的基本语法）
- new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。如果构造函数不是通过new命令调用的，new.target会返回undefined，`因此这个属性可以用来确定构造函数是怎么调用的。`
- Class 内部调用new.target，返回当前 Class。
- 子类继承父类时，new.target会返回子类。`利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。`
- 注意，在函数外部，使用new.target会报错。

## Class 的继承

http://es6.ruanyifeng.com/#docs/class-extends

在`子类的构造函数中，只有调用super之后，才可以使用this关键字`，否则会报错。`这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。`

`Object.getPrototypeOf方法可以用来从子类上获取父类`。可以使用这个方法判断，一个类是否继承了另一个类。
比如：Object.getPrototypeOf(ColorPoint) === Point  // true

super这个关键字，既可以当作函数使用，也可以当作对象使用。
**super作为函数调用时，代表父类的构造函数。**
super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。

```
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```
super内部的this指的是B；
super()在这里相当于A.prototype.constructor.call(this)。
`super()只能用在子类的构造函数之中，用在其他地方就会报错。`

**super作为对象**
super作为对象时:

- `在普通方法中，指向父类的原型对象；`
- `在静态方法中，指向父类。`

super.p()就相当于A.prototype.p()。

super`指向父类的原型对象`，所以定义在父类`实例上`的方法或属性，是`无法通过super调用`的。
```
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();
定义在原型对象上，所以通过super最为对象，指向父类的原型对象，所以可以取到值。
```
通过super调用父类的方法时，方法内部的this(`当调用父类方法时，父类方法中的this指向子类，赋值的属性会变成子类实例的属性`)指向子类。

比如：
```
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
super.x赋值为3，这时等同于对this.x赋值为3。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。
```

`注意：this和super在子类中获取值`：

- super`指向父类的原型对象`（仅仅是super作为对象的结果）
- 通过super调用父类的方法时，`方法内部的this指向子类`。(需要有super，专研究this这种情况)

**使用super的时候，必须`显式指定是作为函数、还是作为对象使用`，否则会报错。**

`super作为函数和对象之间的区别：`

- *由于对象总是继承其他对象的，所以`可以在任意一个对象中，使用super关键字。`*
- *super()只能用在子类的构造函数之中，用在其他地方就会报错。*

```
var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

obj.toString(); // MyObject: [object Object]
```
## 类的 prototype 属性和__proto__属性

- 子类的__proto__属性，表示构造函数的继承，`总是指向父类`。
- 子类prototype属性的__proto__属性，表示方法的继承，`总是指向父类的prototype属性`。

```
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
作为一个对象，子类（B）的原型（__proto__属性）是父类（A）；
作为一个构造函数，子类（B）的原型对象（prototype属性）是父类的原型对象（prototype属性）的实例。
```
`// B 的实例继承 A 的实例`
Object.setPrototypeOf(B.prototype, A.prototype);

`// B 继承 A 的静态属性`
Object.setPrototypeOf(B, A);


## extends 的继承目标
`只要是一个有prototype属性的函数，就能被继承`。
函数都有prototype属性（除了Function.prototype函数）;
```
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

## 实例的 __proto__ 属性
`子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。`
也就是说，子类的原型的原型，是父类的原型。

## 原生构造函数是无法继承的，
原生构造函数是无法继承的
- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

## Mixin 模式的实现

Mixin 指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。
```
const a = {
  a: 'a'
};
const b = {
  b: 'b'
};
const c = {...a, ...b}; // {a: 'a', b: 'b'}
```
可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。

## 注意知识
- 类的内部所有定义的方法，都是不可枚举的。


```
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```

```
Object.getOwnPropertyNames(Object.toString)
["length", "name"]
0: "length"
1: "name"
length: 2
__proto__: Array(0)
```

- 类的属性名，可以采用表达式。

```
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}

```

## constructor
constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。
```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
此次返回了另外一个对象
```

## 类的实例对象
- 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
- 类的所有实例共享一个原型对象。

```
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

## Class 表达式
采用 Class 表达式，可以写出立即执行的 Class。
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

## class大总结

具体见：https://juejin.im/post/5e707417e51d45272054d5d3#heading-24

(一) class的基本概念：

- 当你使用class的时候，它会默认调用constructor这个函数，来接收一些参数，并构造出一个新的实例对象(this)并将它返回。
- 如果你的class没有定义constructor，也会隐式生成一个constructor方法
(二) class中几种定义属性的区别：：

- 在constructor中var一个变量，它只存在于constructor这个构造函数中
- 在constructor中使用this定义的属性和方法会被定义到实例上
- 在class中使用=来定义一个属性和方法，效果与第二点相同，会被定义到实例上
- 在class中直接定义一个方法，会被添加到原型对象prototype上
- 在class中使用了static修饰符定义的属性和方法被认为是静态的，被添加到类本身，不会添加到实例上

(三) other:

- class本质虽然是个函数，但是并不会像函数一样提升至作用域最顶层
- 如遇class中箭头函数等题目请参照构造函数来处理 （在构造函数中如果使用了箭头函数的话，this指向的就是这个实例对象）
- 使用class生成的实例对象，也会有沿着原型链查找的功能
