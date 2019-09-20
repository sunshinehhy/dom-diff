一、在官网的学习
http://expressjs.com/en/starter/basic-routing.html

Quick Start
Hello world
express generator
Basic routing（基本路由选择）
路由选择指的是决定一个应用程序怎样响应一个客户端向特定端点的请求，其由一个URI(或者路径）和一个特定的HTTP请求方法（GET,POST，等等）组成。

每个route都可以有一个或多个处理函数，其会在route符合的时候执行。route定义采用如下结构：

app.METHOD(PATH,HANDLER)
这里：

app是一个express实例
METHOD是一个HTTP请求方法，采用小写
PATH是服务器上的一个路径
HANDLER是当route符合时执行的函数
下面是一些定义route的eg:

app.get('/', function (req, res) {
  res.send('Hello World!');
});
	
app.post('/', function (req, res) {
  res.send('Got a POST request');
});


...
Serving static files in Express(在express中处理静态文件）
为了处理例如images、CSS、JavaScript文件这种静态文件，可以使用Express中的内置中间件函数express.static。

给express.static中间件函数传递包含了静态资源的目录名称，以直接启动这些文件。例如，如下代码用于启动名叫public的目录下的images,CSS，JS文件：

app.use(express.static('public'));
然后你就可以从public目录下读取这些文件了,eg:

http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
使用多个静态资源目录，就多次调用express.static中间件函数：

app.use(express.static('public'));
app.use(express.static('files'));
Express按照你用express.static中间件函数设置静态文件目录的顺序寻找文件。

为了创建一个虚拟的路径前缀（即这个路径并不实际存在于文件系统中），可以为静态文件指定一个mount path(挂载路径)，如下所示：

app.use('/static',express.static('public'));
然后你就可以从/static下获取public目录下的资源了：

http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
然而，你提供给express.static函数的路径是相对于你发动你的node进程的目录的。如果你从其他目录运行express应用程序呢，那么还是用绝对路径更安全：

app.use('/static',express.static(__dirname+'/public'));
API
app.set(name,value)
设置name的值为value，name是应用程序设置属性之一。参见http://expressjs.com/en/4x/api.html#app.settings.table

设置app.set('foo',true)和app.enable('foo')是等价的。同样，app.set('foo',false)和app.disable('foo')也是等价的。

获取设置的属性值使用app.get()

app.set('title', 'My Site');
app.get('title'); // "My Site"
Application Setting Table(部分）：
Property	Type	Description	Default
views	Strings or Array	一个路径或路径组成的数组，用于应用程序视图。如果是一个数组，则视图按照其在数组中的顺序查找。	process.cwd()+'/views'
view engine	String	省略时默认使用的扩展引擎	N/A(undefined)
view cache	Boolean	启用视图缓存(启用后会将模板内容保存在农村中，性能会得到显著提升，但会导致只有重启服务器才能让模板文件的编辑生效，所以在开发时会禁用它）	true
app.locals对象
其是一个JavaScript对象。其属性是程序中的本地变量。

app.locals.title
// => 'My App'

app.locals.email
// => 'me@myapp.com'
一旦设定，app.locals的属性就存在于整个应用程序的生命周期，和res.locals不同，res.locals只在request的生命时间有效。

在应用程序层面，你可以在渲染后的模板中获取本地变量。这对于给模板提供帮助函数，以及应用程序级的数据很有用。然而，你不能通过中间件获取本地变量。

故将数据输出到视图的方法有三种，按照优先级如下列出：

res.render()
res.locals
app.locals
二、使用书 Express in Action
About this book
这是一个web框架，使得强大的Node.js更容易使用。

Part1 Intro
在Chapter1,我会确认一些字符。他们是Node.js和Express。前者是JavaScript的运行环境。Node.js很强大，但它的API有时会很弱，会让你写很多样板代码;这就是express值得炫耀的地方啦。它和Node.js非常配套，让其在写web应用程序的时候更简单。

在chapter2中，你将学会Node.js作为JavaScript的运行环境意味着什么，而且你会在Node.js中运行JavaScript。你将会构建几个简单的模块，并且看到它们对于构建一个网站的作用。你也会学习怎样从npm安装第三方模块。

Express作为chapter3的重心所在。你将会看到Express是怎样基于Node.js生成的，并学会它的主要功能。我们会对它的每个功能进行更深入的钻研，在chapter3的最后，你将具备所有你需要的核心Express知识。

Chapter1.What is Express?
章节概要
Node.js，一个JavaScript平台，用于在服务端执行JavaScript
Express,一个框架，基于Node.js的服务器，且让Node.js使用起来更容易
Middleware(中间件）和routing(路由），Express的两个特性
Request handler functions(请求处理函数）
2009年，Node.js诞生。Node.js将V8即谷歌浏览器的强大的JavaScript引擎，带离了浏览器端，并让它可以运行于服务器端。现在，开发人员可以在开发服务器端应用程序时选择JavaScript。

JavaScript可能不是对于每个人来说都是完美的语言，但Node.js确实具有一些好处。其一，JavaScript 引擎 V8 速度很快，且node.js支持异步编程风格，在避免了多线程的噩梦的同时使得编码更快。其二，JavaScript因为流行，故拥有一堆有用的库。但Node.js最大的好处是可以在浏览器端和服务器端共享代码。开发者可以在两个JS的运行环境——浏览器和服务器中使用相同的编程语言和编程规范。

Node.js变得流行起来——人们认为它很酷。像基于浏览器的JavaScript一样，Node.js提供了一堆你构建一个应用程序所需要的底层功能。但就像浏览器端的JavaScript一样，它的底层特性使得它很冗长而且难于使用。

在哲学层面上，Express类似于jQuery。人们想要为他们的网页添加动态内容，但是普通的浏览器API很冗长、令人困惑，而且在功能上有诸多限制。开发者们经常不得不写一些样板代码。jQuery的存在砍掉了这些样板代码，其通过简化浏览器的API和增添有用的新功能。

Express其实是相同的。人们想要使用Node.js制作web应用程序，但普通的Node.js API很冗长，令人困惑，且在功能上有诸多限制。。开发者们经常不得不写一些样板代码。Express的存在砍掉了这些样板代码，其通过简化浏览器的API和增添有用的新功能。

就像jQuery一样，Express目的在于可扩展性。它对于大多数你应用程序中决定的部分是不干涉的，且很容易用第三方库扩展。通过这本书和你的Express事业，你将会对你的应用程序的架构做出决定，而且你会使用一些强大的第三方模块来扩展Express。

1.1 Node.js的工作方式
为什么要使用Node呢？

一些人会说Node.js速度很快。它不是最快的，但它因为两个原因而速度快：

它使用的JavaScript引擎——即Chrome浏览器使用的V8引擎——快
它处理并发性的能力，这来自其的异步工作的特性。


但我认为性能好并不是选择Node的最大原因。其最大原因它会使前后端编程使用同一个语言。

另一些人可能会同意：一些开发者已经创造出了全栈，即一个全部使用JavaScript的web应用程序，包括MongoDB(一个用JavaScript控制的数据库），Express，Angular.js(一个前端的JavaScript框架），及Node.js。

1.2 什么是Express?
Express是一个相当小的框架，它基于Node.js的web服务器的功能，并简化了Node.js的API，添加了有帮助的新功能。它使得你能够更简单地组织你应用程序的功能，通过中间件(middleware）和路由（routing）；它为Node.js的HTTP对象增添了有用的工具；它促进了对动态HTML视图的渲染；它定义了一个简单的应用拓展标准。

1.2.1 Node.js的机能
当你在Node.js中创建一个web应用程序（准确地说，是一个web服务器），你为你的整个应用程序写下了一个简单的JavaScript函数。这个函数监听来自web浏览器的请求，或来自一个消费你API的移动端应用程序的请求，或其他任何和你的服务器对话的客户端。当一个请求到来，这个函数将会关注这个请求并决定怎样响应它。

举例，如果你在写一个web应用程序，它告诉用户服务器所处的时间和时区。它会这样工作：

如果客户端请求了homepage,你的应用程序会返回一个HTML页面，其会展示时间
如果客户端请求其他页面，你的应用程序会返回一个HTTP404的错误和相配的文本。
如果你不使用Express,则客户端的请求会是这样的：



你的应用程序中这个处理浏览器请求的JavaScript函数叫做请求处理器。这没啥特别之处；它就是个JavaScript函数，其获取请求，指明该做什么，然后响应。Node.js的HTTP服务器在客户端和你的JavaScript函数直接建立者连接，所以你不用处理棘手的网络协议。

从代码上看，它是一个接受两个参数的函数：一个对象代表request,一个对象代表response。在你的时间/时区应用程序中，request处理器可以检查客户端请求的URL。

但问题是Node.js的API会很复杂。Node.js的HTTP服务器是很强大，但它缺少了很多你在构建一个真实应用时可能会用到的功能。

Express就是用于让你更方便地使用Node.js来构建web应用程序。

1.2.2 Express为Node.js增加了什么
宏观上说，Express为Node.js HTTP 服务增加了两大功能：

它给Node.js的HTTP服务增添了很多有用的简便功能。
它使得你可以把一个整块的请求处理函数重构为许多更小的请求处理函数，其一个处理函数只处理特定的片段。这样可维护性就更好，模块化程度也更高。


1.3 Express的极简理念（minimal philosophy)
Express是一个框架，这意味着你不得不通过Express的方式构建你的app。但是Express的方式并不是非常固执：它没有给你一个非常死板的结构。这意味着你可以构建许多不同的应用程序，从视频聊天程序到博客到API。

极少有人构建一个Express应用程序的时候只用Express。Express自己不会做你需要的每一件事，你可以自己找其他库迁移到Express应用程序中。这样，Express发挥了Unix时间的“把一件事情”做好的哲学。

但是这种极简主义是一个双刃剑。它很灵活，你的程序可以自由使用其他不整齐的东西，但会和其他框架的可比性很小。这会让你花更多的时间寻找正确的第三方模块和处理错误。

1.4 Express的核心部分
Express就只有4个主要特点：中间件（middleware),路由（routing），子应用程序（subapplication),和便利性（convenience)。

1.4.1 中间件
中间件不是Express特有的。其思想是：和一个整体的请求处理函数不同，你可以调用好几个请求处理函数，每一个都处理工作中的一个小片段。这些更小的请求处理函数叫做中间件函数，或中间件。中间件的最大特点之一是它标准化程度很高，可以使得很多人来开发Express的中间件。



1.4.2 路由选择
Routing和中间件一样，也是打破了一个整体的请求处理函数，将其分割为小片。与中间件不同的是，这些请求处理函数的执行时有条件的，取决于客户端发出了什么样的URL和采用了什么HTTP方法。

例如，你可能会构建一个具有首页和用户手册的网站。当用户发起HTTP GET方法请求首页URL时，Express应该要发送首页。但是当他们访问用户手册URL时，Express一个给他们发送用户手册的HTML而不是首页的！如果他们在用户手册页面post了一个评论，Express就需要更新用手册页面。那么就是routing让你可以把你的应用程序的行为通过route分割。

这些routes的行为也是在请求处理函数中定义。当用户访问首页，就会调用你写的请求处理函数。如果用户访问用户手册URL，就会调用你写的另一个请求处理函数。

1.4.3子应用程序
Express应用程序通常都是很小的，甚至只是在一个文件中。当你的应用程序变大，你将会想要将它们划分为多个文件夹和文件。Express对你的app的规模没有限制，但是它提供的一个重要功能是非常有帮助的：子应用程序。在Express的术语中，这些小应用程序叫做router。

Express允许你定义这些可以用于更大的应用程序中的routers。你可能在你的应用程序中有一个管理员面板，它可以和你应用程序的其他部分分开运行。你导入也可以把你的管理员面板代码和其他中间件和路由放在一起，但是你也可以为你的管理员面板创建一个子应用程序。



1.4.4 便利性
为了使这些请求处理函数更易于编写，Express增添了一堆细节。在原生Node.js中，如果你想要写一个发送JPEG文件的请求处理函数，那就会是相当多的代码。但是在Express中，那仅仅是一个sendFile方法的调用。

1.5 围绕Express的生态系统
1.5.1 Express和其他web应用程序框架对比
暂略

1.5.2 Express是用于干嘛的？
LAMP stack代表Linux,Apache,MySQL和PHP。MEAN stack代表MongoDB(适于JavaScript的数据库）、Express、Angular（前端JavaScript框架）、Node.js。

Express通常用于单页应用(SPAs)。SPAs在前端JavaScript很重，也通常需要一个服务器组件。服务器端通常需要可以简单处理HTML、CSS和JavaScript，但是也有一些应用编程接口。Express都可以相当好地做这些事情。因为对于前端开发者来说，Express的学习曲线是相当低的，所以他们只需学习很少的新知识就可以快速搭建好一个简单的SPA服务。

当你使用Express写应用程序时，你不可能离开Node.js，所以你需要学会MEAN栈的E和N部分，但是M和A两部分是取决于你的。在前端你可以使用Backbone.js取代Angular，这时即为MEBN栈。在数据库方面你可以使用SQL代替MongoDB,这时即SEAN栈。虽然MEAN是一个比较受欢迎的配置模式，你也可以选择任何你喜欢的。在本书中，我们会将MongoDB，即使用MEN栈：MongoDB,Express,Node.js。

Express同时也适用于实时场景。

1.5.3 Node.js和Express的第三方模块
本书前几章是在讲核心Express。从广义上说，它们就是routes和middleware。但是本书超过一半的内容都在讲怎样使用第三方模块搭建Express。

这些第三方模块有的专为Express设计，且和routing及middleware功能兼容。其他模块并不专门针对Express，在Node.js中工作得很好，所以也在Express中工作得很好。

Express具有渲染HTML的一些小功能。Express并不自带任何模板语言，但它与很多基于Node.js的模板引擎兼容得很好。一些流行的模板语言是被Express支持的，但其他一些需要一个简单的帮助库。本书中，我们关注两个模板引擎：EJS(看起来非常像HTML),Pug(试图用根本的新语法来修改HTML)

后面还会讲关于Express的安全性和鲁棒性。

注意一个重要的事情：没有叫做Express模块的东西，只有Node.js模块。Node.js模块可以适用于Express，且他们都保存于npm库，可以用同样的方法安装它们。而到最后，Express也是一个Node.js模块，和其他模块一样。

获取帮助的地方

https://github.com/strongloop/express/tree/master/examples
http://expressjs.com/：the official
http://substack.net/finding_modules:讲怎么找到合适的Node.js包
Express过去是基于叫做Connect的另一个模块的，而且它仍然和用Connect模块构建的包相容性很好。如果找不到用于Express的包时，可以找Connect的包。

Chapter2.The basics of Node.js
章节提要
安装Node.js
使用package.json描述项目元数据
使用npm install安装模块
使用Node立刻做两件事
使用Node的内置http模块构建一个简单的web服务器
2.1 安装node
暂略

2.2 使用模块
Node实施的标准模块系统叫做CommonJS。其核心就是可以让你从其他文件引入代码。

2.5 总结
node使用事件I/O，这意味着当事件发生的时候（比如来了一个web请求），一个函数就会被调用。

Chapter3 Funcations of Express
章节提要
Express是基于Node内置HTTP服务器的抽象层。本章会基于你的Node知识，努力去真正理解Express。我们将讨论起与纯Node的关系，讨论middleware和routing的概念，还有其他Express提供的好功能。

3.1 Middleware
3.1.1 Hello,World with Express:
纯Node.js的Hello,World是这样的：

var http=require("http");

function requestHandler(req,res){
	console.log("In comes a request to :"+request.url);
	res.end("Hello,world!");

}

var server=http.createServer(requestHandler);

server.listen(3000);	
eg:Hello,World with Express:

var express=require("express");
var http=require("http");

var app=express();

app.use(function(request,response){
	console.log("In comes a request to :"+request.url);
	response.end("Hello,world!");
});

http.createServer(app).listen(3000);
使用Express和原生Node.js一样，都是将结果传递给http.createServer()。

两者中的函数也是相似的，都是传递了一个request和一个response对象，你也是以相同的方式和它们打交道。

最后，你创建了一个服务器并开启监听。app也仅仅是一个函数。是Express制作的request处理函数穿过了所有的中间件，直到最后。

注意：这里使用app.listen(3000)也行，它就是http.createServer.app.listen的速写版，就像你把request写成req一样。

3.1.2 中间件是怎么在高层次工作的
在纯Node的HTTP服务器中，每个请求都是通过一个大的函数。就是在没有中间件的情况下，你就只有一个处理所有事情的函数。流程就像下图：



这并不是说这个处理函数不调用其它函数，而是说这个处理函数要响应所有的请求。

有中间件的话，请求就会通过你写的一个函数数组（叫做中间件栈），而非一个函数。如下图：



就是说Express让你执行一个函数数组而不是一个函数。那么这些函数可能是什么呢？

回顾第一章中的登录、授权应用。那么使用中间件的话，这个应用一个是有三个中间件函数：一个处理登录，一个处理授权，一个响应返回秘密信息。处理登录的中间件将让每个请求登录，然后传递给下一个中间件；授权中间件只有用户被认证过的情况下才会继续；最后一个中间件将负责响应，然后不传递下去因为后面没有中间件了。

每个中间件都可以修改request或response，但并不是总是一定要修改。最终，一些中间件需要响应请求，它可以是第一个也可以是最后一个。如果没有一个用于响应，那么这个服务就会被挂起，然后浏览器就会一个人待着没有响应。

这是很强大的因为你可以将你的应用程序划分成很多小部分，而不是一个巨兽。这些组件会创作起来会更容易，顺序也更容易调整，而且容易引入到第三方中间件中。

3.1.3 被动的（不改变request和response)中间件
eg:

var express=require("express");
var http=require("http");
var app=express();

app.use(function(request,response,next){
	console.log("In comes a "+request.method+"to "+request.url);
	next();
})

app.use(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.end("Hello,world!");
});

http.createServer(app).listen(3000);
可以看出普通的Node服务也在中间件中有效。例如request.method在普通Node中有用，在Express中也有用。Express为这些objects增加了一些东西，但没有移除任何东西。

前面这个例子没有对request或response做出任何改变。中间件也可以对request或response对象进行修改的。

3.1.4 改变request和response的中间件代码
有一些中间件是改变了response的。

现在来写那个授权中间件。为了简单，我们选择一个怪异的授权规则：只有你在偶数分钟的时候访问你才会被授权。

var express=require("express");
var http=require("http");
var app=express();

app.use(function(request,response,next){
	console.log("In comes a "+request.method+"to "+request.url);
	next();
})

app.use(function(request,response,next){
	var minute=(new Date()).getMinutes();
	if((minute%2)===0){
		next();
	}else{
		response.statusCode=403;
		response.end("Not authorized.")
	}
})
app.use(function(request,response){
	response.end('Secret info: the password is "swordfish"!');
});

http.createServer(app).listen(3000);
3.1.5 第三方中间件库
其和其他编程语言一样，其他人已经做过你想要做的事情也是常有的情形。你可以写下你自己的中间件，但是去寻找已经实现你想要的功能的其他人写的中间件也很经常。先看两个有用的第三方中间件。

Morgan:登录中间件
当你的应用程序在一个用户面前失效而且你不能确定为什么时，这个中间件就很有用。在开发的时候它也很有用——你可以看到request是何时进入你的服务器的。如果有什么错误，你可以将Morgan的logging方法作为一种明智的检查方式。你还可以看到你的服务器需要多久做出相应。

var express=require("express");
var logger=require("morgan");
var http=require("http");
var app=express();

app.use(logger("short"));

app.use(function(request,response){
	response.end('Secret info: the password is "swordfish"!');
});

http.createServer(app).listen(3000);
express.static：express处理静态文件的中间件、
var express=require("express");
var path=require("path");
var http=require("http");

var app=express();

var publicPath=path.resolve(__dirname,"public");
console.log(publicPath);
app.use(express.static(publicPath));

app.use(function(request,response){
	response.writeHead(200,{"Content-Type":"text/plain"});
	response.end("Looks like you didn't find a static file.");
});

http.createServer(app).listen(3000);
然后在浏览器地址栏输入 http://localhost:3000/(具体静态文件名）

这样public目录下的静态文件会被显示出来。如果没有对应文件，则它会继续进行下一个中间件，并提示"Looks like you didn't find a static file".如果存在相应文件，则express.static将发送它并终端中间件传递流。

注意这里使用path.resolve的原因:

On Mac and Linux, you want this directory:
/public
But on Windows, you want this directory:
\public
Node’s built-in path module will make sure that things run smoothly on Windows,
Mac, and Linux
我的windows也可以识别/呀

参见http://expressjs.com/en/4x/api.html

其他中间件
connect-ratelimit——将请求数控制到一个小时多少次请求。如果有人对你的服务器请求次数过多，则可以给他们发送错误。
Helmet——帮助你添加HTTP头，以似乎你的app可以抵制一些攻击从而更安全。
cookie-parser——解析cookies
response-time——发送X-Response-Time头，从而是你可以调试你应用程序的行为。
你如果找不到Express中间件的话，你可以找Connect中间件。

3.2 Routing
Eg:

var express=require("express");
var path=require("path");
var http=require("http");

var app=express();

var publicPath=path.resolve(__dirname,"public");
app.use(express.static(publicPath));

app.get("/",function(request,response){
	response.end("Welcome to my homepage!");
});

app.get("/about",function(request,response){
	response.end("Welcome to the about page!");
});

app.get("/weather",function(request,response){
	response.end("The current weather is NICE.");
})


app.use(function(request,response){
	response.statusCode=404;
	response.end("404!");
});

http.createServer(app).listen(3000);
app.get是Express的神奇的routing系统。也可以用app.post,app.put或者其他任何HTTP指令。其第一个参数是一个路径；第二个参数是请求处理函数。

这些routes可以非常智能。除了匹配合适的路径，还可以匹配一些复杂的写法（如正则或其他复杂解析），eg:

app.get("/hello/:who",function(request,respoonse){
	respoonse.end("Hello, "+request.params.who+".");
});
如输入"http://www.localhost:3000/hello/Tom",浏览器页面则会显示"Hello,Tom."

而输入"http://www.localhost:3000/hello/Tom/earth",浏览器页面则会显示"404!"

你肯定已经看过internet上到处都是这种行为。你肯能看过这样的网站，在那里你可以访问一个用指定用户名称填充的URL。比方说，你的用户名是ExpressSuperHero,然后你的用户页面URL就长这样：https://mywebsite.com/users/ExpressSuperHero

使用Express,你可以只定义一个路径然后可以匹配所有可能的用户名，而不用为每个用户名定义一个路径。

3.3 Extending request and response
Express扩展了request和response对象。它们的旧属性/方法都还在，Express又为它们增添了新的属性/方法。API文档http://expressjs.com/en/api.html说明了一切。我们来看一些例子。

Eg1:使用response.redirect方法
app.get("/",function(request,response){
	response.redirect("http://expressjs.com");
});//打开的是expressjs.com

app.get("/",function(request,response){
	response.redirect("/weather");
	response.redirect("http://expressjs.com");
});//打开的是/weather
普通Node中是没有该方法的。

Eg2:使用response.sendFile方法
app.get("/",function(request,response){
	response.sendFile(__dirname+"/public/banner.png");
});
在浏览器输入 http://www.localhost:3000/,则在浏览器页面显示出该图片。

Eg3:使用request.ip属性
var  EVIL_IP="123.45.67.89";

app.use(funciton(request,response,next){
	if(request.ip===EVIL_IP){
		response.status(401).send("Not allowed!");
	}else{
		next();
	}
})；

//... the rest of your app...
上例把某ip加入了黑名单。除了request.ip，还用到了response.status(),response.send()。普通Node都没有它们———他们都是Express新增的扩展。从概念上，这块没什么可说的，除了Express扩展了request和response。

3.4 Views(视图）
网站通过HTML构建。虽然单页应用是时尚，但你也常常遇到这样的情况：你想要服务器来动态创建HTML。你可能想要你的HTML和当前登录的用户匹配，或者你想要动态地创建一个数据表。

有很多可以用的视图引擎。有EJS(代表根植于JavaScript中），Handlerbars,Pug，等等。还有一些从其他编程语言来的其他模板语言的接口，如Swig,HAML。它们的共同点就是，最后吐出HTML。

下面的例子使用EJS。这是人们创建Express时受欢迎的选择。

var express=require("express");
var path=require("path");

var app=express();

app.set("views",path.resolve(__dirname,"views"));//告诉Express你的视图在当前目录下的views里

app.set("view engine","ejs");//高速Express你将要使用EJS模板引擎
EJS的文档在这https://github.com/tj/ejs，其是一个模板语言用于编译HTML。这里需要安装ejs:

npm install ejs --save
上面是已经在Express方面完成了视图的构建。那要怎么用它呢？现在就在views目录下创建一个叫做index.ejs的文件吧：

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Hello,world!</title>
</head>
<body>
	<%= message %>
</body>
</html>
EJS是HTML的超集，所以HTML有效的所有东西都在EJS中有效，而EJS还增加了一些新功能，比如变量插入。此处<%= message %>将插入一个叫做message的变量，这是你用Express渲染视图的时候要传递的东西。

在app.js中增加渲染代码：

var express=require("express");
var path=require("path");
var http=require("http");
var app=express();

app.set("views",path.resolve(__dirname,"views"));

app.set("view engine","ejs");

app.get("/",function(request,response){
	response.render("index",{
		message:"Hey everyone!This is my webpage."
	})
})

http.createServer(app).listen(3000);
该处Express增加了一个response方法：response.render()。它是通过传递进去的变量来渲染index.ejs。

最后渲染结果的代码应该为：

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Hello, world!</title>
</head>
<body>
Hey everyone! This is my webpage.
</body>
</html>
3.5 guest book实例
Part2 Core
你已经知道Express具有4个主要features:Middleware,Routing,Extensions,Views。

接下来的四个章节将深入讨论这些方面。

Chapter4讨论中间件，其是express框架的最重要的核心feature。在一些方面，Express栈的每一块的东西几乎都是受中间件影响的，故这是重点章节。

Chapter5讨论routing。

Chapter6将这些东西串联起来，并展示了怎样使用Express构建一个API。你将会用纯JSON构建一个web服务器。没有HTML，没有其他文件——只有JSON。你会重度使用routing和middleware，所以第6章将应用你所学知识。

Chapter7会展示Express的视图feature.

本部分将让你深入学习这些概念。

Chapter4 Middleware
章节提要
写中间件函数：一个具有三个参数的函数
编写和使用错误处理中间件：一个具有四个参数的函数
使用开源中间件函数，就像Morgan和express.static这种
这些中间件往往是一次只处理一个事情。一个可能来记录所有到达你服务器的请求；另一个可能解析请求中的特定值；另一个可能用于认证用户。

概念上，中间件是Express最庞大的部分。大多数你写的Express代码都是在以各种方式写中间件。

4.1 中间件和中间件栈（Middleware and middleware stack)
总而言之，web服务器监听请求,解析这些请求，然后发送响应。Node运行环境将首先获取这些请求，然后将他们由原始字节转换为两个你可以处理的JavaScript对象：一个request,一个response。



这两个objects将会被输送到您将要写的JavaScript函数。你将会解析req来看看用户想要的是什么东西，并操纵res来为你的响应做准备。

然后，你完成了对response的写入。这时，你将会调用res.end。它发送信号给Node,告诉Node响应都完成了，并已准备好将响应从线上送出去。Node运行环境将看看你对response对象做了什么，然后将它转换为一堆字节，然后将其通过internet发送给请求它的人。



在Node中，这两个对象仅仅在一个函数中传递。但是在Express中呢，这两个对象是在一个函数数组中传递，该函数数组叫做middleware stack(中间件栈）。Express会从栈中第一个函数开始，然后按照顺序在栈中继续走下去。

栈中的每个函数都具有三个参数。前两个是由Node服务器传递过来的req和res。虽然Express会给它们修饰一些扩展功能，但它们是通过NODE服务器传递给你的。



第三个参数是该函数本身的东西，即next。当调用next的时候，Express将会继续走向栈中的下一个函数。

下图是中间件函数的函数签名：



最终，这个栈中的函数之一会调用res.end，其将会结束这个请求。（在Express中，你可能也会调用其它一些方法，像res.send或res.sendFile，但它们都在内部调用了res.end。)你可以在栈中的任何一个函数里调用res.end，但是你必须只能调用一次，否则你会得到一个错误。

4.2 Example app:一个静态文件服务
来写一个简单的小应用程序，其可以处理一个文件夹下的文件。你可以在该文件夹下放置任何东西，它们都可以被服务——HTML，images,或者一个MP3。

另外一个需求是你的服务器需要记录下每一次的请求，不管请求是否成功。

故这个Express应用程序在中间件栈中将有三个函数：

The logger——打印出请求URL和请求时间。它总是会继续传递到下一个中间件（即用next)。
The static file sender——检查文件夹下是否有对应文件存在。如果存在，它会通过internext发送这个文件。如果请求的文件不存在，则会继续到下一个中间件（还是通过调用next)
The 404 handler——如果遇到了这个中间件，则说明前一个中间件没有找到文件，然后你应该返回一个404信息并结束请求。
这个中间件栈可以这样可视化：



新收获
1. npm start
这中间学会了一个新指令

npm start
为什么用"npm start"而不用"node app.js"呢？有三个原因：

这是惯例。多数Node的web服务可以通过"npm start"启动，而不用管项目的结构。如果不是app.js而是用application.js，你也不用管那个变化。
它会让你用一个相当简单的命令行来运行一个更复杂的命令行（或一系列命令）。将来你的项目可能还要启动数据库服务器或清除一个巨大的日志文件。
npm可以让你全局安装包，所以你可以像运行其他命令行一样来运行它们。Bower就很典型，你将Bower全局安装到你的系统中，然后你就可以在命令行中使用bower命令来安装前端依赖包。npm脚本让你……
2.有时会出现浏览器请求页面被挂起的情况（即那个小圈圈一直转）
出现这种情况的原因是因为您没有调用next或执行res.end。当你的中间件函数完成时，它必须要做以下两个事情之一：

它需要完成对请求的响应（通过res.end或其他Express的方便的方法如res.send或res.sendFile)
它需要调用next来继续到中间件栈中的下一个函数
这两个你做了其中之一，你的app会正常工作；如果都不做，那流入的请求将永远不会得到响应，浏览器的响应圈圈将一直转；如果你两个都有，那就只有第一个会进行，剩下那个会被忽略。

但是如果所有的中间件没有一个做了1的工作，即到最后一个还是next，那么最后浏览器会打印出一个错误信息，如("Cannot GET/")。因为你自己没有给一个对请求的响应，Express就会自己给用户一个error响应。

3. nodemon指令
用nodemon指令代替node指令，可以在项目文件发生变化时重新加载。

源码分析
app.js

var express=require("express");
var path=require("path");
var fs=require("fs");

var app=express();

//编写日志中间件
app.use(function(req,res,next){
	console.log("Request IP: "+req.url);
	console.log("Request date: "+new Date());
	next();
});

//编写处理静态文件的中间件
app.use(function(req,res,next){
	var filePath=path.join(__dirname,"static",req.url);
	fs.stat(filePath,function(err,fileInfo){//fs.stat可以获知关于这个文件的信息
		if(err){//如果fs.stat报错则进入下一个中间件
			next();
			return;//需要return,不然它还会继续执行
		}
		if(fileInfo.isFile()){//如果这个文件存在，则调用res.sendFile()
			res.sendFile(filePath);
		}else{
			next();
		}
	});
});

//404处理中间件
app.use(function(req,res){
	res.status(404);
	res.send("File not Found!");
})
app.listen(3000,function(){
	console.log("App started on port 3000");
});
知识补充
req.url不是Express特有的，是从Node的http模块继承而来的。

fs.Stats类：是函数fs.stat(),fs.lstat(),fs.fstat()及它们的同步的方法返回的对象。该对象具有方法：stats.isFile(),stats.isDirectory(),stats.isBlockDevice()等等

fs.stat(path,callback(err,stats))方法：异步的方法

path.join([path[, ...]])：参数是一系列路径碎片，eg:

  path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
  // returns '/foo/bar/baz/asdf'
  
  path.join('foo', {}, 'bar')
  // throws TypeError: Arguments to path.join must be strings
注意：同一个中间件中next()后面的代码还是会执行，next只是把req,res对象传到下个中间件，故想要next()后直接结束本中间件的执行，就需要在后面加个"return;"

涉及的express扩展方法有：

res.sendFile(filePath)
res.status(404)
res.send("Not found!")
用morgan中间件代替你自己写的日志中间件
...
var morgan=require("morgan");

app.use(morgan("short"));

...
morgon也就是一个函数，它返回了一个中间件函数。当你调用它的时候，它会返回一个和你自己刚刚写的日志中间件函数差不多的函数。它会接收三个参数(req,res,next)，然后调用了console.log。大多数第三方中间件都是这么工作的——你调用了一个返回中间件函数的函数。

而调用Morgan的时候又使用了一个参数：字符串"short"。这是Morgan模块特有的配置option,其规定了输出应该长什么样。该参数还可以为"combined"(返回许多信息）|"tiny"（返回最少的信息）。当你使用不同的配置参数调用Morgan，你会让它返回不同的中间件参数。

用内置的static中间件代替你自己写的处理静态文件的中间件
var staticPath=path.join(__dirname,"static");
app.use(express.static(staticPath))；
express.static是Express唯一内置的中间件。其也是一个返回中间件函数的函数。它具有一个参数：你要用的静态文件的文件夹路径。它和你刚刚写的差不多。如果文件存在于这个路径中，它就会发送它；否则它会调用next。

4.3 错误处理中间件
记得我说过调用next就会继续到下一个中间件？我说谎了。它只是大多时候成立。

中间件其实有两种。你目前已经接触了第一种——常规中间件函数，其含有三个参数（不算next的话就是两个）。大多数时候你的app是处在床柜状态的。

第二种中间件用的就比较少了：错误处理中间件。当你的app出于错误模式，所有常规中间件都会被忽略，然后Express只会执行错误处理中间件函数。进入错误模式(error mode)的办法是在调用next的时候使用一个参数。惯例做法是将一个error对象来作为参数，例如：

next(new Error("Something bad happened!"));
这些中间件函数就有4个参数，而不是2或3个参数。第一个参数是error(即传入next的参数），剩下的是从前面传递而来的参数:req,res,next。在这个中间件中，你可以做任何事情，就像在其他中间件中一样，可以调用res.end或next。如果再不带参数地调用next，则会退出错误模式，然后进入下一个常规中间件；带参数地调用它就会继续进入下一个错误处理中间件，如果它存在的话。

以你具有4个中间件函数为例。前两个是常规中间件，第三个是错误处理中间件，第四个是常规中间件。如果没有错误，则流程应该如下图所示：

express4-7

如果没有错误发生，就会像错误处理中间件从来没有存在过似的。更确切地所，没有错误就意味着never永远不会被调用。如果错误发生了，Express就将会跳过其他所有中间件，直到栈中的错误处理中间件。如流程应该下图所示：

express4-8

错误处理中间件按惯例是放在中间件栈的末端，放在所有常规中间件的后面——虽然并不强制要求这么做。这是因为你想要抓取栈内前几级的所有错误。

注意： Express的错误处理中间件并不处理用throw关键字抛出的错误，只会在你调用带参数的next时处理错误。Express对于这些异常（用throw关键字抛出的错误）有一些保护措施。即应用程序会返回一个500的错误然后请求就会失败，但是应用程序会继续执行。其他错误如语法错误，会使你的服务器死机。

上述静态文件处理中间件，带上打印错误的机能，可以这么写：

app.use(function(req,res,next){
	var staticPath=path.join(__dirname,"static",req.url);

	res.sendFile(staticPath,function(err){
		if(err){
			console.error("File failed to send.");
			next();
		}else{
			console.log("File sent!");
		}
	});
	
})
除了这种方法外，你还可以通过调用带参数的next（）来进入错误模式，如果有错误的话。如下这样：

app.use(function(req,res,next){
	var staticPath=path.join(__dirname,"static",req.url);

	res.sendFile(staticPath,function(err){
		if(err){
			next(new Error("Error sending file!"));
		}
	});
	
});
这样会把错误都呈现到浏览器上。但是没有必要把所有的错误说明都呈现给用户，呈现给程序员就可以了。所以再写一种，就先在常规中间件后面加上只打印错误，但是不响应错误的中间件代码：

app.use(function(err,req,res,next){
	console.error(err);
	next(err);//这句话就会把流传递到下一个错误处理中间件
});
然后再写一个响应错误的错误处理中间件，添加到后面：

app.use(function(err,req,res,next){
	res.status(500);
	res.send("Internal server error.")
})
最后代码就是这样的：

var express=require("express");
var path=require("path");
var fs=require("fs");
var morgan=require("morgan");
var app=express();

app.use(morgan("short"));

app.use(function(req,res,next){
	var staticPath=path.join(__dirname,"static",req.url);

	res.sendFile(staticPath);
	
});


app.use(function(err,req,res,next){
	console.error(err);
	next(err);
});


app.use(function(err,req,res,next){
	res.status(500);
	res.send("Internal server error.")
})

app.listen(3000,function(){
	console.log("App started on port 3000");
});
4.4 其他有用的中间件
两个不同的Express应用程序可以有很不相同的中间件栈。我们例子中的应用程序栈是众多可能的配置中的一种，还有很多其他种的。

只有一个内置于Express的中间件，即express.static。其他中间件还有：

body-parser；用于解析请求体。详见https://github.com/expressjs/body-parser
cookie-parser:用于解析用户cookie。需要其他中间件的配合，如express-session。详见https://github.com/expressjs/cookie-session
Compression:用于压缩响应，以用字节保存。详见https://github.com/expressjs/compression
Express的全部中间件列表在这：http://expressjs.com/en/resources/middleware.html

Chapter5 Routing
章节提要
简单的路径匹配的routing
通过routing来使用中间件
使用express.static来处理静态文件
使用Node内置的HTTPS模块来使用Express
routing是Express的重大features之一，允许你将不同的请求映射到不同的请求处理函数。在本章我们会更深入地研究。我们将会展示怎样和HTTPS一起使用Express,探索Express4的新routers features。我们还会构建几个以routing为中心的应用程序，其中一个将贯穿本书的剩余部分。

5.1 什么是routing?
如果你在使用浏览器访问 example.com/olivia,这是原生HTTP请求的第一部分：

GET /olivia http/1.1
这个HTTP请求头包含一个请求动词（GET),一个URI(/olivia),以及一个HTTP版本号（1.1）。当你routing的时候，你就将这个请求动词和URL映射到了一个请求处理函数。你基本上会说：“Hey,Express！当你看到一个GET请求发送到/about_me，运行这个代码。当你看到一个POST请求发送到/new_user,运行其他代码。”

routing差不多就是说——将请求动词和URI映射到特定的代码。

5.1.1 一个简单的routing例子
var express=require("express");
var app=express();

app.get("/olivia",function(request,response){//当向"/olivia"发出GET请求成功的时候，执行这个函数
	response.send("Welcome to Olivia's homepage!");
});

app.use(function(request,response){//当向其他不是"/olivia"的URI发出请求后，执行这个函数
	response.status(404).send("Page not found!");
});

app.listen(3000);
当Express得到向/oliva的HTTP GET请求,就运行指定的请求处理函数。如果得到的是向其他URI发出的HTTP GET请求，或者是向/oliva发出了不是GET的请求，Express就会忽略这段代码执行其他代码。

5.2 routing的特性(the feature of routing)
routing就是讲HTTP请求动词+URI的联合物映射到一个请求处理函数。

但是我们并不满足于此。我们想要更多的routing features。

注意： 一些其他的框架（如Ruby的Rails)具有一个中心化的routing文件，所有的路由路径都是在那一个位置定义。Express不是这样的——路由路径可以在很多地方被定义。

5.2.1 为路由路径获取参数
你刚刚看到的路由路径可以用全等操作符代码表达（===）。这样也很有用，但却不能提供给你所有你想要的表现力量。

设想一下你被安排了一个制作一个包含用户简况的网站，且每个用户都有一个数字ID。你想要用户#1的URL为/user/1，用户#2的URL为/users/2,等等。你可以通过一个规则——以/users/开头然后接一个ID——来为所有用户定义路由路径，而不是通过为每个用户定义一个新路径。

最简单的方法
app.get("/users/:userid",function(req,res){//匹配长成这样的请求/users/123和/users/horse_ebooks
	var userId=parseInt(req.params.userid,10);//将userid属性转化为一个整数
})；
在这个例子中，你看到了怎样从一个动态路由路径中抓取参数。它会匹配像/users/123和/users/horse_ebooks这样的路径，但其不能匹配像/users/或/users/123/posts这样的路径。

5.2.2 使用正则表达式来匹配路由路径
Express允许你通过字符串或正则表达式的方式来指定路由路径。你也可以用正则表达式来匹配参数。

正则相关知识可参见 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

Eg:正则表达式匹配数字型的路由路径

app.get(/^\/users\/(\d+)$/,function(req,res){
	var userId=parseInt(req.params[0],10);
})；
Eg:匹配复杂的路由路径

app.get(/^\/users\/(\d+)-(\d+)$/,function(req,res){
	var startId=parseInt(req.params[0],10);//第一个捕获组参数转换后即startId
	var endId=parseInt(req.params[1],10);//最后一个捕获组参数转换后即endId
});
Eg:匹配 UUID模式路由路径

var horribleRegexp=/^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})$/i;

app.get(horribleRegexp,function(req,res){
	var uuid=req.params[0];
})
5.2.3 获取查询字符串参数
另一个向URL传递信息的常用方法是使员工查询字符串。你在internet上搜索东西的时候，你就会看到查询字符串。比如，如果你在Google上搜索"javascript-themed burrito"，你就会看到这样的URL"https://www.google.com/search?q=javascript-themed%20burrito"。它是传递了一个查询。如果Google用Express写（它不是），它可能就会这样处理：

app.get("/search",function(req,res){
	req.query.q=="javascript-themed burrito"
})
5.3 使用router来分离你的应用程序
引用Express4的文档：

一个router就是一个独立的使用中间件和routes的实例。Routers可以被看作是小型的有能力使用中间件和路由的应用程序。每一个express应用程序都具有一个内置的应用程序router。

Routers的行为就像中间件一样，而且可以用于应用程序的其他routers。换句话说，routers可以让你把大的应用程序分割成小的很多片的微型应用程序，然后你后面可以将它们再组合起来。对于小型应用程序来说，这样做有些过度了，但当你的app.js变大起来，就需要考虑将你的app用routers来分割。

Eg:

app.js:

var express = require("express");
var path = require("path");
var apiRouter = require("./routes/api_router");
var app = express();
var staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));
app.use("/api", apiRouter);
app.listen(3000);
正如你所看到的，你使用API router就像使用中间件，因为routers本质上也是中间件。本例中，以/api开头的URL会直接发送到你的router。就是所/api/users和/api/message这样的会使用你的router代码，其他如/about/celinedion 就不会使用这个代码。

