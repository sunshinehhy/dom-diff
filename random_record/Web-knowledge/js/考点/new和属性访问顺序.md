function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}
  
Foo.getName();  2
getName();  4
Foo().getName();  1
getName();  1


new Foo.getName  //先2再Foo.getName {}
new Foo.getName(); 2
<!-- 知点（）高于成员访问，成员访问的优先级高于new操作，相当于 new (Foo.getName)(); ,这句话的解释被批判过，我觉得下面的解释更合理-->

new Foo 结合被判定为无参数列表的new，优先级低于成员访问，
所以先执行成员访问得到 Foo 的属性 getName， 然后 Foo.getName 和 new 结合，执行带参数列表的 new 运算。
先Foo.getName，再new **()


new Foo().getName  //ƒ () { alert (3);}
new Foo().getName(); 3
`成员访问运算符（.）优先级为 18 级，和 new Foo() 同级，对于同级运算符，按照从左到右的顺序依次计算。`所以先执行 new Foo() 返回一个 Foo 的对象 ，对 Foo 对象调用 getName 时查找引用链，得到 Foo.prototype.getName。
先new Foo()，再.getName()

new Foo.getName(); 和 new Foo().getName(); 的区别在于
new Foo 结合属于 new 无参数列表的情况（17级）
new Foo() 结合属于 new 有参数列表的情况（18级）

new new Foo().getName  //先3再 Foo.getName {}
new new Foo().getName(); 3
其实是：new ((new Foo()).getName)();
先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new。

new new new Foo().getName //先3再报错
new new new Foo().getName(); 3
new无参数列表是从右往左，所以第三个new就找不到构造函数

new new new new Foo().getName();先得到3再报错
(new Foo).getName();  3
(new Foo()).getName(); 3


**注意：**
- 带参数列表的 new ...(...) 看起来像是 new 后面跟了一个函数调用，但`在判断运算符优先级时 new 运算[new ...(...)]是一个整体`，不能把它分开。
- javascript 中设定带参数列表 new 的优先级高于函数调用，那么在满足带参数列表的 new 运算符时，就不存在函数调用了
虽然带参数列表的 new 运算也会执行函数调用，但是在`判断运算时不把 new 和 ...(...) 分开`。
- 以上输出涉及到构造函数的返回值

http://www.cnblogs.com/xxcanghai/p/5189353.html#!comments
https://www.cnblogs.com/zhansu/p/6641190.html

function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo().getName();
getName() //报错

function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo().getName(); //1
getName() //1