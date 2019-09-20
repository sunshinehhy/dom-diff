## 去掉苹果给 input 自动加上的阴影效果

http://cn.ft.com/m/marketing/estate_20171123.html

-webkit-appearance: none; /_ Gecko 内核 _/
-moz-appearance: none;/_ WebKit/Blink 浏览器内核 _/

## input 除一侧留有固定值外占满整行

## 软键盘弹出

https://www.cnblogs.com/xuanwotianming153/p/7419648.html

解决 input position：fixed 问题

在 android 手机下 fixed 表现要比 iOS 更好，软键盘弹出时，不会影响 fixed 元素定位；
不要在 fixed 元素中使用 input / textarea 元素。
还是保留之前的态度，依然不推荐在 Android 下使用 iScroll。在开发项目时，可以考虑分为两个版本：iOS 下使用 iScroll 的解决方案，Android 下使用 position:fixed。

https://kerita.github.io/2017/12/03/2017/ios11-cursor-not-follow-focus/

https://zhuanlan.zhihu.com/p/33479001

https://blog.csdn.net/zgpeterliu/article/details/79027411

input position:fixed 失效 ，会一起跟随底部往上移动

iphoneX input blur 之后， 键盘收起但键盘所占地方卡住的问题

iphonex 微信页面下，safari 不会,input 输入框拉起键盘后，键盘消失，但是原本键盘的区域还存在

点击完成，键盘消失，其实只要控制失焦动作就可以。
@keyup.enter="inputNumberEnter" 只在电脑上点击 enter 才行。
手机中弹出的软键盘，再点击完成，就会触发失去焦点。

iphonex 微信页面下，safari 不会,input 输入框拉起键盘后，键盘消失，但是原本键盘的区域还存在 (https://segmentfault.com/q/1010000015447012/a-1020000015482247)
思路：只要把 body‘推’会来就行了，ios 下弹出/收起键盘是没有触发 resize 事件的 ，做重绘操作（https://www.codercto.com/a/43883.html）

alert 和滚动页面会冲突：当用 key 触发动作弹出 alert，输入框底部没有滚上去，关闭 alert，软键盘出来。
这样我觉得是只要一 focus 就会滚动页面再弹软键盘（视觉上看不到差距） @keyup="inputNumber"
js input detect done keyboard in ios

setTimeout(() => {
const scrollHeight =
document.documentElement.scrollTop || document.body.scrollTop || 0;
window.scrollTo(0, Math.max(scrollHeight - 1, 0)); 这么写页面失焦就一直滚在之前的位置，软键盘消失的时候，就一直滚在这个位置，所以下面的上不去。
}, 100);

当滚动下面页面时，超过一定范围，就会遮挡住 input，找出原理？

光标错位的问题：https://blog.csdn.net/u011384023/article/details/79762787  
https://www.cnblogs.com/widgetbox/p/7742409.html 设计交互方面最好不要让弹窗中出现 input 输入框；
如果是弹出框用 postion:absolute 就可以解决穿透问题。
穿透的问题：第一步直接滚动到最底部，这样容易出错，导致滚动也有问题
确定光标的位置：

```
input/textarea获取光标位置
//输入框获取光标
const getPosition = function (element) {
    let cursorPos = 0;
    if (document.selection) {//IE
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -element.value.length);
        cursorPos = selectRange.text.length;
    } else if (element.selectionStart || element.selectionStart == '0') {
        cursorPos = element.selectionStart;
    }
    return cursorPos;
}
```
