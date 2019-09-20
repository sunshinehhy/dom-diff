https://blog.csdn.net/sexy_squirrel/article/details/79801940
https://segmentfault.com/a/1190000010686582  （详细解释）

https://github.com/livoras/blog/issues/13 （深剖算法）

## diff算法有如下三个策略：

1. DOM节点跨层级的移动操作发生频率很低，是次要矛盾；
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构，这里也是抓前者放后者的思想；
3. 对于同一层级的一组子节点，通过唯一id进行区分，即没事就warn的key。

基于各自的前提策略，React也分别进行了算法优化，来保证整体界面构建的性能。

当`发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较`。这样只需要对树进行一次遍历，便能完成整个DOM树的比较。由此一来，最直接的提升就是复杂度变为`线型增长`而不是原先的指数增长。(`不做跨层级的操作`))

尽量`只对变化的部分进行实际的浏览器的DOM更新，而不是直接重新渲染整个DOM树`，从而达到提高性能的目的。

INSERT_MARKUP，`新的component类型(nextChildren里的)不在老集合(prevChildren)里`，即是全新的节点，需要对新节点执行`插入`操作；

MOVE_EXISTING，在`老集合有新component类型`，且`element是可更新的类型`，这种情况下prevChild===nextChild，就需要做移动操作，可以复用以前的DOM节点。

REMOVE_NODE，老component类型在`新集合里也有`，但对应的`element不同则不能直接复用和更新` （我的理解：component相同，但是子标签不一样，比如有判断条件插入不同的子标签），需要执行删除操作；或者`老component不在新集合里的，也需要执行删除操作`。

**component diff组件间的比较**

React应用是基于组件构建的，对于组件的比较优化侧重于以下几点：  
1. 同一类型组件遵从tree diff比较v-dom树
2. `不同类型组件，先将该组件归类为dirty component`，替换下整个组件下的所有子节点
3. 同一类型组件Virtual Dom没有变化，React允许开发者使用shouldComponentUpdate（）来判断该组件是否进行diff，运用得当可以节省diff计算时间，提升性能

**元素间的比较**
nextChild 是新集合的键值
prevChild 是旧集合的键值
for(name in nextChildren)遍历来比较
lastIndex是prevChildren访问的最后指引，表示访问过的节点在老集合中最右的位置（即最大的位置）
nextIndex在nextChildren对于每个child将增加
nextMountIndex将对于每个新装载的child增加

因为child._mountIndex<lastIndex，意味着因为child的装载index在访问过的节点在老集合中最右的位置（lastIndex）的左边，符合enqueue移动操作



当完成新集合所有节点中的`差异对比后`，`对旧集合进行遍历`，`判读旧集合中是否存在新集合中不存在的节点`，此时发现D节点符合判断，执行删除D节点的操作，diff操作完成。`整体上看，是先创建，后删除的方式`。

## 总结  优化建议
1. 通过diff策略，将算法从O(n^3)简化为O(n)

2. `分层求异`，对tree diff进行优化

3. 分组件求异，相同类生成相似树形结构、不同类生成不同树形结构，对component diff进行优化

4. `设置key`，对element diff进行优化

5. 尽量`保持稳定的DOM结构、避免将最后一个节点移动到列表首部`、避免节点数量过大或更新过于频繁

在开发过程中，`同层级的节点添加唯一key值可以极大提升性能`，`尽量减少将最后一个节点移动到列表首部的操作`，当节点达到一定的数量以后或者操作过于频繁，在一定程度上会影响React的渲染性能。比如大量节点拖拽排序的问题。


总之，React为我们提供优秀的diff算法，使我们能够在实际开发中happy的撸代码，但也不是说可以“随意”去构建我们的应用，根据diff的特点，在具体场景中取长补短，规避一些算法上面的短板也是有利于提升应用整体的性能。

每次调用 setState 会重新计算整个子树.如果你想要提高性能, `尽量少调用 setState,还有用 shouldComponentUpdate 减少大的子树的重新计算`.
## 我的理解
用key来建立新旧组件之间的关系。
diff算法：React 只会匹配相同 class 的 component.
