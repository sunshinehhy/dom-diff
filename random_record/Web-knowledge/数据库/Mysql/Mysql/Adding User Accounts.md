https://dev.mysql.com/doc/refman/5.7/en/adding-users.html

你可以用两种方式创建MySQL帐户:

- 通过使用用于创建帐户和建立其特权的帐户管理语句，例如CREATE USER and GRANT. 。这些语句导致服务器对底层的grant表进行适当的修改。
- 通过使用INSERT、UPDATE或DELETE等语句直接操作MySQL grant表。