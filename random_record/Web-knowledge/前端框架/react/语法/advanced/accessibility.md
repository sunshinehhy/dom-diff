https://reactjs.org/docs/accessibility.html

## 可访问性
为什么易访问性?
Web可访问性(也称为a11y)是设计和创建每个人都可以使用的网站。可访问性支持是允许辅助技术解释web页面的必要条件。

`完全支持建立可访问的网站，经常使用标准的HTML技术`。

## 标准和指导方针
WCAG
Web内容可访问性指南提供了创建可访问Web站点的指南。

以下WCAG检查列表提供了概述:

从Wuhcag WCAG清单
从WebAIM WCAG清单
A11Y项目的清单
https://www.w3.org/WAI/standards-guidelines/wcag/

## WAI-ARIA
Web可访问性倡议-可访问的富Internet应用程序文档包含构建完全可访问的JavaScript小部件的技术。

注意，JSX完全支持所有aria-* HTML属性。而React中的大多数DOM属性和属性都是驼背式的，这些属性应该小写:
```
<input
  type="text" 
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## 语义HTML
语义HTML是web应用程序中可访问性的基础。使用不同的HTML元素来加强我们网站信息的意义，通常会给我们免费的可访问性。

MDN HTML元素的参考
有时，当我们向JSX添加<div>元素以使我们的React代码工作时，我们会破坏HTML语义，特别是在处理列表(<ol>， <ul>和<dl>)和HTML <table>时。在这些情况下，我们更应该使用React片段来将多个元素分组。

Use <Fragment> when a key prop is required:
```
import React, { Fragment } from 'react';

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Without the `key`, React will fire a key warning
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```
在其他地方使用<></>语法:
```
function ListItem({ item }) {
  return ( 
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );    
}
```

## Accessible Forms
Labeling (标签)
每一个HTML表单控件，例如<input>和<textarea>，都需要可访问地标记。我们需要提供描述性的标签，这些标签也暴露给屏幕阅读器。

下面的资源向我们展示了如何做到这一点:

W3C向我们展示了如何标记元素
WebAIM向我们展示了如何标记元素
Paciello的团体解释了可访问的名称
尽管这些标准的HTML实践可以直接在React中使用，但是请注意，for属性是在JSX中作为htmlFor编写的:
```
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

## 通知用户错误。
所有用户都需要理解错误情况。下面的链接也向我们展示了如何向屏幕阅读器显示错误文本:

W3C演示了用户通知
WebAIM关注表单验证

## Focus Control 集中控制
确保您的web应用程序只能完全使用键盘操作:

WebAIM谈论键盘可访问性

## 键盘焦点和焦点轮廓
键盘焦点指的是DOM中选择接受键盘输入的当前元素。我们看到它到处都是一个焦点轮廓，类似如下图所示:

蓝色键盘焦点轮廓围绕一个选定的链接。
只需要使用CSS来删除这个大纲，例如通过设置大纲:0，如果你用另一个焦点轮廓实现来替换它。

## 跳转到所需内容的机制
提供一种机制，允许用户跳过应用程序中的导航部分，因为这将帮助并加快键盘导航。

Skiplinks或Skip导航链接是隐藏的导航链接，只有当键盘用户与页面交互时才会显示出来。它们很容易实现内部页面锚点和一些样式:

WebAIM -跳过导航链接
还可以使用地标元素和角色，如<main>和<aside>，将页面区域划分为辅助技术，使用户可以快速导航到这些部分。

阅读更多关于使用这些元素来增强可访问性的信息:

可访问的地标

## Programmatically managing focus 以编程方式管理重点
我们的React应用程序在运行时不断修改HTML DOM，有时会导致键盘焦点丢失或设置为一个意外的元素。为了修复这个问题，我们需要以编程的方式将键盘焦点指向正确的方向。例如，关闭模式窗口后，将键盘焦点重新设置为打开模式窗口的按钮。

MDN Web文档对此进行了研究，并描述了如何构建可在键盘上导航的JavaScript小部件。

要在React中设置焦点，可以使用Refs来设置DOM元素。

使用此方法，我们首先创建组件类JSX中的一个元素的ref:
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    //创建一个ref来存储textInput DOM元素
    this.textInput = React.createRef();
  }
  render() {
  //使用' ref '回调来存储对文本输入DOM的引用
  //实例字段中的元素(例如this.textInput)。
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```
然后，在需要时，我们可以将其集中在组件的其他部分:
```
focus() {
 //使用原始DOM API显式地集中文本输入
 //注意:我们正在访问“当前”来获取DOM节点。
  this.textInput.current.focus();
}
```
有时，父组件需要设置焦点给子组件中的元素。我们可以通过子组件上的一个特殊的prop将DOM refs公开给父组件，该prop将父组件的ref转发给子组件的DOM节点。
```
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}
/>

