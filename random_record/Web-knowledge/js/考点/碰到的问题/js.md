## 如何解决鼠标移动到子元素会触发父元素的 mouseout 事件（mouseleave/mouseenter 和 mouseover/mouseout 的区别）

方法一. 用 mouseleave/mouseenter 代替 mouseover/mouseout【最佳方法】

mouseover 与 mouseenter

mouseover => 不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
mouseenter => 只有在鼠标指针从元素外穿入被选元素（到元素内）时，才会触发 mouseenter 事件。

mouseout 与 mouseleave

mouseout => 不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
mouseleave => 只有在鼠标指针从元素内穿出被选元素（到元素外）时，才会触发 mouseleave 事件。

方法二：利用 e.stopPropagation()阻止事件进一步传播

e.stopPropagation()会终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。

## cookie (为什么设置了 cookie 必须刷新页面才有效？)

cookie 必须刷新页面才能读取到

## span 点击

## 当 div 仅仅是图片的时候，也就是没有内容，获取他的上下兄弟节点，不能获取到。

## div 包住图片，但是 div 高度比图片大

## height 和 line-height 相同时，使用百分比文字会居中，不使用文字不会居中

## JSON.stringify('ni')

""ni""

## 图片会上浮到 div 之外，这是 BFC 的问题吗？

背景图高低是根据里面的东西来决定，要想在里面，得把里面的撑开。

## 图片的高度小于 div，怎么让 div 的高度跟图片一致：给 img 设定 display:block

div 标签中插入图片后,让 div 高度和图片一样，把 div 的 border 打开，你发现图片底部不是紧贴着容器底部的，是 img 后面的空白字符造成，要消除必须这样写：给 img 设定 display:block。

## computed 中定义的属性找不到（还在找原因）

因为 computed 重复定义了，报错：
"Property or method \"" + key + "\" is not defined on the instance but " +
'referenced during render. Make sure that this property is reactive, ' +
'either in the data option, or for class-based components, by ' +
'initializing the property. ' +
'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',

## 第一次点击点评，除了被点击的对象，其他点评都会被触发 hide 动作，第二次之后就不会了（还在找原因）

## 鼠标移动过快，会失效

经过如上代码分析，发现当鼠标移动过快时，console.log(“move”)执行的次数很少；当鼠标移动足够缓慢时，执行次数鼠标移动的像素数近似（这正好验证了，当每移动一个像素时，就会触发 mousemove 事件）。
原因：鼠标移动时，不会存储所有的移动信息，而是通过取插值的方法取得鼠标位置信息，否则，系统会被鼠标移动拖垮。所以就会出现，移动过快时，出现断点的问题。

解决方案：

鼠标移动过快时，不能做到移动一个像素，响应一次 mousemove 事件，所以导致，绘制的圆形不连续。我们换种思路，直接在两次响应 mousemove 事件时，绘制直线，正好可以连接中间的断点。
为了美观，可以利用 lineCap 属性，可以保证直线两端为圆角

## app 中会禁用倒计时 setInterval（找问题）

不能放在 created ()中，需要放在 mounted 请求成功里面

## 不管用 router.push 还是 window.location.href 方式，刷新会跳到进入的 H5 页面

2 种方法都会请求

## h5 弹出键盘会遮挡住设置 position:fixed bottom:0 的元素，可以理解是键盘延迟出现

H5 移动端弹出键盘时遮挡输入框？（另一种描述）
解决办法：

1. 延时一定时间重新定位输入框。
2. 点击输入框时加长 body 元素高度到 9999px（当然不一定非要这么高），页面滚动到空白区域，再生成输入框添加在当前一屏页面的最顶端。
3. 借助元素的 scrollIntoViewIfNeeded() 方法。这个方法执行后如果当前元素在视口中不可见，则会滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中已经是可见的，这个方法什么也不做。
4. 页面跳转或者显示隐藏（无疑是最简单的，但是可能不能满足产品的要求，或者有点 low，但是网页版的微博就是如此）。（没理解）
   觉得 1 和 3 可行

## 两种方法区别

this.\$router.push 可以更改分享记录页标题；window.location.href 不可以更改标题

```
 if (!this.isOldVersion) {
        this.$router.push({
          path: "/Active/shareRecord",
        });
      }
// 使用此方法，分享记录页setPageTitle不能被调用
window.location.href =
    Config.SERVER +
    "/Active/shareRecord"
```

## 滚动位置

刚进来就删除 cookie，当点击的时候设定 cookie

H5 页面滚动条只有 body 或者 window，找到此元素的位置

// 第几张图滚动到头部：需要将第一张图放在首页
let deviceHeight 设备高度
let top 需要滚动的图片位置
let firstTop 第一张图图片位置

