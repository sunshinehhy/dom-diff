**2018.12.07**
站立会：
可用性，一级服务，用户，大概情况。
流程规范：
3 个 9，4 个 9，5 个 9
开发流程、监控报警体系、合理处理问题体制。
自动化做，系统自动化
机房监控可能有的问题就要自我修复和报警

建立高效沟通模板，可以从以下几条说明：
严重程度、为什么、什么问题、事故偶发、怎么办

为什么点击 span 还会出现边界

```
<button v-if="!item.startTimeDot||!item.endTimeDot" class="check-disable-btn" type="info" disabled >
    <span class="play-triangle border-color"></span>
    <span>回放确认</span>
</button>
  .check-disable-btn{
    width:140px;
    height:40px;
    font-size:18px;
    font-weight:bold;
    border-radius:6px;
    color:#FFFFFF;
    cursor: not-allowed;
    background-image: none;
    background-color: #b4bccc;
    .border-color{
      border-color:transparent transparent transparent #FFFFFF;
    }
  }
```

cookie 在 vue 中的使用；
使用 redux 进行通讯
为什么用.jpg
 多看博客（1 天看 2 篇技术博客）
vue 源码(半个月的计划)
Array.isArray(child)

## 2019.5.10

版本控制（是否是 ios 还是安卓，版本号，封装成一个函数，不用 bool 值，用字符串）

封装函数，把业务接口弄出来

## 前端和客户端交互

自己虚拟约定的交互函数格式，未来需要进一步落实：
webAndNativeInteraction(webFunctionName,webPara,naiveFunctionName,nativePara)

webFunctionName：doLogin(nativePara)，客户端把参数传给前端
naiveFunctionName：setAppPageTitle(webPara)，前端把参数传给客户端

当刷新页面的时候，会调用函数。

（图片自动上传到百家云，生成链接）

## H5 需要做的事 2019.5.30

优先级：1，2，3，4

- 上线流程 ——————1
- 添加 fastclick 功能——————1 辉云
- 埋点优化（添加 openId、封装行为）——————1 辉云
- 音频、视频、toast、消息弹框、浮框、loading、底部按钮 、倒计时、tab 等组件封装 (建议 ts)——————2 宋乾 demo 付煜
- 图片加载优化（宽高比、首屏先加载） ——————2 宋乾

- 查找 test1 的二次分享不能获取分享信息的问题，影响测试 ——————2
- 语文活动页专题体验优化（浮动组件）—————— 1
- 图片上传到阿里云，解决复制粘贴、可视化问题 ——————4
- 解决分享 token 失效问题 ——————3
- 添加单元测试—————— 4
- 完整的初始化 css 和按分类抽离出 api ——————2
- 严格 code review ——————1
- rem、百分比、vw 方式选择 ————3
  人员分配、落地到具体事件
  vue-cl3

## 工作总结

**语文售卖：**
弹框滚动：

- ios 滚动上下会拉动
- P3 安卓手机滑动失效，必须手不移开会有效

**结课证书：**
截屏：

- 图片大小、格式、上传速度

**语文售卖二区：**
touch:
在 ios 中，在某一设备上打开链接，用 touchend 打开原生路由，会不生效，换成 click 可以

video：

- 安卓默认样式不一样
- 安卓播放全屏失效（记录手机系统）
- 安卓点击播放，z-index 不生效
- ios 设置 playsinline 无效，依旧会全屏

定位:

- 滚动效果
- 监听 onscroll 不及时（在 onscroll 中设置的样式，在滚动过程中，会延迟执行）
- 弹出浮框有动画效果

精灵图：

- 设置位置和大小规律

ios H5 只有 play 才能阻止全屏，音频点 2 下才能播（safari 中不行），在全局加个 touch 事件，调用 2 次。网易音乐也做了一层处理。

## H5 技术债

样式：

- 1 个按钮
- 2 个横向按钮
- 2 个竖排按钮
- 公共 css 抽离

组件：

- 升级
- toast
- 音频、视频组件
- loading
- 倒计时
- 表格
- 浮框
- 顶部固定 tab
- 截图组件

优化：

- 图片加载
- 埋点
- 预览
- 图片上传
- 高宽比 css 方式

建议：
图片、文案尽量可配