// Now you can set focus when required.
this.inputElement.current.focus();
```
当使用HOC扩展组件时，建议使用React的forwardref函数将ref转发到封装的组件。如果第三方没有实现ref转发，那么上述模式仍然可以用作回退。

一个很好的焦点管理例子是反应堆-阿里-模态。这是一个相对少见的完全可访问模式窗口的例子。它不仅设置了取消按钮的初始焦点(防止键盘用户意外激活成功动作)，并在模式中设置了键盘焦点，还将焦点重新设置为最初触发模式的元素。

注意:
虽然这是一个非常重要的可访问性特性，但它也是一种应该审慎使用的技术。当键盘受到干扰时，使用它来修复键盘焦点流，而不是试着并预测用户希望如何使用应用程序。

## 更复杂的小部件
更复杂的用户体验不应该意味着更难以访问。尽管可访问性最容易通过尽可能接近HTML的编码实现，但即使是最复杂的小部件也可以可访问地编码。

在这里，我们需要了解ARIA角色以及ARIA状态和属性。这些工具箱中充满了HTML属性，这些属性在JSX中得到了充分的支持，使我们能够构建完全可访问的、功能强大的React组件。

每种类型的小部件都有特定的设计模式，用户和用户代理都希望以某种方式工作:

WAI-ARIA创作实践——设计模式和小部件
Heydon Pickering - ARIA示例
包容的组件

## Other Points for Consideration其他考虑点
设置语言
显示页面文本的人类语言，因为屏幕阅读器软件使用它来选择正确的语音设置:

WebAIM -文档语言

## 设置文档标题
设置文档<title>以正确描述当前页面内容，这样可以确保用户仍然知道当前页面上下文:

理解文档标题要求
我们可以使用React Document Title Componen设置它。

## 颜色对比
确保你的网站上所有可读的文字都有足够的颜色对比，以保持低视力用户的最大可读性:

WCAG -了解颜色对比要求。
关于颜色对比的一切以及为什么你应该重新思考它
什么是色彩对比
手工计算网站中所有情况的正确颜色组合可能会很麻烦，因此，您可以使用颜色计算整个可访问的调色板。

下面提到的aXe和WAVE工具都包括颜色对比测试，并将报告对比度错误。

如果你想扩展你的对比测试能力，你可以使用以下工具:

WebAIM -颜色对比检查器
Paciello的色彩对比分析仪

## 开发和测试工具
我们可以使用许多工具来帮助创建可访问的web应用程序。

键盘
到目前为止，最简单的也是最重要的检查之一是测试你的整个网站是否可以单独使用。通过:

插入你的鼠标。
使用Tab和Shift+Tab浏览。
使用Enter来激活元素。
在需要时，使用键盘箭头键与一些元素交互，如菜单和下拉菜单。

## Development assistance
我们可以直接在JSX代码中检查一些可访问性特性。通常，JSX aware IDE中已经为ARIA角色、状态和属性提供了智能感知检查。我们还可以访问以下工具:

eslint-plugin-jsx-a11y
ESLint -plugin- JSX -a11y插件为您的jslint提供了关于可访问性问题的AST linting反馈。许多IDE允许您直接将这些发现集成到代码分析和源代码窗口中。

Create React App中有这个插件，它激活了一些规则。如果您想启用更多的可访问性规则，您可以使用以下内容在项目的根目录中创建.eslintrc文件:
```
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```
## 在浏览器中测试可访问性。
有许多工具可以在浏览器中对web页面执行可访问性审计。请将它们与这里提到的其他可访问性检查结合使用，因为它们只能测试HTML的技术可访问性。

斧,aXe-core react-axe
Deque Systems为应用程序的自动化和端到端可访问性测试提供了轴核。这个模块包括Selenium的集成。

可访问性引擎或aXe，是构建在ax -core上的可访问性检查器浏览器扩展。

您还可以在开发和调试过程中使用“反应斧”模块直接向控制台报告这些可访问性结果。

## 屏幕阅读器
使用屏幕阅读器进行测试应该是可访问性测试的一部分。

请注意浏览器/屏幕阅读器的组合很重要。建议您在最适合您选择的屏幕阅读器的浏览器中测试应用程序。

## 常用的屏幕阅读器
改良式戏剧活动在Firefox中
非可视桌面访问或NVDA是一种广泛使用的开源Windows屏幕阅读器。

## 其他屏幕阅读器
在Google Chrome ChromeVox
ChromeVox是Chromebooks上的一个集成屏幕阅读器，可以作为谷歌Chrome的扩展。

关于如何最好地使用ChromeVox，请参考以下指南:

谷歌Chromebook帮助-使用内置的屏幕阅读器
ChromeVox经典键盘快捷方式参考。