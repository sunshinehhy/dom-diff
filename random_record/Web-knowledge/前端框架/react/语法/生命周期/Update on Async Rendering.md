https://segmentfault.com/a/1190000014456811?utm_source=channel-hottest 
https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
 
一年多来，React团队一直致力于实现异步呈现。上个月在冰岛JSConf会议上，Dan展示了一些令人兴奋的`异步呈现解锁的新可能性`。现在，我们将与您分享我们在处理这些特性时学到的一些经验教训，以及一些帮助您的组件在异步呈现启动时准备异步呈现的方法。

我们学到的最大的教训之一是，我们的一些遗留组件生命周期倾向于鼓励不安全的编码实践。它们是:

componentWillMount
componentWillReceiveProps
componentWillUpdate

这些生命周期方法经常被误解和微妙地滥用;此外，我们`预计它们的潜在误用可能会在异步呈现中出现更多问题`。因此，我们将在即将发布的版本中为这些生命周期添加一个“UNSAFE_”前缀。(在这里，“不安全”并不是指安全性，而是指使用这些生命周期的代码更有可能在React的未来版本中出现bug，尤其是在启用了异步呈现之后。)

## Gradual Migration Path
React遵循的是语义版本管理，因此这种变化将是循序渐进的。我们目前的计划是:

16.3:引入不安全生命周期、UNSAFE_componentWillMount、UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate的别名。(旧的生命周期名称和新的别名都可以在这个版本中使用。)
未来的16。x release:对componentWillMount、componentWillReceiveProps和componentWillUpdate启用弃用警告。(旧的生命周期名称和新别名在这个版本中都可以工作，但是旧的名称将记录开发模式警告。)
17.0:删除componentWillMount、componentWillReceiveProps和componentWillUpdate。(从现在开始，只有新的“UNSAFE_”生命周期名称才会起作用。)
请注意，如果您是React应用程序开发人员，就不必对遗留方法做任何处理。即将发布的16.3版本的主要目的是使开源项目维护人员能够在任何弃用警告之前更新他们的库。这些警告在未来16年才会启用。x版本。

我们在Facebook上维护了超过50,000个React组件，我们不打算马上全部重写。我们知道迁移需要时间。我们将与React社区的每一个人一道，采取循序渐进的迁移方式。

## 从遗留迁移的生命周期
如果您想开始使用React 16.3中引入的新组件api(或者如果您是一个希望提前更新库的维护者)，这里有几个示例，希望能帮助您开始对组件进行稍微不同的思考。随着时间的推移，我们计划在文档中添加额外的“食谱”，以展示如何以避免有问题的生命周期的方式执行常见任务。

在我们开始之前，这里有一个关于版本16.3计划的生命周期变更的快速概述:

我们添加了以下生命周期别名:UNSAFE_componentWillMount、UNSAFE_componentWillReceiveProps和UNSAFE_componentWillUpdate。(将支持旧的生命周期名称和新别名。)
我们将引入`两个新的生命周期:静态getDerivedStateFromProps和getSnapshotBeforeUpdate。`

## New lifecycle: getDerivedStateFromProps
```
class Example extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // ...
  }
}
```
新的静态getDerivedStateFromProps生命周期是`在组件实例化和重新呈现之前调用`的。它可以`返回一个对象以更新状态，或null`表示新道具不需要任何状态更新。

与componentDidUpdate一起，这个新的生命周期应该覆盖传统componentWillReceiveProps的所有用例。
```
注意:
旧的componentWillReceiveProps和新的getDerivedStateFromProps方法都为组件增加了显著的复杂性。这通常会导致bug。考虑派生状态的更简单的替代方法，使组件可预测和可维护。
```
## New lifecycle: getSnapshotBeforeUpdate
```
class Example extends React.Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // ...
  }
}
```

新的getSnapshotBeforeUpdate生命周期在更新之前被调用（例如，在DOM被更新之前）。此生命周期的返回值将作为第三个参数传递给componentDidUpdate。 （这个生命周期不是经常需要的，但可以用于在恢复期间手动保存滚动位置的情况。）

与componentDidUpdate一起，这个新的生命周期将覆盖旧版componentWillUpdate的所有用例。

您可以在本文中找到它们的类型签名。

下面我们将介绍如何使用这两种生命周期的示例。


