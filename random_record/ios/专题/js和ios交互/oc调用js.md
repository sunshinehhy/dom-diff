import WebKit

## func evaluateJavaScript(_ javaScriptString: String, completionHandler: ((Any?, Error?) -> Void)? = nil)

- 作用：

Evaluates a JavaScript string. 计算一个JavaScript字符串。

The method sends the result of the script evaluation (or an error) to the completion handler. The completion handler always runs on the main thread.
评估一个JavaScript字符串。
该方法将脚本评估(或错误)的结果发送到完成处理程序。completionHandler总是`在主线程上运行`。

- 参数：

javaScriptString：The JavaScript string to evaluate.（要计算的JavaScript字符串。）
completionHandler：A block to invoke when script evaluation completes or fails.
（在js脚本评估完成或失败时调用的块。）

比如：
```
self.webView?.evaluateJavaScript(jsCode) { (result, error) in
    if error != nil {
        print ("something is wrong with js code in content item view controller: \(String(describing: error))")
    } else {
        print ("js code is executed successfully! ")
    }
}
```
```
获取jsCode举例代码：
Connection.current()就可以传入ios中的参数

let jsCode = "\(nightModeCode)window.gConnectionType = '\(Connection.current())';playVideoOnWifi();"

或者
let jsCode = "\(nightModeCode)window.gConnectionType = '\(Connection.current())';var ebody = document.getElementById('speedread-article').innerHTML;webkit.messageHandlers.ebody.postMessage({ebody: ebody});"

jsCode += "for (var j=0; j<hiddenEles.length; j++) {hiddenEles[j].style.display = 'none';}"
```
## 使用MessageHandler 的好处
1. 在JS中`写起来简单，不用再用创建URL的方式`那么麻烦了。
2. JS`传递参数更方便`。使用拦截URL的方式传递参数，只能把参数拼接在后面，`如果遇到要传递的参数中有特殊字符，如&、=、？等，必须得转换`，否则参数解析肯定会出错。 

例如传递的url是这样的: 
http://www.baidu.com/share/openShare.htm?share_uuid=shdfxdfdsfsdf&name=1234556 

使用拦截URL 的JS调用方式:
loadURL("haleyAction://shareClick?title=分享的标题&content=分享的内容&url=链接地址&imagePath=图片地址"); }

将上面的url 放入链接地址这里后，根本无法区分share_uuid是其他参数，还是url里附带的参数。 
但是使用MessageHandler 就可以避免特殊字符引起的问题。

