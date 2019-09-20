https://www.cnblogs.com/leijee/p/7490822.html
## Object.create()
Object.create()方法接受两个参数:Object.create(obj,propertiesObject) ;
obj:一个对象，应该是新创建的对象的原型。
propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符。
`传入参数null来`创建一个没有原型的新对象，但通过这种方式创建的对象`不会继承任何东西`，甚至`不包括基础方法`。比如toString()和valueOf()

使用Object.create()是将对象继承到__proto__属性上。
Object.create():一个具有指定的内部原型且包含指定的属性（如果有）的新对象。

```
实例：
var obj = Object.create(
    Object.prototype, {  // object with property descriptors
        foo: {  // property descriptor
            get: function () {
                return 'getter';
            },
            set: function (value) {
                console.log('setter: '+value);
            }
        }
    }
);
```

```
var test1 = {};
var test2 = new Object();
var test3 = Object.create(Object.prototype);
var test4 = Object.create(null);//console.log(test4.__proto__)=>undefined 没有继承原型属性和方法
console.log(test1.__proto__ === test2.__proto__);//true
console.log(test1.__proto__ === test3.__proto__);//true
console.log(test2.__proto__ === test3.__proto__);//true
console.log(test1.__proto__ === test4.__proto__);//false
console.log(test2.__proto__ === test4.__proto__);//false
console.log(test3.__proto__ === test4.__proto__);//false

```
**创建一个普通的空对象**
var o3 = Object.create(Object.prototype); // o3和{}和new Object()一样

## new Object() 和{}
 ### 如果该参数是一个对象，则直接返回这个对象　。
var o1 = {a: 1};
var o2 = new Object(o1);
console.log(o1 === o2);// true

var f1 = function(){};
var f2 = new Object(f1);
console.log(f1 === f2);// true
 ### 如果是一个原始类型的值，则返回该值对应的包装对象
 console.log(new Object('foo'));
//
String {"foo"}
0: "f"
1: "o"
2: "o"
length: 3
__proto__: String[[PrimitiveValue]]: "foo"

console.log(new Object(1));
//
Number {1}
  __proto__: Number
  [[PrimitiveValue]]: 1

console.log(new Object(true))
//
Boolean {true}
  __proto__: Boolean
  [[PrimitiveValue]]: true

`若Object()函数不通过new而直接使用，则相当于转换方法，可以把任意值转换为对象。`
 **写一个判断变量是否为对象的函数**
 ```
    function isObject(value) {
        return value === Object(value);
    }
    isObject([]) // true
    isObject(true) // false
    这函数有漏洞，null也是对象，生成为[]？
```
undefined和null会转换为一个空对象

var uObj = Object(undefined);
var nObj = Object(null);
console.log(Object.keys(uObj));//[]
console.log(Object.keys(nObj));//[]

`var person = {}; 等价于var person = new Object();`

对象的所有键名都是字符串，所以加不加引号都可以，如果不是字符串也会自动转换成字符串。

`如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量.`

Object.prototype.toString.call(null)
"[object Null]"
Object.prototype.toString.call(undefined)
"[object Undefined]"

## Object.create(null)
```
> var dict = Object.create(null);
> dict.foo = 123;
> 'toString' in dict
false
> dict.toString
undefined
> 'foo' in dict
true
```