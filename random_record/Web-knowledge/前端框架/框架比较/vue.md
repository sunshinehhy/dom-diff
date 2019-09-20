## 
Vue.js 使用了基于 HTML 的模版语法，`允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据`。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。

在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

## vue和react
https://blog.csdn.net/CystalVon/article/details/78428036

- 状态管理 vs 对象属性：

vue不一定需要使用state，数据由data属性在Vue对象中进行管理
react在state状态管理存储数据的，不能修改数据，修改数据在Setstate中

- 构建工具
React和Vue都有自己的构建工具，你可以使用它快速搭建开发环境。React可以使用Create React App (CRA)，而Vue对应的则是vue-cli。两个工具都能让你得到一个根据最佳实践设置的项目模板。·

由于CRA有很多选项，使用起来会稍微麻烦一点。这个工具会逼迫你使用Webpack和Babel。而vue-cli则有模板列表可选，能按需创造不同模板，使用起来更灵活一点。