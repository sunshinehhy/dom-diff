通过get(0)才能取到jquery对象里面关联的html对象，从而操作html对象的属性和方法。

## scrollTop
https://www.cnblogs.com/fooller/p/8124347.html
scrollTop() 方法`返回或设置匹配元素的滚动条`的垂直位置。

scroll top offset 指的是滚动条相对于其顶部的偏移。

如果该方法未设置参数，则返回以像素计的相对滚动条顶部的偏移。

## 如何能够访问到匿名函数自执行中的方法呢？
可以把你要对外提供的接口作为window的属性或者是方法。
```
(function () {
    var a=10;
    
    function abc(){
        alert(a);
    }
    //将abc方法作为window的方法，就可以在匿名函数自执行外面进行访问了
    window.abc=abc;
})();
abc();
```

jQuery就是一个`基于面向对象的程序，jQuery里面写的都是跟面向对象有关的`。
jQuery.fn = jQuery.prototype

window.jQuery = window.$ = jQuery

## 为什么jQuery是一个基于面向对象的程序？？

jQuery = function( selector, context ) {
    //在这个函数执行完了就是一个new构造函数的过程，`返回的就是一个jQuery对象`~~既然返回的是对象，当然可以调用方法喽~~
    return new jQuery.fn.init( selector, context, rootjQuery );
}

```
//jQuery是这样调用方法的对吧。是不是和下面数组使用方法的方式非常像。
//但是实际上$("div")他本身是一个函数调用，但是函数调用的执行结果是一个对象，所以，这就是为什么说jQuery是基于面向对象的程序喽~~~
$("div").css();
$("div").text();

//这是Array对象方法的使用方式，先实例化一个对象，然后使用对象调用方法。
var arr=new Array(3);
arr.sort();
arr.splice();
```
## `工具方法和实例方法区别就在于，它既可以给jQuery对象来用，也可以给源生的JS来用，实例方法只能给jQuery对象调用`

//通过使用对象调用的方法，是实例方法。
$().text();
$().html();

//$是一个函数，在函数下面来扩展方法的话，就是扩展一些静态方法
//在jQuery当中，给面向对象扩展静态属性和静态方法叫做扩展工具方法
$.trim();
$.proxy();

## 静态方法和实例方法在jQuery中的关系？

可以把`静态方法看作是在jQuery中的最底层`，而实例方法是上一层或者是更高层的。
很多方法都是实例方法，里面调用的都是工具方法。

## Callbacks 回调对象 
函数的统一管理