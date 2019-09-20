port:8999

http://localhost:8999/login  

疑问：
- utils/db.js 为什么用chance.natural()
- 客户端证书授予、授权代码 、使用隐式授予授予什么区别？
- cms和ftc账号不一样，token是注册的人也会获取吗？获取api还是仅仅是内部员工需要？（我的理解现在是仅仅能使用cms账号，ftc账号还不能使用，需要提供email）
- 我现在可以创建token吗?创建是怎么生成的呢？
```
4720c1ac335c6470a3b28705926aeba59f6dbb34
access information
Scopes: articles user

myFT account:

Created on: 2018-05-14T19:34:23+08:00
```
- scripts、apps可能会用到token吗？为什么需要用到？
- Authorization header是什么？
- 现在都能编辑操作吗？不需要一个管理员？
- 这个api是请求吗？还包含什么？
-  in a header是在哪里？

## 登录的整个过程，我自己的理解
请求返回credentials(证书)。再用credentials取authenticate（认证）
credentials包含name 、password。

authenticate是获取userinfo，然后

<!--获取权限-->
   const access = new Passport({
      userId: ctx.userinfo.uid,
      groupMembers: ctx.userinfo.groupMembers
    })
    .setApp(ctx.appMode)
    .collect();

s为cmstmp01.managers  ,a为backyard.staff_access
    s.id AS uid,
    a.group_memberships AS groupMembers,
    s.username AS userName

还得设置session
ctx.session.user = {
      uid: ctx.userinfo.uid,
      sub: ctx.userinfo.userName,
      groups: ctx.userinfo.groupMembers,
}
ctx.session.access = access;


## 疑问：
- isOwner()这是什么权限的人？既要有Group Memberships:，又要有id（用户名），有权限进入
-  Call `new Possport(userinfo).setApp(appMode)` to caculate access rights.
 .setApp({
    ownerId: 75,
    groupId: 2,
    unixPerms: 500
  })

login.html怎么能get，除非点击登录吧？