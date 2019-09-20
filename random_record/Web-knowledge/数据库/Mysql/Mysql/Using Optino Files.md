https://dev.mysql.com/doc/refman/8.0/en/option-files.html

大多数MySQL程序可以从选项文件(有时称为配置文件)读取启动选项。选项文件提供了一种方便的方式来指定常用的选项，以便在每次运行程序时不需要输入命令行。

要确定程序是否读取选项文件，请使用-help选项调用它。(对于mysqld，使用——verbose和——help)。如果程序读取选项文件，帮助消息指明它查找的文件和它识别的选项组。

请注意:
+ 一个MySQL程序启动时，是除了.mylogin.cnf以外的 --no-defaults option 。

+ 一个服务器从persisted_globals_load系统变量开始，禁用了不读取mysqld-auto.cnf。

许多选项文件都是纯文本文件，使用任何文本编辑器创建。异常:

- 包含登录路径选项的.mylogin.cnf文件。这是由mysql_config_editor实用程序创建的加密文件。参见第4.6.7节“mysql_config_editor - MySQL配置实用程序”。“login path”是一个选项组，它只允许某些选项:host, user, password, port and socket。客户端程序指定使用-login-path选项从.mylogin.cnf中读取的登录路径。

要指定另一个登录路径文件名，请设置MYSQL_TEST_LOGIN_FILE环境变量。这个变量被mysql-test-run.pl测试实用程序使用，但也被mysql_config_editor和MySQL客户机(如MySQL、mysqladmin等)识别。

- 数据目录中的mysqld-auto.cnf文件。这个json格式文件包含持久的系统变量设置。它是由服务器在执行SET PERSIST或PERSIST_ONLY语句时创建的。参见第13.7.5.1节“为变量赋值设置语法”。应该将mysqld-auto.cnf的管理留给服务器，而不是手动执行。

MySQL根据下面讨论中描述的顺序查找选项文件，并读取任何存在的文件。如果您想要使用的选项文件不存在，请使用适当的方法创建它，就像刚才讨论的那样。

在Windows上，MySQL程序从下表中所示的文件中读取启动选项，按照指定的顺序排列(首先读取列出的文件，然后优先读取文件)。