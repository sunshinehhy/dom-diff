## package.json 文件至少要有两部分内容：
- “name” : 全部小写，没有空格，可以使用下划线或者横线
- “version” : x.x.x 的格式；符合“语义化版本规则”
  + 版本的格式可以使version完全匹配,>,>=,<,<=这个版本，~Version接近这个版本，^version兼容这个版本等
  + 1.2.x X代表任意数字，因此1.2.1, 1.2.3等都可以

## 其它：
- "private": true,private设置为true，npm会拒绝发布，这样会防止私有的repositories不小心被发布出去。
- description：描述信息，有助于搜索
- main: 入口文件，一般都是 index.js
- scripts：支持的脚本，默认是一个空的 test
- keywords：关键字，有助于在人们使用 npm search 搜索时发现你的项目
- homepage: 项目url主页
- author,contributors: 坐着和贡献者。格式设置如下： 
```
{ “name” : “Barney Rubble” 
, “email” : “b@rubble.com” 
, “url” : “http://barnyrubble.tumblr.com/” 
}
```
- license：项目许可证，让使用者知道是如何被允许使用此项目。默认是 MIT
- bugs：当前项目的一些错误信息，如果有的话
- dependencies：在生产环境中需要用到的依赖
- devDependencies：在开发、测试环境中用到的依赖

- bugs: 项目问题反馈的Url或email配置，如： 
```
{ 
“url” : “https://github.com/owner/project/issues“, 
“email” : “project@hostname.com” 
}
```
- files: 包含在项目中的文件数组。如果在数组里面声明了一个文件夹，那也会包含文件夹中的文件。可以声明一些规则来忽略部分文件。可以在项目根目录或者子目录里声明一个.npmignore。
- repository
```
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sunhannie/xxxx.git"
  }
```