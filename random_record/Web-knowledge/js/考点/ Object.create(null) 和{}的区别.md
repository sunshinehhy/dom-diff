一、js创建对象的方式
var obj = Object.create(null);
var obj1 = {}
var obj2 = new Object()

二、区别
创建的方法有如上的三种方法，那么他们之间有什么区别呢？

通过 Object.create(null) 创建的对象是不继承Object原型链上的属性，如tostring()方法这些
var obj = Object.create(null);
console.log(obj)

通过{}创建的对象和new Object()的方式是一样的，都会继承Object对象的所有属性
var obj = {};
console.log(obj)

三、为什么用Object.create(null)
使用create创建的对象，没有任何属性，显示No properties，我们可以把它当作一个非常纯净的map来使用，我们可以自己定义hasOwnProperty、toString方法，不管是有意还是不小心，我们完全不必担心会将原型链上的同名方法覆盖掉。
在我们使用for…in循环的时候会遍历对象原型链上的属性，使用create(null)就不必再对属性进行检查了，也可以使用Object.keys[]

四、什么时候用Object.create(null)
你需要一个非常干净且高度可定制的对象当做数据字典的时候
减少hasOwnProperty造成的性能损失并且可以偷懒少些一点代码的时候
其他的时候，请用{}
