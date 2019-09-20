querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
querySelector() 方法仅仅返回匹配指定选择器的第一个元素。如果你需要返回所有的元素，请使用 querySelectorAll() 方法替代。

document.querySelector(CSS selectors)
CSS selectors(String):指定一个或多个匹配元素的 CSS 选择器。 可以使用它们的 id, 类, 类型, 属性, 属性值等来选取元素。
对于多个选择器，使用逗号隔开，返回一个匹配的元素。

**querySelector 获取子**
```
document有querySelector函数，元素节点也能有querySelector函数，通过类名或者id或者属性可以找到子元素
var audio = e.target.nextElementSibling;
var aa = e.target.parentNode;
console.log( aa.querySelector('audio'));
audio 是aa的子

```

**style和classList**

使用querySelector，不能获取style属性；使用getElementById可以获取style属性;
使用querySelector，不能获取classList属性；使用getElementById可以获取classList属性;

```
 let img0 = document.querySelector('show-enlarged-img-container');
 let img = document.getElementById('show-enlarged-img-container');
 img.style.display = 'none';
 img.classList.add("hide");
 ```
### position
```
position:fixed;
bottom: 0px;
rgba(250,234,221,0.8)

function offset(ele) {
    var top = ele.offsetTop;
    var left = ele.offsetLeft;
    while (ele.offsetParent) {
        ele = ele.offsetParent;
        if (window.navigator.userAgent.indexOf('MSTE 8') > -1) {
            top += ele.offsetTop;
            left += ele.offsetLeft;
        } else {
            top += ele.offsetTop + ele.clientTop;
            left += ele.offsetLeft + ele.clientLeft;
        }
    }
    return {
        left: left,
        top: top
    }

}
var oImg = document.getElementById('img1');
console.log(offset(oImg).top, offset(oImg).left);
(1)判断浏览器版本用window.navigator.userAgent
(2)IE8中offsetTop和offsetLeft包含border的值

### JavaScript如何屏蔽页面的滚动？
https://segmentfault.com/q/1010000000523273
方法1：
body{
    overflow:hidden
}
方法2：
var keys = [37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}
```


