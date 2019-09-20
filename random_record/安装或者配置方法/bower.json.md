在主文件下面新建一个文件 .bowerrc 来指定bower安装到哪一个目录下面
```
{
 "directory":"public/libs"   (这是新建的目录，默认在bower_components中)
}
```
```
{
"name": "angular-phonecat",
"description": "A starter project for AngularJS",
"version": "0.0.0",
"homepage": "https://github.com/angular/angular-phonecat",
"license": "MIT",
"private": true,
"ignore":  [
    "**/.*",
    "node_modules",
    "bower_components"
  ],
"dependencies": {
    "angular": "1.5.x",
    "angular-animate": "1.5.x",
    "angular-mocks": "1.5.x",
    "angular-resource": "1.5.x",
    "angular-route": "1.5.x",
    "bootstrap": "3.3.x",
    "jquery": "2.2.x"
    }
}
```