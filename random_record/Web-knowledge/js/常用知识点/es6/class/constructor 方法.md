constructor方法是类的默认方法，通过`new命令生成对象实例时，自动调用该方法`。
一个`类必须有constructor方法`，如果`没有显式定义`，一个空的constructor方法`会被默认添加`。
```
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
constructor方法`默认返回实例对象（即this）`，`完全可以指定返回另外一个对象`。
```
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```
上面代码中，constructor函数`返回一个全新的对象，结果导致实例对象不是Foo类的实例`。