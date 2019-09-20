什么是 MVVM 模式？:http://blog.csdn.net/binglan520/article/details/71107807

1. 对应到 iOS 开发中，View 约等于 Storyboard，Controller 就是 ViewController，Model 的话是需要我们自己去创建的一些实体（Entity）Class。
2. 对应到 Android 开发中，View 约等于 Layout 中的 xml ，Controller 就是 Activity，Model 同上。
3. 对应到 React-Native 开发中，View 约等于 Component 中的 render 函数部分，Controller 就是整个 Component，Model 同上。

因为绑定关系的存在，ViewModel 变成啥样，界面就会自动变成啥样。
当任何外部事件发生时，永远只操作 ViewModel 中的数据。
MVVM：
 MVC 中的 C，其实一直都默默的存在着，只是变得弱化了，一定要完整的讲的话，那就是 Model-View-Controler-ViewModel 模式。只有在理想的双向绑定模式下，Controller 才会完全的消失。

 我的理解：C直接控制操作viewModel，不能引用M，viewModel 引用M，相当于MVC中写在C中的逻辑变成写在viewModel中，操作model与view的关系，C是触发动作，调用viewModel中的函数。

- 数据绑定和动态变化这都是由`具体的 MVVM 平台或者框架`来实现的，跟 MVVM 模式没有直接关系。
- 开发者在代码或者配置文件中设定 ViewModel 和 View 的映射关系。
- “上帝之手”在整个软件的运行过程中监控 ViewModel，自动变化这一切。

  Android 平台下的 MVVM 模式是在框架代码和 IDE 工具的辅助下，来实现了整个工作机制。

http://www.cocoachina.com/ios/20170612/19500.html

  在 iOS 开发中，MVC（Model-View-Controller）是构建iOSApp的标准模式，是苹果推荐的一个用来组织代码的权威范式

### MVC缺点:
- 厚重的ViewController

- 遗失的网络逻辑（无立足之地）

- 较差的可测试性

在MVVM 中，view 和 view controller正式联系在一起，我们把它们视为一个组件

view 和 view controller 都不能直接引用model，而是引用视图模型（viewModel）

viewModel 是一个放置用户输入验证逻辑，视图显示逻辑，发起网络请求和其他代码的地方

### MVVM 的注意事项

view 引用viewModel ，但反过来不行（即不要在viewModel中引入#import UIKit.h，任何视图本身的引用都不应该放在viewModel中）（PS：基本要求，必须满足）

viewModel 引用model，但反过来不行

### MVVM 的使用建议

- MVVM 可以兼容你当下使用的MVC架构。

- MVVM 增加你的应用的可测试性。

- MVVM 配合一个绑定机制效果最好（PS：ReactiveCocoa你值得拥有）。

- viewController 尽量不涉及业务逻辑，让 viewModel 去做这些事情。

- viewController 只是一个中间人，接收 view 的事件、调用 viewModel 的方法、响应 viewModel 的变化。

- viewModel 绝对不能包含视图 view（UIKit.h），不然就跟 view 产生了耦合，不方便复用和测试。

- viewModel之间可以有依赖。

- viewModel避免过于臃肿，否则重蹈Controller的覆辙，变得难以维护。

### MVVM 的优势

- 低耦合：View 可以独立于Model变化和修改，一个 viewModel 可以绑定到不同的 View 上

- 可重用性：可以把一些视图逻辑放在一个 viewModel里面，让很多 view 重用这段视图逻辑

- 独立开发：开发人员可以专注于业务逻辑和数据的开发 viewModel，设计人员可以专注于页面设计

- 可测试：通常界面是比较难于测试的，而 MVVM 模式可以针对 viewModel来进行测试

### MVVM 的弊端

- 数据绑定使得Bug 很难被调试。你看到界面异常了，有可能是你 View 的代码有 Bug，也可能是 Model 的代码有问题。数据绑定使得一个位置的 Bug 被快速传递到别的位置，要定位原始出问题的地方就变得不那么容易了。

- 对于过大的项目，数据绑定和数据转化需要花费更多的内存（成本）。主要成本在于：

