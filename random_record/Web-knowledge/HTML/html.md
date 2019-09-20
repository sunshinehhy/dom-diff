fieldSet

## frame与iframe

#### \<frame> 
\<frame name="value">

* name 属性规定框架的名称。
* frame 元素的 name 属性用于在 JavaScript 中引用元素，或者作为链接的目标。

HTML5 不支持 \<frame> 标签。

\<frame> 标签定义 \<frameset> 中的子窗口（框架）。

\<frameset> 中的每个 \<frame> 都可以设置不同的属性，比如 border、scrolling, noresize 等等。

注释：如果您希望验证包含框架的页面，请确保 <!DOCTYPE> 被设置为 "HTML Frameset DTD" 或者 "XHTML Frameset DTD" 。

http://www.runoob.com/tags/tag-frame.html

HTML5 不支持 \<frame> 标签，HTML 4.01 支持 \<frame> 标签。

例子:

```
<frameset cols="25%,50%,25%">
<frame src="frame_a.htm">
<frame src="frame_b.htm">
<frame src="frame_c.htm">
</frameset>

```

#### \<iframe> 标签

http://www.runoob.com/tags/tag-iframe.html

- 所有主流浏览器都支持\<iframe> 标签。
- \<iframe> 标签规定一个内联框架。
- 一个内联框架被用来在当前 HTML 文档中嵌入另一个文档。
- 提示：您可以把需要的文本放置在 \<iframe> 和 \</iframe> 之间，这样就可以应对不支持 \<iframe> 的浏览器。
- 提示：使用 CSS 为 \<iframe> （包括滚动条）定义样式。
- HTML 4.01 与 HTML5之间的差异
    * HTML5 新增了一些新的属性，同时去掉了 HTML 4.01 中的一些属性。
- HTML 与 XHTML 之间的差异
    * 在 XHTML 中，name 属性已被废弃，并将被去掉。请使用 id 属性代替。

常用事件：
http://www.runoob.com/tags/ref-eventattributes.html

- 注意： ononline 和 onoffline 事件只有 Firefox 和 Internet Explorer 8 到 10 版本的浏览器支持。
- noresize 属性规定用户无法调整框架的大小,  frameborder是否有边框。
- ios9的Safari，根本不支持通过iframe跳转到其他页面去？——<font color="red">有待确定</font>

浏览器判断是否安装APP： http://blog.csdn.net/henrywulibin/article/details/52087041




