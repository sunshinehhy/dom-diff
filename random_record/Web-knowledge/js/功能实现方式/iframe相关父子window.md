### 1. HTMLIFramElement接口
<https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement>

#### HTMLIFrameElement.contentWindow 
只读

返回一个 Document，该内联frame嵌套的浏览上下文中活跃的document对象。

### 2.window.parent
返回当前窗口的父窗口window对象.

如果一个窗口没有父窗口,则它的 parent 属性为自身的引用.

如果当前窗口是一个 \<iframe>, \<object>, 或者 \<frame>,则它的父窗口是嵌入它的那个窗口

### 3. 获取当前窗口的子窗口的中的元素：
```
        OneiframeElement.contentWindow.document.getElementsByTagName('video');
```

完整Eg:让页面的所有video都暂停播放

```
function pauseAllVideos() {
    var iframes = document.getElementsByTagName('iframe');
    for(var j=0, len=iframes.length;j<len;j++) {
        var oneIframe = iframes[j];
        var videos = oneIframe.contentWindow.document.getElementsByTagName('video');
        for(var i=0, l=videos.length;i<l;i++) {
            videos[i].pause();
        }
    }
    var videosAtTop = document.getElementsByTagName('video');
    for(var i=0,l=videosAtTop.length; i<l; i++) {
        videosAtTop[i].pause();
    }
}
```

### 4. 在iframe内部获取该iframe元素

通过window.name

Eg：

``` html
<iframe id="frame1" name="frame1" src="any.html"></iframe>
```

```js
parent.document.getElementById(window.name);
```

参考:<https://stackoverflow.com/questions/935127/how-to-access-parent-iframe-from-javascript>