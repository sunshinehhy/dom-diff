https://www.cnblogs.com/tandaxia/p/8810648.html

## 出错server name "*" has suspicious symbols


nginx要求  server_name 不能包含“/”    

错误：server_name http://xxx.com;

正确：server_name xxx.com;


## 命令
	 ifconfig  看ip地址

	 ls -l  以列表展示

	 ls -al  以列表展示并能看到隐藏文件

	 chown hehuiyun nginx/
	 chown 777 nginx/  利用 chown 将指定文件的拥有者改为指定的用户或组，用户可以是用户名或者用户ID；组可以是组名或者组ID；文件是以空格分开的要改变权限的文件列表，支持通配符

	 whereis nginx  查看nginx在哪里
	 cd /usr/local/bin/nginx 
	 ps -ef | grep nginx   grep命令是一种强大的文本搜索工具，它能[使用正则表达式]搜索文本，并把匹 配的行打印出来。
	 


`打开本地host：sudo vi /etc/hosts`


## 配置 http://live-dev.igetcool.com 转发到本地方式
+ nginx -h
+ 找到本地nginx配置文件(vim /usr/local/etc/nginx/nginx.conf)，修改域名为已配域名例如http://live-dev.igetcool.com
+ 本地host(sudo vi /etc/hosts)修改http://live-dev.igetcool.com
+ sudo nginx -s reload

注意：必须要启动本地服务才能测试nginx是否生效

```
server {
        listen       80;
        server_name  live-dev.igetcool.com;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
                proxy_pass http://127.0.0.1:8081/;
        }

        #location / {
        #    root   html;
        #    index  index.html index.htm;
        #}

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
#        error_page   500 502 503 504  /50x.html;
#        location = /50x.html {
#            root   html;
#        }

```

原理就是本地得代理到 http://live-dev.igetcool.com， nginx是服务live-dev.igetcool.com代理到本地，这样以后开发用 http://live-dev.igetcool.com:8081/webcourse 这个就行

本地启动项目一般是http://127.0.0.1，但是要使用域名live-dev.igetcool.com打开本地项目，就得即在sudo vi /etc/hosts 将本地代理到  live-dev.igetcool.com，又得在本地nginx把服务live-dev.igetcool.com代理到本地。

前者是为了用live-dev.igetcool.com打开，后者是为了请求到live-dev.igetcool.com服务的数据。

文件地址：/usr/local/opt/nginx/html/index.html

/usr/local/opt/nginx/bin/nginx

- 复制网站TanWeb文件夹物理路径，打开终端，准备编辑nginx的配置文件：

vim /usr/local/etc/nginx/nginx.conf

- 重新启动nginx

sudo nginx -s reload

- 启动nginx 
start nginx

三.nginx基本控制
要启动nginx，请运行可执行文件。一旦nginx启动，就可以通过调用带有-s参数的可执行文件来控制它。使用以下语法：

nginx -s signal
当信号可以是下列之一：

stop - 快速关机
quit - 优雅的关机
reload - 重新加载配置文件
reopen - 重新打开日志文件
例如，要停止nginx进程并等待工作进程完成当前请求的服务，可以执行以下命令：

nginx -s quit
这个命令应该在启动nginx的同一个用户下执行。

说明:如果在启动过程中未正常启动,可以去查看错误日志,根据其中报错信息寻找解决问题的方法;


nginx -s reload  ：修改配置后重新加载生效
nginx -s reopen  ：重新打开日志文件
nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

## Mac下Nginx启动、重启和关闭


- Mac下Nginx的启动 
sudo nginx
- 判断配置文件是否正确
nginx -t  
- 重启Nginx
nginx -s reload 
- 查询nginx主进程号
ps -ef|grep nginx
-  正常停止   
sudo kill -QUIT 主进程号  
- 快速停止   
sudo kill -TERM 主进程号 
- 如果以上命令不管用，可以强制停止
kill -9 nginx主进程号 