- 数组内容的转化成本较高：数组里面每项都要转化成Item对象，如果Item对象中还有类似数组，就很头疼。

- 转化之后的数据在大部分情况是不能直接被展示的，为了能够被展示，还需要第二次转化。

- 只有在API返回的数据高度标准化时，这些对象原型（Item）的可复用程度才高，否则容易出现类型爆炸，提高维护成本。

- 调试时通过对象原型查看数据内容不如直接通过NSDictionary/NSArray直观。

- 同一API的数据被不同View展示时，难以控制数据转化的代码，它们有可能会散落在任何需要的地方。

### 前端MVC
https://baike.baidu.com/item/MVC%E6%A1%86%E6%9E%B6/9241230?fr=aladdin

C存在的目的则是确保M和V的同步，一旦M改变，V应该同步更新。

Model（模型）表示应用程序核心（比如数据库记录列表）。
View（视图）显示数据（数据库记录）。
Controller（控制器）处理输入（写入数据库记录）。

MVC 模式同时提供了对 HTML、CSS 和 JavaScript 的完全控制。
公司后台PHP使用的框架：
Model（模型）是应用程序中用于处理应用程序数据逻辑的部分。
　　通常模型对象负责在数据库中存取数据。
模型表示企业数据和业务规则。在MVC的三个部件中，模型拥有最多的处理任务。这样一个模型能为多个视图提供数据，由于应用于模型的代码只需写一次就可以被多个视图重用，所以减少了代码的重复性。
View（视图）是应用程序中处理数据显示的部分。
　　通常视图是依据模型数据创建的。
Controller（控制器）是应用程序中处理用户交互的部分。
　　通常控制器负责从视图读取数据，控制用户输入，并向模型发送数据（调用M中函数）；
	控制器接受用户的输入并调用模型和视图去完成用户的需求，所以当单击Web页面中的超链接和发送HTML表单时，控制器本身不输出任何东西和做任何处理。它只是接收请求并决定调用哪个模型构件去处理请求，然后`再确定用哪个视图来显示返回的数据`。

前端没有数据库呢？

对输入数据、界面动作，在C中控制，并且C调用M中的函数，M中写了复用函数（接口函数），C操控V的数据变化，V应该是在C中更新M的中数据，然后显示到V中。我开发的ios是在C中更新M中的数据。

### 浅谈MVC、MVP、MVVM架构模式的区别和联系
一、MVC（Model-View-Controller）
MVC是比较直观的架构模式，用户操作->View（负责接收用户的输入操作）->Controller（业务逻辑处理）->Model（数据持久化）->View（将结果反馈给View）。

MVC使用非常广泛，比如JavaEE中的SSH框架（Struts/Spring/Hibernate），Struts（View, STL）-Spring（Controller, Ioc、Spring MVC）-Hibernate（Model, ORM）以及ASP.NET中的ASP.NET MVC框架，xxx.cshtml-xxxcontroller-xxxmodel。（实际上后端开发过程中是v-c-m-c-v，v和m并没有关系）

二、MVP（Model-View-Presenter）
MVP是把MVC中的Controller换成了Presenter（呈现），目的就是为了完全切断View跟Model之间的联系，由Presenter充当桥梁，做到View-Model之间通信的完全隔离。

.NET程序员熟知的ASP.NET webform、winform基于事件驱动的开发技术就是使用的MVP模式。控件组成的页面充当View，实体数据库操作充当Model，而View和Model之间的控件数据绑定操作则属于Presenter。控件事件的处理可以通过自定义的IView接口实现，而View和IView都将对Presenter负责。

三、MVVM（Model-View-ViewModel）
如果说MVP是对MVC的进一步改进，那么MVVM则是思想的完全变革。它是将“数据模型数据双向绑定”的思想作为核心，因此在View和Model之间没有联系，通过ViewModel进行交互，而且Model和ViewModel之间的交互是`双向的`，因此视图的数据的变化会同时修改数据源，而数据源数据的变化也会立即反应到View上。

这方面典型的应用有.NET的WPF，js框架Knockout、AngularJS等。
