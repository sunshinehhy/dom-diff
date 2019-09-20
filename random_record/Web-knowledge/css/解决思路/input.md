## 滑块的 z-index 生效

参考：
https://codepen.io/anon/pen/vOmQxr

https://stackoverflow.com/questions/30723341/different-z-index-for-thumb-and-track-in-html5-range-slider-in-firefox

input[type="range"] {

}
/_ 滑块 _/
input[type="range"]::-webkit-slider-thumb {
position:relative;
z-index: 1005;
height: 24px;
width: 24px;
-webkit-appearance: none;
margin-top: -7px;
border-radius: 50%;
background: #20A0FF no-repeat;
border: 4px solid #FFFFFF ;
box-shadow:0px 2px 6px 0px #000000;

}
滑块必须要 position 和 z-index，input[type="range"]不需要 z-index，否则会按照 input[type="range"]设置的 z-index

当页面移动会穿透
