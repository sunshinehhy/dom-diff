XSS和CSRF原理及防范：https://www.cnblogs.com/chenxl/p/6829660.html


xss 跨站脚本攻击，主要是前端层面的，用户在输入层面插入攻击脚本，改变页面的显示，或则窃取网站 cookie，预防方法：不相信用户的所有操作，对用户输入进行一个转义，不允许 js 对 cookie 的读写

csrf 跨站请求伪造，以你的名义，发送恶意请求，通过 cookie 加参数等形式过滤


xss原理上利用的是浏览器可以拼接成任意的javascript，然后黑客拼接好javascript让浏览器自动地给服务器端发出多个请求（get、post请求）。
csrf原理上利用的是网站服务器端所有参数都是可预先构造的原理，然后黑客拼接好具体请求url，可以引诱你提交他构造好的请求。

CSRF: 服务端程序员的锅；
XSS: 服务端 View 层或者客户端程序员的锅

xss是一进（进入被攻击的服务器）一出（返回用户信息到攻击者指定的地方）再进（比如攻击者利用被攻击者的信息登录被攻击的服务器把钱转给攻击者）。
csrf只有一进（进入被攻击的服务器），然后直接破坏（比如把被攻击用户的钱转给攻击者）而不出。

XSS：跨站脚本攻击，注重的是脚本，一般来说，吃什么吐什么
CSRF：跨站请求伪造，注重的是跨站，伪造，也就是说重点在借刀杀人

**XSS漏洞的防御和利用:**

避免XSS的方法之一主要是将用户所提供的内容进行过滤，许多语言都有提供对HTML的过滤：

PHP的htmlentities()或是htmlspecialchars()。
Python的cgi.escape()。
ASP的Server.HTMLEncode()。
ASP.NET的Server.HtmlEncode()或功能更强的Microsoft Anti-Cross Site Scripting Library
Java的xssprotect(Open Source Library)。
Node.js的node-validator
使用HTTP头指定类型:

很多时候可以使用HTTP头指定内容的类型，使得输出的内容避免被作为HTML解析。如在PHP语言中使用以下代码： 

header
('Content-Type: text/javascript; charset=utf-8');
即`可强行指定输出内容为文本/JavaScript脚本`（顺便指定了内容编码），而非可以引发攻击的HTML。

**如何防御CSRF？**
请求令牌（一种简单有效的防御方法）：
首先服务器端要以某种策略生成随机字符串，作为令牌（token），保存在 Session 里。然后在发出请求的页面，把该令牌以隐藏域一类的形式，与其他信息一并发出。在接收请求的页面，把接收到的信息中的令牌与 Session 中的令牌比较，只有一致的时候才处理请求，处理完成后清理session中的值，否则返回 HTTP 403 拒绝请求或者要求用户重新登陆验证身份 


*我们没法彻底杜绝攻击，只能提高攻击门槛*