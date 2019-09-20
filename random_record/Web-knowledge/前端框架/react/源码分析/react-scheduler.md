react调度器
这是一项正在进行的工作——我们正在构建一个工具来更好地协调React和其他JavaScript工作。

## ReactScheduler.js
*一个调度库，使调度工作具有比requestAnimationFrame和requestIdleCallback更细粒度的优先级和控制。
*当前TODO项:
* X-拉出在反应中内置的日程表polyfill
* X-初始测试覆盖范围
* X-支持多个回调
-支持两个优先事项;串行和递延
*更好的测试覆盖率。
*——更好docblock
* -波兰文件，API

这是requestidallback的内置填充。它通过调度requestAnimationFrame来工作，然后存储启动该框架的时间，调度在绘制之后被调度的postMessage。在postMessage处理程序中，在时间+帧速率之前，尽可能多地完成工作。
通过将空闲调用分离为单独的事件标记，我们确保布局、油漆和其他浏览器工作都被计算在可用时间内。
帧速率是动态调整的。


我们跟踪下一个最快的超时时间是什么，以便能够快速判断计划的回调是否没有超时。
我们假设我们运行的是30fps，但是如果我们得到更频繁的动画帧，启发式跟踪会将这个值调整为更快的fps。

处理回调错误的情况:
* -不要捕捉错误，因为这会改变调试行为。
* -启动一个新的postMessage回调，以调用任何剩余的回调，
* -但只有在出现错误时，才会有额外的开销。

检查超时回调，运行它们，然后再次检查是否有超时。一直这样做，直到没有一个当前超时。

TODO:如果延迟回调存储在min堆中，那么这将更有效。或者在一个链表中，有时间输出顺序和插入顺序的链接。目前的方法是一个简单的折衷办法:保持指针指向最快的超时时间，并首先检查它。如果它还没有过期，我们可以跳过遍历整个列表。如果它已经过期，那么我们将逐步执行所有回调。

我们使用postMessage技巧将空闲的工作推迟到重新绘制之后。

防御性编码。我们不支持高于120hz的帧速率。如果低于这个值，这可能是一个bug。

假设在这个环境中有addEventListener。可能需要一些更好的东西。

如果一帧长了，那么下一帧短了。
如果一行中有两个帧是短的，那么这就表明我们的帧率比我们目前优化的帧率要高。我们相应地动态地调整我们的启发式。例如，如果我们在120hz显示或90hz VR显示上运行。以这两个中的最大值为例，如果其中一个是异常的，因为错过了最后期限。

有四种可能的情况:
* - Head/nodeToRemove/Tail ->空
在这种情况下，我们将Head和Tail设置为null。
* - Head -> ... middle nodes... -> Tail/nodeToRemove
在这种情况下，我们middle.next为null，然后把middle作为新Tail。
* - Head/nodeToRemove -> ...middle nodes... -> Tail
在这种情况下，我们指middle.prev为空，将Head移动到middle。
* - Head -> ... ?some nodes ... -> nodeToRemove -> ... ?some nodes ... -> Tail
* 在这种情况下，我们指Head.next到Tail和Tail.prev到Head。
