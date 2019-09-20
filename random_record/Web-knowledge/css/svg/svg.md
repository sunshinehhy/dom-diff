## svg画圆
stroke-width: 32;  和 stroke-dasharray:38 100;画饼图

我们可以给这个圆形指定一个特定的半径，从而让 它的周长无限接近 100，这样就可以直接把比率的百分比值指定为 stroke- dasharray 的长度，不需要做任何计算了。因为周长是 2πr，半径就是16。
我们还可以在 SVG 的 viewBox 属性中指定其尺寸，而不再使用 width 和 height 属性，这样就可以让它自动适应容器的大小了

# SVG语言

## SVG简介
SVG是使用XML来描述二维图形和绘图程序的语言。

- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用来定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
- SVG 是万维网联盟的标准
- SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体


## SVG 形状
SVG 有一些预定义的形状元素，可被开发者使用和操作：

- 矩形 < rect >
- 圆形 < circle >
- 椭圆 < ellipse >
- 线 < line >
- 折线 < polyline >
- 多边形 < polygon >
- 路径 <path>

### rect标签
 rect元素：为SVG预定义的形状元素，指矩形，有以下属性：

	- width/height:矩形的高度和宽度
	- fill:定义矩形的填充颜色
	- stroke-width:定义矩形的边框宽度
	- stroke:定义矩形的边框颜色
	- x：定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
	- y：定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
	- rx/ry:可使矩形产生圆角。
	
### path标签
<path>标签用来定义路径。以下命令可用于路径数据：

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath
	

**NOTE**:以上所有命令均允许小写字母。**大写表示绝对定位，小写表示相对定位**。

由于绘制路径的复杂性，**强烈建议使用 SVG 编辑器(如Inkscape)来创建复杂的图形**。

