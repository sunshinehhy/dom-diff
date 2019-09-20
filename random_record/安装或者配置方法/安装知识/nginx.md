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
	 


打开本地host：sudo vi /etc/hosts


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