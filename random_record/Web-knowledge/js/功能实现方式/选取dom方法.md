https://blog.csdn.net/stalwartwill/article/details/26498603

let tabContentLabel = document.querySelectorAll('[role="tab"]');

var contentContainer = document.querySelector('.content-container');

querySelector得出的元素没有style属性，所以执行
paywallHintContainer.style.display = 'block';会报错。

var paywallHintContainer = document.getElementById('paywall-hint-container');
getElementById得出的元素有style属性。

## JS获取DOM元素的方法（8种）

通过ID获取（getElementById）
通过name属性（getElementsByName）
通过标签名（getElementsByTagName）
通过类名（getElementsByClassName）
获取html的方法（document.documentElement）
获取body的方法（document.body）
通过选择器获取一个元素（querySelector）
通过选择器获取一组元素（querySelectorAll）

## 获取一个元素
 let commentItemId = document.getElementById('commentItem'+id);
 let commentItemId = document.querySelector('[data-anchor-id=commentItem'+id+']');
## 获取所有元素
通过name属性（getElementsByName）
通过标签名（getElementsByTagName）
通过类名（getElementsByClassName）
获取html的方法（document.documentElement）
通过选择器获取一组元素（querySelectorAll）

## insertBefore
```
var contentContainer = document.querySelector('.content-container');
var paywallHintContainer = document.querySelector('.paywall-hint-container');
var contentInner = document.querySelector('.content-inner');
contentContainer.insertBefore( paywallHintContainer, contentInner );
```

## innerHTML
let statisticsTableId = document.getElementById('statisticsTable');
statisticsTableId.innerHTML = '<div>222</div>';