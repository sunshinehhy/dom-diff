<https://www.npmjs.com/package/nodemon>

官网: <https://nodemon.io/>
文档：<https://github.com/remy/nodemon#nodemon>
Nodemon是一个实用程序,它将监视代码源中的任何更改并自动重启服务器。对于开发来说非常完美。

verbose：true 表示输出详细启动与重启信息;false 表示不输出这些运行信息

execMap：运行服务的后缀名和对应的运行命令，"js": "node --harmony" 表示用 nodemon 代替 node  --harmony 运行 js 后缀文件；"" 指 www 这些没有后缀名的文件；默认的 defaults.js 配置文件会识别一些文件：py: 'python',rb: 'ruby'。

    events：这个字段表示 nodemon 运行到某些状态时的一些触发事件，总共有五个状态：

    start - 子进程（即监控的应用）启动

    crash - 子进程崩溃，不会触发 exit

    exit - 子进程完全退出，不是非正常的崩溃

    restart - 子进程重启

    config:update - nodemon 的 config 文件改变

watch：监控的文件夹路径或者文件路径。

env：运行环境 development 是开发环境，production 是生产环境。port 是端口号。

ext：监控指定后缀名的文件，用空格间隔。默认监控的后缀文件：.js, .coffee, .litcoffee, .json。但是对于没有文件后缀的文件，比如 www 文件，我暂时找不到怎么用 nodemon 去监控，就算在 watch 中包含了，nodemon 也会忽略掉。

