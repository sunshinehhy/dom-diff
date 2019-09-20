Generator 函数`可以暂停执行和恢复执行`，这是它能封装异步任务的根本原因。
除此之外，它还有两个特性，使它可以作为异步编程的完整解决方案：`函数体内外的数据交换和错误处理机制`。

```
// Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态
function* helloWorldGenerator() {
//   console.log('first'); 
//   console.log('second');//假如前面没有yeild，也需要一次next，运行到有yeild为止（位置） 
  var y = yield;  //此处也算一次暂停，需要一次next
  console.log(y);  //undefined，说明yield表达式本身没有返回值，或者说总是返回undefined。只有执行第二个next才会有输出，因为第一次暂停了，第二次才会继续
  yield 'hello';
  yield 'world';
  
  return 'ending';  //这用一次next，输出done: true ，用for..of遍历是不会输出的
}

var hw = helloWorldGenerator();
hw.next();

console.log(hw.next()); //{value: "world", done: false}

hw.next()
// { value: 'ending', done: true }
console.log(hw.next()); // { value: undefined, done: true }
```


```
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};
// console.log(flat(arr));  //flat(arr)是得到一遍历器，可以用for of来遍历输出value值
for (var f of flat(arr)) {
//   console.log(f); //1,2,3,4,5,6
}
```

```
function* gen() {
  yield  123 + 456;
  console.log('yield');
}
var gen = gen();
// console.log(gen.next()); //{value: 579, done: false}
// console.log(gen.next()); 
//先yield
//再{value: undefined, done: true}
```

```
function* g() {
  yield 1;
  console.log('throwing an exception');
  throw new Error('generator broke!');
  yield 2;
  yield 3;
}

function log(generator) {
  var v;
  console.log('starting generator');
  try {
    v = generator.next();
    console.log('第一次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第二次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  try {
    v = generator.next();
    console.log('第三次运行next方法', v);
  } catch (err) {
    console.log('捕捉错误', v);
  }
  console.log('caller done');
}

log(g());


starting generator
第一次运行next方法 {value: 1, done: false}
throwing an exception
捕捉错误 {value: 1, done: false}
第三次运行next方法 {value: undefined, done: true}
caller done
```