## 初始化状态：
这个例子展示了一个调用componentWillMount中带有setState的组件：
```
// Before
class ExampleComponent extends React.Component {
  state = {};

  componentWillMount() {
    this.setState({
      currentColor: this.props.defaultColor,
      palette: 'rgb',
    });
  }
}
```
这种类型的组件`最简单的重构是将状态初始化移动到构造函数或属性初始值设定项`，如下所示：
```
// After
class ExampleComponent extends React.Component {
  state = {
    currentColor: this.props.defaultColor,
    palette: 'rgb',
  };
}
```
## 获取外部数据
以下是使用componentWillMount获取外部数据的组件示例：
```
// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentWillMount() {
    this._asyncRequest = asyncLoadData().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}
```
上述代码对于服务器呈现（其中不使用外部数据的地方）和即将到来的异步呈现模式（其中请求可能被多次启动）`是有问题的`。

对于大多数用例，`建议的升级路径是将数据提取移入componentDidMount`：
```
// After
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._asyncRequest = asyncLoadData().then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }
}
```
有一个常见的错误观念认为，在componentWillMount中提取可以避免第一个空的渲染。在实践中，这从来都不是真的，因为`React总是在componentWillMount之后立即执行渲染`。`如果数据在componentWillMount触发的时间内不可用，则无论你在哪里提取数据，第一个渲染仍将显示加载状态`。这就是为什么在绝大多数情况下将提取移到componentDidMount没有明显效果。

从长远来看，在React组件中获取数据的规范方式可能基于JSConf冰岛推出的“悬念”API。简单的数据提取解决方案以及像Apollo和Relay这样的库都可以在后台使用。它比上述任一解决方案的冗余性都要小得多，但不会在16.3版本中及时完成。

`当支持服务器渲染时，目前需要同步提供数据 - componentWillMount通常用于此目的`，但构造函数可以用作替换。即将到来的悬念API将使得异步数据在客户端和服务器呈现中都可以清晰地获取。

## 添加时间监听
下面是一个在安装时`监听外部事件`调度程序的组件示例：
```
// Before
class ExampleComponent extends React.Component {
  componentWillMount() {
    this.setState({
      subscribedValue: this.props.dataSource.value,
    });

    // This is not safe; it can leak!
    this.props.dataSource.subscribe(
      this.handleSubscriptionChange
    );
  }

  componentWillUnmount() {
    this.props.dataSource.unsubscribe(
      this.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource => {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}
```

不幸的是，这会导致服务器渲染（componentWillUnmount永远不会被调用）和异步渲染（在渲染完成之前渲染可能被中断，导致componentWillUnmount不被调用）的内存泄漏。

`人们经常认为componentWillMount和componentWillUnmount总是配对，但这并不能保证。只有调用componentDidMount后，React才能保证稍后调用componentWillUnmount进行清理。`

出于这个原因，`添加事件监听的推荐方式是使用componentDidMount生命周期`：
```
// After
class ExampleComponent extends React.Component {
  state = {
    subscribedValue: this.props.dataSource.value,
  };

  componentDidMount() {
    // Event listeners are only safe to add after mount,
    // So they won't leak if mount is interrupted or errors.
    this.props.dataSource.subscribe(
      this.handleSubscriptionChange
    );

    // External values could change between render and mount,
    // In some cases it may be important to handle this case.
    if (
      this.state.subscribedValue !==
      this.props.dataSource.value
    ) {
      this.setState({
        subscribedValue: this.props.dataSource.value,
      });
    }
  }

  componentWillUnmount() {
    this.props.dataSource.unsubscribe(
      this.handleSubscriptionChange
    );
  }

  handleSubscriptionChange = dataSource => {
    this.setState({
      subscribedValue: dataSource.value,
    });
  };
}
```

`有时候更新监听以响应属性变化很重要`。如果您使用的是像Redux或MobX这样的库，库的容器组件会为您处理。对于应用程序作者，我们创建了一个小型库create-subscription来帮助解决这个问题。我们会将它与React 16.3一起发布。

Rather than passing a subscribable dataSource prop as we did in the example above, we could use create-subscription to pass in the subscribed value:

