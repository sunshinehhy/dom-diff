# requrestAnimationFrame

window.requestAnimationFrame() 方法告诉浏览器`您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画`。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。


## 语法
```js
window.requestAnimationFrame(callback);
```

Param:
- callback: Type Function。该函数在浏览器执行下次重绘时调用。
  - DOMHighResTimeStamp:该回调函数只有这一个传参， 指示requestAnimationFrame() 开始触发回调函数的当前时间(performance.now()返回的时间，单位为毫秒，精确度在千分之一毫秒)

Return:
一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

注意:
- 执行回调的次数通常是每秒60次，因为浏览器刷新频率是60Hz
- 运行在后台标签页或者隐藏的< iframe> 里时，requestAnimationFrame() 会暂停调用以提升性能和电池寿命。

## 用例:如何渲染几万条数据而不卡住页面:
使用requrestAnimationFrame()来每16ms插入一些数据刷新一次
```html
<ul id='dataList'>渲染几万条数据而不卡住页面</ul>

  <script>
    setTimeout(() => {
      const total = 100000;//总共插入10万条数据
      const once = 20;//一次插入20条数据
      const loopCount = Math.ceil(100000/20);//渲染总次数
      let countOfRender = 0;

      const ul = document.getElementById('dataList');
      
      
      const add = function() {
        const liFragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
          const li = document.createElement('li');
          li.textContent = Math.floor(Math.random() * total);
          liFragment.appendChild(li);
        }
        ul.appendChild(liFragment);
        countOfRender++;

        if(countOfRender < loopCount) {
          window.requestAnimationFrame(add);
        }
      }

      window.requestAnimationFrame(add);
      

    }, 0)
  </script>
```


requestAnimationFrame使用JS操作动画，如果你想做逐帧动画，你应该用这个方法。这个方法接受一个函数为参，该函数会在重绘前调用。

requestAnimationFrame通过在参数中递归调用requestAnimationFrame()以便得到逐帧动画，被调用的频率是每秒60次，但也会按照W3C标准频率。

```
//动态调整元素左边距,到200px停止
var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress/10, 200) + "px";
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
得出的现象是重复从左往右运行到2000
```
timestamp是时间戳，为每执行一次传给调用函数的参数，表示动画开始到现在消耗的时间，单位是毫秒。