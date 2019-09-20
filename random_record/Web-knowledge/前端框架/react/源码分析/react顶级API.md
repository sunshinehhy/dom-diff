https://reactjs.org/docs/react-api.html#react

## Components
React组件允许您将UI拆分为独立的、可重用的部分，并独立地考虑每个部分。React组件可以通过子类的React.Component或React.PureComponent来定义。

React.Component
React.PureComponent

## Creating React Elements
我们建议使用JSX来描述UI应该是什么样子。每个JSX元素都是调用React.createElement()的语法糖。如果使用JSX，通常不会直接调用以下方法。

createElement()
createFactory()
有关更多信息，请参见使用没有JSX的React。

## Transforming Elements
React提供了几个用于操作元素的api:
cloneElement()
isValidElement()
React.Children

## Fragments
React还提供了一个组件，用于在没有包装器的情况下呈现多个元素。  
React.Fragment

## Refs
React.createRef
React.forwardRef

## Reference
如果您的React组件的render()函数在给定相同的道具和状态下呈现相同的结果，。在某些情况下，您可以使用用于提高性能的React.PureComponent。