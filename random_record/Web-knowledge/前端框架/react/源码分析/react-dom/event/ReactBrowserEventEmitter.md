https://github.com/facebook/react/blob/master/packages/react-dom/src/events/ReactBrowserEventEmitter.js

“ReactBrowserEventEmitter”事件处理总结:

- 顶级委托用于捕获大多数本机浏览器事件。这可能只发生在主线程中，并且是ReactDOMEventListener的责任，它被注入，因此可以支持可插入的事件源。这是唯一发生在主线程中的工作。
*
我们对事件进行规范化和反复制，以解释浏览器的怪癖。这可以在工作线程中完成。
*
- 转发这些本机事件(使用与之关联的顶级类型将它设为“EventPluginHub”，然后插件会问插件是否想要提取任何合成事件。
*
然后，“EventPluginHub”将使用“dispatches”(一个关心事件的监听器和id序列)对每个事件进行注释。
*
- “EventPluginHub”然后分派事件。