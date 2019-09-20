## 一、DOM

### 1.关于 height/width

#### 1.1 window.innerHeight

浏览器窗口的视口（viewport）高度（以像素为单位），如果存在水平滚动条，则包括它。

<https://developer.mozilla.org/zh-CN/docs/Web/API/Window/innerHeight>

Eg by webapp:
667

#### 1.2 Element.clientHeight

返回元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。

<https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight>

##### document.documentElement.clientHeight

文档根元素 html 的内部高度

Eg by webapp:
667

##### document.body.clientHeight

body 元素的高度

Eg by webapp:
9099

##### NOTE:计算屏幕尺寸的最好办法:

参见<https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window>

```js
var width =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var height =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;
```

#### 1.3 HTMLElement.offsetHeight

<https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/offsetHeight>

只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。包括元素的边框、垂直内边距和元素的水平滚动条（如果存在且渲染的话）和元素的 CSS 高度。

### 2.关于 top/left

#### 1. Element.offsetTop

## 二、jQuery

### 1. .width()

<http://api.jquery.com/width/>
Get the current computed width for the first element in the set of matched elements or set the width of every matched element.(返回当前匹配元素的第一个元素的计算宽度，或设置每个匹配元素的宽度)

#### \$(window).width()

Returns width of browser viewport

## 我踩的坑

img-container 是 div 中的 class
let imgContainer = document.querySelector(".img-container");
imgContainer.style.height 是获取不到数据的。需要用以上方法（比如 clientHeight\offsetHeight，不过注意 2 者之间的区别）
