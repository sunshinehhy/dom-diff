## aria-labe
https://www.w3.org/TR/wai-aria/roles#aria-label

定义标签当前元素的字符串值

## aria-sort
https://www.w3.org/TR/wai-aria-1.1/#aria-sort

Indicates if items in a table or grid are sorted in ascending or descending order.

Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.

指示表格或网格中的项目是按升序还是降序排序。

作者应该只应用这个属性到表头或网格标题。如果该属性未提供，则没有定义的排序顺序。对于每个表或网格，作者应该一次仅将aria-sort应用于一个头部。

Values: Value	|Description ------|------ ascending	|Items are sorted in ascending order by this column. descending |	Items are sorted in descending order by this column. none (default)|	There is no defined sort applied to the column. other	|A sort algorithm other than ascending or descending has been applied.

## reference

WAI-ARIA介绍博客
http://www.zhangxinxu.com/wordpress/2012/03/wai-aria-%E6%97%A0%E9%9A%9C%E7%A2%8D%E9%98%85%E8%AF%BB/

WAI-ARIA指无障碍网页应用。主要针对的是视觉缺陷，失聪，行动不便的残疾人以及假装残疾的测试人员。尤其像盲人，眼睛看不到，其浏览网页则需要借助辅助设备，如屏幕阅读器，屏幕阅读机可以大声朗读或者输出盲文。

而ARIA就是可以让屏幕阅读器准确识别网页中的内容，变化，状态的技术规范，可以让盲人这类用户也能无障碍阅读。

主要博客ARIA role属性值表(role="xxx")、ARIA属性表(aria-xxx="xxx")、ARIA状态属性表。

WAI-ARIA的介绍文档
https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/

Roles类别文档
https://www.w3.org/TR/wai-aria/roles#roles_categorization

## role值为search
https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#search

A landmark region that contains a collection of items and objects that, as a whole, combine to create a search facility. See related form and searchbox.

一个具有里程碑意义的区域，其中包含一系列项目和对象，作为一个整体，它们共同构成了一个搜索工具。相关元素包括form和searchbox

## role值为navigation

https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#navigation

用于导航文档或相关文档的导航元素（通常是链接）的集合。

Superclass Role:	landmark
可设置的HTML元素：	nav

## role值为tablist.m
https://www.w3.org/TR/2017/REC-wai-aria-1.1-20171214/#tablist