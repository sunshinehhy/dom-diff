import WebKit

## 原生中调用js
override func loadView() {
        super.loadView()
}
在重写loadView函数中配置：
```
let config = WKWebViewConfiguration()

// MARK: Tell the web view what kind of connection the user is currently on
let contentController = WKUserContentController();
if let type = dataObject?.type {
    //获取js代码
    let jsCode: String
    if type == "video" && dataObject?.isLandingPage == true {
        jsCode = JSCodes.get(JSCodes.autoPlayVideoType)
    } else if type == "interactive" && dataObject?.eaudio != nil {
        jsCode = JSCodes.get(JSCodes.englishAudioType)
    } else {
        jsCode = JSCodes.get(type)
    }
    //把js代码传入给WKUserScript
    let userScript = WKUserScript(
        source: jsCode,
        injectionTime: WKUserScriptInjectionTime.atDocumentEnd,
        forMainFrameOnly: true
    )
    //contentController中添加userScript，意味着把js代码加入到contentController
    contentController.addUserScript(userScript)

    //把config加入到WKWebView
    webView = WKWebView(frame: self.view.bounds, configuration: config)
}
// MARK: This is Very Important! Use LeadAvoider so that ARC kicks in correctly.
contentController.add(LeakAvoider(delegate:self), name: "alert")
contentController.add(LeakAvoider(delegate:self), name: "listen")
config.userContentController = contentController  //contentController赋值给webview配置
config.allowsInlineMediaPlayback = true
```

## 在JS中的使用方法：
window.webkit.messageHandlers.<name>.postMessage(<messageBody>)
```
//其中<name>，就是上面方法里的第二个参数`name`。
//例如我们调用API的时候第二个参数填@"Share"，那么在JS里就是:
//window.webkit.messageHandlers.Share.postMessage(<messageBody>)
//<messageBody>是一个键值对，键是body，值可以有多种类型的参数。
// 在`WKScriptMessageHandler`协议中，我们可以看到mssage是`WKScriptMessage`类型，有一个属性叫body。
// 而注释里写明了body 的类型：
Allowed types are NSNumber, NSString, NSDate, NSArray, NSDictionary, and NSNull.
```

```
extension SuperContentItemViewController: WKScriptMessageHandler {
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if let body = message.body as? [String: String] {
            switch message.name {
            case "alert":
                if let title = body["title"], let lead = body["message"] {
                    Alert.present(title, message: lead)
                }
            case "listen":
            if let audioUrlString = body["audio"] {
                print ("should do something to call out the audio view for this url: \(audioUrlString)")
                PlayerAPI.sharedInstance.getSingletonItem(item: dataObject)
                PlayerAPI.sharedInstance.openPlay()
            }
            default:
                break
            }
        }
    }
}
```
```
 function listenFun(ele) {
    var message = {
        'audio': ele.src
    };
    webkit.messageHandlers.listen.postMessage(message);
}
listen对应userContentController函数中第二个参数message.name；
message是一个对象，传过去，userContentController函数中通过body = message.body可以获取到此对象；
然后就可以把js中的东西传给原生，原生可以调用此对象。
```

## WKScriptMessageHandler
A class conforming to the WKScriptMessageHandler protocol provides a method for receiving messages from JavaScript running in a webpage.
符合WKScriptMessageHandler协议的类提供了一种从网页中运行的JavaScript中接收消息的方法。
```
class LeakAvoider: NSObject, WKScriptMessageHandler {
    weak var delegate : WKScriptMessageHandler?
    init(delegate:WKScriptMessageHandler) {
        self.delegate = delegate
        super.init()
    }
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        self.delegate?.userContentController(userContentController, didReceive: message)
    }
}

userContentController函数 功能：  当从网页收到脚本消息时调用。
参数
userContentController：调用委托方法的用户内容控制器。
message：脚本收到的消息。
```

## func add(_ scriptMessageHandler: WKScriptMessageHandler, name: String)
scriptMessageHandler：The message handler to add.（增加消息处理）

name：The name of the message handler.（消息处理的名称）