1. git 分支命名规范

git 分支分为集成分支、功能分支和修复分支，分别命名为 develop、feature 和 hotfix，均为单数。

- master（主分支，永远是可用的稳定版本，所有新功能以这个分支来创建自己的开发分支，该分支只做只合并操作，不能直接在该分支上开发）
- develop（上仿真环境分支）
- feature-xxx（功能开发分支，在master上创建分支，以自己开发功能模块命名）
- feature-xxx-fix(功能bug修复分支，feature分支合并之后发现bug，在master上创建分支修复)
- hotfix-xxx（紧急bug修改分支，在master分支上创建，修复完成后）
- release-xxx (code review被merge的分支，上线审核通过后合并到master分支)

注意事项：

- 一个分支尽量开发一个功能模块，不要多个功能模块在一个分支上开发。
- 随时关注master最新动态（尤其上线前），把最新master代码merge到自己开发分支

2. git 提交记录规范

规范目的：提供有效的信息，快速定位到之前写的代码细节

```
    type（必须）: description（必须）
    ## why modify（可选）
```
- type: commit 的类型

feat: 开发新的功能
fix: 修复bug
refactor: 代码重构
docs: 文档修改
style: 代码格式修改, 注意不是 css 修改
test: 测试用例修改
perf: 改善性能
build: 变更项目构建或外部依赖（例如scopes: webpack、gulp、npm等）
chore: 其他修改, 比如构建流程、 依赖管理、辅助工具的变动
revert: 代码回退

- description：对本次提交的简短描述。

不超过50个字符。

推荐以动词开头，如： 设置、修改、增加、删减、撤销等

- ## why modify：对于此次为什么修动，比如外部依赖、代码格式修改等

备注：可使用插件commitizen，但现有项目觉得没必要这么复杂
参考链接：
https://segmentfault.com/a/1190000017205604
https://www.jianshu.com/p/1850c040271f?tdsourcetag=s_pcqq_aiomsg

3. 生成changelog

修改版本号：适用于插件开发

CHANGELOG.md: 放置每个版本的变动内容, 通常要描述每个版本变更的内容，方便使用者确定应该使用哪个版本。

自动生成ChangeLog的设计与实现？

4. 抛出异常处理

### try/catch

```
try{
    throw new Error('fail');
}catch (e){
    console.log(e);
}

catch模块里面会抛出异常
```

但是如果try模块里面是通过异步操作抛出的异常，异常就不能正常捕获到。
```
try{
    setTimeout(()=>{
        throw new Error('fail');
    },1000);
}catch (e){
    console.log(e);
}

VM126:3 Uncaught Error: fail
    at <anonymous>:3:15

也就是没有执行到catch
```
结论：
- try catch 耗性能（误）
V8 的 TurboFan 引擎从 2013 年就开始开发，并随 Chrome 59 发布，try/catch 已经可以进行优化了，完全不用再担心性能问题
- try/catch 无法捕获`异步异常`
```
示例：异步错误

try {
  setTimeout(() => {
    error        // 异步错误
  })
} catch(e) {
  console.log('我感知不到错误');
  console.log('---',e);
}
123248
VM265:3 Uncaught ReferenceError: error is not defined
    at <anonymous>:3:5
```

- try/catch 无法捕获`语法错误`
```
示例：语法错误

try {
  var error = 'error'；   // 大写分号
} catch(e) {
  console.log('我感知不到错误');
  console.log(e);
}

Uncaught SyntaxError: Invalid or unexpected token
```
一般语法错误在编辑器就会体现出来，常表现的错误信息为： Uncaught SyntaxError: Invalid or unexpected token xxx 这样。但是这种错误会直接抛出异常，常使程序崩溃，一般在编码时候容易观察得到。


```
try {
    try{
        var error = 'error'；   // 大写分号
    } catch(e) {
        console.log('---',e);
    }
} catch(e) {
  console.log('我感知不到错误');
  console.log(e);
}

Uncaught SyntaxError: Invalid or unexpected token
```
- try/catch 只能捕获捉到运行时非异步错误

```
示例：运行时错误
try{
    error    // 未定义变量
} catch(e) {
   console.log('---',e);
}
VM225:3 --- ReferenceError: error is not defined
    at <anonymous>:1:5
```



### window.onerror 
- window.onerror :捕获异常能力比 try-catch 稍微强点，无论是异步还是非异步错误，onerror 都能捕获到运行时错误。

- window.onerror 无法捕获`语法错误`

- 对于 onerror 这种全局捕获，`最好写在所有 JS 脚本的前面`，因为你无法保证你写的代码是否出错，如果写在后面，一旦发生错误的话是不会被 onerror 捕获到的。

- 另外 onerror 是无法捕获到网络异常的错误。
```
<script>
  window.onerror = function (msg, url, row, col, error) {
    console.log('我知道异步错误了');
    console.log({
      msg,  url,  row, col, error
    })
    return true;
  };
</script>
<img src="./404.png">

这个是网络异常，出现404（Not Found）
```

