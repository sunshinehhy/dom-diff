### th属性scope

这个枚举属性定义了表头元素 (在<code><th></code>中定义) 关联的单元格。它可能有以下值：

- row:  表头关联一行中所有的单元格。
- col: 表头关联一列中所有的单元格。
- rowgroup:表头属于一个行组并与其中所有单元格相关联。这些单元格可以被放在表头的左侧或右侧，取决于`<table>`元素中 `dir` 属性的值 。
- colgroup: 表头属于一个列组并与其中所有单元格相关联。
- auto

Eg：
```html
<table class="o-table" data-o-component="o-table">
	<tr>
		<th scope="row">FTSE 100</th>
		<td data-o-table-data-type="numeric" class="o-table__cell--numeric">6685.52</td>
	</tr>
	...
</table>
```

## table元素特有样式属性
### border-collapse
<https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse>

border-collapse CSS 属性是用来决定表格的边框是分开的还是合并的。在分隔模式下，相邻的单元格都拥有独立的边框。在合并模式下，相邻单元格共享边框。

分隔（separated）模式是HTML表格的传统模式。相邻单元格都拥有不同的边框。边框之间的距离是通过CSS属性 `border-spacing` 来确定的。