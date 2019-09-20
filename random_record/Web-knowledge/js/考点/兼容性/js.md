## 关于获取行外样式 currentStyle 和 getComputedStyle 出现的兼容性问题

我们都知道 js 通过 style 不可以获取行外样式，当我们需要获取行外样式时:
我们一般通过这两个方法获取行外样式：
IE 下: currentStyle
Chrome,FF 下: getComputedStyle(oDiv,false)
兼容两个浏览器的写法:
if(oDiv.currentStyle){
alert(oDiv.currentStyle.width);
}else{
alert(getComputedStyle(oDiv,false).width);
} \*注:在解决很多兼容性写法时,都是用 if..else..

    封装一个获取行外样式的函数:(兼容所有浏览器,包括低版本IE6,7)
        funtion getStyle(obj,name){
            if(obj.currentStyle){
                //IE
                return obj.currentStyle[name];
            }else{
                //Chrom,FF
                return getComputedStyle(obj,false)[name];
            }
        }
    调用：getStyle(oDiv,'width');

## 关于用“索引”获取字符串每一项出现的兼容性问题:

对于字符串也有类似于 数组 这样的通过 下标索引 获取每一项的值,
var str="abcde";
aletr(str[1]);
但是低版本的浏览器 IE6,7 不兼容
兼容方法:str.charAt(i) //全部浏览器都兼容
var str="abcde";
for(var i=0;i<str.length;i++){
alert(str.charAt(i)); //放回字符串中的每一项
}

## 关于 DOM 中 childNodes 获取子节点出现的兼容性问题

childNodes:获取子节点,
--IE6-8:获取的是元素节点,正常
--高版本浏览器:但是会包含文本节点和元素节点(不正常)
解决方法: 使用 nodeType:节点的类型，并作出判断
--nodeType=3-->文本节点
--nodeTyPE=1-->元素节点
例: 获取 ul 里所有的子节点，让所有的子节点背景色变成红色
获取元素子节点兼容的方法:
var oUl=document.getElementById('ul');
for(var i=0;i<oUl.childNodes.length;i++){
if(oUl.childNodes[i].nodeType==1){
oUl.childNodes[i].style.background='red';
}
}
注：上面 childNodes 为我们带来的困扰完全可以有 children 属性来代替。
children 属性:只获取元素节点,不获取文本节点,兼容所有的浏览器，
比上面的好用所以我们一般获取子节点时,最好用 children 属性。
var oUl=document.getElementById('ul');
oUl.children.style.background="red";

## 关于使用 firstChild,lastChild 等，获取第一个/最后一个元素节点时产生的问题

--IE6-8 下: firstChild,lastChild,nextSibling,previousSibling,获取第一个元素节点
(高版本浏览器 IE9+,FF,Chrome 不兼容,其获取的空白文本节点)
--高版本浏览器下: firstElementChild,lastElementChild,nextElementSibling,previousElementSibling
(低版本浏览器 IE6-8 不兼容)
--兼容写法: 找到 ul 的第一个元素节点,并将其背景色变成红色
var oUl=document.getElementById('ul');
if(oUl.firstElementChild){
//高版本浏览器
oUl.firstElementChild.style.background='red';
}else{
//IE6-8
oUl.firstChild.style.background='red';
}

## 关于使用 event 对象，出现的兼容性问题

    如: 获取鼠标位置
            IE/Chrom: event.clientX;event.clientY
            FF/IE9以上/Chrom: 传参ev--> ev.clientX;ev.clientY
    获取event对象兼容性写法: var oEvent==ev||event;
        document.oncilck=function(ev){
            var oEvent==ev||event;
            if(oEvent){
                alert(oEvent.clientX);
            }
        }

## 关于为一个元素绑定两个相同事件：attachEvent/attachEventLister 出现的兼容问题

    事件绑定:(不兼容需要两个结合做兼容if..else..)
    IE8以下用: attachEvent('事件名',fn);
    FF,Chrome,IE9-10用: attachEventLister('事件名',fn,false);
    多事件绑定封装成一个兼容函数:
    function myAddEvent(obj,ev,fn){
      if(obj.attachEvent){
        //IE8以下
        obj.attachEvent('on'+ev,fn);
      }else{
        //FF,Chrome,IE9-10
        obj.attachEventLister(ev,fn,false);
      }
    }
    myAddEvent(oBtn,'click',function(){
      alert(a);
    });
    myAddEvent(oBtn,'click',function(){
      alert(b);
    });