然后定义你的router，可以将其作为一个子应用程序。

routes/api_router.js:

var express=require("express");

var  ALLOWED_IPS=[
	"127.0.0.1",
	"123.456.7.89"
];

var api=express.Router();

api.use(function(req,res,next){
	var userIsAllowed=ALLOWED_IPS.indexOf(req.ip)!==-1;
	if(!userIsAllowed){
		res.status(401).send("Not authorized!");
	}else{
		next();
	}
});

api.get("/users",function(req,res){

});

api.post("/users",function(req,res){

});

api.get("/messages",function(req,res){

});

api.post("/messages",function(req,res){

});

module.exports=api;
说明
————————————————————回顾到这里了———————————————

5.4 处理静态文件
让我们更深入地研究那个处理静态文件的例子。。

5.4.1 具有中间件的静态文件
在前例中，你是在根目录下处理你的静态文件。即例如如果你的URL是http://jokes.edu，那么你要查看jokes.txt，那么你的访问路径就是http://jokes.edu/jokes.txt。

但是你可能想从不同的URL增加静态文件。怎么做呢？

Express可以解决这个问题。可以增加有给定路径前缀的中间件。

Eg:

var express=require("express");
var path=require("path");
var apiRouter=require("./routes/api_router");

var app=express();

var photoPath=path.resolve(__dirname,"offensive-photos-folder/");

