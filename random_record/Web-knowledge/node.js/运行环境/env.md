http://www.jb51.net/article/126838.htm

官方解释：process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。
process（进程）其实就是存在nodejs中的一个全局变量。
然后呢，咱们可以通过这个所谓的进程能拿到一些有意思的东西。

官方: process.env属性返回一个包含用户环境信息的对象。
根据不同的环境做一些配置上的处理。

在terminal中输入env，获取所有环境变量。

process.env.HOME 获取根目录