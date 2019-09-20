IE的script 元素只支持onreadystatechange事件，不支持onload事件。

FF的script 元素不支持onreadystatechange事件，只支持onload事件。

如果要在一个<script src="xx.js"> 加载完成执行一个操作，FF使用onload事件就行了，IE下则要结合onreadystatechange事件和this.readyState，

当document文档正在加载时,返回"loading"。
当文档结束渲染但在加载内嵌资源时，返回"interactive"，并引发DOMContentLoaded事件。
当文档加载完成时,返回"complete"，并引发load事件。

readystatechange事件会在document对象上的readyState属性的属性值发生变化时触发.

```
比如：
document.onreadystatechange = function () {
  if (document.readyState == "interactive") {
    initApplication();
  }
}
```