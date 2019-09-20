- file_get_contents() 函数把整个文件读入一个字符串中。
- php mb_convert_encoding，php内置编码转换方法。
- show_404() 函数调用记录到错误日志中。错误日志在哪？
上传下载需要制定文件属性
- unlink（）删除文件
- strip_tags() 函数剥去字符串中的 HTML、XML 以及 PHP 的标签。
- echo() 函数输出一个或多个字符串。
- mysqli_connect() 函数打开一个到 MySQL 服务器的新的连接。
- mysqli_query() 函数执行某个针对数据库的查询。
- mysqli_select_db(connection,dbname)选取一个数据库
- addslashes() 函数返回在预定义字符之前添加反斜杠的字符串。
- unset() 销毁指定的变量。
- unset() 在函数中的行为会依赖于想要销毁的变量的类型而有所不同。
如果已经使用 unset() 释放了一个变量之后，它将不再是 isset()。若使用 isset() 测试一个被设置成 NULL 的变量，将返回 FALSE。同时要注意的是一个 NULL 字节（"\0"）并不等同于 PHP 的 NULL 常数。
- mt_rand() 使用 Mersenne Twister 算法返回随机整数。

- resource curl_init ([ string $url = NULL ] )
初始化一个新的会话，返回一个cURL句柄，供curl_setopt(), curl_exec()和curl_close() 函数使用。
[curl_init](https://www.runoob.com/php/func-curl_init.html)

```
初始化一个新的cURL会话并获取一个网页
    <?php
    // 创建一个新cURL资源
    $ch = curl_init();

    // 设置URL和相应的选项
    curl_setopt($ch, CURLOPT_URL, "http://www.runoob.com/");
    curl_setopt($ch, CURLOPT_HEADER, 0);

    // 抓取URL并把它传递给浏览器
    curl_exec($ch);

    // 关闭cURL资源，并且释放系统资源
    curl_close($ch);
    ?>

```
- fwrite(file,string,length) fwrite() 把 string 的内容写入文件指针 file 处。 如果指定了 length，当写入了 length 个字节或者写完了 string 以后，写入就会停止，视乎先碰到哪种情况。
- flock() 函数锁定或释放文件
- usleep()函数的功能是把调用该函数的线程挂起一段时间
- strrev() 函数反转字符串
- bin2hex() 函数把 ASCII 字符的字符串转换为十六进制值。字符串可通过使用 pack() 函数再转换回去
- base64_decode — 对使用 MIME base64 编码的数据进行解码
- ini_set  设置配置选项的值。设置给定配置选项的值。配置选项将在脚本执行期间保留这个新值，并在脚本的结束处恢复