app.use("/offensive",express.static(photoPath));

app.listen(3000);
这时，只有你的请求URL以/offensive开始，这个中间件才会响应。这样用户就可以从其他URL访问照片，而不是从根目录地址。即这时你通过访问“http://www.localhost:3000/offensive/banner.png”来打开文件/offensive-photos-folder/banner.png

Eg2:从不同的路径目录请求不同的文件

var express=require("express");
var path=require("path");
var apiRouter=require("./routes/api_router");

var app=express();

var publicPath=path.resolve(__dirname,"public");
var userUploadsPath=path.resolve(__dirname,"user_uploads");

app.use("/public",express.static(publicPath));
app.use("/uploads",express.static(userUploadsPath));


app.listen(3000);
然后就可以在浏览器地址栏输入 http://localhost:3000/public/express_4-7.png或http://localhost:3000/uploads/footer.png可以看到相应文件。

5.4.2 Routing to static files(对静态文件的路由)
你可能也会想要发送一个用户概要图片，即比如说在当他们访问visit/users/123/profile_photo的时候，就可以看到到对应的123.png文件在网页上展示出来。静态中间件是不可能做到的，但Express具有一个很好的方法来做这个。

思路如下：当有人访问visits/users/:userid/profile_photo的时候，你就会发送相应的用户概要图片；你拥有一个叫做getProfilePhotoPath的函数，可以获取用户ID，并返回到他们对应的概要图片。

