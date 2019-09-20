从原生代码调用React Natvie函数（事件）

通过事件，这里讲述了事件

在React Native中嵌入原生组件时，通常的做法是用原生组件的RCTViewManager作为视图的代理，`通过bridge向JS发送事件`。这样可以`集中在一处调用相关的事件。`

原生视图都需要被一个RCTViewManager的子类来创建和管理。
这些管理器在功能上有些类似“视图控制器”，但它们本质上`都是单例` - React Native只会为每个管理器创建一个实例。它们创建原生的视图并提供给RCTUIManager，RCTUIManager则会反过来委托它们在需要的时候去设置和更新视图的属性。RCTViewManager还会代理视图的所有委托，并给JavaScript发回对应的事件。

## 提供原生视图很简单：

1. 首先创建一个子类
2. 添加RCT_EXPORT_MODULE()标记宏
3. 实现-(UIView \*)view方法


转换函数被设计为可以安全的处理任何JS扔过来的JSON

## 事件

关键的步骤是在RNTMapManager中声明一个事件处理函数的属性（onChange），来委托我们提供的所有视图，然后把事件传递给JavaScript。

## 样式
DatePickerIOS实现这个功能的办法是通过封装一个拥有弹性样式的额外视图，然后在内层的视图上应用一个固定样式（通过原生传递来的常数生成）