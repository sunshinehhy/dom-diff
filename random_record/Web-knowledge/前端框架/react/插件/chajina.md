webpack是一个前端资源加载/打包工具，前端的重用资源都可以作为一个模块导出，我们在代码中直接引用即可，最后按照我们的配置把代码打包整合起来。
./是从系统文件中找，如果仅仅是/或没有/会从node_modules中找，比如：./app/index.js

webpack-dev-serve是一个小型的Node Express服务器，它为通过webpack打包生成的资源文件提供web服务