实现代码如下：

var express=require("express");
var path=require("path");

var app=express();

app.get("/users/:userid/profile_photo",function(req,res){
	console.log(req.params.userid);
	res.sendFile(getProfilePhotoPath(req.params.userid));
});

function getProfilePhotoPath(photoname){
	var photoPath=path.join(__dirname,"users",photoname+".png");
	console.log(photoPath);
	return photoPath;
}
app.listen(3000);
说明
req.params：Express扩展的req属性，用于获取请求URL中的参数（以:开头的），用法示例：

  app.get('/user/:id', function(request, response) {
    response.send('user ' + request.params.id);
  });
详见 http://expressjs.com/en/4x/api.html#req

res.sendFile(path[,options][fn]):Express扩展的res方法，用于将指定路径的文件作为响应发送的文件。详见http://expressjs.com/en/4x/api.html#res

5.5 用HTTPS使用Express
TLS:Transport Layer Security，安全传输层协议

SSL:Secure Sockets Layer,安全套接层

暂略，OpenSSL相关安装包我放在E:/Downloads中，参见网站https://www.openssl.org

5.6 一个简单的routing例子
本例会用到jQuery和pure。

pure是一个小型CSS框架，参见http://purecss.io/,和bootstrap类似，但是更模糊更轻量级。