bogon:nginx hehuiyun$ cd /usr/local/etc/nginx

如果nginx已经启动，再输入sudo nginx会报以下：
bogon:nginx hehuiyun$ sudo nginx
nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (48: Address already in use)
nginx: [emerg] still could not bind()

nginx -t
nginx: [alert] could not open error log file: open() "/usr/local/var/log/nginx/error.log" failed (13: Permission denied)
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
2019/11/13 13:20:38 [emerg] 87999#0: open() "/usr/local/var/run/nginx.pid" failed (13: Permission denied)
nginx: configuration file /usr/local/etc/nginx/nginx.conf test failed

```
bogon:nginx hehuiyun$ nginx -s reload
nginx: [alert] could not open error log file: open() "/usr/local/var/log/nginx/error.log" failed (13: Permission denied)
2019/11/13 13:21:58 [notice] 88254#0: signal process started
2019/11/13 13:21:58 [alert] 88254#0: kill(86524, 1) failed (1: Operation not permitted)

bogon:~ hehuiyun$ sudo  nginx -s reload
bogon:~ hehuiyun$

加上sudo 就能正常执行
```
bogon:nginx hehuiyun$ ps -ef|grep nginx
    0 86524     1   0 12:40PM ??         0:00.00 nginx: master process nginx
   -2 86525 86524   0 12:40PM ??         0:00.01 nginx: worker process
  502 88282 86156   0  1:22PM ttys002    0:00.00 grep nginx

杀死nginx之后，再输入ps -ef|grep nginx会报以下：
bogon:bin hehuiyun$ ps -ef|grep nginx
  502 90731 86156   0  3:04PM ttys002    0:00.00 grep nginx

- 启动nginx
找到nginx的启动文件终端输入nginx【一般在/usr/local/Cellar/nginx/1.17.3_1/bin/nginx目录下】

进入目录 cd /usr/local/Cellar/nginx/1.17.3_1/bin，
再sudo nginx (我试了，在任何一个文件夹下都能启动nginx))，可以启动nginx

bogon:bin hehuiyun$ sudo nginx

- ps -ef|grep nginx 找到master对应的进程号86524
- 从容的停止，即不会立刻停止：sudo kill -QUIT 86524  
- 立刻停止：Kill -TERM 1348 
- 和上面一样，也是立刻停止：Kill -INT 1348 

## /usr/local/etc/nginx/nginx.conf 配置
**例子**

```
listen       80;
server_name  live-dev.igetcool.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
        proxy_pass http://127.0.0.1:8081/;
}

location ~* ^/api/ {
        proxy_pass http://course-simulate.igetcool.com;
}
```
启动 http://localhost:8081/webcourse/login 后，能打开 http://live-dev.igetcool.com:8081/webcourse/login 和 http://live-dev.igetcool.com/webcourse/login

如果listen  82;
http://live-dev.igetcool.com:82/webcourse/login 才能打开，这意味着默认是80（80在链接上可输可不输）
或者不管listen输什么，带上localhost的8081，也就是http://live-dev.igetcool.com:8081/webcourse/login 一直能打开。

## nginx location正则写法
https://www.cnblogs.com/IPYQ/p/7889399.html

https://blog.csdn.net/bjnihao/article/details/52415269

~* 表示忽略大小写

= 开头表示精确匹配
如 A 中只匹配根目录结尾的请求，后面不能带任何字符串。
^~ 开头表示uri以某个常规字符串开头，不是正则匹配，停止往下搜索正则
~ 开头表示区分大小写的正则匹配;
~* 开头表示不区分大小写的正则匹配
/ 通用匹配, 如果没有其它匹配,任何请求都会匹配到

```
location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ] 
}

location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ] 
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ] 
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ] 
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ] 
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ] 
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ] 
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ] 
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ] 
}

location ~* /js/.*/\.js
```
## 网关转发