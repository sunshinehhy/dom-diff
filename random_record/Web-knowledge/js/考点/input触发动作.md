## 知识点
在输入中文（包括语音识别时）会先后触发compositionstart、compositionend事件，类似于keydown和keyup的组合。

触发compositionstart时，文本框会填入 “虚拟文本”（待确认文本），同时触发input事件；在触发compositionend时，就是填入实际内容后（已确认文本）。

一般用change，不用input和compositionend，因为一些浏览器不支持。
Safari < 10.2 & UIWebView doesn't fire compositionend

## 需求：选词完成后触发input事件，只触发一次
```
<body>
    <input id="txt" type="text">
    <script>
        var flag = true;
        $('#txt').on('compositionstart',function(){
            flag = false;
        })
        $('#txt').on('compositionend',function(){
            flag = true;
        })
        $('#txt').on('input',function(){
            var _this = this;
            setTimeout(function(){
                if(flag){
                    console.log($(_this).val());
                }
            },0)
        })
    </script>
</body>
```
**为什么使用延时器？**
因为选词结束的时候input会比compositionend先一步触发，此时flag还未调整为true，所以不能触发到console，故用setTimeout将其优先级滞后。

