###head

https://github.com/joshbuchea/HEAD

https://www.cnblogs.com/happiness-mumu/p/6054852.html

RSS（简易信息聚合，也叫聚合内容）是一种描述和同步网站内容的格式。网站提供RSS输出，有利于让用户获取网站内容的最新更新。

- < !-- 允许控制资源从何处加载。-->

\<meta http-equiv="Content-Security-Policy" content="default-src 'self'">

- < !——web应用程序的名称(如果该网站用作应用程序，则只应使用它)——>。

\<meta name="application-name" content="Application Name">

- < !——Chrome、Firefox OS和Opera的主题颜色>。

\<meta name="theme-color" content="#4285f4">

- < !——文档的简短描述(限制为150个字符)——>。
< !这个内容*可以作为搜索引擎结果的一部分。- - >

\<meta name="description" content="A description of the page">

- < !——控制搜索引擎爬行和索引的行为——>。

\<meta name="robots" content="index,follow"><!-- All Search Engines -->
\<meta name="googlebot" content="index,follow"><!-- Google Specific -->

- < !——告诉谷歌不要显示sitelinks搜索框——>。
\<meta name="google" content="nositelinkssearchbox">

- < !——告诉谷歌不提供本文档的翻译——>。
\<meta name="google" content="notranslate">

- < !——验证网站所有权——>。
    * \<meta name="google-site-verification" content="verification_token"><!-- Google Search Console -->
    * \<meta name="yandex-verification" content="verification_token"><!-- Yandex Webmasters -->
    * \<meta name="msvalidate.01" content="verification_token"><!-- Bing Webmaster Center -->
    * \<meta name="alexaVerifyID" content="verification_token"><!-- Alexa Console -->
    * \<meta name="p:domain_verify" content="code_from_pinterest"><!-- Pinterest Console-->
    * \<meta name="norton-safeweb-site-verification" content="norton_code"><!-- Norton Safe Web -->

- < !——识别用于构建文档的软件(例如:WordPress, Dreamweaver)——>。
\<meta name="generator" content="program">

- < !——简要说明文档的主题——>。
\<meta name="subject" content="your document's subject">

- < !——根据文档的内容——>给出一个一般的年龄评分。
\<meta name="rating" content="General">

- < !——允许控制引用信息的传递方式——>。
\<meta name="referrer" content="no-referrer">

- < !——禁用自动检测和格式化可能的电话号码——>。
\<meta name="format-detection" content="telephone=no">

- < !——完全选择退出DNS预取，设置为“off”——>。
\<meta http-equiv="x-dns-prefetch-control" content="off">

- < !——在客户端web浏览器上存储cookie，用于识别目的——>。
\<meta http-equiv="set-cookie" content="name=value; expires=date; path=url">

- < !——指定要出现在特定frame中的文档——>。
\<meta http-equiv="Window-Target" content="_value">

- < !——地理标签- - >
    * \<meta name="ICBM" content="latitude, longitude">
    * \<meta name="geo.position" content="latitude;longitude">
    * \<meta name="geo.region" content="country[-state]"><!-- Country code (ISO 3166-1): mandatory, state code (ISO 3166-2): optional; eg. content="US" / content="US-NY" -->
    * \<meta name="geo.placename" content="city/town"><!-- eg. content="New York City" -->