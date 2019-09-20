http://baijiahao.baidu.com/s?id=1588272775577971568&wfr=spider&for=pc

```
fetch(url).then(function(response) { 
    return response.json;})
    .then(function(data) {
         console.log(data);}).catch(function(e) { 
             console.log("Oops, error");
             });
```
```
try {
     let response = await fetch(url); 
    let data = await response.json; 
    console.log(data);
} catch(e) { 
    console.log("Oops,error", e);
}
```

fetch相对于XMLHttpRequest(XHR)优点:`改善离线体验，保持可扩展性`。
XMLHttpRequest 是一个设计粗糙的 API，不符合关注分离（Separation of Concerns）的原则，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。

await 后面可以跟 Promise 对象，表示等待 Promise resolve() 才会继续向下执行。


总结一下，Fetch 优点主要有：
语法简洁，更加语义化
基于标准 Promise 实现，支持 async/await
同构方便，使用 isomorphic-fetch


https://github.com/bitinn/node-fetch