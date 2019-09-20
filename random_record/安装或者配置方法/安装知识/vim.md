最好不在vim中配置环境变量，在编辑器中配置。
## 命令
在末行模式下，输入命令   

`:w `  Vi保存当前编辑文件，但并不退出，而是继续等待用户输入命令。在使用w命令时，可以再给编辑文件起一个新的文件名。

` :w   newfile `  此时Vi将把当前文件的内容保存到指定的newfile中，而原有文件保持不变。若newfile是一个已存在的文件，则Vi在显示窗口的状态行给出提示信息： 

`File   exists   (use   !   to   override) `

此时，若用户真的希望用文件的当前内容替换newfile中原有内容，可使用命令 
`:w!   newfile `

，否则可选择另外的文件名来保存当前文件。 

在末行模式下，输入命令  

 `:q `   系统退出Vi返回到shell。若在用此命令退出Vi时，编辑文件没有被保存，则Vi在显示窗口的最末行显示如下信息： 

`No   write   since   last   change   (use   !   to   overrides) `

提示用户该文件被修改后没有保存，然后Vi并不退出，继续等待用户命令。若用户就是不想保存被修改后的文件而要强行退出Vi时，可使用命令 
`:q! `

Vi放弃所作修改而直接退到shell下。 

在末行模式下，输入命令   

`:wq `     Vi将先保存文件，然后退出Vi返回到shell。 

在末行模式下，输入命令   

`:x `   该命令的功能同命令模式下的ZZ命令功能相同





## Linux下查看和添加环境变量
```
echo $PATH

/Users/huiyun/.nvm/versions/node/v8.0.0/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/go/bin:/Users/huiyun/android-sdks/platform-tools

```
$PATH：决定了shell将到哪些目录中寻找命令或程序，PATH的值是一系列目录，当您运行一个程序时，Linux在这些目录下进行搜寻编译链接。

　　编辑你的 PATH 声明，其格式为：

　　PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>

　　你可以自己加上指定的路径，中间用冒号隔开。环境变量更改后，在用户下次登陆时生效，如果想立刻生效，则可执行下面的语句：$ source .bash_profile

　　需要注意的是，最好不要把当前路径 “./” 放到 PATH 里，这样可能会受到意想不到的攻击。完成后，可以通过 $ echo $PATH 查看当前的搜索路径。这样定制后，就可以避免频繁的启动位于 shell 搜索的路径之外的程序了。

 

1. 可用 export 命令查看PATH值
```
[root@localhost u-boot-sh4]# export
declare -x CVS_RSH="ssh"
declare -x DISPLAY=":0.0"
declare -x G_BROKEN_FILENAMES="1"
declare -x HISTSIZE="1000"
declare -x HOME="/root"
declare -x HOSTNAME="localhost"
declare -x INPUTRC="/etc/inputrc"
declare -x LANG="zh_CN.UTF-8"
declare -x LESSOPEN="|/usr/bin/lesspipe.sh %s"
declare -x LOGNAME="root"
declare -x LS_COLORS="no=00:fi=00:di=00;34:ln=00;36:pi=40;33:so=00;35:bd=40;33;01:cd=40;33;01:or=01;05;37;41:mi=01;05;37;41:ex=00;32:*.cmd=00;32:*.exe=00;32:*.com=00;32:*.btm=00;32:*.bat=00;32:*.sh=00;32:*.csh=00;32:*.tar=00;31:*.tgz=00;31:*.arj=00;31:*.taz=00;31:*.lzh=00;31:*.zip=00;31:*.z=00;31:*.Z=00;31:*.gz=00;31:*.bz2=00;31:*.bz=00;31:*.tz=00;31:*.rpm=00;31:*.cpio=00;31:*.jpg=00;35:*.gif=00;35:*.bmp=00;35:*.xbm=00;35:*.xpm=00;35:*.png=00;35:*.tif=00;35:"
declare -x MAIL="/var/spool/mail/root"
declare -x OLDPWD="/root"
declare -x PATH="/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin"
declare -x PWD="/opt/STM/STLinux-2.3/devkit/sources/u-boot/u-boot-sh4"
declare -x SHELL="/bin/bash"
declare -x SHLVL="1"
declare -x SSH_ASKPASS="/usr/libexec/openssh/gnome-ssh-askpass"
declare -x TERM="xterm"
declare -x USER="root"
declare -x XAUTHORITY="/root/.xauthkSzH7b"
```
2. 单独查看PATH环境变量，可用：

[root@localhost u-boot-sh4]#echo $PATH
/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin

3. 添加PATH环境变量(临时)，可用：

[root@localhost u-boot-sh4]#export PATH=/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH

再次查看：

[root@localhost u-boot-sh4]# echo $PATH
/opt/STM/STLinux-2.3/devkit/sh4/bin:/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin

说明添加PATH成功。

上述方法的PATH 在终端关闭 后就会消失。

4. 永久添加环境变量(影响当前用户)

#vim ~/.bashrc
export PATH="/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH"
 
5.永久添加环境变量(影响所有用户)
# vim /etc/profile
在文档最后，添加:
export PATH="/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH"
保存，退出，然后运行：
#source /etc/profile
不报错则成功。

问题： 

1. 做了各实验，在/etc/profile, ~/.profile, ~/.bashrc中加入新PATH，重启都没有效果，只有使用source才可以，ubunt12.04

 找到原因，~/.zshrc导致的，因为在zshrc中直接对PATH重新赋值，而没有继承之前的$PATH，导致启动加载完/etc/profile后，PATH又被重新赋值。