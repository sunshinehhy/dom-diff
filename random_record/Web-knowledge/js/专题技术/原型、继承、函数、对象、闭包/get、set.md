
## ES5写法
```
 1 function Number(num) {
 2   this._num = num           //这里的_num和get/set方法num()不能重名
 3 }
 4 
 5 //get/set方法使用同一个命名，增加可读性
 6 Number.prototype = {
 7   get num() {
 8     return this._num;
 9   },
10   
11   set num(num) {
12         this._num = num;
13   }
14 }
15 
16 var test = new Number(8);
17 console.log(test.num);
18 test.num = 88;
19 console.log(test.num)

```

## ES6写法
```

 1 class Num {
 2   constructor(num) {
 3         this._num = num;
 4   }
 5   
 6   get num() {
 7     return this._num;
 8   }
 9   
10   set num(num) {
11     this._num = num;
12   }
13   
14 }
15 
16 var test = new Num(9);
17 console.log(test.num);
18 test.num = 99;
19 console.log(test.num);
```

以上get和set都是定义在原型上，this._num是定义在实例上。