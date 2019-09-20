## js异步加载模式

- es6的import就是异步加载

- 渲染引擎遇到 script 标签会停下来，等到执行完脚本，继续向下渲染。

- defer/async: `defer 是“渲染完再执行”，async 是“下载完就执行”`，defer 如果有多个脚本，会按照在页面中出现的顺序加载，多个async 脚本不能保证加载顺序

- 加载 es6模块的时候设置 type=module，代码会被当做模块，会`异步加载`不会造成阻塞浏览器，页面渲染完再执行，可以同时加上async属性，`异步执行脚本`（利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中）
- script标签设置type="module"（疑问：难道仅仅是es6模块中才能设置吗？或者设置才生效吗？），代码会被当做模块，异步加载

>对比js异步编程模式http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html