实践项目文件夹：tempofzip

Chapter6 Building APIs
章节概要
使用Express构建API
HTTP方法，及它们怎样响应CRUE操作
使用Express的router来为你的API进行版本控制
理解HTTP状态码
好的API设计背后的核心原则是：使用你API的开发者希望你的API做什么。

6.1 一个基础的JSON API的例子
你的API可能针对如下URL获取请求：

/timezone?tz=America+Los_Angeles
然后你的API服务器可能以JSON数据响应：

{
	"time": "2015-06-09T16:20:00+01:00",
	"zone": "America/Los_Angeles"
}
然后你可以使用这个API写很多简单的应用程序。这些应用程序可以在多种多样的平台上运行。包括网页、移动端、命令行工具。

重点是：如果你制作了一个API,其接收来自计算机的请求，然后再吐出针对计算机的响应，你可以在这个API之上构建UI。这个你在前述章节中已经做过，你使用了天气app——它使用一个API来获取天气数据，然后将它呈现给用户。

6.2 A simple Express-powered JSON API
我们来通过Express构建一个简单的API。Express API的基本原理非常简单直接：接收一个请求，解析它，然后以一个JSON对象和一个HTTP状态码来响应它。你将使用中间件和路由来接收请求并解析它们，并且你将使用Express的扩展属性/方法来响应请求。

