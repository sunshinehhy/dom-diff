React+Redux
React主要就是负责View的部分，其中通过props展示数据。 
Redux里面主要包含一个store，这个store里有state,action,reducer，state保存着数据，如果要修改数据，只能通过action去派发一个事件，然后在reducer里定义这个事件，对state进行修改。

React+Redux与MVC
他们的关系又是怎么样的呢？ 
显然 
React里的各个Components表示View 
Redux里的store里的state表示Model 
Redux里的action和reducer表示Controller 