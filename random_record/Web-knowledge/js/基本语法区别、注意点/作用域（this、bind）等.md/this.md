https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this (this)

https://github.com/alsotang/node-lessons/tree/master/lesson11 （this）

- this对象是在运行时`基于函数的执行环境绑定的`。
- 全局函数中，this等于window，而当函数被作为某个对象的方法调用时，this等于那个对象。
- 匿名函数的执行环境`具有全局性`，因此this对象通常指向window。
- 内部函数在搜索this和arguments时，`只会搜索到其活动对象`。

## ES6 class this
`类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。`
```
class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
printName(); // TypeError: Cannot read property 'print' of undefined
```
printName方法中的this，默认指向Logger类的实例。但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

**一个比较简单的解决方法是，在构造方法中绑定this，这样就不会找不到print方法了。**
```
class Logger {
  constructor() {
    this.printName = this.printName.bind(this);
  }

  // ...
}
```
**另一种解决方法是使用箭头函数。**
```
class Logger {
  constructor() {
    this.printName = (name = 'there') => {
      this.print(`Hello ${name}`);
    };
  }

  // ...
}
```
`如果静态方法包含this关键字，这个this指的是类，而不是实例。`静态方法可以与非静态方法重名。
`父类的静态方法，可以被子类继承。静态方法也是可以从super对象上调用的。`

## 箭头函数this

函数体内的this对象，就是`定义时所在的对象，而不是使用时所在的对象`。
```
    function foo() {
        setTimeout(() => {
            console.log('id:', this.id);
        }, 100);
    }

    var id = 21;

    foo.call({ id: 42 });
    // id: 42


```
setTimeout的参数是一个箭头函数，这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。`如果是普通函数，执行时this应该指向全局对象window，这时应该输出21`。但是，`箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。`

箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

## 书中总结
在《javaScript语言精粹》这本书中，把 this 出现的场景分为四类，简单的说就是：
1. 有对象就指向调用对象
2. 没调用对象就指向全局对象
3. 用new构造就指向新对象
4. 通过 apply 或 call 或 bind 来改变 this 的所指。