注意： 从技术上说，API们不一定要使用JSON——他们可以使用其他数据交换格式，如XML或纯文本。JSON具有最好的Express集成，和浏览器端运行的JavaScript相容很好，而且是API们最受欢迎的选择之一。

我们来构建一个简单的产生随机整数的API。其功能是：

任何请求这个API的人都会发送一个最小值和一个最大值
你的服务器将会解析这些值，计算你的随机数，然后将它以JSON的形式返回
实例在文件夹randGenerator中。

其app.js为：

var express=require("express");
var app=express();

app.get("/random/:min/:max",function(req,res){//对于Get请求的route处理函数
	var min=parseInt(req.params.min);//将字符串转化为Number，结果为Number或NaN
	var max=parseInt(req.params.max);

	if(isNaN(min)||isNaN(max)){//min和max只要有一个为NaN，你就要给用户呈现一个error
		res.status(400);//400指示用户的请求中有错误
		res.json({//发送一个json对象
			error:"Bad request."
		});
		return;//如果不返回，该函数中的剩余部分将继续执行，Express会抛出错误
	}

	var result=Math.round((Math.random()*(max-min))+min);
	res.json({
		result:result
	});
});

app.listen(3000,function(){
	console.log("App started on port 3000");
});
在地址栏输入 http://localhost:3000/random/1/10 即可得到随机数json数据

