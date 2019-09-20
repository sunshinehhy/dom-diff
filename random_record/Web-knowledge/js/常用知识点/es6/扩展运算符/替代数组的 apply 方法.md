- 由于扩展运算符可以展开数组，所以`不再需要apply方法，将数组转为函数的参数了`。
```
// ES5 的写法  
function f(x, y, z) {  
// ...  
}  
var args = [0, 1, 2];  
f.apply(null, args);  
// ES6 的写法  
function f(x, y, z) {  
// ...  
}  
var args = [0, 1, 2];  
f(...args); 
```

- 下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，`简化求出一个数组最大元素的写法`。
```
// ES5 的写法  
Math.max.apply(null, [14, 3, 77])  
// ES6 的写法  
Math.max(...[14, 3, 77])  
//  等同于  
Math.max(14, 3, 77);  
```

- 另一个例子是`通过push函数，将一个数组添加到另一个数组的尾部`。

```
// ES5 的写法  
var arr1 = [0, 1, 2];  
var arr2 = [3, 4, 5];  
Array.prototype.push.apply(arr1, arr2);  
// ES6 的写法  
var arr1 = [0, 1, 2];  
var arr2 = [3, 4, 5];  
arr1.push(...arr2);  
上面代码的 ES5 写法中，push方法的参数不能是数组，所以只好通过apply方法变通使用push方法。有了扩展运算符，就可以直接将数组传入push方法。

```
- 下面是另外一个例子。

```
// ES5  
new (Date.bind.apply(Date, [null, 2015, 1, 1]))  
// ES6  
new Date(...[2015, 1, 1]); 
```