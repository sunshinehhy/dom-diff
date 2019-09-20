## UIApplication.shared.openURL(url)
Attempts to open the resource at the specified URL.
The URL you pass to this method can identify a resource in the app that calls the method, or a resource to be handled by another app. If the resource is to be handled another app, invoking this method might cause the calling app to quit so the other can launch.
尝试打开指定URL中的资源。
在调用该方法的app中，传递给这个方法的URL可以识别资源,或由另一个app处理的资源。如果资源在另一个app处理,调用这个方法可能会导致调用app退出，其他可以启动。

To check if there is an installed app that can handle a scheme, call the canOpenURL(_:) method before calling this one. Be sure to read the description of that method for an important note about registering the schemes you want to employ.
`要检查是否有一个安装的app可以处理a scheme`，调用这个方法之前调用canOpenURL(_:)方法。请务必阅读该方法的描述，以获得关于注册您想要使用的计划的重要说明。

openLink

```
// MARK: Handle links here
extension SuperDataViewController: WKNavigationDelegate {
    func webView(_ webView: WKWebView, decidePolicyFor navigationAction: WKNavigationAction, decisionHandler: (@escaping (WKNavigationActionPolicy) -> Void)) {
        if let url = navigationAction.request.url {
            let urlString = url.absoluteString
            if navigationAction.navigationType == .linkActivated{
                if urlString.range(of: "mailto:") != nil{
                    UIApplication.shared.openURL(url)
                } else {
                    openLink(url)
                }
                decisionHandler(.cancel)
            }  else {
                decisionHandler(.allow)
            }
        }
    }
}
```

```
extension UIViewController: SFSafariViewControllerDelegate {
    // MARK: Handle All the Recogizable Links Here
    func openLink(_ url: URL) {
        if let urlScheme = url.scheme {
            switch urlScheme {
            case "http", "https":
                let webVC = SFSafariViewController(url: url)
                webVC.delegate = self
                let urlString = url.absoluteString
                var id: String? = nil
                var type: String? = nil

                if let contentItemViewController = storyboard?.instantiateViewController(withIdentifier: "ContentItemViewController") as? ContentItemViewController {
                        contentItemViewController.dataObject = item
                        contentItemViewController.pageTitle = item.headline
                        contentItemViewController.isFullScreen = true
                        navigationController?.pushViewController(contentItemViewController, animated: true)
                }
            }
        }
    }

    self.present(webVC, animated: true, completion: nil)
```

需要继承SFSafariViewControllerDelegate；在webview中打开

## 设置url scheme
选中工程->Info->URL Types->点击“+”->在URL Schemes栏填上 url scheme(比如ftchinese)

:// 之前的那段字符是url scheme

## 开发者有三种方法来显示Web内容：

1. Safari：使用`openURL(_:)在Safari中展示页面`，`会不得不让用户离开你的应用`。

2. 自定义浏览体验：你可以利用`WKWebView或UIWebView从头开始创建浏览体验`。

3. SFSafariViewController ：通过SFSafariViewController，你几乎可以使用所有Safari的一些便利特性，而`无需让用户离开你的应用`。




