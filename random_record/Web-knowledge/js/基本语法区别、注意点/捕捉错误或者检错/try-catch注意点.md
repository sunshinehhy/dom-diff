## void
javascript:void(0) 中最关键的是 void 关键字， void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。

void 0 可以代替undefined   void 0===undefined为true。
undefined在JavaScript中并不属于保留字/关键字，因此在IE5.5~8中我们可以将其当作变量那样对其赋值，于是采用void方式获取undefined则成了通用准则。`也就是说：使用void 0 来获取undefinded`

## try catch什么时候用
try catch用于捕捉报错，当你不关心哪一步错误，只关心有没有错，就用try catch。

对于NodeJS来说，两种错误都时刻需要注意，特别是系统错误，因为不可预知，需要大量代码来catch错误，传递错误，最后统一处理。

对于前端，系统错误出现的场景相对来说低得多，主要是一些io场景。

异常处理和错误处理是两个不同的概念。例如NodeJS里大多数error都是用来处理异常的，因为异常是不可避免的，例如数据库挂了，网络错误，你虽然知道有可能，但是不知道何时发生，这些异常你需要捕捉或者传给上层。而错误处理，则是一些基本的判定，可以从代码级别避免其发生，可预知可推测，如果发生了，不是系统问题，而是你的程序有bug了。

在使用 try catch 的时候尽量把 try catch 放在一个相对干净的 scope 中，同时在 try catch 语句中也尽量保证足够少的变量，最好通过函数调用方式来 try catch。   http://www.jb51.net/article/101291.htm

## JS中用try catch对代码运行的性能影响?
- 消耗时长变长
- 使用 try catch 的使用无论是在 try 中的代码还是在 catch 中的代码性能消耗都是一样的。
- 需要注意的性能消耗在于 try catch 中不要直接塞进去太多的代码（声明太多的变量），最好是吧所有要执行的代码放在另一个 function 中，通过调用这个 function 来执行。
针对此点，可以查看 ECMA 中关于 try catch 的解释`在代码进入 try catch 的时候 js引擎会拷贝当前的词法环境`，拷贝的其实就是当前 scope 下的`所有的变量`。所以最好用函数包含住try还活着catch中要执行的代码


## try catch捕获机制
- try用于捕获异常
- catch用于处理异常
- finally用于关闭资源等后续操作
- try里面的代码报错的时候,catch里面的代码才会执行,finally里面的代码永远会执行
- catch和finally里面,正常的代码会从上到下顺序执行
- 如果只是catch里面代码出错,则报catch里面的错误
- 如果catch和finally都出错则会报finally里面的错误

举例嵌套try catch块中，抛出异常
```
try{
   try{
      throw "error1"
   }
   catch(ex)
   { 
      console.log(ex);
      throw "error2"
   }
   finally{
     console.log( "finally1")
   }
}
catch(ex)
{
    console.log(ex);
}
finally{
   console.log("finally2")
}

最终的输出为：error1,finally1,error2,finally2
```

```
try{
 console.log(0);
 }catch (err){
 console.log(1);
 console.log(hello);
 }finally {
 console.log(2);
 }
 //最后结果分别打印出 0 2
 /*
 try{
 a.b.c();
 }catch (e){
 console.log(1);
 console.log(hello);
 }finally {
 console.log(2);
 }
 */
 //最后结果分别打印出 1 2 报错:hello is not defined
 /*
 try{
 a.b.c();
 }catch (e){
 console.log(1);
 try{
  console.log(hello);
 }catch (e){
  console.log(3);
 }
 }finally {
 console.log(2);
 console.log(word);
 } 
 */
 //最后结果分别打印出 1 3 2 报错:word is not defined
 /*
 try{
 a.b.c();
 }catch (e){
 console.log(1);
 console.log(hello);
 }finally {
 console.log(2);
 console.log(word);
 }*/
 //最后结果分别打印出 1 2 报错:word is not defined

```
window.JSTracker？ 淘宝前端监控平台