我们可以使用create-subscription来传递监听的值，而不是像上例那样传递监听 的dataSource prop。
```
import {createSubscription} from 'create-subscription';

const Subscription = createSubscription({
  getCurrentValue(sourceProp) {
    // Return the current value of the subscription (sourceProp).
    return sourceProp.value;
  },

  subscribe(sourceProp, callback) {
    function handleSubscriptionChange() {
      callback(sourceProp.value);
    }

    // Subscribe (e.g. add an event listener) to the subscription (sourceProp).
    // Call callback(newValue) whenever a subscription changes.
    sourceProp.subscribe(handleSubscriptionChange);

    // Return an unsubscribe method.
    return function unsubscribe() {
      sourceProp.unsubscribe(handleSubscriptionChange);
    };
  },
});

// Rather than passing the subscribable source to our ExampleComponent,
// We could just pass the subscribed value directly:
`<Subscription source={dataSource}>`
  {value => `<ExampleComponent subscribedValue={value} />`}
`</Subscription>`;
```

## 基于props更新state
以下是使用`旧版componentWillReceiveProps生命周期基于新的道具值更新状态的组件`示例：
```
// Before
class ExampleComponent extends React.Component {
  state = {
    isScrollingDown: false,
  };

  componentWillReceiveProps(nextProps) {   //旧的方法
    if (this.props.currentRow !== nextProps.currentRow) {
      this.setState({
        isScrollingDown:
          nextProps.currentRow > this.props.currentRow,
      });
    }
  }
}
```
尽管上面的代码本身并没有问题，但`componentWillReceiveProps生命周期通常会被错误地用于解决问题`。因此，该方法将被弃用。

从版本16.3开始，`更新state以响应props更改的推荐方法是使用新的静态getDerivedStateFromProps生命周期`。 （生命周期在组件创建时以及每次收到新道具时调用）：
```
// After
class ExampleComponent extends React.Component {
  // Initialize state in constructor,
  // Or with a property initializer.
  state = {
    isScrollingDown: false,
    lastRow: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentRow !== prevState.lastRow) {
      return {
        isScrollingDown:
          nextProps.currentRow > prevState.lastRow,
        lastRow: nextProps.currentRow,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }
}
```
你可能会注意到在上面的例子中，`props.currentRow是一个镜像状态（如state.lastRow）`。这使得getDerivedStateFromProps可以像在componentWillReceiveProps中一样访问以前的props值。

您可能想知道为什么我们`不只是将先前的props作为参数传递给getDerivedStateFromProps`。我们在设计API时考虑了这个选项，但最终决定反对它，原因有两个：
1. 在`第一次调用getDerivedStateFromProps（实例化后）时，prevProps参数将为null`，`需要在访问prevProps时添加if-not-null检查`。
2. 没有将以前的props传递给这个函数，在未来版本的React中释放内存的一个步骤。 （如果React不需要将先前的道具传递给生命周期，那么它不需要将先前的道具对象保留在内存中。）
```
注意：如果您正在编写共享组件，那么react-lifecycles-compat polyfill可以使新的getDerivedStateFromProps生命周期与旧版本的React一起使用。详细了解如何在下面使用它。
```

## 调用外部回调函数
下面是一个在`内部状态发生变化时调用外部函数`的组件示例：
```
// Before
class ExampleComponent extends React.Component {
  componentWillUpdate(nextProps, nextState) {
    if (
      this.state.someStatefulValue !==
      nextState.someStatefulValue
    ) {
      nextProps.onChange(nextState.someStatefulValue);
    }
  }
}
```

在`异步模式下使用componentWillUpdate都是不安全的`，因为外部回调`可能会多次调用只更新一次`。相反，应该使用`componentDidUpdate生命周期，因为它保证每次更新只调用一次`：
```
// After
class ExampleComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.someStatefulValue !==
      prevState.someStatefulValue
    ) {
      this.props.onChange(this.state.someStatefulValue);
    }
  }
}
```

## props改变的副作用
与上述 事例类似，`有时组件在道具更改时会产生副作用`。
```
// Before
class ExampleComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isVisible !== nextProps.isVisible) {
      logVisibleChange(nextProps.isVisible);
    }
  }
}
```

与componentWillUpdate一样，`componentWillReceiveProps可能会多次调用但是只更新一次`。出于这个原因，避免在此方法中导致的副作用非常重要。相反，`应该使用componentDidUpdate，因为它保证每次更新只调用一次`：
```
// After
class ExampleComponent extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.isVisible !== prevProps.isVisible) {
      logVisibleChange(this.props.isVisible);
    }
  }
}
```
改变props在componentDidUpdate中
## props改变时获取外部数据
以下是根据propsvalues提取外部数据的组件示例：
```
// Before
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setState({externalData: null});
      this._loadAsyncData(nextProps.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = asyncLoadData(id).then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }
}
```
此组件的推荐升级路径是`将数据更新移动到componentDidUpdate中`。`在渲染新道具之前，您还可以使用新的getDerivedStateFromProps生命周期清除陈旧的数据`：

