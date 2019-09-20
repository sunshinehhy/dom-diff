https://www.jianshu.com/p/203b91a77174

https://reactnative.cn/docs/0.51/getting-started.html

https://blog.csdn.net/qq_32014215/article/details/56844927

使用React Native，你`可以使用标准的平台组件`，例如iOS的UITabBar或安卓的Drawer。 这使你的app获得平台一致的视觉效果和体验，并且获得最佳的性能和流畅性。`使用对应的React component`，就可以轻松地`把这些原生组件整合到你的React Native`应用中， 例如TabBarIOS和DrawerLayoutAndroid。

## 把React Native组件集成到Android应用中有如下几个主要步骤：

1. 首先当然要了解你要集成的React Native组件。
2. 在Android项目根目录中使用npm来安装react-native ，这样同时会创建一个node_modules/的目录。
3. 创建js文件，编写React Native组件的js代码。
4. 在build.gradle文件中添加com.facebook.react:react-native:+，以及一个指向node_nodules/目录中的react-native预编译库的maven路径。
5. 创建一个React Native专属的Activity，在其中再创建ReactRootView。
6. 启动React Native的Packager服务，运行应用。
7. 根据需要添加更多React Native的组件。
8. 在真机上运行、调试。
9. 打包。

## 通讯
通过RCTRootView的初始化函数你可以将任意属性传递给React Native应用.

RCTRootView是一个UIView容器，承载着React Native应用。

initialProperties：必须是NSDictionary的一个实例。这一字典参数会在内部被转化为一个可供JS组件调用的JSON对象。

appProperties：可读写的属性。应用将会根据新的属性重新渲染。当然，只有在新属性和之前的属性有区别时更新才会被触发。

内部通信（在JS和RN的原生层之间），
外部通信（在RN和纯原生部分之间）。

在原生代码中我们使用`事件机制`来调度JS中的处理函数，
而在React Native中我们直接`使用原生模块导出`的方法。