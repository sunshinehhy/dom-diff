Linux 命令行快捷键
Ctrl – a ：移到行首   (a)
Ctrl – e ：移到行尾   (end)
Ctrl – b ：往回(左)移动一个字符  (before)
Ctrl – f ：往后(右)移动一个字符  (forward)
Alt – b ：往回(左)移动一个单词
Alt – f ：往后(右)移动一个单词
Ctrl – xx ：在命令行尾和光标之间移动
M-b ：往回(左)移动一个单词
M-f ：往后(右)移动一个单词
编辑命令
`Ctrl – h` ：删除光标左方位置的字符   (d在h的左边，但是是删除右方)
`Ctrl – d` ：删除光标右方位置的字符（注意：当前命令行没有任何字符时，会注销系统或结束终端）
`Ctrl – w `：由光标位置开始，往左删除单词。往行首删
Alt – d ：由光标位置开始，往右删除单词。往行尾删
M – d ：由光标位置开始，删除单词，直到该单词结束。
`Ctrl – k` ：由光标所在位置开始，删除右方所有的字符，直到该行结束。  (k在u的左边，但是是删除右方)
`Ctrl – u` ：由光标所在位置开始，删除左方所有的字符，直到该行开始。
`Ctrl – y `：粘贴之前删除的内容到光标后。

touch  将文件的访问和修改时间更新为当前时间。touch命令只会在文件不存在的时候才会创建它

q  退出
w  保存
## 导航
pwd 查看当前工作目录
cd  改变目录
ls  列出目录内容

## 操作文件与目录
mkdir   在命名路径下创建新的目录
cp 复制文件和目录
mv 移除和重命名文件
rm 删除文件和目录

## sudo
https://baike.baidu.com/item/sudo/7337623?fr=aladdin

## curl
http://man.linuxde.net/curl
http://www.jb51.net/article/118402.htm  (具体例子)

## tar
https://www.howtogeek.com/248780/how-to-compress-and-extract-files-using-the-tar-command-on-linux/

磁带归档文件
tar -czvf name-of-archive.tar.gz /path/to/directory-or-file
比如：tar -czvf archive.tar.gz stuff
stuff为目录或者文件


apt-get