知识点补充
res.json():

发送JSON响应。其参数通过调用JSON.stringify()转换为JSON字符串，该JSON字符串为响应内容。

参数可以为任何的JSON类型，包括对象，数组，字符串，布尔，或数值等。

eg:

  res.json(null);
  res.json({ user: 'tobi' });
  res.status(500).json({ error: 'message' });
400状态码：

指示用户的请求中有错误。

6.3 Create,read,update,delete APIs
有一个普遍的应用程序模式:create,read,update,delete。简写为CRUD。

很多应用程序都使用CRUD。如照片分享app:

用户可以上传照片——create
用户可以浏览照片——read
用户可以更新照片——update
用户可以删除照片——delete
6.3.1 HTTP verbs(HTTP methods)
(这里关于这些http方法的英文解释可以后面再认真看一遍） 实践项目文件夹为httphandler,其app.js为：

var  express=require("express");

var app=express();

app.get("",function(req,res){
	res.send("you just sent a GET request,friend");
});

app.post("",function(req,res){
	res.send("a POST request? nice");
});

app.put("",function(req,res){
	res.send("i don't see a lot of PUT requests anymore");
});

app.delete("",function(req,res){
	res.send("oh my,a DELETE??");
});

app.listen(3000,function(){
	console.log("App is listening on port 3000");
});
可以使用curl命令行工具来发出各种请求，测试express。http://winampplugins.co.uk/curl/(我的curl工具放在 D:/Program Files/curl/）

6.3.2 CRUD 应用程序和 HTTP方法之间的对应关系
Create corresponds to POST
Read corresponds to GET
Update corresponds to PUT
Delete corresponds to DELETE
NOTE：POST vs.PUT
关于HTTP动词怎样对应CRUD有一些小争议。大多数人同意read对应GET，delete对应DELETE，但create和update就有些模糊了。

因为PUT可以和POST一样创建记录，所以你可能会说PUT更好地对应create。PUT可以创建和更新记录。

类似地，PATCH方法有时候也能够扮演update的角色。引用说明文档，“PUT方法是用于用一个完整的新东西覆盖一个资源，且不可以用于进行部分的改变。”而 PATCH就允许你部分地覆盖一个资源，其在2010年才被正式定义，它在HTTP的舞台上还是相当新的，这是它很少被使用的原因。但是有些人认为PATCH比PUT更适用于对应update。

6.4 API versioning(API版本控制）
为解决API的更新问题，有一个解决办法就是：对你的API进行版本控制。你需要做的就是为你的API添加版本信息。例如这个URL的请求会获得你