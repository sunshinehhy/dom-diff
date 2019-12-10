https://github.com/Tencent
## 在微信网页中获取用户的网络状态
WeixinJSBridge.invoke('getNetworkType',{},function(e){
    // 在这里拿到e.err_msg，这里面就包含了所有的网络类型
    alert(e.err_msg);
})
network_type:wifi wifi网络 2 network_type:edge 非wifi,包含3G/2G 3 network_type:fail 网络断开连接 4 network_type:wwan 2g或者3g

## 禁用微信分享
```
  <script>
      function onBridgeReady() {
          WeixinJSBridge.call('hideOptionMenu');
      }

      if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
      } else {
          onBridgeReady();
      }
  </script>
```
## vue 中解决IOS端微信内置浏览器底部前进后退的bar
  location.replace(URL)
  this.$router.replace 代替   this.$router.push