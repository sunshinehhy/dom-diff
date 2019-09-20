## offset() 
offset() 方法设置或返回被选元素相对于文档的偏移坐标。

**当用于返回偏移时：** 
该方法`返回第一个匹配元素的偏移坐标`。它返回一个带有两个属性（以像素为单位的 top 和 left 位置）的对象。

**当用于设置偏移时：**
该方法`设置所有匹配元素的偏移坐标`。

返回偏移坐标：
```
$(selector).offset()
.offset().left
.offset().top
```
设置偏移坐标：
$(selector).offset({top:value,left:value})

使用函数设置偏移坐标：
$(selector).offset(function(index,currentoffset))

## offsetParent() 方法返回`最近的祖先定位元素`。