```
// After
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (nextProps.id !== prevState.prevId) {
      return {
        externalData: null,
        prevId: nextProps.id,
      };
    }

    // No state update necessary
    return null;
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id);
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }

  render() {
    if (this.state.externalData === null) {
      // Render loading state ...
    } else {
      // Render real UI ...
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = asyncLoadData(id).then(
      externalData => {
        this._asyncRequest = null;
        this.setState({externalData});
      }
    );
  }
}
```
`在componentDidUpdate中setState`
注意>如果您使用支持取消的HTTP库（如axios），那么卸载时取消正在进行的请求很简单。对于原生Promise，您可以使用如下所示的方法。(见文档)

## 在更新之前读取DOM属性
下面是一个组件的例子，它在更新之前从DOM中读取属性，以便在列表中保持滚动位置：
```
class ScrollingList extends React.Component {
  listRef = null;
  previousScrollOffset = null;

  componentWillUpdate(nextProps, nextState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (this.props.list.length < nextProps.list.length) {
      this.previousScrollOffset =
        this.listRef.scrollHeight - this.listRef.scrollTop;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // If previousScrollOffset is set, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    if (this.previousScrollOffset !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight -
        this.previousScrollOffset;
      this.previousScrollOffset = null;
    }
  }

  render() {
    return (
      `<div>`
        {/* ...contents... */}
      `</div>`
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```
在上面的例子中，componentWillUpdate被用来读取DOM属性。但是，对于异步渲染，“render”阶段生命周期（如componentWillUpdate和render）与“commit”阶段生命周期（如componentDidUpdate）之间可能存在延迟。如果用户在这段时间内做了类似调整窗口大小的操作，则从componentWillUpdate中读取的scrollHeight值将失效。

`解决此问题的方法是使用新的“commit”阶段生命周期getSnapshotBeforeUpdate。在数据发生变化之前立即调用该方法（例如，在更新DOM之前）。它可以将React的值作为参数传递给componentDidUpdate，在数据发生变化后立即调用它。`

这两个生命周期可以像这样一起使用：
```
class ScrollingList extends React.Component {
  listRef = null;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return (
        this.listRef.scrollHeight - this.listRef.scrollTop
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      `<div>`
        {/* ...contents... */}
      `</div>`
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```
注意>>如果您正在编写共享组件，那么react-lifecycles-compat polyfill可以使新的getSnapshotBeforeUpdate生命周期与旧版本的React一起使用。

## 其它情况

除了以上的一些常见的例子，还可能会有别的情况本篇文章没有涵盖到，如果您以本博文未涉及的方式使用componentWillMount，componentWillUpdate或componentWillReceiveProps，并且不确定如何迁移这些传统生命周期，你可以提供您的代码示例和我们的文档，并且一起提交一个新问题。我们将在更新这份文件时提供新的替代模式。

## 开源项目维护者

开源维护人员可能想知道这些更改对于共享组件意味着什么。如果实现上述建议，那么依赖于新的静态getDerivedStateFromProps生命周期的组件会发生什么情况？你是否还必须发布一个新的主要版本，并降低React 16.2及更高版本的兼容性？

当React 16.3发布时，我们还将发布一个新的npm包， react-lifecycles-compat。该npm包会填充组件，以便新的getDerivedStateFromProps和getSnapshotBeforeUpdate生命周期也可以与旧版本的React（0.14.9+）一起使用。

要使用这个polyfill，首先将它作为依赖项添加到您的库中：
```
# Yarn
yarn add react-lifecycles-compat

# NPM
npm install react-lifecycles-compat --save
```
接下来，更新您的组件以使用新的生命周期（如上所述）。

最后，使用polyfill将组件向后兼容旧版本的React：
```
import React from 'react';
import {polyfill} from 'react-lifecycles-compat';

class ExampleComponent extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    // Your state update logic here ...
  }
}

// Polyfill your component to work with older versions of React:
polyfill(ExampleComponent);

export default ExampleComponent;
```