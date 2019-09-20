## arguments.callee的作用
arguments 的主要用途是保存函数参数， 但这个对象还有一个名叫 callee 的属性，返回正被执行的 Function 对象，也就是所指定的 Function 对象的正文，这有利于匿名函数的递归或者保证函数的封装性。 

请看下面这个非常经典的阶乘函数:
```
function factorial(num){    
   if (num <=1) {         
      return 1;     
   } else {         
   return num * factorial(num-1)     
   } 
}  
```
　　定义阶乘函数一般都要用到递归算法；如上面的代码所示，在函数有名字，而且名字以后也不会变的情况下，这样定义没有问题。 
　　但问题是这个函数的执行与函数名 factorial 紧紧耦合在了一起。为了消除这种紧密耦合的现象，可以像下面这样使用 arguments.callee
```
function factorial(num){    
   if (num <=1) {         
      return 1;     
   } else {         
   return num * arguments.callee(num-1);
   } 
}  
```
　　在这个重写后的 factorial()函数的函数体内，没有再引用函数名 factorial。这样，无论引用函数时使用的是什么名字，都可以保证正常完成递归调用。例如
```
function factorial(num){
    if(num <= 1){
        return 1;
    }else{
        return num * arguments.callee(num-1);
    }
}
var trueFactorial = factorial;
alert(trueFactorial(5));    //120    


factorial = function() {
    return 0;
}                
alert(trueFactorial(5));// 120 如果没有使用arguments.callee，将返回0
```
　　在此，变量 trueFactorial 获得了 factorial 的值，实际上是在另一个位置上保存了一个函数的指针。然后，我们又将一个简单地返回 0的函数赋值给 factorial 变量。如果像原来的 factorial() 那样不使用 arguments.callee，调用 trueFactorial()就会返回 0。可是，在解除了函数体内的代码与函数名的耦合状态之后，trueFactorial()仍然能够正常地计算阶乘；至于factorial()，它现在只是一个返回 0的函数。

arguments.callee的替换方案
现在已经不推荐使用arguments.callee()；

原因：访问 arguments 是个很昂贵的操作，因为它是个很大的对象，每次递归调用时都需要重新创建。影响现代浏览器的性能，还会影响闭包。

不能用怎么办？

递归时用到arguments.callee（）是常见的事情，比如

一道面试题。接受参数n=5,不用for循环输出数组【1,2,3,4,5】

这是用递归的思路，配合arguments.callee，代码如下
```
function show(n) {
    var arr = [];
    return (function () {
        arr.unshift(n);
        n--;
        if (n != 0) {
            arguments.callee();
        }
        return arr;
    })()
}
show(5)//[1,2,3,4,5]
```
　　现在arguments.callee 被弃用了。怎么办，其实很简单，给内部函数一个名字即可（当函数被调用时，它的arguments.callee对象就会指向自身，也就是一个对自己的引用。）
```
function show(n) {
    var arr = [];
    return (function fn() {
        arr.unshift(n);
        n--;
        if (n != 0) {
            fn();
        }
        return arr;

    })()
}
show(5)//[1,2,3,4,5]
```
最近有人留言说我没有给出最上面斐波那契那个怎么改

其实我整篇文章写下来思路已经很清晰了，希望可以举一反三