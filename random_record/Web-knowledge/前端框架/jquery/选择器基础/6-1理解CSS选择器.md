jQuery的选择器和CSS的选择器非常相似，所以先从CSS选择器入手，了解下选择器的分类。CSS1-CSS3提供非常丰富的选择器，但是由于某些选择器被各个浏览器支持的情况不一样，所以很多选择器在实际CSS开发中很少用到

CSS1-CSS3提供了非常多的选择器，总的来说我们可以分几大类：

群组选择器：逗号“,”
简单选择器：ID、标签、类、属性、通配符
关系选择器：孩子、后代、相邻、兄弟
伪类选择器：动作伪类、目标伪类、语言伪类、状态伪类、结构伪类、取反伪类

## 群组选择器用于分组合并多个处理的结构

selector1, selector2, selectorN
简单选择器"#"  "."  "["   "*"  ，这些都有内置原生API的支持，不过存在兼容问题。

##属性选择器在CSS2.1中只有四种

[att] [att=val] [att~=val] [att|=val]
在CSS3中又增加了三种：

[attr^=val] [attr$=val] [attr*=val]
当然除此之外jQuery还实现了自定义的属性选择器：

[attribute!='value']
[attributeFilter1][attributeFilter2][attributeFilterN]
## 关系选择器

关系选择器存在着关联，不能是单独存在的。

ancestor descendant
parent > child
prev + next
prev ~ siblings
## 伪类

这个细分就很多了，jQuery把这些伪类加工并扩展成几个大块：

基本筛选器： eq get first lang It not odd root...
内容筛选器： contains empty has parent...
可见筛选器： hidden visible
子元素筛选器： first-child nth-child only-child...
表单： bottom checkbox foucs input text...
查阅jQuery的API，针对选择器的处理确实太多了。