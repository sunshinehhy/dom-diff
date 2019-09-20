块的顶部外边距和底部外边距有时被组合(折叠)为单个外边距，其大小是组合到其中的最大外边距，这种行为称为外边距塌陷(margin collapsing)，有的地方翻译为外边距合并。

详见<https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing>
 
### 注意
- margin塌陷只存在于上下margin,不存在与左右margin


### 发生情况
#### 1.相邻的兄弟姐妹元素（Adjacent siblings）

#### 2. 块级父元素与其第一个/最后一个子元素（Parent and first/last child）

#### 3. 空块元素（Empty blocks）

## 解决办法
https://www.cnblogs.com/zhangmingze/articles/4664074.html

http://blog.csdn.net/Mr_28/article/details/53981503

　边界叠加的大多数问题可以通过添加透明边框或1px的补白来修复。

补充解决方案：

1. 外层padding

2. 透明边框border:1pxsolidtransparent;

3. 绝对定位postion:absolute:

4. 外层DIVoverflow:hidden;

5. 内层DIV　加float:left;display:inline;

6. 外层DIV有时会用到zoom:1;