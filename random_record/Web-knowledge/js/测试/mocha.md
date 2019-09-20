
在node.js和在浏览器中运行
##<font color="red">mocha介绍：</font>
###mocha怎么使用的文档
https://stackoverflow.com/questions/36500723/how-to-mock-window-document-with-mocha-chai
https://mochajs.org/#running-mocha-in-the-browser

###如何用mocha测es6
http://krasimirtsonev.com/blog/article/using-mocha-with-es6-spec-files

// package.json

"scripts": {
  "test": "mocha --compilers js:babel-core/register ./test/header.test.js"
},
"devDependencies": {
  "babel": "6.3.13",
  "babel-core": "6.1.18",
  "babel-preset-es2015": "6.3.13",
  "mocha": "2.3.4"
  ...
}
//babel

{
  "presets": ["es2015"]
}

###mocha npm文档
npm:https://www.npmjs.com/package/mocha

doc:https://mochajs.org/

Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases. Hosted on GitHub.
Mocha是在Node.js和浏览器上都能运行的功能丰富的JavaScript测试框架，使异步测试变得简单而有趣。摩卡测试串行运行，允许灵活和准确的报告，同时将未捕获的异常映射到正确的测试用例。托管在GitHub上。

(可参照o-header的写法，其也用了mocha)

##<font color="red">mocha安装知识：</font>
**1. 全局安装mocha**
npm install mocha -g
**2. 本地安装**
cd FT/ftc-header
npm install mocha --save-dev
**3.创建项目内test文件夹**
在ftc-header根目录下：
mkdir test
cd test
code test.js
**4.编写test.js内容:**
const assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4),-1);
    });
  });
});
4.试运行mocha
在ftc-header根目录路下:

mocha
**5. 在package.json中设置test script**
  "scripts": {
    "test": "mocha"
  }
**6. 运行测试指令:**
依然是在ftc-header根目录下

npm test
**7. 如果测试的东西包含es6:**
// package.json

```   
 "scripts": {
        "test": "mocha --compilers js:babel-core/register ./test/header.test.js"
 },
"devDependencies": {
      "babel": "6.3.13",
      "babel-core": "6.1.18",
      "babel-preset-es2015": "6.3.13",
      "mocha": "2.3.4"
    ...
    }
    //babel

```
```  

{
  "presets": ["es2015"]
}
```
##<font color="red">Asynchronous code：</font>
Testing asynchronous code with Mocha could not be simpler! Simply invoke the callback when your test is complete. By adding a callback (usually named done) to it(), Mocha will know that it should wait for this function to be called to complete the test. This callback accepts both an Error instance (or subclass thereof) or a falsy value; anything else will cause a failed test.

用Mocha测试异步代码不能再简单了！就在你的测试完成的时候调用回调函数就行了。通过给it()添加一个回调函数(通常叫做done),Mocha就会知道它应该等待这个函数被调用来完成测试。这个回调接受一个Error实例（或其子类）或一个falsy值;其他会导致测试失败。


Mocha allows you to use any assertion library you wish. In the above example, we’re using Node.js’ built-in assert module–but generally, if it throws an Error, it will work! This means you can use libraries such as:

Mocha允许你使用任何你想要的断言库。在上面的例子中，我们使用了Node.js的内置断言模块assert—— 但是一般来说，如果它抛出一个错误，它就起作用啦！这意味着你可以使用库如：

- should.js: 在这些文档中显示的BDD风格
- chai:expect(), assert() and should-style assertions
- expect.js: expect()风格的断言
- better-assert

总结文档：

https://cnodejs.org/topic/59e3873520a1a3647d72ac39



任何跳过的内容都将被标记为pending，可以使用.skip()代替注释测试。
this.slow(10000);
this.timeout(500);