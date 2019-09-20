http://www.ruanyifeng.com/blog/2016/01/npm-install.html

如果你希望，一个模块不管是否安装过，npm 都要强制重新安装，可以使用-f 或--force 参数。
\$ npm install <packageName> --force

npm i -g npm 更新 npm

npm install fs-jetpack@1.2.0 --save-dev 指定版本需要@版本号

sudo npm install -g vue-cli (全局安装按照管理员身份加上 sudo)

https://www.cnblogs.com/xxcanghai/p/8205500.html (解决 NPM 无法安装任何包的解决方案（npm ERR! code MODULE_NOT_FOUND）) node 版本的问题

http://www.cnblogs.com/itlkNote/p/6830682.html（npm 常用命令详解）

## 用 npm set global=false 设置了之后，用 npm get global 取出来还是等于 true（这样导致每次安装都是在全局的安装），怎么回事呢?

使用 npm config ls 来看一下 global 的设置以及文件，然后找到.npmrc 这个文件的路径，删掉这个文件或者用 vim 编辑里面的 global=true 为 false 就行了。

## 还原 npm 安装地址

npm config set registry https://registry.npmjs.org
