## State(在 store 中定义，可在组件中获取)

子组件通过 store.state.count 获取到状态值

不是传值：用
拿一个实例来操作，在子组件中导入 store，其他组件用

mapState：`生成多个计算属性`(2 种写法)
mapState 有个特殊点：为了能够使用 `this` 获取局部状态，必须使用常规函数

```
computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
        return state.count + this.localCount
    }
})
```

组件里可以放 mapState（一般多组件公用一个状态适合用到它）

## Getter(在 store 中定义，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。)

1. 属性访问 store.getters.doneTodosCount
   注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
2. 方法访问 store.getters.getTodoById(2)

   `可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。`
   (注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。)

**mapGetters 辅助函数:** `仅仅是将 store 中的 getter 映射到局部计算属性`

## Mutation(在 store 中定义)

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
包含：事件类型 (type) 和 一个 回调函数 (handler，进行状态更改的地方，并且它会接受 state 作为第一个参数)

```
mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
}
increment:type（可以用常量定义）
{函数体}:handler，更改state
```

mutation 更像是事件注册，不能直接调用一个 mutation handler。
store.commit('increment') //increment 是 type

Mutation 可以更改属性，`需遵守 Vue 的响应规则。`

mutation 必须是同步函数，不能是异步，这是为什么？举例（https://vuex.vuejs.org/zh/guide/mutations.html）：因为devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。
例如，当你调用了`两个包含异步回调的 mutation 来改变状态，你怎么知道什么时候回调和哪个先回调呢？`这就是为什么我们要区分这两个概念。在 Vuex 中，mutation 都是同步事务：

**mapMutations**：将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

```
methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
```

## Action(在 store 中定义，可以处理异步操作，通过 store.dispatch 方法触发)

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

```
actions: {
    increment (context) {
      context.commit('increment')
    }
    increment ({ commit }) {  //用参数结构的缩写形式，一看也就是省去context
        commit('increment')
    }
  }
```

**mapActions**： 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）

```
methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
```

mutation 和 action 的区别：mutation 必须同步执行，action 可以异步执行

## 自己考虑开发思路

因为现在没有用 module，我再加一个上去可以吗？
先确定几个 state，再写对于 state 的处理，对于各种动作加上触发动作。
比如什么：

先熟悉函数写法，然后分析动作。
比如更新一个数据源，可以用 vuex。
自己创建一个 store，在全局中引入，可以在单个 vue 文件中引入吗？（这样会导致文件太大吗？）。询问这些大牛来确定写法风格。
根级别的直接写在 store 下面，modules 中的单个文件包含 mutations、action、state、getter

注意确定 module 名，然后在引用 module 中的函数或者状态时，可以缩写，具体看文档。
registerModule 是在哪里执行

拿小程序 CMS 考虑逻辑：更新 answers 值。
更新动作的几个地方：

- 筛选、点评、回复、刚进入从后台请求页面
-

Module：dispatch

state:answers
getter:处理值
