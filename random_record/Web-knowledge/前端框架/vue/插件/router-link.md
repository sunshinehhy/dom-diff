被激活链接的class
 active-class（链接激活时使用的 CSS 类名）

 // 默认 router-link-active
const activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
激活链接class取值顺序如上

如果能匹配到路由，链接激活的class值用activeClass

如果tag会为a，增加href属性；如果没有设置tag，会找到slot中第一个 <a> 给予这个元素事件绑定和href属性；啥都不设置会给默认为a，并添加href属性。


router-link 组件就是在其点击的时候根据设置的 to 的值去调用 router 的 push 或者 replace 来更新路由的，同时呢，会检查自身是否和当前路由匹配（严格匹配和包含匹配）来决定自身的 activeClass 是否添加