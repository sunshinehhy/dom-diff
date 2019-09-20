 feedTag是什么？ 归类
 feedType   点进去的类型 (story、column)

 preferLead  shortlead/none/longlead  导语
 hideLead\itemLead

 showTimeStamp   all/new stories/no
 timeDiff\highlightTime

 $item.timeStamp   itemT   

 section.type == "banner" 选择值

$smarty.get.maxB|intval是什么？
float：浮动方式    $listHasFloat
## $item.tag
这个值可能有多个

 ## 'SideMPU': ['name', 'image', 'url']
$list.type != "list"
通过cover的side来确定侧边显示的东西

$list.image != ""%>SideMPU中用到image

## <%assign var="s" value=0%>  s控制第几个

## 'list': ['name', 'title', 'url', 'language', 'description', 'style', 'float', 'showTag', 'showTimeStamp', 'preferLead', 'sponsorAdId', 'sponsorLogoUrl', 'sponsorLink', 'sponsorNote', 'feedStart', 'feedItems', 'feedTag', 'feedType', 'feedImage', 'moreLink']
feedItems 控制条数
$listType === "main"   cover
$listType === "side"
$list.float === "SideBySide"在首页中有，位置是左边是热门文章，右边是三列，右边就用到此样式
## 'SideInclude': ['name', 'title', 'url', 'fromSide']

## SideWithItems':['name', 'title', 'url', 'sideOption', 'feedItems', 'feedTag', 'feedType']
          
## SideRanking': ['name', 'title', 'url', 'feedItems', 'feedTag', 'feedType']
热门文章  热门视频
$list.feedType 控制是放热门文章还是热门视频
list.feedItems控制条数，如果是0，则为10
## 'SideIframe': ['name', 'title', 'url', 'width', 'height']

## 'SideNewAd':['devices','pattern','position','container']

SideInclude、SideMPU 只能放在block中

$itemTagLink是标签链接