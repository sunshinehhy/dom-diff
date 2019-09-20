https://github.com/ftlabs/ftscroller  (有一些实例)
https://github.com/ftlabs/fastclick

仅使用自然滚动。如果你需要一个JS滚动，有以下两个选择 
1) FTScroller（https://github.com/ftlabs/ftscroller） 
2) iScroll（http://cubiq.org/iscroll-5）


FTScroller是一个库，用于为具有触摸界面的设备上的web内容添加动量滚动，它兼容于包括桌面浏览器在内的大多数现代平台。尽管最近对overflow: scroll(或触摸等价物)的支持有所增加，但这通常仍然没有以跨平台或向后兼容的方式实现，也没有对拍摄等功能的支持。脚本必须在实例化页面任何元素上的滚动之前加载。

移动设备上的浏览器默认会在用户`点击屏幕大约延迟300毫秒后才会触发点击事件`，这是为了检查用户是否在做双击。为了`能够立即响应用户的点击事件，才有了FastClick`。  (https://majing.io/posts/10000007721218)

```
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}
```

## 不需要使用fastclick的情况
以下这几种情况是不需要使用fastclick：

1. FastClick是不会对PC浏览器添加监听事件
2. Android版Chrome 32+浏览器，如果设置viewport meta的值为width=device-width，这种情况下浏览器会马上出发点击事件，不会延迟300毫秒。
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```
3. 所有版本的Android Chrome浏览器，如果设置viewport meta的值有user-scalable=no，浏览器也是会马上出发点击事件。
4. IE11+浏览器设置了css的属性touch-action: manipulation，它会在某些标签（a，button等）禁止双击事件，IE10的为-ms-touch-action: manipulation