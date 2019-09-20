与函数一样，`类也可以使用表达式的形式定义`。
```
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```
上面代码使用表达式定义了一个类。需要注意的是，`这个类的名字是MyClass而不是Me`，`Me只在 Class 的内部代码可用`，指代当前类。
```
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined
```
上面代码表示，Me只在 Class 内部有定义。

`如果类的内部没用到的话，可以省略Me`，也就是可以写成下面的形式。
```
const MyClass = class { /* ... */ };
```
采用 Class 表达式，可以`写出立即执行的 Class`。

```
let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

person是一个立即执行的类的实例。
```