offsetTop
如果滑在上面：top 为负值
如果滑到下面：top 大于设备高度 (区别能不能滚到头部)
如果在中央：top 小于设备高度，不需要滚动
scrollTop : 元素滚动条内的顶部隐藏部分的高度。
scrollHeight：元素滚动条内的内容高度
getBoundingClientRect 用于获取某个元素相对于视窗的位置集合。集合中有 top, right, bottom, left 等属性。
if(img1.getBoundingClientRect().top<0){
window.scrollBy(0, -img1.getBoundingClientRect().top);
}
if(img1.getBoundingClientRect().top>screen.height){
window.scrollBy(0, img1.getBoundingClientRect().top);
}
if(img1.getBoundingClientRect().top>0 && img1.getBoundingClientRect().top<screen.height){
window.scrollBy(0, img1.getBoundingClientRect().top);
}

imgLast.getBoundingClientRect().top+imgLast.height
如果最后一张图的 top+最后一张图的高度 的 top

用什么判断来滚动的位置：

后面封装成一个函数：
处在下面和可视区的条件：
此张图片的头部到底部的距离 > 设备高度 直接滚
此张图片的头部到底部的距离 < 设备高度 把最后一张图滚到可视区

直接滚动的距离：
window.scrollBy(0, img1.getBoundingClientRect().top);
获取对应的图片就好了。把 key 值保存下来。
如果能滚动的距离小于设定的滚动距离，自动会滚上去。

因为执行的都是一套代码，但是怎么样得给出一个信号从哪里进来的

## 在 webview 中滑动时页面内所有 js 会被阻塞

## map(会改变原数组)

```
let recommendData = this.recommendData;
let newRecommendData = recommendData.map(function(value, index, array) {
value.buyTime = getYMD(value.buyTime);
value.liveStartTime = getYMD(value.liveStartTime);
value.recommendTime = getYMD(value.recommendTime);
return value;
});
console.log(newRecommendData);
console.log(recommendData); //map 会改变原数组

newRecommendData 和 recommendData 得到的值一样
```

## promise 用法

```
let that = this;
    new Promise(function(resolve, reject) {
      that.$http
        .get(
          Config.SERVER +
            "/app-api-user-server/white/selling/recommend-activity-info.json",
          {
            params: { activityPid: that.$route.query.activityPid }
          }
        )
        .then(response => {
          if (response.data.code !== 10000) {
            return;
          }
          return resolve(response);
        });
    }).then(function(res) {
      console.log(res);
    });

    that.$http
      .get(
        Config.SERVER +
          "/app-api-user-server/white/selling/recommend-activity-info.json",
        {
          params: { activityPid: that.$route.query.activityPid }
        }
      )
      .then(response => {
        if (response.data.code !== 10000) {
          return;
        }
        return Promise.resolve(response);
      })
      .then(function(res) {
        console.log(res);
      });

```

## 移动端弹出遮罩层时防止底部页面滚动

`&是表示位的与运算，把左右两边的数字转化为二进制，然后每一位分别进行比较，如果相等就为 1，不相等即为 0。`

监听遮罩层的打开和关闭
打开时设置底部页面的 position: fixed
关闭时恢复默认布局 position: static

```
往下滑到底和往上滑到顶端需要preventDefault
this.$nextTick(() => {
      let ruleELe = this.$refs.rule;

      ruleELe.addEventListener("touchstart", function(e) {
        this.startY = e.touches[0].clientY;
      });
      ruleELe.addEventListener("touchmove", function(e) {
        var ele = this;
        var currentY = e.touches[0].clientY;
        <!-- 滚到顶端 -->
        if (ele.scrollTop === 0) {
          <!-- 会出现滚动就是01 -->
          status = ele.offsetHeight >= ele.scrollHeight ? "00" : "01";
        <!-- 滚到底部 -->
        } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
          status = "10";
        }
    <!-- 向上滑动"10"，向下滑动"01" -->
    <!-- 向上滑动status01和direction10  向下滑动status10和direction01 需要防止冒泡和去除默认事件-->
        if (status != "11") {
          var direction = currentY - this.startY > 0 ? "10" : "01";
          if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
          }
        }
      });
    });
```

## ios 内层滚动到顶部或者底部无法滑动问题

https://blog.csdn.net/sjn0503/article/details/77865648

## fastclick

https://segmentfault.com/a/1190000015234652 (原理)
https://www.npmjs.com/package/fastclick

## 获取随机数

// if (length > 0) {
// var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// var nums = "";
// for (var i = 0; i < length; i++) {
// var r = parseInt(Math.random() \* 9);
// nums += data[r];
// }
// return nums;
// } else {
// return false;
// }

https://www.cnblogs.com/sunyucui/p/6804481.html

## 判断是否是 safari

需要判断是否是 ios 还是 android（包含 android 或者 os）
再判断
if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) {
browser = 'Safari';
}

## fixed 元素被百度浏览器屏蔽

- 改成 absolute 方式
- 使用伪元素
  https://juejin.im/post/5cd3a38bf265da036f4e99b1
- 注：把图片宽度改成 99%不行，试了不可以

华为打开图片需要授权

## 自定义图片思路

在链接上加参数或者路劲控制

## 用 touchend.stop 触发弹框动作，当滑页面的时候，尽管没点击到按钮，偶现弹框

改用 click 或者 fast-click
