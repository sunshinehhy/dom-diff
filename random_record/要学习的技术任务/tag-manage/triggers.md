## click- All Elements

All Clicks  :只有点击时候才会触发
Some Clicks:当满足条件会触发
Some Clicks选择以下Custom JavaScript ，并且contains后面写input，这样只要加载页面就会执行，有多少个click执行多少次。
```
Custom JavaScript

function inputClick(){
  var inputVar = 'input click variable in gtm';
  console.log('test input click variable in gtm');
  return inputVar;
}
```

