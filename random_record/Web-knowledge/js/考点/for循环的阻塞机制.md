#非阻塞型
```
for(var i=0;i<3;i++){
    setTimeout(function(){
        console.log(i);  //3个3
    }, 10);
}
当异步事件发生时，会创建事件并放入执行队列中，等待当前代码执行完成之后再执行这些代码。
输出3个3的原因，具体原因就是因为for循环的阻塞机制，setTimeout这个定时器需要等待for循环执行完成。

```
#阻塞型
```
for(var i=0;i<3;i++){
    console.log(i); //0 1 2
}
```