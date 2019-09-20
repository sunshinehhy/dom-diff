http://localhost:8888/configManage  （配置管理 ，选中cms_config，可以编辑json文件）

## git 分支管理规范

开发新功能时:
在master上拉取分支, 以 feature-xxxx 命名, 一个功能点拉一个分支
部署时,将 feature-xxxx merge 到 dev 分支, 在测试服务器上使用 dev 分支部署

提测阶段:
将 feature-xxxx 分支合并到 release-v1.x.x 分支, 在 release-v1.x.x 上修复 bug
部署时,在测试服务器上使用 release-v1.x.x 分支部署

如果需要同时提测两个版本, 或者需要部署仿真环境, 将 release-v1.1.0 和 release-v1.2.0 合并到 dev 分支提测

## 得到jssdk
http://wiki.luojilab.com/pages/viewpage.action?pageId=14778970
这是刚才说的jssdk库地址：
https://gitlab.luojilab.com/FE/fd/luojilab-framework/tree/master/tools/jssdk 
https://gitlab.luojilab.com/FE/ (得到前端git路径)

目前通用的工具，我们是遵照一定的规范去维护的，锁死master分支，只能通过mr的形式把代码合并进来哈

## 专业术语
复述：需求评审和需求反述完，找一个人复述需求

## 录音
https://bushu.jingdaka.com/static/recordMP3/worker.js
https://bushu.jingdaka.com/static/recordMP3/worker-realtime.js
https://bushu.jingdaka.com/static/recordMP3/mp3Converter.js
https://bushu.jingdaka.com/static/recordMP3/recordmp3.js

postMessage：在worker页面init、end（向worker推送finish）
onmessage：init、encode、finish（接收到完成的信息，需要发出end消息，处理MP3文件，获取Blob格式）、restart

start需要触发init

## 保存文件链接，便于测试
http://localhost:8888/courseMakeClass/workAndAnswerDetail?courseId=272134537325391872&chapterId=308329500475023360&scheduleId=308332245865095168&classId=273953183085858816

http://test2-2.igetcool.com/courseMakeClass/workAndAnswerDetail?courseId=292822837537554432&chapterId=293107355662233600&scheduleId=293107512013303808&classId=292824404105908224

http://cms.igetcool.com/courseMakeClass/workAndAnswerDetail?courseId=282752024799539200&chapterId=304356627694641152&scheduleId=304356987339431936&classId=303369389598982144


tempTextareaRemarkValue这个值可能不对