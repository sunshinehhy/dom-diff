https://blog.csdn.net/fengyuzhengfan/article/details/52704341

https://blog.csdn.net/qq_32014215/article/details/56844927  (React Native 与原生之间的通信(iOS))

https://reactnative.cn/docs/0.51/communication-ios.html#content  (通讯)

如果一个祖先组件需要自己子孙的状态，`推荐的方法是传递一个回调函数给对应的子元素。`

React Native用RCTConvert来在JavaScript和原生代码之间完成类型转换。

原生给JS传数据，主要依靠属性。
通过`initialProperties，这个RCTRootView的初始化函数的参数`来完成。
RCTRootView还有一个appProperties属性，修改这个属性，JS端会调用相应的渲染方法。

RCTRootView`将React Natvie视图封装到原生组件中`。RCTRootView`是一个UIView容器`，承载着React Native应用。同时它也`提供了一个联通原生端和被托管端的接口`。

你可以随时更新属性，但是更新必须在主线程中进行，读取则可以在任何线程中进行。

我的理解：这里说的原生组件是ios本身自带的组件

## 从原生组件`传递属性`到React Native（原生->rn）
通过RCTRootView的初始化函数你可以`将任意属性传递给React Native应用`。`参数initialProperties必须是NSDictionary的一个实例`。这一字典参数会`在内部``被转化`为一个可供JS组件调用的`JSON对象`。
```
原生代码：
NSArray *imageList = @[@"http://foo.com/bar1.png",
                  @"http://foo.com/bar2.png"];

NSDictionary *props = @{@"images" : imageList};

RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                      moduleName:@"ImageBrowserApp"
                                     initialProperties:props];
```

```
js处理代码：

定义ImageBrowserApp组件，可以从原生中获取属性this.props.images

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image,
} from 'react-native';

class ImageBrowserApp extends Component {
  renderImage(imgURI) {
    return (
      <Image source={{uri: imgURI}} />
    );
  }
  render() {
    return (
      <View>
        {this.props.images.map(this.renderImage)}
      </View>
    );
  }
}

AppRegistry.registerComponent('ImageBrowserApp', () => ImageBrowserApp);
```
## 从原生组件`更新属性`到React Native（原生->rn）
RCTRootView同样提供了一个`可读写的属性appProperties`。
`appProperties`设置之后，React Native应用将会根据新的属性`重新渲染`。当然，只有在新属性和之前的属性有区别时更新才会被触发。

你可以随时更新属性，但是`更新必须在主线程中`进行，读取则可以在任何线程中进行。
```
NSArray *imageList = @[@"http://foo.com/bar3.png",
                   @"http://foo.com/bar4.png"];
rootView.appProperties = @{@"images" : imageList};
```

更新属性时并不能做到只更新一部分属性。我们建议你自己封装一个函数来构造属性。

注意：目前，最顶层的RN组件（即registerComponent方法中调用的那个）的componentWillReceiveProps和componentWillUpdateProps方法在`属性更新后不会触发`。但是，你可以通过componentWillMount`访问新的属性值`。

## 从React Native传递属性到原生组件（rn->原生）

在你`自定义的原生组件`中通过`RCT_CUSTOM_VIEW_PROPERTY宏导出属性`，就`可以直接在React Native中使用`，就好像它们是普通的React Native组件一样。


## 原生模块
- 原生模块是JS中也可以使用的Objective-C类。
- 每一个`模块的实例`都是在每一次`通过JS bridge通信时创建`的。他们`可以导出任意的函数和常量`给React Native。
- `原生模块同样可以暴露已有的原生库给JS`，地理定位库就是一个现成的例子。
- 警告：所有原生模块共享同一个命名空间。`创建新模块时注意命名冲突`。
- 在React Native中，一个“原生模块”就是一个实现了“RCTBridgeModule”协议的Objective-C类
- 你必须明确的声明要给Javascript导出的方法，否则React Native不会导出任何方法。

### **React Native定义的宏：**

RCT_REMAP_METHOD()  可以指定Javascript方法名
RCT_EXPORT_METHOD() 要给Javascript导出的方法,支持所有标准JSON类型

### RCT_EXPORT_METHOD 支持所有标准JSON类型，包括：

- string (NSString)
- number (NSInteger, float, double, CGFloat, NSNumber)
- boolean (BOOL, NSNumber)
- array (NSArray) 包含本列表中任意类型
- object (NSDictionary) 包含string类型的键和本列表中任意类型的值
- function (RCTResponseSenderBlock)
除此以外，`任何RCTConvert类支持的的类型`也都可以使用(参见RCTConvert了解更多信息)。RCTConvert还提供了一系列辅助函数，用来接收一个JSON值并转换到原生Objective-C类型或类。

