jQuery的定位就是一个DOM的操作库，那么可想而知选择器是一个至关重要的模块。Sizzle，作为一个独立全新的选择器引擎，出现在jQuery 1.3版本之后，并被John Resig作为一个开源的项目，可以用于其他框架：Mool、Dojo、YUI等。

jQuery是总入口，选择器支持9种方式的处理：
```
1.$(document)   
2.$('<div>’)
3.$('div')
4.$('#test')
5.$(function(){})
6.$("input:radio", document.forms[0]);
7.$('input', $('div'))
8.$()
9.$("<div>", {
         "class": "test",
         text: "Click me!",
         click: function(){ $(this).toggleClass("test"); }
      }).appendTo("body");
10.$($('.test'))
```

jQuery这个选择器重构了几次后，现在逻辑结构相当的清晰了，一看大概就知道，不能不说jQuery的`反模式非职责单`一深受开发者喜欢，一个接口承载的职责越多内部处理就越复杂了，jQuery查询的对象是dom元素，查询到目标元素后，如何存储？

   ☑  查询的到结果储存到jQuery对象内部，由于查询的dom可能是单一元素，也可能是合集

   ☑  jQuery内部应该要定义一个合集数组，用于存在选择后的dom元素

   ☑  当然啦，根据API，jQuery构建的不仅仅只是DOM元素，还有HTML字符串、Object、[] 等等…

看看入口的构造函数，如右侧代码：
```
init: function(selector, context, rootjQuery) {
     //如右侧代码
}
```
源码缩进后的结构：

  ☑ 处理""、null、undefined、false、返回this、增加程序的健壮性

  ☑ 处理字符串

  ☑ 处理DOMElement，返回修改过后的实例对象this

  ☑ 处理$(function(){})