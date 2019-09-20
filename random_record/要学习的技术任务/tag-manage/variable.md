## 建立变量Variable  选择Variable type为DOM Element

Selection Method为ID ；Element ID 为testClick；attribute没设置为div中文本
If the attribute name is set, the variable's value will be that of the DOM element attribute; otherwise, the variable's value will be the text of the DOM element.
如果设置了属性名，则该变量的值将是DOM元素属性的值;否则，变量的值将是DOM元素的文本。

## Custom JavaScript
```
This field should be a JavaScript function that returns a value using the 'return' statement. If the function does not explicitly return a value, it will return undefined and your container may not behave as expected. Below is an example of this field:
  function() {
    var now = new Date();
    return now.getTime();
  }
```

Click - All Elements  所有点击会触发，我觉得仅仅定义一个这个，然后所有点击引用它就好

attribute 得出为null

tag中，Action 中写Custom JavaScript，当点击会执行，并且返回return值

tag中，Action 中写Custom Event ，会得到gtm.click


## JavaScript Variable
全局变量：var firstVar = 'first variable value';

设置Global Variable Name 为 firstVar

引用的变量为{{first Variable}}  ，其中first Variable为定义变量的Name

{{first Variable}}获取的是firstVar的值，即'first variable value'

## Data Layer Variable
Set Default Value 为'default value'，则得出'default value'；没有设置则为undefined;
如果为default111，则得出default111；

得出，不管带不带引号都可以

选择version，得出gtm.click

Name of the data layer variable to read from. The value of a data layer variable named 'var' is set to 'value' when the following code on your website is executed:
  dataLayer.push({'var': 'value'});
Note: Data layer variables are per-page only, not per-session
数据层变量仅为每个页面，而不是每个会话。

{{test custom event variable}}{{Event}}   gtm.click buttonClick