### 特殊参数类型处理（Date对象）
在我们的CalendarManager例子里，我们需要把事件的时间交给原生方法。我们`不能在桥接通道里传递Date`对象，所以需要把日期`转化成字符串或数字`来传递。我们可以这么实现原生函数：
```
RCT_EXPORT_METHOD(testDateEventOne:(NSString *)name forSomething:(NSString *)thing data:(NSNumber*)secondsSinceUnixEpoch)
{
  NSDate *date = [RCTConvert NSDate:secondsSinceUnixEpoch];
}
```
### dictionary参数
参数的个数越来越多，其中有一些可能是可选的参数。在这种情况下我们应该考虑修改我们的API，用一个dictionary来存放所有的事件参数.

```
//  对外提供调用方法,为了演示事件传入属性字段
// 使用了RCTConvert
RCT_EXPORT_METHOD(testDictionaryEvent:(NSString *)name details:(NSDictionary *) dictionary)
{
    NSString *location = [RCTConvert NSString:dictionary[@"thing"]];
    NSDate *time = [RCTConvert NSDate:dictionary[@"time"]];
    NSString *description=[RCTConvert NSString:dictionary[@"description"]];

    NSString *info = [NSString stringWithFormat:@"Test: %@\nFor: %@\nTestTime: %@\nDescription: %@",name,location,time,description];
    NSLog(@"%@", info);
}
```
```
然后在JS里这样调用：

CalendarManager.testDictionaryEvent('调用addEventMoreDetails方法', {
              thing:'测试字典（字段）格式',
              time:date.getTime(),
              description:'就是这么简单~'
            })
```

### 回调函数
原生模块还支持一种特殊的参数——回调函数。它提供了一个函数来把返回值传回给JavaScript。

### Promises
原生模块还可以使用promise来简化代码，搭配ES2016(ES7)标准的`async/await`语法则效果更佳。如果桥接原生方法的最后`两个参数是RCTPromiseResolveBlock和RCTPromiseRejectBlock`，则对应的`JS方法就会返回一个Promise对象`。
```
//  对外提供调用方法,演示Promise使用
RCT_REMAP_METHOD(testPromiseEvent,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    NSArray *events =@[@"Promise ",@"test ",@" array"];
    if (events) {
        resolve(events);
    } else {
        NSError *error=[NSError errorWithDomain:@"我是Promise回调错误信息..." code:101 userInfo:nil];
        reject(@"no_events", @"There were no events", error);
    }
}
```

### 多线程(此部分可看网站解释)
原生模块`不应对`自己被调用时所处的`线程做任何假设`。React Native在一个`独立的串行GCD队列中调用原生模块的方法`，但这属于实现的细节，并且可能会在将来的版本中改变。

通过实现方法- (dispatch_queue_t)methodQueue，原生模块`可以指定自己想在哪个队列中被执行`。

这里有一点需要注意，若是要对原生的UI进行操作，则必须在主线程中进行。

### 导出常量
原生模块可以导出一些常量，这些常量在`JavaScript端随时都可以访问`。用这种方法来传递一些静态数据，可以避免通过bridge进行一次来回交互。
```
- (NSDictionary *)constantsToExport
{
  return @{ @"firstDayOfTheWeek": @"Monday" };
}
```
Javascript端可以随时同步地访问这个数据：
```
console.log(CalendarManager.firstDayOfTheWeek);
```
但是注意这个常量`仅仅在初始化的时候导出了一次`，所以`即使你在运行期间改变constantToExport返回的值`，也`不会影响到JavaScript环境下所得到的结果`。

### 枚举常量
用NS_ENUM定义的枚举类型必须要先扩展对应的`RCTConvert方法`才可以作为函数参数传递。

### 给Javascript发送事件
即使没有被JavaScript调用，`本地模块也可以给JavaScript发送事件通知`。最直接的方式是使用eventDispatcher:

### 从Swift导出
Swift不支持宏，所以从Swift向React Native导出类和函数需要多做一些设置，但是大致与Objective-C是相同的。
```
// CalendarManager.swift

@objc(CalendarManager)
class CalendarManager: NSObject {

  @objc func addEvent(name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
  }

}
```
注意: 你必须`使用@objc标记来确保类和函数对Objective-C公开`。
接着，创建一个私有的实现文件，并将必要的信息注册到React Native中。