###介绍
一个简单的工具，允许您在多个实际浏览器中执行JavaScript代码。
Karma的主要目的是让您的测试驱动开发变得简单、快速、有趣。
http://blog.fens.me/nodejs-karma-jasmine/

####source
npm:https://www.npmjs.com/package/karma

doc:https://karma-runner.github.io/2.0/intro/installation.html

####Karma
A simple tool that allows you to execute JavaScript code in multiple real browsers.

一个简单的工具，允许您在多个真实的浏览器中执行JavaScript代码。

The main purpose of Karma is to make your test-driven development easy, fast, and fun.

Karma的主要目的是使测试驱动的开发变得简单，快速和有趣。

####When should I use Karma?
- You want to test code in real browsers.

- You want to test code in multiple browsers (desktop, mobile, tablets, etc.).

- You want to execute your tests locally during development.

- You want to execute your tests on a continuous integration server.

- You want to execute your tests on every save.

- You love your terminal.

- You don't want your (testing) life to suck.

- You want to use Istanbul to automagically generate coverage reports.

- You want to use RequireJS for your source files.

- 你想在真正的浏览器中测试代码。

- 你想在多个浏览器（桌面，手机，平板电脑等）测试代码。

- 你想在开发过程中在本地执行你的测试。

- 您想要在持续集成服务器上执行测试。

- 你想在每次保存时执行你的测试。

- 你爱你的终端。

- 你不希望你的（测试）生涯很糟糕。

- 你想使用Istanbul自动生成覆盖率报告。

- 你想使用RequireJS作为源代码。

#### But I still want to use insert testing library
Karma is not a testing framework, nor an assertion library. Karma just launches an HTTP server, and generates the test runner HTML file you probably already know from your favourite testing framework. So for testing purposes you can use pretty much anything you like. There are already plugins for most of the common testing frameworks:

Karma不是一个测试框架，也不是一个断言库。 Karma只是`启动一个HTTP服务器`，并`生成用于执行测试的HTML文件`，你可能已经从你喜欢的测试框架中了解过这种测试HTML文件。所以出于测试的目的，你可以使用任何你喜欢的东西。Karma已经有大部分常用测试框架的插件：

Jasmine
Mocha
QUnit

https://karma-runner.github.io/latest/intro/installation.html

安装Karma及其插件，运行Karma
Install Karma:

npm install karma --save-dev
Install plugins that your project needs:

npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
Run Karma:

./node_modules/karma/bin/karma start
Commandline Interface
键入./node_modules/karma/bin/karma start烦人投了，所以你可能会觉得全局安装karma-cli很有用。如果要从命令行运行Windows上的Karma，则需要执行此操作。

npm install -g karma-cli
这样，你可以在任何地方通过命令karma来运行Karma,并且它将总是只执行本地版本的karma


### 配置

https://karma-runner.github.io/latest/intro/configuration.html

####Configuration
In order to serve you well, Karma needs to know about your project in order to test it and this is done via a configuration file. This page explains how to create such a configuration file.

为了更好地为您服务，Karma需要了解您的项目以测试它，这是通过配置文件完成的。本页说明如何创建这样的配置文件。

Generating the config file
在项目根目录下输入：

karma init karma.conf.js
回答一系列问题，在项目根目录下生成karma.conf.js。 也可以手写该文件或从其他项目复制过来。

####Starting Karma
karma start karma.conf.js
Command line arguments
已经存在于配置文件中的一些配置可以通过将配置指定为Karma执行时的命令行参数来覆盖。

karma start my.conf.js --log-level debug --single-run
通过Grunt/Gulp集成
gulp-karma:https://github.com/karma-runner/gulp-karma
关于配置项的细节
查看https://karma-runner.github.io/latest/config/configuration-file.html

####preprocessor
karma-rollup-preprocessor: https://github.com/jlmakes/karma-rollup-preprocessor https://github.com/rollup/rollup-plugin-buble ***NOTE:***karma-rollup-plugin 已经被desperated

## 函数

https://www.cnblogs.com/jasmine-95/p/6054839.html

（1）toBe（） ： 用来比较数字或者字符串是否相等，不支持对象的比较。
（2）toEqual() ：可以用来比较简单的文本和变量，还有对象是否相等。
 
（3）toMatch（）：针对正则表达式。
（4）toBeDefined（）：对未定义进行判断，如果定义了则为true。
 
（5）toBeUndefined（）：对未定义进行判断，如果没有定义则为true。
（6）toBeNull（）：对空进行比较
（7）toBeTruthy（）：判断布尔值，是布尔值则为true
 
（8）toBeFalsy（）：判断布尔值，不是布尔值则为true
 
（9）toContain（）：判断字符串或者数组中是否包含某个值，包含则为true。
（10）toBeLessThan（）：比较数值大小，若小于则为true。
 
（11）toBeGreaterThan（）：比较数值大小，若大于则为true。
（12）toBeCloseTo（）：精密的数学比较
（13）toThrow（）：抛出异常时为true

```
expect(a).toBeNull();
expect(foo).not.toBeNull();

expect(a.foo).not.toBeUndefined();
expect(a.bar).toBeUndefined();
```


## 实例
加上webpack才能使用es6和commonjs规范方式
见实例 https://github.com/sunshinehhy/JS-Algorithm-Test