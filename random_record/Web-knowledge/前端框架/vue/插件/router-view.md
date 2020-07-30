```
export default {
  name: 'router-view',
  functional: true, // 功能组件 纯粹渲染
  props: {
    name: {
      type: String,
      default: 'default' // 默认default 默认命名视图的name
    }
  },
  render (h, { props, children, parent, data }) {
    // 解决嵌套深度问题
    data.routerView = true
    // route 对象
    const route = parent.$route
    // 缓存
    const cache = parent._routerViewCache || (parent._routerViewCache = {})
    let depth = 0
    let inactive = false
    // 当前组件的深度
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++
      }
      处理 keepalive 逻辑
      if (parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }

    data.routerViewDepth = depth
    // 得到相匹配的当前组件层级的 路由记录
    const matched = route.matched[depth]
    if (!matched) {
      return h()
    }
    // 得到要渲染组件
    const name = props.name
    const component = inactive
      ? cache[name]
      : (cache[name] = matched.components[name])

    if (!inactive) {
      // 非 keepalive 模式下 每次都需要设置钩子
      // 进而更新（赋值&销毁）匹配了的实例元素
      const hooks = data.hook || (data.hook = {})
      hooks.init = vnode => {
        matched.instances[name] = vnode.child
      }
      hooks.prepatch = (oldVnode, vnode) => {
        matched.instances[name] = vnode.child
      }
      hooks.destroy = vnode => {
        if (matched.instances[name] === vnode.child) {
          matched.instances[name] = undefined
        }
      }
    }
    // 调用 createElement 函数 渲染匹配的组件
    return h(component, data, children)
  }
}
```

拿到匹配的组件进行渲染就可以了

如果keep-live走缓存


// 得到相匹配的当前组件层级的 路由记录
    const matched = route.matched[depth]  什么意思？

