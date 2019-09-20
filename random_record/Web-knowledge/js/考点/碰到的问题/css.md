## 背景图

需要把 html 和 body 的 height：100%，并且设置如下

.background-img{
height: 100%;
background-image: url("../../assets/img/receview_success_backgound.png");
background-repeat: no-repeat;
background-size: cover;
background-color: #FFFFFF;
overflow: hidden;
}

## flex

<div>
  <div>*</div> 
  <div>请在YYYY年MM月DD日前，使用<span>13800138000</span>账号登录「少年得到」App 确认查收，逾期失效。</div>
</div>

display:flex 会作用到 span
last-child 会作用到子

## table 的四角加圆角

https://codepen.io/mlms13/pen/CGgLF

```
<table>
    <tr>
        <th>item1</th>
        <th>item2</th>
        <th>item1</th>
        <th>item2</th>
    </tr>
    <tr>
        <td>item1</td>
        <td>item2</td>
        <td>item1</td>
        <td>item2</td>
    </tr>
    <tr>
        <td>item1</td>
        <td>item2</td>
        <td>item1</td>
        <td>item2</td>
    </tr>
    <tr>
        <td>item1</td>
        <td>item2</td>
        <td>item1</td>
        <td>item2</td>
    </tr>
</table>
body {
  margin: 30px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  min-width: 350px;
}
table tr th,
table tr td {
  border-right: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  padding: 5px;
}
table tr th:first-child,
table tr td:first-child {
  border-left: 1px solid #bbb;
}
table tr th {
  background: #eee;
  border-top: 1px solid #bbb;
  text-align: left;
}

/* top-left border-radius */
table tr:first-child th:first-child {
  border-top-left-radius: 6px;
}

/* top-right border-radius */
table tr:first-child th:last-child {
  border-top-right-radius: 6px;
}

/* bottom-left border-radius */
table tr:last-child td:first-child {
  border-bottom-left-radius: 6px;
}

/* bottom-right border-radius */
table tr:last-child td:last-child {
  border-bottom-right-radius: 6px;
}
```

以上方法会出现很奇怪的现象：

```
table tr th,
table tr td {
  border-right: 1px solid #FF7349;
  border-bottom: 1px solid #FF7349;
  padding: 5px;  //加padding，如果只有2行，会出现虚化
  font-size: 0.14rem;
  font-weight: 400;
}
```

## 在安卓中浮动 div 的高度

设置 padding（不管是 rem 还是 px），font-size 单位不管是 rem 还是 px，文字偏上，不会居中
设置 height 和 line-height 相等，文字会居中

## 在 ios app 中 margin-bottom 没起做用，但在微信中起作用

改用 padding-bottom 解决了

## div 设置字体大小，但是 div 中的子元素 label 和 span 没有设置大小，翻转手机没设置的子元素会变大

@media screen and 不起作用原因

## 字体太小，在包含文字的 div 用 height 和 line-height 使文字垂直居中，文字会在安卓手机上偏上

不能解决移动端 font-size 小于 12px 以下出现的不能垂直居中问题。可能还需要各位用其它方式来解决。

## line-height 与 font 同时使用，不会垂直居中

`如果样式声明列表中有line-height与font，则line-height无效。只要样式声明中没有font，就可使用line-height来设置文本的垂直居中了。`

```
<div id="next-button">下一步</div>

#next-button{
    width:400px;
    height: 54px;
    text-align: center;
    line-height: 54px;
    font:16px "Microsoft YaHei","Hiragino Sans GB";
    margin: 0 auto;
}
设置了line-height和font，没有垂直居中
```

```
#next-button{
    width:400px;
    height: 54px;
    text-align: center;
    font:16px/54px "Microsoft YaHei","Hiragino Sans GB";
    margin: 0 auto;
}
仅仅设置font，垂直居中
```

## div 没有高度的情况下，对文字设置垂直居中

```
<div class="remaining-time">
      <label>距离结束还剩：1</label>
</div>
.remaining-time{
    height:40px;
}
label{
    vertical-align:middle
}
```

如果 remaining-time 设置了 height，vertical-align:middle 起作用了，但是不能在此高度情况下垂直居中；
`如果remaining-time没有设置了height，vertical-align:middle也起作用了`，此时能看到文字垂直居中；其实不设置 vertical-align:middle，文字正好紧挨 div，看视居中。

