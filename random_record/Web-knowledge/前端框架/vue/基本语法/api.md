https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7
##  注意
不应该在子组件内部改变prop

一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。model 选项可以用来避免这样的冲突：
v-model对表单创建双向绑定，它会·根据控件类型自动选取正确的方法来更新元素·，它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

## 疑问
v-model怎么判断绑定值
## 生命周期

## 基础组件的自动化全局注册

## 定义方式
全局注册和局部注册。

1. 直接对象，然后export出来（局部注册）

普通的 JavaScript 对象来定义组件：
```
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```
2. `我们的组件都只是通过 Vue.component 全局注册的：`（全局注册）
```
Vue.component('my-component-name', {
  // ... options ...
})
```


```
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
```
<div id="components-demo">
  <button-counter></button-counter>
</div>
new Vue({ el: '#components-demo' })
```
`一个组件的 data 选项必须是一个函数`，因此每个实例可以维护一份被返回对象的`独立的拷贝`：



一个组件`默认可以拥有任意数量的 prop`，`任何值都可以传递给任何 prop`。

```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

组件实例可以访问data和props。
每个组件必须只有一个根元素，类似于react，外面都得包一层。

疑问：构建组件的几种方法，
new Vue实例中data把值传给组件。
Vue.component中的data和new Vue实例中data的区别？


## 自定义事件系统

**通过事件向父级组件发送消息**

https://cn.vuejs.org/v2/guide/components.html#%E9%80%9A%E8%BF%87%E4%BA%8B%E4%BB%B6%E5%90%91%E7%88%B6%E7%BA%A7%E7%BB%84%E4%BB%B6%E5%8F%91%E9%80%81%E6%B6%88%E6%81%AF

$emit 方法并传入事件的名字，来`向父级组件触发一个事件：`
```
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```
然后我们可以`用 v-on 在博文组件上监听这个事件`，就像监听一个原生 DOM 事件一样：
```
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```


有的时候用一个事件来`抛出一个特定的值是非常有用的`。例如我们可能想让 <blog-post> 组件决定它的文本要`放大多少`。这时`可以使用 $emit 的第二个参数来提供这个值`：
```
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

## v-model
`自定义事件也可以用于创建支持 v-model 的自定义输入组件`。记住：
```
<input v-model="searchText">
```
等价于：
```
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

`当用在组件上时，v-model 则会这样：`
```
------1
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```
为了让它正常工作，这个组件内的 <input> 必须：

- `其 value 特性绑定到一个名叫 value 的 prop 上`
- `在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出`

写成代码之后是这样的：
```
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"  //其 value 特性绑定到一个名叫 value 的 prop 上
      v-on:input="$emit('input', $event.target.value)"  //在其 input 事件被触发时，将新的值通过自定义的 input 事件抛出
    >
  `
})
```
现在 v-model 就应该可以在这个组件上完美地工作起来了：
```
<custom-input v-model="searchText"></custom-input>  //支持 v-model 的自定义输入组件-----2
```
可以用1或者2，1的写法更简单
## v-bind
1. class和style:表达式结果的类型`除了字符串之外，还可以是对象或数组`。
2. prop  

**通过prop父向子组件传递数据**

```
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

<blog-post title="My journey with Vue"></blog-post>   //自己组件赋属性值
```

https://jsfiddle.net/chrisvfritz/sbLgr0ad  （实例）

```
在一个典型的应用中，你可能在 data 里有一个博文的数组：
new Vue({  //父
  el: '#blog-post-demo',
  data: {
    posts: [   
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})

并想要为每篇博文渲染一个组件：

<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>

```
如上所示，你会发现我们可以`使用 v-bind 来动态传递 prop`。这在你一开始不清楚要渲染的具体内容，比如从一个 API 获取博文列表的时候，是非常有用的。

**单个根元素** (参考 https://cn.vuejs.org/v2/guide/components-props.html 更好理解)
```
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
Vue.component('blog-post', {
  props: ['post'],  //子组件，变成接受一个单独的 post prop：
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```
现在，不论何时为 post 对象添加一个新的属性，它`都会自动地在 <blog-post> 内可用`。

3. .sync 修饰符 （https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6）

```
<text-document v-bind:title.sync="doc.title"></text-document> 
详情见链接
```

## 自定义事件


https://jsfiddle.net/chrisvfritz/o3nycadu/  (实例，着重看)


## 动态组件
```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```
currentTabComponent 可以包括:
- 已注册组件的名字，或
- 一个组件的选项对象
```
html:
<script src="https://unpkg.com/vue"></script>

<div id="dynamic-component-demo" class="demo">
  <button
    v-for="tab in tabs"
    v-bind:key="tab"
    v-bind:class="['tab-button', { active: currentTab === tab }]"
    v-on:click="currentTab = tab"
  >{{ tab }}</button>

  <component
    v-bind:is="currentTabComponent"
    class="tab"
  ></component>
</div>

js:
Vue.component('tab-home', { 
	template: '<div>Home component</div>' 
})
Vue.component('tab-posts', { 
	template: '<div>Posts component</div>' 
})
Vue.component('tab-archive', { 
	template: '<div>Archive component</div>' 
})

new Vue({
  el: '#dynamic-component-demo',
  data: {
    currentTab: 'Home',
    tabs: ['Home', 'Posts', 'Archive']
  },
  computed: {
    currentTabComponent: function () {
      return 'tab-' + this.currentTab.toLowerCase()
    }
  }
})
```

## 计算属性
为了简化逻辑，当某个属性的值依赖于其他属性的值时，可以使用计算属性。
计算属性就是`当其依赖属性的值发生变化时，这个属性的值会自动更新`，与之相关的dom部分也会同步自动更新。
设置cache为false关闭缓存之后 ，每次直接访问vm.example时都会重新执行getter方法。P54

**计算属性getter不执行的场景**
`当包含计算属性的节点被移除`并且`模板中其他地方没有再引用该属性`时，那么对应的计算属性的getter方法不会执行。P55

**在v-repeat中使用计算属性**
vue.js0.12.*版本废弃了v-component指令，所以可以使用自定义元素组件来实现在v-repeat中使用计算属性。 P57

## 表单控件绑定
当有`动态绑定vue.js实例属性`的需求，可以使用v-bind来实现，我们还可以绑定非字符串的值，如数组、对象、数组等。P61-62
:true-value和:false-value只适合同一个checkbox组`只有一个checkbox的情况`。`如果有多个checkbox`，请使用:value进行值绑定。

