如果想要引入ft的css库，必须在引入的scss文件中包含被引入库的某一样式。
```
@import 'o-colors/main';
@import "o-grid/main";

//假如没加入此.o-grid-container，便看不到从库中引入的内容
.o-grid-container {
  @include oGridContainer;
}
```

@import "scss/base";   //base文件是_base.scss ，引入方式可以省略扩展名和下划线，假如没有下划线也可以这样引入