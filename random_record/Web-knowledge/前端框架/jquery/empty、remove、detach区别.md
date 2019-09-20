remove():`从DOM中删除所有匹配的元素`。这个方法`不会把匹配的元素从jQuery对象中删除`，因而可以在将来再使用这些匹配的元素。但`除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除`。

被移除的元素所绑定的事件及数据是否也被移除
detach 否
remove 是
empty 是

元素自身是否被移除

detach 是（无参数时），有参数时要根据参数所涉及的范围。
remove 是（无参数时），有参数时要根据参数所涉及的范围。
empty 否

参数
empty 无

detach和remove 选择器表达式，比如remove(“.class”);remove(“#id”);remove(“tag”):