```
<div class="remaining-time">
      <label>距离结束还剩：1</label>
      <span>距离结束还剩：1</span>
</div>
.remaining-time{
    height:40px;
}
label{
    font-size:20px;
    vertical-align:middle
}
span{
    font-size:25px;
    vertical-align:middle
}
```

同样 remaining-time 不能设置高度，如果 div 的子元素 span 和 label 的字体大小不一样，字体最大的看着会居中，其他的不会，`所以需要对于每个子元素设置vertical-align:middle`

## css 固定高度的容器内，文字大小变化时的垂直居中

## 行内元素和块级元素的区别

1.行内元素(又叫内联元素 inline element):
(1) 不占据一整行，随内容而定，有以下特点：
(2) 不可以设置宽高，也不可以设置行高，其宽度随着内容增加，高度随字体大小而改变。
(3) `内联元素可以设置外边界，但是外边界不对上下起作用，只能对左右起作用`。
(4) `也可以设置内边界，但是内边界在ie6中不对上下起作用，只能对左右起作用`。

常用的内联元素有：a - 锚点，b - 粗体(不推荐)，br - 换行，em - 强调，font - 字体设定(不推荐)，i - 斜体，img - 图片，input - 输入框，label - 表格标签，
select - 项目选择，small - 小字体文本，span - 常用内联容器，定义文本内区块，strike - 中划线，strong - 粗体强调 2.块级元素 block element:
(1) 总是在新行上开始，占据一整行;
(2) 高度，行高以及外边距和内边距都可控制;
(3) 宽度始终是与浏览器宽度一样，与内容无关;
(4) 它可以容纳内联元素和其他块元素。

没加 line-height:100%，13 天没有居中
vertical-align:middle 不包含元素的 span 是居中的
display: flex; 可以把 span 中文字和边界之间的空隙去掉。

## input placeholder 垂直居中

```
input[type='text']{
  background-color: rgba(255,255,255,.4);
  border:3px solid rgba(0,0,0,.5);
  min-height: 45px;
  border-radius: 6px;
  color:#fff;
    font-size: 30px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 30px;
}
input[type='text']::-webkit-input-placeholder {
  font-size: 30px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 30px;
  text-transform: uppercase;
  vertical-align: middle;
}
```

```
input[type='text']{
  background-color: rgba(255,255,255,.4);
  border:3px solid rgba(0,0,0,.5);
  min-height: 45px;
  border-radius: 6px;
  color:#fff;
  color: rgba(255, 255, 255, 0.4);
  line-height: 30px;
}
input[type='text']::-webkit-input-placeholder {
  font-size: 30px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 30px;
  text-transform: uppercase;
  vertical-align: middle;
  position: relative;
  top: 7px;
}
```

input 输入框中光标高度的变化问题
<input onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'
oninput="if(value.length>11)value=value.slice(0,11)" type="number" placeholder="请输入手机号">

当没有内容的时候光标的高度=input 的 line-height 的值，当有内容时，光标从 input 的顶端到文字的底部。

## input 只允许输入 11 位数字

```
<input type="text" maxlength="11" oninput = "value=value.replace(/[^\d]/g,'')"  placeholder="请输入您的手机号">
@input="numberValue=$event.target.value.replace(/\D/g,'')"  逻辑是对的

  <input
          @blur="inputNumberBlur"
          @focus="inputNumberFocus"
          type="number"
          pattern="\d*"
          maxlength="11"
          min="0"
          max="99999999999"
          @input="numberValue=$event.target.value.slice(0,11);"
          v-bind:value="numberValue"
          placeholder="输入您的手机号"
        >
        以上能看到输入12以上的数字，然后截断消失。
        当设定type="number"时， maxlength="11"不起作用

        onkeyup

        以下是对的，当设定type="text"时， maxlength="11"有效。只能输入11个。$event.target.value.replace(/\D/g,'')"能控制只能输入数字
        当输入文字，也会出现闪一下。我把input换成onkeyup就可以了
        <input
          type="text"
          pattern="\d*"
          maxlength="11"
          min="0"
          max="99999999999"
          @input="numberValue=$event.target.value.replace(/\D/g,'')"
          v-bind:value="numberValue"
          placeholder="输入您的手机号"
        >

```

## x 或者 X，没有设计的关闭按钮对称

x 的字体不会垂直居中

## css 高度随宽度比例变化

https://www.cnblogs.com/0603ljx/p/4650730.html
https://blog.csdn.net/qiqi_77_/article/details/79301214

```

```