- window.onerror能否捕获 iframe 的错误?
首先需要强调，`父窗口直接使用 window.onerror 是无法直接捕获`，如果你想要捕获 iframe 的异常的话，有分好几种情况。

- 如果你的 iframe 页面和你的主站是`同域名的话，直接给 iframe 添加 onerror 事件即可`。
```
<iframe src="./iframe.html" frameborder="0"></iframe>
<script>
  window.frames[0].onerror = function (msg, url, row, col, error) {
    console.log('我知道 iframe 的错误了，也知道错误信息');
    console.log({
      msg,  url,  row, col, error
    })
    return true;
  };
</script>
```
- 如果你嵌入的 iframe 页面和你的主站不是同个域名的，有跨域问题，根据情况处理（第三方的不方便处理）

**在实际的使用过程中，`onerror 主要是来捕获预料之外的错误，而 try-catch 则是用来在可预见情况下监控特定的错误`，两者结合使用更加高效**

###  Promise 可以解决捕获异步异常 （见 random_record/Web-knowledge/js/专题技术/异步/promise终止.md）

```
Promise.resolve()
    .then(() => {
        console.log('[onFulfilled_1]');
        throw 'throw on onFulfilled_1';
    })
    .then(() => {  // 中间的函数不会被调用
        console.log('[onFulfilled_2]');
    })
    .catch(err => {
        console.log('[catch]', err);
    });
// => [onFulfilled_1]
// => [catch] throw on onFulfilled_1

```
可以加上unhandledrejection监听，放在遗漏写catch
```
window.addEventListener("unhandledrejection", function(e){
  e.preventDefault()
  console.log('捕获到异常：', e);
  return true;
});
```

### Script error 脚本错误是什么？
`我们常访问的页面跟脚本文件来自不同的域名`，这时候如果没有进行额外的配置，就会容易产生 Script error。
Script error 是`浏览器在同源策略限制下产生的`，浏览器处于对安全性上的考虑，当页面引用非同域名外部脚本文件时中抛出异常的话，此时本页面是没有权利知道这个报错信息的，取而代之的是输出 Script error 这样的信息。
解决方式：
- crossorigin
- 重新封装addEventListener
```
const originAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function (type, listener, options) {
  const wrappedListener = function (...args) {
    try {
      return listener.apply(this, args);
    }
    catch (err) {
      throw err;
    }
  }
  return originAddEventListener.call(this, type, wrappedListener, options);
}
简单解释一下：

改写了 EventTarget 的 addEventListener 方法；
对传入的 listener 进行包装，返回包装过的 listener，对其执行进行 try-catch；
浏览器不会对 try-catch 起来的异常进行跨域拦截，所以 catch 到的时候，是有堆栈信息的；
重新 throw 出来异常的时候，执行的是同域代码，所以 window.onerror 捕获的时候不会丢失堆栈信息；

详情见：https://github.com/Fundebug/fundebug-blog/issues/34
```

### 异常上报方式
监控拿到报错信息之后，接下来就需要将捕捉到的错误信息发送到信息收集平台上，常用的发送形式主要有两种:

- 通过 Ajax 发送数据
- 动态创建 img 标签的形式
```
实例 - 动态创建 img 标签进行上报

function report(error) {
  var reportUrl = 'http://xxxx/report';
  new Image().src = reportUrl + 'error=' + error;
}
```

### 监控上报常见问题
https://github.com/happylindz/blog/issues/5

### 压缩代码如何定位到脚本异常位置
- 第一想到的办法是`利用 sourcemap 定位到错误代码的具体位置`，详细内容可以参考：Sourcemap 定位脚本错误(https://github.com/joeyguo/blog/issues/14)

- 另外也可以通过在打包的时候，在每个合并的文件之间`添加几行空格，并相应加上一些注释`，这样在定位问题的时候很容易可以知道是哪个文件报的错误，然后再通过一些`关键词的搜索`，可以快速地定位到问题的所在位置。

### 收集异常信息量太多，怎么办
如果你的网站访问量很大，假如网页的 PV 有 1kw，那么一个必然的错误发送的信息就有 1kw 条，我们可以给网站设置一个采集率：
```
Reporter.send = function(data) {
  // 只采集 30%
  if(Math.random() < 0.3) {
    send(data)      // 上报错误信息
  }
}
```
这个采集率可以通过具体实际的情况来设定，方法多样化，可以使用一个随机数，也可以具体根据用户的某些特征来进行判定。

参考链接：https://juejin.im/entry/5a30e14d51882554bd510bea
https://github.com/Fundebug/fundebug-blog/issues/34
https://github.com/happylindz/blog/issues/5
https://github.com/joeyguo/blog/issues/14 (定位脚本错误)


https://github.com/happylindz/blog  （前端笔记）