## 关于获取滚动条距离而出现的问题

当我们获取滚动条滚动距离时:
IE,Chrome: document.body.scrollTop
FF: document.documentElement.scrollTop
兼容处理:var scrollTop=document.documentElement.scrollTop||document.body.scrollTop

## children 与 childNodes

IE 提供的 children、childNodes 和 firefox 下的 childNodes 的行为是有区别的，firefox 下 childNodes 会把换行和空白字符都算作父节点的子节点，而 IE 的 childNodes 和 children 不会。

## firefox 和 ie 的事件

window.event 只能在 IE 下使用，而不能用在 Firefox 下，这是因为 Firefox 的 event 只能在事件发生的现场使用。 Firefox 必须从源处加入 event 作参数传递。IE 忽略该参数，用 window.event 来读取该 event。

比方说下面这个在 ie 下获得鼠标位置的方法：

```
<button onclick="onClick(event)">获得OuterHTML</button>
<script type="text/javascript">
function onclick(event){
    event = event || window.event;
    alert(event.clientX);
}
</script>
```

## HTML 对象获取问题

FireFox 获取方式 document.getElementById("idName")

ie 使用 document.idname 或者 document.getElementById("idName")

解决办法：统一使用 document.getElementById("idName");

## const 问题

在 Firefox 下，可以使用 const 关键字或 var 关键字来定义常量；

IE 下，只能使用 var 关键字来定义常量；

解决方法：统一使用 var 关键字来定义常量。

## frame 问题

以下面的 frame 为例：

```
<frame src="xxx.html" id="frameId" name="frameName" />
```

a) 访问 frame 对象

IE：使用 window.frameId 或者 window.frameName 来访问这个 frame 对象，frameId 和 frameName 可以同名；

Firefox：只能使用 window.frameName 来访问这个 frame 对象；

另外，在 IE 和 Firefox 中都可以使用 window.document.getElementById("frameId")来访问这个 frame 对象；

b) 切换 frame 内容

在 IE 和 Firefox 中都可以使用

```
window.document.getElementById("testFrame").src = "xxx.html"或window.frameName.location = "xxx.html"
```

来切换 frame 的内容；

如果需要将 frame 中的参数传回父窗口（注意不是 opener，而是 parent），可以在 frame 中使用 parent 来访问父窗口。例如：

parent.document.form1.filename.value="Aqing";

## body 问题

Firefox 的 body 在 body 标签没有被浏览器完全读入之前就存在；而 IE 的 body 则必须在 body 标签被浏览器完全读入之后才存在；

## firefox 与 IE 的父元素(parentElement)的区别

IE：obj.parentElement

firefox：obj.parentNode

解决方法：因为 firefox 与 IE 都支持 DOM，因此全部使用 obj.parentNode

## innerText 的问题

innerText 在 IE 中能正常工作，但是 innerText 在 FireFox 中却不行，需用 textContent；

解决方法：

```
if (navigator.appName.indexOf("Explorer") > -1) {
    document.getElementById('element').innerText = "my text";
} else {
    document.getElementById('element').textContent = "my text";
}
```

## AJAX 获取 XMLHTTP 的区别

```
var xmlhttp;
if (window.XMLHttpRequest) {
xmlhttp = new XMLHttpRequest();
} elseif (window.ActiveXObject) { // IE的获取方式
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
注意：在IE中，xmlhttp.send(content)方法的content可以为空，而firefox则不能为null，应该用send("")，否则会出现411错误。
```

## ie6 不兼容 nextElementSibling

```
export  function getNextElement(element){
    if (element.nextElementSibling) {
        return element.nextElementSibling;
    }else{
        var next=element.nextSibling;
        while(next && next.nodeType!==1){
            next=next.nextSibling;
        }
        return next;
    };
}
```

## audio

https://blog.csdn.net/Mariosss/article/details/87861167
