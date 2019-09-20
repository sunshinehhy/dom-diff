## 现象
对于ul下li排成一行的布局(即li的display由list-item设为inline-block)：

### 情况1
如果这些li在书写的时候有换行或者有空格，且ul本身的font-size不为0,那么li左右之间会有空隙:

```
<ul>
    <li>xxx</li>
    <li>xxx</li>
</ul>
```
或
```
<ul>
    <li>xxx</li> <li>xxx<li>
<ul>
```


### 情况2
如果li书写的时候不换行也无空格，那么li左右之间空隙消失

```
<ul>
    <li>xxx</li><li>xxx</li>
</ul>
```

### 情况3
如果ul的font-size设为0，那么无论li换不换行，空隙都会消失

## 结论
ul的font-size会控制li之间的空格大小。只有将ul的font-size设为0, 换行着写的li之间才不会有空格。

## 对策
考虑到代码可读性，还是选择正常方式换行写li。

然后为了精确控制li之间的间距，应该将ul的font-size设为0，然后为li设置marge，如margin:0 2.5px。
