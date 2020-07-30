如何使用BEM
一个独立的（语义上或视觉上），可以复用而不依赖其它组件的部分，可作为一个块（Block）
属于块的某部分，可作为一个元素（Element）
用于修饰块或元素，体现出外形行为状态等特征的，可作为一个修饰器（Modifier）
 

在本规范中，以双下划线 __ 来作为块和元素的间隔，以单下划线 _ 来作为块和修饰器 或 元素和修饰器 的间隔，以中划线 - 来作为 块|元素|修饰器 名称中多个单词的间隔

保证各个部分只有一级 B__E_M  ，修饰器需要和对应的块或元素一起使用，避免单独使用


search-form__button search-form__button_hover

search-form__button-set search-form__button-set_hover