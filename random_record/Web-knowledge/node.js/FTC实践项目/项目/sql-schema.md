  "user": isProduction ? 'ftnew' : "sampadm",
  "password": isProduction ? 'ftftft.' : "secret"

  sampadm  / secret

  ftnew / ftftft. 


  先 mysql -u sampadm -p
  提示输入密码：secret
  然后会进入 mysql> 


  在此用户名下，已经有多个database。可以在sequel pro下切换看到。
  下一步运行难道启动后再是操作数据库就行吗？

  命令行下操作的数据库能在sequel pro打开


  穿件数据库，然后选择file-》import，选中需要导入的.sql文件，如果导入没错就不会报错，否则会报错
