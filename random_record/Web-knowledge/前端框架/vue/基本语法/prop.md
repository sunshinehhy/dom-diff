https://cn.vuejs.org/v2/guide/components-props.html

具体可以参考链接和api.md中的v-bind

自定义组件可以写props   
父组件可以向子组件传props

## 单项数据流（父向子传prop）
- 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个`数组或对象类型的 prop 来说`，在子组件中改变这个对象或数组本身将`会影响到父组件的状态`。

- 不应该在一个子组件内部改变 prop。

- prop `默认是单向绑定`：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

要动态地绑定父组件的数据到子模板的 props，与绑定到任何普通的HTML特性相类似，就是`用 v-bind。每当父组件的数据变化时，该变化也会传导给子组件`。
```
<template>
  <div id="app">
      <input v-model="parentMsg">
      <br>
      <child v-bind:my-message="parentMsg"></child>
  </div>
</template>
<script> 
import Vue from 'vue';
export default {
  name: 'app',
  data: function () {
    return { 
      title: '使用 Prop 传递数据',
      parentMsg: 'Message from parent'
    }
    
  },
  components: {
    child: {
      props: ['myMessage'],
      template: '<span>{{myMessage}}</span>'
    }
  }
}
</script>
 
```

https://blog.csdn.net/gao_xu_520/article/details/77567096  (实例)