哈哈，学个幽默词:"回调函数地狱”（callback hell）
ES7+ES8: https://www.cnblogs.com/zhuanzhuanfe/p/7493433.html

ES7在ES6的基础上添加了三项内容：求幂运算符（**）、Array.prototype.includes()方法、函数作用域中严格模式的变更。

includes()的作用，是查找一个值在不在数组里，若在，则返回true，反之返回false。基本用法：

['a', 'b', 'c'].includes('a')     // true
['a', 'b', 'c'].includes('d')     // false

Array.prototype.includes()方法接收两个参数：`要搜索的值和搜索的开始索引`。当第二个参数被传入时，该方法会从索引处开始往后搜索（默认索引值为0）。若搜索值在数组中存在则返回true，否则返回false。 且看下面示例：

['a', 'b', 'c', 'd'].includes('b')         // true
['a', 'b', 'c', 'd'].includes('b', 1)      // true
['a', 'b', 'c', 'd'].includes('b', 2)      // false

那么，我们会联想到ES6里数组的另一个方法indexOf，下面的示例代码是等效的：

['a', 'b', 'c'].includes('a')          //true
['a', 'b', 'c'].indexOf('a') > -1      //true

- **简便性**
从这一点上来说，includes略胜一筹。熟悉indexOf的同学都知道，indexOf返回的是某个元素在数组中的下标值，若想判断某个元素是否在数组里，我们还需要做额外的处理，即`判断该返回值是否>-1`。而`includes则不用，它直接返回的便是Boolean型`的结果。

- **精确性**
两者使用的都是 === 操作符来做值的比较。但是`includes()方法有一点不同，两个NaN被认为是相等的`，即使在NaN === NaN结果是false的情况下。这一点和indexOf()的行为不同，indexOf()严格使用===判断。请看下面示例代码：
```
let demo = [1, NaN, 2, 3]
demo.indexOf(NaN)        //-1
demo.includes(NaN)       //true
NaN === NaN  //false
```

`注意：假如你只想知道某个值是否在数组中而并不关心它的索引位置，建议使用includes()。如果你想获取一个值在数组中的位置，那么你只能使用indexOf方法。`

includes()还有一个怪异的点需要指出，在判断 +0 与 -0 时，被认为是相同的。
```
[1, +0, 3, 4].includes(-0)    //true
[1, +0, 3, 4].indexOf(-0)     //1,   会返回 +0 的索引值
 
```

注意：在这里，需要注意一点，`includes()只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些，是无法判断的。`

## 求幂运算符（**）

基本用法:3 ** 2           // 9
效果同：Math.pow(3, 2)   // 9
a **= 2  // 9

## ES8新特性   异步函数(Async functions)

**回调函数**：回调函数本身没有问题，但如果出现多个回调函数嵌套，代码很快就会乱成一团，这种情况就被称为“回调函数地狱”。

**Promise**：Promise的最大问题是代码冗余，请求任务多时，一堆的then，也使得原来的语义变得很不清楚。

**Generator** ：
调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个`指向内部状态的指针对象`，`必须调用遍历器对象的next方法，使得指针移向下一个状态`。也就是说，每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到`遇到下一个yield表达式（或return语句）`为止。换言之，Generator 函数是`分段执行`的，`yield表达式是暂停执行的标记`，而`next方法可以恢复执行`。

`缺点`：虽然Generator将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。此时，我们便希望能出现一种能自动执行Generator函数的方法。我们的主角来了：async/await。

`异步函数存在以下四种使用形式`：
```
    函数声明： async function foo() {}
    函数表达式： const foo = async function() {}
    对象的方式： let obj = { async foo() {} }
    箭头函数： const foo = async () => {}

```
例子：
```
async function asyncFunc() {
  const result1 = await otherAsyncFunc1();
  console.log(result1);
  const result2 = await otherAsyncFunc2();
  console.log(result2);
}
```
Async关键字的作用是标识在Await处需要等待方法执行完成，过多的await不会导致编译器错误，但如果没有await时，方法将转换为同步方法. 

## 字符串填充：padStart和padEnd

 ES8提供了新的字符串方法-padStart和padEnd。padStart函数通过填充字符串的首部来保证字符串达到固定的长度，反之，padEnd是填充字符串的尾部来保证字符串的长度的。该方法提供了两个参数：字符串目标长度和填充字段，其中第二个参数可以不填，默认情况下使用空格填充。

 `多个数据如果都采用同样长度的padStart，相当于将呈现内容右对齐。`

 从上面结果来看，填充函数只有在字符长度`小于目标长度时才有效`，若字符长度已经等于或小于目标长度时，填充字符不会起作用，而且目标长度如果小于字符串本身长度时，字符串也不会做截断处理，只会原样输出。

## Object.getOwnPropertyDescriptors()

·实例见网址·
顾名思义，该方法会返回目标对象中所有属性的属性描述符，该属性必须是对象自己定义的，不能是从原型链继承来的。

方法还提供了第二个参数，用来获取指定属性的属性描述符。

该方法返回的描述符，会有两种类型：数据描述符、存取器描述符。返回结果中包含的键可能的值有：configurable、enumerable、value、writable、get、set。

使用过Object.assign()的同学都知道，assign方法只能拷贝一个属性的值，而不会拷贝它背后的复制方法和取值方法。`Object.getOwnPropertyDescriptors()主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题`。

## 函数参数列表和调用中的尾逗号（Trailing commas）