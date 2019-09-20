
## 最好的判断方法：

a !== a //说明a是NaN;  
不能用isNaN判断，因为isNaN会尝试先把里面的字符串转换为number，那么isNaN('cheddar')就为true了

更多参考资料：

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN

前端公众号的某一期:<>