如果在master上已经做了修改,但还没有add和commit
## 已实操方法
### 1. 直接在master上新建分支
```
git branch newbranch
```

### 2. 切换到新分支
```
git checkout newbranch
```

### 3.在新分支上add,commit
这样就把修改的内容commit到了新分支上

### 4.再切换回master
```
git checkout master
```
会发现master上很干净，没有需要add和commit的东西，且之前修改的东西也都没有了。

## 参考资料及其他方法
<http://blog.csdn.net/stan_pcf/article/details/51911101>

介绍的第一种方法就是我已经实操过的，第二种还没弄明白是怎么弄的。