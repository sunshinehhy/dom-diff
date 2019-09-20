**2017.12.21**

## delete

- delete 就是删除某些东西，更具体的说，它会删除对象的属性。
- delete 运算符一般`不会删除普通变量`
  var benjamin = "http://www.zuojj.com";
  delete benjamin;
  console.log(benjamin); //Outputs: "http://www.zuojj.com"

- 但是，它可以`删除“全局变量”`，因为它们事实上是全局对象（浏览器中是 window）对象的属性。

```
// Because var isn't used, this is a property of window
benjamin = "zuojj";
delete window.benjamin;
// ReferenceError: benjamin is not defined
console.log(benjamin);
```

- delete 运算符也有一个返回值，如果删除一个属性成功了，返回 true,如果不能删除属性，因为该属性是不可写，将返回 false，或者如果在严格模式下会抛出一个错误。
- 需要记住的是，`删除并没有破坏属性的值，仅仅属性本身`，看下面的例子：

```
var name = "zuojj",
    benjamin = {};
benjamin.name = name;
delete benjamin.name;
console.log(name);  //Outputs: "zuojj"
console.log(benjamin.name)； //Outputs: "undefined",删除benjamin.name并不影响name

```
