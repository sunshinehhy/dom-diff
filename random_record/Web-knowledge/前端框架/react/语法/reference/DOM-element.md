响应实现了一个浏览器独立的DOM系统，用于性能和跨浏览器兼容性。我们利用这个机会在浏览器DOM实现中清理了一些粗糙的边缘。
在react中，所有的DOM properties and attributes(包括事件处理程序)都应该是camelCased（驼峰式）。例如，HTML属性tabindex对应于react中的属性tabindex。异常是aria-* and data-* attributes，应该是小写的。例如，您可以将aria标签保存为aria-label。

## Differences In Attributes
- checked
The checked attribute is supported by <input> components of type checkbox or radio. You can use it to set whether the component is checked. This is useful for building controlled components. defaultChecked is the uncontrolled equivalent, which sets whether the component is checked when it is first mounted.

checked属性由checkbox或radio的<input>类型的组件支持。您可以使用它来设置是否checked。这对于构建受控组件非常有用。defaultcheck是不受控制的等效项，它设置在第一次安装组件时是否checked该组件。

- className
- dangerouslySetInnerHTML
dangerouslySetInnerHTML is React’s replacement for using innerHTML in the browser DOM. In general, setting HTML from code is risky because it’s easy to inadvertently expose your users to a cross-site scripting (XSS) attack. So, you can set HTML directly from React, but you have to type out dangerouslySetInnerHTML and pass an object with a __html key, to remind yourself that it’s dangerous
在浏览器DOM中使用innerHTML是很危险的。一般来说，从代码中设置HTML是有风险的，因为很容易在不经意间将用户暴露给跨站点脚本攻击。所以，你可以直接从React中设置HTML，但是你必须输入dangerouslySetInnerHTML并通过一个__html键传递一个对象，以提醒自己它是危险的。
```
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

- htmlFor  
htmlFor相遇于js中for
Since for is a reserved word in JavaScript, React elements use htmlFor instead.

- onChange
The onChange event behaves as you would expect it to: whenever a form field is changed, this event is fired. We intentionally do not use the existing browser behavior because onChange is a misnomer for its behavior and React relies on this event to handle user input in real time.
onChange事件的行为就像您期望的那样:当一个表单字段发生更改时，这个事件就会被触发。我们故意不使用现有的浏览器行为，因为onChange对于它的行为来说是错误的，React依赖于这个事件来实时处理用户输入。

- selected
<option>

- style   （以驼峰式定义）
style is most often used in React applications to add dynamically-computed styles at render time. 
style最常用于在渲染时添加动态计算的样式。
如果是数字，会自动加px；如果想加其他单位，用字符串写入。
不过zoom, order, flex等这些属性不会添加单位。
```
// Result style: '10px'
<div style={{ height: 10 }}>
  Hello World!
</div>

// Result style: '10%'
<div style={{ height: '10%' }}>
  Hello World!
</div>
```

- suppressContentEditableWarning
Normally, there is a warning when an element with children is also marked as contentEditable, because it won’t work. This attribute suppresses that warning. Don’t use this unless you are building a library like Draft.js that manages contentEditable manually.
通常情况下，当带有子元素的元素也被标记为contentEditable时，会有一个警告，因为它不会起作用。这个属性会抑制这个警告。除非你正在建立一个Draft.js一样的库，因为这些库可以手动管理contentEditable，否则不要使用它。

- suppressHydrationWarning
If you use server-side React rendering, normally there is a warning when the server and the client render different content. However, in some rare cases, it is very hard or impossible to guarantee an exact match. For example, timestamps are expected to differ on the server and on the client.

If you set suppressHydrationWarning to true, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don’t overuse it. You can read more about hydration in the ReactDOM.hydrate() documentation.
如果使用服务器端React呈现，通常在服务器和客户端呈现不同的内容时会发出警告。然而，在一些罕见的情况下，很难或不可能保证一场精确的匹配。例如，时间戳在服务器上和客户机上都是不同的。

如果你设置了suppressHydrationWarning为真，React将不会警告你哪个元素在属性和内容上的不匹配。它只工作一层深度，并打算用作逃生舱口。不要过度使用它。你可以阅读更多关于hydration in the ReactDOM.hydrate() documentation。

- value
The value attribute is supported by <input> and <textarea> components. You can use it to set the value of the component. This is useful for building controlled components. defaultValue is the uncontrolled equivalent, which sets the value of the component when it is first mounted.
value属性由<input>和<textarea>组件支持。您可以使用它来设置组件的值。这对于构建受控组件非常有用。defaultValue是不受控制的等效值，它是在第一次安装时设置组件的值。

## All Supported HTML Attributes

- react所支持的一些DOM属性包括:

accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap

- SVG attributes所有都支持

accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan