```
new (Vue.extend({
    mixins: [myMixin]
}))

// 等同于

var Content = Vue.extend({
    mixins: [myMixin]
});
```
```
new Content;
new Vue.extend({
    mixins: [myMixin]
})

//等同于

var Extend = Vue.extend;
new Extend({
    mixins: [myMixin]
});

报错
// 报错 Uncaught TypeError: Cannot read property 'name' of 
// undefined
//  at new Vue.extend (vue.js:3425)
new Vue.extend({
    mixins: [myMixin]
})
```
第一种是vue.extend先生成类的构造函数，再new生成对象。

第二种是直接把vue.extend当构造函数来使用，原来的扩展参数被当成了构造参数，根本没发生函数的扩展，所以报错了。

