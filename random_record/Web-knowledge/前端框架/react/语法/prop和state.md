https://segmentfault.com/a/1190000009921542  (很好解释)

React组件的数据分为两种，prop和state，无论prop或者state的改变，都可能引发组件的重新渲染。prop是组件对外接口，state是组件内部状态。

## 组件的prop
React组件`通过定义自己能够接受的prop就定义了自己对外公共接口`。外部世界通过prop和组件对话。

 ### *给prop赋值*

 从外部世界看prop的使用：

<SampleButton id="sample" borderWidth={2} onClick={onButtonClick} style={{color: "red"}} />
上面的例子使用了名为SampleButton的组件实例。React组件的prop所能支持的类型`除了字符串，还可以是任何一种JavaScript语言支持的数据类型`。当prop的类型`不是字符串`时，`再JSX中必须用花括号{}把值包裹，所以style的值有两层花括号`，外层代表是JSX的语法，内层代表这是个对象常量。

React组件要反馈数据给外部世界，也是用prop，因为prop类型也可以是函数，函数类型的prop等于让父组件交给子组件一个回调函数，子组件在恰当的时机调用函数的prop，就可以把信息传递给外部世界。

为了演示，我们构造一个应用包含两种组件，ControlPanel父组件，然后若干个Counter子组件。对于Counter组件，父组件ControlPanel就是外部世界：
```
class ControlPanel extends React.Component {
    render() {
        return (
          <div>
            <Counter caption="First" initValue={0} />
            <Counter caption="Second" initValue={10} />
            <Counter caption="Third" initValue={20} />
          </div>
        );
    }
}
每个Counter组件使用了caption和initValue两个prop。ControlPanel通过caption的prop传递给Counter组件实例说明文字，通过initValue的prop传递给Count组件一个初始的计数值。
```
`React要求render只能返回一个元素，所以我们用div包裹了3个子组件。`（此句话应该记住）

 ### *读取prop值*
 ```
 class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

        this.state = {
            count: props.initValue || 0
        };
    }
}
```
如果组件需要定义自己的构造函数，`构造函数第一行一定要通过super调用父类React.Component的构造函数`。给this.props赋值也是React.Component构造函数的工作之一。
在Counter的构造函数中，还给两个成员函数绑定了当前this的执行环境，因为`ES6方式创建的组件并不自动给我们绑定this到当前实例对象`(此句话应该记住)。

在其他函数中则可以通过this.props访问传入的值，看一下render函数：
```
render() {
    const {caption} = this.props; // ES6的解构赋值
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>-</button>
        <span>{caption} count: {this.state.count}</span>
      </div>
    );
};
```

## 组件的state
state代表组件内部状态。由于`React组件禁止修改传入的prop`，所以当组件需要记录自身的数据变化时，就要使用state。

 ### *初始化state*
 通常在构造函数的结尾处初始化state

 ```
 初始化方法一：
    constructor(props) {
        ...
        this.state = {
            count: props.initValue || 0
        };
    }
 ```
 ```
 初始化方法二：
    Counter.defaultProps = {
        initValue: 0
    };
    构造函数就可以简化了：

    constructor(props) {
        ...
        this.state = {
            count: props.initValue
        };
    }
```

 ### *读取和更新state*
通过this.state可以读取到组件的当前state。注意的是，`改变state必须使用this.setState函数`，而不能直接修改this.state。如果你违反这个操作，浏览器Console会告警。

直接修改this.state的值，只是野蛮的修改了state，却没有驱动组件重新渲染，新的值当然也不会反应在界面上。而this.setState()函数所做的事情，就是改变this.state的值后再驱动组件重新渲染。

```
onClickIncrementButton() {
    this.setState({count: this.state.count + 1});
}
```

## state设计原则
- `创建尽量多的无状态组件，这些组件唯一关心的就是渲染数据`。而在`最外层，应该有一个包含state的父级别组件`，用于处理各种事件、交流逻辑、修改state。`对应的子组件要关心的只是传入的属性而已`。

- state应该包含组件的事件`回调函数可能引发UI更新的这类数据`。在实际的项目中，`应该是轻量化的JSON数据`，尽量把数据的表现设计到最小，更多的数据可以在render中通过各种计算得到。

## prop和state对比
- prop用于定义外部接口，state用于记录内部状态；
- prop的赋值在外部世界使用组件时，state的赋值在组件内部；
- 组件不应该改变prop的值，而state的存在的目的就是让组件来改变的。


## propTypes检查

在ES6方法定义的组件中，可以`通过增加类的propTypes属性来定义prop规格`。在运行和静态代码检查时，都可以根据propTypes判断外部世界是否正确地使用了组件的属性。

增加Counter组件的propTypes定义：
```
Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number
};
```
开发过程中，定义propTypes代码可以避免犯错，但是在`发布产品时，可以用babel-react-optimize工具自动去除propTypes，这样部署到产品环境的代码就会更优`。

## 正确使用state
- 不直接修改状态
- 状态更新可以是异步的
React可以将多个setState()调用批处理为单个更新，以提高性能。

因为this.props and this.state 可以异步更新，您不应该依赖它们的值来计算下一个状态。

例如，此代码可能无法更新计数器:
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
要修复它，可以使用setState()的第二种形式，它接受函数而不是对象。该函数将接收先前的状态作为第一个参数，更新时的props作为第二个参数:
```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
我们在上面使用了一个箭头函数，但它也适用于常规函数:
```
// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

- 状态更新合并
调用setState()时，`React将提供的对象合并到当前状态`。

例如，您的状态可能包含几个独立的变量:
```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```
然后可以`使用单独的setState()调用独立地更新它们`:
```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
  合并是浅的，所以this.setState({comments})保留了this.state.posts完整，但完全替换了this.state.comments。
```

## props总结
- 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
- 组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
- 可以通过给组件添加类属性 defaultProps 来配置默认参数。
- props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

## state和props
state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
尽量少地用 state，尽量多地用 props。
尽量多地写无状态组件，尽量少地写有状态的组件。