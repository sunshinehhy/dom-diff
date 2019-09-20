https://www.cnblogs.com/whitewolf/p/4581254.html

MVC设计模式
M - Model  数据：数据实体,用来保存页面要展示的数据.
V - View      视图：负责显示数据的,一般其实就是指的html页面.
C - Controller 控制器： 控制整个业务逻辑,负责处理数据,比如数据的获取,以及数据的过滤，进而影响数据在视图上的展示.
MVVM设计模式
M - Model 数据：它是与应用程序的业务逻辑相关的数据的封装载体
V - View 视图：它专注于界面的显示和渲染
VM - ViewModel 视图-数据：它是View和Model的粘合体，`负责View和Model的交互和协作`

Angular是MVC还是MVVM?
MVC的界面和逻辑关联紧密，数据直接从数据库读取。MVVM的界面与viewmodel是松耦合，`界面数据从viewmodel中获取`。所以angularjs更倾向于mvvm。

MVVM的优点
低耦合：View可以独立于Model变化和修改，同一个ViewModel可以被多个View复用；并且可以做到View和Model的变化互不影响；

可重用性：可以把一些视图的逻辑放在ViewModel，让多个View复用；

独立开发：开发人员可以专注与业务逻辑和数据的开发 
ViewModemvvm设计人员可以专注于UI(View)的设计；

可测试性：清晰的View分层，使得针对表现层业务逻辑的测试更容易，更简单。

Angular在MVVM中的体现
Model：在web页面中，大部分Model都是来自Ajax的服务端返回数据或者是全局的配置对象；而angular中的service则是封装和处理这些与Model相关的业务逻辑的场所，这类的业务服务是可以被多个Controller或者其他service复用的领域服务。
View：在angular中是html里面包含一堆声明式Directive的视图模板。

ViewModel：负责给View提供显示的数据，以及提供了View中Command事件操作Model的途径；在angular中$scope对象充当了这个ViewModel的角色；controller负责ViewModel对象的初始化，它将组合一个或者多个service来获取业务领域Model放在ViewModel对象上，使得应用界面在启动加载的时候达到一种可用的状态