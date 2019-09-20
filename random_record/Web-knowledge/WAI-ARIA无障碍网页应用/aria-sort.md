https://www.w3.org/TR/wai-aria-1.1/#aria-sort

Indicates if items in a table or grid are sorted in ascending or descending order.

Authors SHOULD only apply this property to table headers or grid headers. If the property is not provided, there is no defined sort order. For each table or grid, authors SHOULD apply aria-sort to only one header at a time.

指示表格或网格中的项目是按升序还是降序排序。

作者应该只应用这个属性到表头或网格标题。如果该属性未提供，则没有定义的排序顺序。对于每个表或网格，作者应该一次仅将aria-sort应用于一个头部。

Values: Value	|Description ------|------ ascending	|Items are sorted in ascending order by this column. descending |	Items are sorted in descending order by this column. none (default)|	There is no defined sort applied to the column. other	|A sort algorithm other than ascending or descending has been applied.