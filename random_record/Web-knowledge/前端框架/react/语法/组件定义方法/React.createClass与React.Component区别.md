## 函数this自绑定

`React.createClass创建的组件`，其`每一个成员函数的this都有React自动绑定`，任何时候使用，直接使用this.method即可，函数中的this会被正确设置。
```
const Contacts = React.createClass({  
  handleClick() {
    console.log(this); // React Component instance
  },
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
});
```

`React.Component创建的组件，其成员函数不会自动绑定this，需要开发者手动绑定`，否则this不能获取当前组件实例对象。

```
class Contacts extends React.Component {  
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log(this); // null
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
```

` React.Component有三种手动绑定方法：`

1. 可以在构造函数中完成绑定
2. 可以在调用时使用method.bind(this)来完成绑定
3. 可以使用arrow function来绑定。
```
//构造函数中绑定
constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); 
}

//使用bind来绑定
<div onClick={this.handleClick.bind(this)}></div> 

//使用arrow function来绑定
<div onClick={()=>this.handleClick()}></div> 
```

## 组件属性类型propTypes及其默认props属性defaultProps`配置不同`
React.createClass在创建组件时，`有关组件props的属性类型及组件默认的属性会作为组件实例的属性来配置`，其中`defaultProps是使用getDefaultProps的方法来获取默认组件属性的`
```
const TodoItem = React.createClass({
    propTypes: { // as an object
        name: React.PropTypes.string
    },
    getDefaultProps(){   // return a object
        return {
            name: ''    
        }
    }
    render(){
        return <div></div>
    }
})
```
React.Component在创建组件时配置这两个对应信息时，`他们是作为组件类的属性，不是组件实例的属性`，也就是`所谓的类的静态属性来配置的`。对应上面配置如下：

```
class TodoItem extends React.Component {
    static propTypes = {//类的静态属性
        name: React.PropTypes.string
    };

    static defaultProps = {//类的静态属性
        name: ''
    };

    ...
}
```
## 组件初始状态state的配置不同

React.createClass创建的组件，其状态state是`通过getInitialState方法来配置组件相关的状态`；
```
const TodoItem = React.createClass({
    // return an object
    getInitialState(){ 
        return {
            isEditing: false
        }
    }
    render(){
        return <div></div>
    }
})
```
React.Component创建的组件，其状态state是`在constructor中像初始化组件属性一样声明的`。
```
class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = { // define this.state in constructor
            isEditing: false
        } 
    }
    render(){
        return <div></div>
    }
}
```

## Mixins的支持不同

`Mixins(混入)`是面向对象编程OOP的一种实现，其作用是为了复用共有的代码，将共有的代码通过抽取为一个对象，然后通过Mixins进该对象来达到代码复用。

React.createClass在创建组件时`可以使用mixins属性，以数组的形式来混合类的集合`。
```
var SomeMixin = {  
  doSomething() {

  }
};
const Contacts = React.createClass({  
  mixins: [SomeMixin],
  handleClick() {
    this.doSomething(); // use mixin
  },
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
});
```

但是遗憾的是React.Component这种形式并不支持Mixins，至今React团队还没有给出一个该形式下的官方解决方案；但是React开发者社区提供一个全新的方式来取代Mixins,那就是Higher-Order Components。