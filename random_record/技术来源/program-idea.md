## 如何编程小总结
- 从简单到复杂，找出规律，再到抽象
- 先理清思路，画出逻辑导向图，实现函数方式
- 控制单一变量进行调试
- 通过flag变量来控制是否执行
- 注意数组初始化
  ```
    for(var i = 0;i<diffIndustries.length;i++){
      console.log (diffIndustries[i]);
      financesInner[i]='';//在此处初始化
      $.each(entry, function (financesIndex, finances) {//for循环也可以使用
      if((finances.first_industry).localeCompare(diffIndustries[i])==0){
            if ($('.content-left-inner .item[data-id=' + id + '][data-type=' + type + ']').length === 0) {
                financesInner[i]+= renderAPI(id，…);     // renderAPI()函数返回包含网页标签的字符串                           
            }//financesInner1为div代码字符串
       }                       
     });
    var aaaa='';
    for(var m = 0;m<diffIndustries.length;m++){                        
          console.log (diffIndustries[m]);
        aaaa += wrapItemHTML(financesInner[m], diffIndustries[m]);                      
    }
    $('#stories-inner').html(aaaa);

  ```
如果var financesInner =[];这样初始化，渲染出来的网页会包含undefined；数组的循环的同时，financesInner[i]也同时循环相加，注意 financesInner[i]='';把第二次或更多次数再次初始化
- 经常注意全局变量的定义
- //除去数组中相同元素
  ```
    function unique(firstIndustry) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = firstIndustry[i]) != null; i++) {
            if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
            }
        }
        return result;
    }

```

- 假如看不懂别人的代码，就通过实例去验证功能