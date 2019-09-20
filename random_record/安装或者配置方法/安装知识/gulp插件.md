**2017.12.18**
<font color="red">Cheerio：</font>
为服务器核心设计的jQuery的快速、灵活和精益的实现。
Cheerio解析标记并提供用于遍历/操纵结果数据结构的API。它不像web浏览器那样解释结果。具体地说，它不会生成可视化的呈现、应用CSS、加载外部资源或执行JavaScript。如果您的用例需要这些功能，您应该考虑像PhantomJS或JSDom这样的项目。
<font color="red">gulp-useref：</font>

它可以处理文件连接而不是缩小。然后将文件传递到流中。为了缩小资产或其他修改，使用gulp -如果有条件地处理特定类型的资产。
<!-- build:css css/combined.css -->
<!-- endbuild -->
<font color="red">wiredep：</font>
这个库读取每个依赖的bower.json文件的文件。基于这些连接，在您的源代码中的占位符之间注入他们之前,它决定了您的脚本必须包含的顺序。
是一个gulp插件，能够将js、css文件自动插入到html中。
<!-- bower:css -->
  <!-- endbower -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>first project of angularJS and spring-boot</title>
    <!-- bower:css -->  // 1
    <!-- endbower -->  // 2
  </head>
  <body ng-app>
    <!-- bower:js -->  // 3
    <!-- endbower -->  //4
  </body>
</html>
添加1、2、3、4的注释必不可少，他将取决执行htmltask任务后，将bower install下载的插件引入到index.html中的哪个位置。

<font color="red">Bower：</font>

  是一个客户端技术的软件包管理器，它可用于搜索、安装和卸载如JavaScript、HTML、CSS之类的网络资源。

### gulp

https://github.com/gulpjs/gulp/issues/2065

gulpfile.js文件中是定义我们的任务，
Grunt主要是以文件为媒介来运行它的工作流的；在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream，然后可以通过stream的pipe()方法把流导入到你想要的地方。所以Gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是Gulp的速度比Grunt快的一个原因。
gulp.src()方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)。
gulp.dest(path)生成的文件路径是我们传入的path参数后面再加上gulp.src()中<font src="red">有通配符开始出现</font>有通配符开始出现的那部分路径。
https://www.cnblogs.com/2050/p/4198792.html

### Webpack

其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。
WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。
https://www.jianshu.com/p/42e11515c10f

