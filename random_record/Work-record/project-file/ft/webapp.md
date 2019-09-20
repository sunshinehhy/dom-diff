readstory()函数触发的地方：
1. 点击文章入口
2. //将文章页和频道页中的链接进行智能转换function handlelinks() 
3. 获取文章失败再读一次
4. 点相关文章调用读 story
5. 点击story阅读全文 调用
6. 如果上一个页面为文章页，读取文章页
7. fillContent(loadType)中调用了readstory()

startpage(); ->loadHomePage('start');->loadToHome(data, loadType);->fillContent();

因为一登出，paywall值就变为1，所以登出还在设置缓存没有关系。这样可以方便更新所有


// payWallUpdateHint('api/paywall.json').then(function(){
    readstory(storyid, storyHeadline); 
// });
// payWallUpdateHint('api/paywall.json');
// readstory(storyid, storyHeadline);  

搜索时间出来的链接
http://api001.ftimg.net/index.php/ft/channel/phonetemplate.html?channel=nexthome&screentype=wide&20180306121800&date=2018-4-2

打开音频
http://m.corp.ftchinese.com/index.php/ft/interactive/11155?i=2&audio=http://v.ftimg.net/album/ft_culturecaststjamesfinal_multitrack_mixdown.mp3&1523005482928=&exclusive=#adchannelID=1100


## 英语速读
引用模板：phone/gym.html
interactive_speedread.html 引用gym.html

interactive.html引用
<%include file="interactive/interactive_speedread.html"%>

$channelId != "ftacademy" || $channelId != "hotcourse" || $channelId != "mbacamp" || $channelId != "quizplus" || $channelId != "mbaread"