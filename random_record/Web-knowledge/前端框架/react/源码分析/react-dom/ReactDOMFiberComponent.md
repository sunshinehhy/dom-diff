https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMFiberComponent.js

这个js文件必须要深入研究

normalizeHTML = function(parent: Element, html: string) {
    解析HTML并读取它以规范化HTML字符串，以便将其用于比较
    我们可以在这里创建一个单独的文档，以避免重新初始化存在的自定义元素。但是这打破了<noscript>是如何处理的。我们使用相同的文档。参见 https://github.com/facebook/react/pull/11157
}

function trapClickOnNonInteractiveElement(node: HTMLElement) {
    Mobile Safari不能在非交互元素上正确地触发气泡单击事件，这意味着委托的单击监听器不会触发。解决这个问题的方法是在目标节点上附加一个空的单击监听器，http://www.quirksmode.org/blog/archives/2010/09/click_event_del.html 使用onclick属性设置它，这样我们就不必为它管理任何簿记。当监听器移除，不用保证是否我们需要清除。
// TODO:也许只在相关的旅行时才这么做?
}