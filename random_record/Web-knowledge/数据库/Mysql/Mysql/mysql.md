https://gist.github.com/oinume/fc9b72bd8b14ab07e94c

https://www.cnblogs.com/wajika/p/6323026.html

## 命令行
mysqladmin --help

locate my.cnf
whereis my.cnf
find . -name my.cnf

当运行locate my.cnf出现下面
```
WARNING: The locate database (/var/db/locate.database) does not exist.
To create the database, run the following command:

  sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist

Please be aware that the database can take some time to generate; once
the database has been created, this message will no longer appear.
```

mysql.server start

启动MySQL服务：mysql.server start
 
停止MySQL服务：mysql.server stop
 
重启MySQL服务:前面路劲保留，也是可以添加路劲运行
sudo /usr/local/mysql/support-files/mysql.server restart

查看安装路劲 which mysql



## 
https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql

username中输入root，可以定义自己的数据库

- 进入mysql shell：mysql -u root -p (然后会显示输入密码；如果登入其他用户，需要exit，然后重新进入shell环境)

- 执行select * from mysql.user;查询mysql的用户信息，可以看到密码是加密的

- 查看mysql版本：在shell环境下输入select version();

- 创建本地数据库新用户：CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'hhytest'@'localhost' IDENTIFIED BY '1234567890';
CREATE USER 'host'@'localhost' IDENTIFIED BY '1234567890';
此时，newuser没有权限对数据库执行任何操作。实际上，即使newuser尝试登录(使用密码、密码)，它们也无法到达MySQL shell。

- 授予权限：GRANT ALL PRIVILEGES ON * . * TO 'newuser'@'localhost';
因此，首先要做的是为用户提供他们需要的信息。

这个命令中的星号引用了它们可以访问的数据库和表(分别)，这个特定的命令允许用户在所有数据库和表中读取、编辑、执行和执行所有任务。

请注意，在这个示例中，我们允许newuser完全访问数据库中的所有内容。虽然这有助于解释一些MySQL概念，但对于大多数用例来说，这可能是不切实际的，而且可能会使数据库的安全性处于高风险。

一旦确定了要为新用户设置的权限，`一定要重新加载所有特权`。

- 刷新权限：FLUSH PRIVILEGES;  (需要执行)
## 问题
Couldn't create database. MySQL said: Access denied for user 'hhytest'@'localhost' to database 'test'

Table 'story' was not locked with LOCK TABLES
## 实例

CREATE TABLE test ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, col binary(32));

https://dev.mysql.com/doc/refman/8.0/en/show-grants.html

## 命令
加上分后代表此语句结束，不然可能没有结束。

show databases;
DROP DATABASE database name;

use DBNAME;
SHOW tables; 
https://github.com/pierregermain/MyDB/wiki/MySQL-Chuleta.sql

 GRANT ALL PRIVILEGES ON * . * TO 'hhytest'@'localhost' WITH GRANT OPTION;
SHOW GRANTS 'hhytest'@'localhost'


DROP USER ‘username’@‘localhost’;  删除用户

https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-and-reset-a-root-password-in-mysql  重置密码（忘记密码可以重置）


https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial  操作数据库基本教程


**mysql在cmd命令行输错后如何结束命令？**
\c 

退出mysql：ctrl+c 


### 查看密码策略
show variables like '%validate_password.policy%';
show variables like '%validate_password.length%';
### 修改密码策略
set global validate_password.policy=0;
set global validate_password.length=1;


mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234567890';
Query OK, 0 rows affected (0.00 sec)

断开shell，但是很mysql没有断：mysql> exit或quit

ALTER USER 'hhytest'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234567890';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234567890';
`
### 查看有哪些数据库
show databases;
### 查看当前使用的是哪个数据库
select database();
### 选择数据库
use [database-name];
### 显示数据库中的tables
show tables;
### 建立数据库
CREATE DATABASE [new-database-name]; 