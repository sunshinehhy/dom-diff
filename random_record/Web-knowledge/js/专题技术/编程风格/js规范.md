函数参数最好有初始值，可以用 es6 的解构方法。比如：function a(b={}){}

```
function add(x,y){
y = y || 2;
console.log(x,y);//1 2
}
add(1);
　　[注意]实际上，使用 y || 2 是不严谨的，显式地设置假值(undefined、null、false、0、-0、''、NaN)也会得到相同的结果。所以应该根据实际场景进行合理设置
```
