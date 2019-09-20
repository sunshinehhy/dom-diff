NamedModulesPlugin

当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。

具体实例理解：https://juejin.im/entry/58f0348ca0bb9f006a881e5f/

找到一种和顺序无关的模块ID命名方式。
最容易想到的就是基于文件名或者文件内容的哈希值这两种方案了。
其实也就是今天要说的NamedModulesPlugin与HashedModuleIdsPlugin的功能。

我的理解是
NamedModulesPlugin是基于文件名，得到模块名
HashedModuleIdsPlugin是基于文件内容的哈希值，得到模块名

为什么要这么做呢？
一个新文件插入，会导致后续所有模块的ID都发生了更改，这样又得重新缓存。



