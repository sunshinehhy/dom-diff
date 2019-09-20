table:不能设置padding，可以设置margin

th,tr{
        text-align: center;
}
## 设边框
- table,table tr th, table tr td { border:0.5px solid grey; }
- 在table中加入border="1"属性   <table border="1" >
- 合并边框 
```
table{
        border-collapse: collapse;
} 
```
- 合并单元格
纵向：rowspan="10"
横向：colspan="5"

## 消除table表格中td之间的距离
```
css中设置

table{
border-collapse:collapse
}

或html中

<table cellspacing="0">
```

border-collapse	设置是否把表格边框合并为单一的边框。
border-spacing	设置分隔单元格边框的距离。
caption-side	设置表格标题的位置。
empty-cells	设置是否显示表格中的空单元格。
table-layout	设置显示单元、行和列的算法。
