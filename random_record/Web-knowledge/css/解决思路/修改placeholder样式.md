### 问题
有时候会需要修改input的placeholder样式

### 解决办法
为这四个属性设置样式即可：

```
::-webkit-input-placeholder { /* WebKit browsers */
    color: red;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: red;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: red;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: red;
}
```

### 参考资料
<https://stackoverflow.com/questions/2610497/change-an-html5-inputs-placeholder-color-with-css>
<https://segmentfault.com/q/1010000000397925>