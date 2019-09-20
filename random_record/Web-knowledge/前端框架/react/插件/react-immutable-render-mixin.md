https://www.npmjs.com/package/react-immutable-render-mixin  (用法见此处)

https://blog.csdn.net/u013751625/article/details/56479666   (小实例)


熟悉React.js的都应该知道，React.js是一个UI = f(states)的框架，为了解决更新的问题，React.js使用了virtual dom，virtual dom通过diff修改dom，来实现高效的dom更新。听起来很完美吧，但是有一个问题。当state更新时，如果数据没变，你也会去做virtual dom的diff，这就产生了浪费，可以参考flummox这篇文章。

React Native的视图刷新机制和React一脉相承，官方文档中抛出了PureRenderMixin，因为PureRenderMixin只是简单的浅比较，不适用于多层比较，所以对于一些特殊情况解决不了问题，而react-immutable-render-mixin则可以直接比较immutable对象的hashcode，既可以进行深层次比较，又大大的提高了比较速度。另外，关于immutable.js的使用方法，这里不赘述，可以自行查阅官方文档。