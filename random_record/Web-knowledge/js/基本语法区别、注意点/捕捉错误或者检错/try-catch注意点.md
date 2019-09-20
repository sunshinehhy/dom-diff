## void
javascript:void(0) 中最关键的是 void 关键字， void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。

void 0 可以代替undefined   void 0===undefined为true。
undefined在JavaScript中并不属于保留字/关键字，因此在IE5.5~8中我们可以将其当作变量那样对其赋值，于是采用void方式获取undefined则成了通用准则。

## try catch什么时候用
try catch用于捕捉报错，当你不关心哪一步错误，只关心有没有错，就用try catch。
对于NodeJS来说，两种错误都时刻需要注意，特别是系统错误，因为不可预知，需要大量代码来catch错误，传递错误，最后统一处理。
对于前端，系统错误出现的场景相对来说低得多，主要是一些io场景。
异常处理和错误处理是两个不同的概念。例如NodeJS里大多数error都是用来处理异常的，因为异常是不可避免的，例如数据库挂了，网络错误，你虽然知道有可能，但是不知道何时发生，这些异常你需要捕捉或者传给上层。而错误处理，则是一些基本的判定，可以从代码级别避免其发生，可预知可推测，如果发生了，不是系统问题，而是你的程序有bug了。
在使用 try catch 的时候尽量把 try catch 放在一个相对干净的 scope 中，同时在 try catch 语句中也尽量保证足够少的变量，最好通过函数调用方式来 try catch。   http://www.jb51.net/article/101291.htm

window.JSTracker？ 淘宝前端监控平台

