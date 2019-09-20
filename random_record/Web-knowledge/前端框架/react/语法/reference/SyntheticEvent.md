This reference guide documents the SyntheticEvent wrapper that forms part of React’s Event System. See the Handling Events guide to learn more.
这个参考指南文档记录了构成React事件系统一部分的SyntheticEvent包装器。请参阅处理事件指南了解更多信息。

Your event handlers will be passed instances of SyntheticEvent, a cross-browser wrapper around the browser’s native event. It has the same interface as the browser’s native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers.

您的事件处理程序将会传递SyntheticEvent的实例，这是浏览器本地事件的跨浏览器包装器。它具有与浏览器的本地事件相同的接口，包括stopPropagation()和preventDefault()，但事件在所有浏览器上都是相同的。

If you find that you need the underlying browser event for some reason, simply use the nativeEvent attribute to get it. Every SyntheticEvent object has the following attributes:

如果您发现由于某种原因需要底层浏览器事件，只需使用nativeEvent属性来获得它。每个SyntheticEvent对象都具有以下属性:

```
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

## Event Pooling   事件池
The SyntheticEvent is pooled. This means that the SyntheticEvent object will be reused and all properties will be nullified after the event callback has been invoked. This is for performance reasons. As such, you cannot access the event in an asynchronous way.

SyntheticEvent汇集。这意味着SyntheticEvent对象将被重用，并且在调用事件回调后，所有属性都将被取消。这是出于性能考虑。因此，您`不能以异步方式访问事件`。

`如果您想以异步方式访问事件属性，则应该调用event.persist()`，它将从池中删除synthetic event，并允许用户代码保留对事件的引用。
```
function onClick(event) {
  console.log(event); // => nullified object.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Won't work. this.state.clickEvent will only contain null values.
  this.setState({clickEvent: event});

  // You can still export event properties.
  this.setState({eventType: event.type});
}
```
## Supported Events
React normalizes events so that they have consistent properties across different browsers.
对事件进行规范化，使它们在不同的浏览器中具有一致的属性。

The event handlers below are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append Capture to the event name; for example, instead of using onClick, you would use onClickCapture to handle the click event in the capture phase.

下面的事件处理程序是`由冒泡阶段的事件触发的`。要为捕获阶段注册一个事件处理程序，请将捕获添加到事件名称;例如，您将使用onClickCapture来处理捕获阶段的单击事件，而不是使用onClick。

### Clipboard Events
- Event names:   
onCopy onCut onPaste
- Properties:  
DOMDataTransfer clipboardData

### Composition Events
- Event names:   
onCompositionEnd onCompositionStart onCompositionUpdate
- Properties:  
string data
