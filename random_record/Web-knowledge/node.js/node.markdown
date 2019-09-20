node官网，各种插件:http://nodejs.cn/api/fs.html  

https://www.cnblogs.com/qinmengjiao123-123/p/node.html
__dirname 表示当前文件所在的目录的绝对路径
__filename 表示当前文件的绝对路径
module.filename ==== __filename 等价

process.chdir() 改变工作目录
1. process.cwd() 方法返回 Node.js 进程当前工作的目录,返回运行当前脚本的工作目录的路径
2. __dirname 是node的一个全局变量，获得当前文件所在目录的完整目录名
还在上面的js文件中输入一下代码
3. __filename 也是node的全局变量 Node.js中，在任何模块文件内部，
可以使用__filename变量获取当前模块文件的带有完整绝对路径的文件名

http://javascript.ruanyifeng.com/nodejs/path.html
path.resolve方法用于将相对路径转为绝对路径。

## node
Node采用V8引擎处理JavaScript脚本，`最大特点就是单线程运行，一次只能运行一个任务`。这导致`Node大量采用异步操作`（asynchronous opertion），即`任务不是马上执行，而是插在任务队列的尾部，等到前面的任务运行完后再执行`。
process.env.DB_ENV === 'production'   ------- node的环境变量
其实NODE_ENV=production表示新建个环境变量NODE_ENV,并设置它的值为production。这样我们在node里就可以通过process.env.NODE_ENV来获取这个值。而在express里就可以根据这个值来选择进入那个环境中。

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 
Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。 
Node.js 的包管理器 npm，是全球最大的开源库生态系统。

## require.cache
在Node.js中，定义了一个require.cache对象，该`对象代表缓存了所有已被加载模块的缓存区。`

require.cache对象具有一个“键名/键值”结构，键名为每个模块的完整文件名，键值为各模块对象，可以通过键名来访问某一个模块


