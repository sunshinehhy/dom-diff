先说一下最土的一种方法：

Html:

```
        <div class="tab-head">
            <h2 id="tab1" onmouseover="changeTab1()" class="selected">1</h2>
            <h2 id="tab2" onmouseover="changeTab2()">2</h2>
            <h2 id="tab3" onmouseover="changeTab3()">3</h2>
        </div>
        <div class="tab-content">
            <div id="c1" class="show">content1</div>
            <div id="c2">content2</div>
            <div id="c3">content3</div>
        </div>
```
CSS:

```
            h2 {
                border-top: solid cornflowerblue 1px;
                border-left: solid cornflowerblue 1px;
                width: 50px;
                height: 25px;
                margin: 0;
                float: left;
                text-align: center;
            }
            
            .tab-content {
                border: solid cornflowerblue 1px;
                width: 152px;
                height: 100px;
            }
            
            .tab-content div{
                display: none;
            }
            
            .selected {
                background-color: cornflowerblue;
            }
            
            .tab-content .show{
                display: block;
            }
```
JS:

```
            var tab1 = document.getElementById('tab1'),
                tab2 = document.getElementById('tab2'),
                tab3 = document.getElementById('tab3'),
                c1 = document.getElementById('c1'),
                c2 = document.getElementById('c2'),
                c3 = document.getElementById('c3');

            function changeTab1() {
                tab1.className = 'selected';
                tab2.className = '';
                tab3.className = '';
                c1.className = 'show'
                c2.className = '';
                c3.className = '';
            }

            function changeTab2() {
                tab1.className = '';
                tab2.className = 'selected';
                tab3.className = '';
                c1.className = '';
                c2.className = 'show';
                c3.className = '';
            }

            function changeTab3() {
                tab1.className = '';
                tab2.className = '';
                tab3.className = 'selected';
                c1.className = ''
                c2.className = '';
                c3.className = 'show';
            }
```
效果：



实现Tab的切换，我们很容易想到的一种方式就是给每一个要控制的标签添加id，然后分别编写鼠标事件，使用id获取每个元素，精确地控制每个元素的样式。

这种方式的缺点显而易见，有几个元素就有几个id，每个tab都要编写function，里面的方法大同小异。要增加tab的话，还要增加id和function，代码冗余，不易扩展。

 

第二种较为高明些的方法是编写一个function，将每个元素的序号传进去。

Html：

```
        <div class="tab-head">
            <h2 onmouseover="changeTab(0)" class="selected">1</h2>
            <h2 onmouseover="changeTab(1)">2</h2>
            <h2 onmouseover="changeTab(2)">3</h2>
        </div>
        <div class="tab-content">
            <div class="show">content1</div>
            <div>content2</div>
            <div>content3</div>
        </div>
```
JS：

```
            var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h2'),
                contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

            function changeTab(index) {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    if(i === index) {
                        tabs[i].className = 'selected';
                        contents[i].className = 'show';
                    }else{
                        tabs[i].className = '';
                        contents[i].className = '';
                    }
                }
            }
```
这样就只要写一个function了，而且不需要id，但是还是要按照顺序传递参数。

 

第三种方式和第二种基本一样，只是参数传递的是this指针。

Html：
```

        <div class="tab-head">
            <h2 onmouseover="changeTab(this)" class="selected">1</h2>
            <h2 onmouseover="changeTab(this)">2</h2>
            <h2 onmouseover="changeTab(this)">3</h2>
        </div>
        <div class="tab-content">
            <div class="show">content1</div>
            <div>content2</div>
            <div>content3</div>
        </div>
```
JS：

```
            var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h2'),
                contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

            function changeTab(tab) {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    if(tabs[i] === tab) {
                        tabs[i].className = 'selected';
                        contents[i].className = 'show';
                    } else {
                        tabs[i].className = '';
                        contents[i].className = '';
                    }
                }
            }
```
这种方式稍微方便一些，只要传递this指针，不用按照顺序传递序号，但这也不是最简便的方式。

 

最简便的一种：

第四种方式：

Html：

```
        <div class="tab-head">
            <h2 class="selected">1</h2>
            <h2>2</h2>
            <h2>3</h2>
        </div>
        <div class="tab-content">
            <div class="show">content1</div>
            <div>content2</div>
            <div>content3</div>
        </div>
```
JS：

```
            var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h2'),
                contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

            (function changeTab(tab) {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    tabs[i].onmouseover = showTab;
                }
            })();

            function showTab() {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    if(tabs[i] === this) {
                        tabs[i].className = 'selected';
                        contents[i].className = 'show';
                    } else {
                        tabs[i].className = '';
                        contents[i].className = '';
                    }
                }
            }
```
这样JS、Html、CSS就完全分离了，通过this指针就可以判断当前鼠标滑过的是哪一个tab了。