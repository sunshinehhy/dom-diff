- add 任务
- 点击 git，填写 gitlab url 和 人员
- 设置分支名（jenkins）
- 然后设置需要执行的任务（shell npm run build-test1）
- 保存
- 执行 build now
- 在堡垒机上输入 223，会自动进入测试 2 环境，输入项目目录：执行 sudo npm i 和 npm run build-test2 (看是否能成功)
  再 build now ，如果还是不能成功，在堡垒机中输入 ll，查看日志。可能是操作身份跟 jenkins 不同，需要同步（访问文件的身份可能不同，删除对应文件？有待继续实验）
- 配置 Nginx，指向 build 后的目录（讲 jenkins 的路劲配置在 nginx 中）

UJKH H 上线  
WQ 保存并退出。
插入

vim + 路劲（在 jenkins 中找），进入到对应路劲编辑
pwd 进入当前文件
nginx -s reload 重新启动 nginx

http://wiki.luojilab.com/pages/viewpage.action?pageId=29615571 (jenkins 使用)

git push origin jenkins2 --force

git reset --hard origin/my-feature
