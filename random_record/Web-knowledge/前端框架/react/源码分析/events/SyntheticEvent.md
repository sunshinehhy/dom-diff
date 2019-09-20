调度时设置currentTarget;在这里复制也没用。

合成事件由事件插件分派，通常是响应顶级事件授权处理程序。
这些系统通常应该`使用池来减少垃圾收集的频率`。系统应该检查“isPersistent”，确定事件是否应该在发送后释放到池中。需要持久化事件的用户应该调用“persist”。合成事件(和子类)通过规范化浏览器怪癖实现DOM Level 3 events API。子类不一定要实现DOM接口;自定义特定于应用程序的事件也可以对其进行子类化。

* @param {object}用于分派此事件的分派配置。
* @param {* *} targetInst标记标识事件目标。
* @param {object} nativeEvent本机浏览器事件。
* @param {DOMEventTarget} nativeEventTarget目标节点。

persist：我们在每个事件循环之后释放所有发送的“SyntheticEvent”，将它们添加回池中。这允许方法去保留没添加回池中的引用。

isPersistent：检查这个事件是否应该释放回池中。

destructor：“PooledClass”在其释放的每个实例上查找“析构函数”。

在SyntheticEvent上设置所有内容后进行代理，以解决某些WebKit浏览器上的代理问题，其中一些事件属性被设置为未定义(GH#10010)