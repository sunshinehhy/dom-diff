## scroll 滚动连续多次触发事件只执行一次

```
  (function() {
      var finished = true;
      function loadData() {
          //xxxx
          finished = true;
      }
      dom.onscroll = function() {
          if(finished && this.scrollHeight - this.clientHeight == this.scrollTop) {
              finished = false;
              loadData();
          }
      }
  })();
```

```
  window.addEventListener('scroll', this.handleScroll);
  handleScroll(){
    if (scrollTop > draftHeight - screenHeight) {
      this.isRequestMessage = true;
      window.removeEventListener("scroll", this.handleScroll);
    }
  }
```

## 监听 scroll 事，吸顶，防止抖动

https://cloud.tencent.com/developer/article/1059038

https://blog.csdn.net/weixin_33834679/article/details/89134783

https://www.jb51.net/article/56874.htm

https://www.jb51.net/article/159340.htm