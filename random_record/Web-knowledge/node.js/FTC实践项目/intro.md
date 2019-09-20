<倪卫国:
http://10.148.126.11:4100/login

这是我们在gitlab上的机构账号 https://gitlab.com/ftchinese，大家有时间去注册账号加入组织，都是私有仓库，只有加入进来才能看
倪卫国:
https://gitlab.com/ftchinese/node-deployer 这个仓库部署node程序的工具
倪卫国:
https://gitlab.com/ftchinese/ansible 这是用ansible自动化服务器部署的工具
倪卫国:
https://gitlab.com/ftchinese/sql-schema 这是MySQL schema的仓库，以后我们建立的所有sql数据库方案都尽量写到这里，留下注释>

https://gitlab.com/ftchinese/next-api/blob/master/models/article.go 这是外部使用的api，用go写，写cms-api可参考该库中的sql语句部分。

发邮件的功能做了一个独立服务，这个仓库 https://github.com/FTChinese/email-service

### FTC内部使用的API
http://10.148.126.11:8100/

### FTC基本的统计信息
<http://10.148.126.11:8100/ftc-user/stats/daily-new>

### api实用范例
backyard-user使用了cms-api写的api。

next-user  bakyard-user  cms-api(数据库restful)

## FTC Developer Network
http://10.148.126.11:3001/ cms账号登陆 (登录进来是：http://10.148.126.11:3001/)
外网地址 http://developer.ftchinese.com/

## next-user
http://10.148.126.11:4100/login

## next-api
http://10.148.126.11:8000/  （听卫国哥说不可以）

## 测试登录功能比较麻烦，数据库没有更新，api不能用，想在本机试的话可以照这个操作：
1. Install MySQL.
2. Use `https://gitlab.com/ftchinese/sql-schema` to setup schema and populate data.
3. Install Golang
4. Clone this repository `https://gitlab.com/ftchinese/next-api` into golang's designated path, which should be `~/go/src/gitlab.com/ftchinese`.
5. `cd` into `~/go/src/gitlab.com/ftchinese/next-api`
6. Execute `make`.
运行到这就可以，低7和8步安卓需要使用

7. Use [Serveo](https://serveo.net/) for forward external request to your localhost: `ssh -R 80:localhost:8000 serveo.net`
8. Change `private const val BASE = "https://lacerta.serveo.net"` in this package `util/ApiEndpoint` to the URL Serveo gives you.