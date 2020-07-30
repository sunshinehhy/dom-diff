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

## table 边框加圆角踩坑

https://juejin.im/post/5d96b6afe51d4578495472cd

```
table {
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    /* 消除单元格之间的空隙 */
    border-collapse: collapse;
    /* 消除掉外边框 */
    border-style:hidden  
    /* hack一下加个假边框 */
    box-shadow: 0 0 0 1px #d8d8d8;
}
th,td {
  border: 1px solid #d8d8d8;
}


```