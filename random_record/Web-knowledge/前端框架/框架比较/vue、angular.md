https://www.cnblogs.com/wxtlinlin/p/6541895.html

https://blog.csdn.net/qq_21859119/article/details/70598938

## 使用Angularjs和Vue.js对比


之前项目都是使用Angularjs，（注明此处主要讲Angularjs 1）在初步使用Vue.js后做一个简答的对比笔记。
首先从理论上简单说一下各自的特点，之后再用几个小的例子加以说明。

- Angular

1，MVVM（Model）(View)(View-model)
2，模块化（Module）控制器（Contoller）依赖注入：
3，双向数据绑定：界面的操作能实时反映到数据，数据的变更能实时展现到界面。
4，指令(ng-click ng-model ng-href ng-src ng-if...)
5，服务Service($compile $filter $interval $timeout $http...)
其中双向数据绑定的实现使用了$scope变量的脏值检测，使用$scope.$watch（视图到模型），$scope.$apply(模型到视图)检测，内部调用的都是digest，当然也可以直接调用$scope.$digest进行脏检查。值得注意的是当数据变化十分频繁时，脏检测对浏览器性能的消耗将会很大，官方注明的最大检测脏值为2000个数据。

- Vue

Vue 只关注视图层， 采用`自底向上增量开发`的设计。

Vue 的目标是通过`尽可能简单的 API 实现响应的数据绑定和组合的视图组件`。

vue.js官网：是一套构建用户界面的 渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库`只关注视图层`，并且非常容易学习，非常容易与其它库或已有项目整合。另一方面，Vue 完全有能力驱动采用单文件组件和 Vue 生态系统支持的库开发的复杂单页应用。

Vue.js 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。

（1）模块化，目前最热的方式是在项目中直接使用ES6的模块化，结合Webpack进行项目打包
（2）组件化，创造单个component后缀为.vue的文件，包含template(html代码)，script(es6代码),style(css样式)
（3）路由



## vue-angular

1）、vue在设计之初参考了很多angular的思想

2）、vue相比于angular来说更加的简单

3)、vue相当于angular要变得小巧很多，运行速度比angular快

4）、vue和angular绑定都可以用{{}}

5）、vue指令用v-xxx，angular用ng-xxx

6）、vue中数据放在data对象里面，angular数据绑定在$scope上面

7）、vue有组件化概念，angular中没有

## vue-react
https://www.jianshu.com/p/8b94f1b98578

1）、react和vue都是用虚拟DOM Virtual DOM

2)、React和Vue都提供了响应式（Reactive）和组件化（Componsable）的视图组件

3）、React和vue都将注意力集中保持在核心库，伴随于此，有配套的路由和负责处理全局状态管理的库

4）、`React使用JSX渲染页面，Vue使用简单的模板`

5）、Vue比react运行更快

## 选择 Vue 而不选择 Angular，有下面几个原因，当然不是对每个人都适合：
在 API 与设计两方面上 Vue.js 都比 Angular 简单得多，因此你可以快速地掌握它的全部特性并投入开发。

Vue.js 是一个更加灵活开放的解决方案。它允许你以希望的方式组织应用程序，而不是任何时候都必须遵循 Angular 制定的规则。它仅仅是一个视图层，所以你可以将它嵌入一个现有页面而不一定要做成一个庞大的单页应用。在配合其他库方面它给了你更大的的空间，但相应，你也需要做更多的架构决策。例如，Vue.js 核心默认不包含路由和 Ajax 功能，并且通常假定你在应用中使用了一个模块构建系统。这可能是最重要的区别。

Angular 使用双向绑定，Vue 也支持双向绑定，不过默认为单向绑定，数据从父组件单向传给子组件。在大型应用中使用单向绑定让数据流易于理解。

在 Vue.js 中指令和组件分得更清晰。指令只封装 DOM 操作，而组件代表一个自给自足的独立单元 —— 有自己的视图和数据逻辑。在 Angular 中两者有不少相混的地方。

Vue.js 有更好的性能，并且非常非常容易优化，因为它不使用脏检查。Angular，当 watcher 越来越多时会变得越来越慢，因为作用域内的每一次变化，所有 watcher 都要重新计算。并且，如果一些 watcher 触发另一个更新，脏检查循环（digest cycle）可能要运行多次。 Angular 用户常常要使用深奥的技术，以解决脏检查循环的问题。有时没有简单的办法来优化有大量 watcher 的作用域。Vue.js 则根本没有这个问题，因为它使用基于依赖追踪的观察系统并且异步列队更新，所有的数据变化都是独立地触发，除非它们之间有明确的依赖关系。唯一需要做的优化是在 v-for 上使用 track-by。

