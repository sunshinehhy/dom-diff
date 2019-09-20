https://github.com/creationix/nvm

https://github.com/coreybutler/nvm-windows （window 安装）

## mac 安装 nvm

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

然后关闭 terminal，输入 nvm -h 就能看出能否安装成功

## nvm 用法

nvm -h
nvm use 8 (使用版本 8)
which node (看 node 安装在哪)
nvm install node (安装最新的 node)
nvm install v8.0.0 (安装指定的 node 版本)
nvm ls-remote (查看所有的 node 版本)

code
code ~/.bash_profile
command -v nvm 验证 nvm 已安装
source ~/.bash_profile 完成对环境变量的配置
command -v nvm 验证 nvm 已安装

nvm alias default 8.15.1 设置默认版本号

## 问题

```
../src/node_contextify.cc:628:static void node::contextify::ContextifyScript::New(const FunctionCallbackInfo<v8::Value> &): Assertion `args[1]->IsString()' failed.
```

node 版本太高

可以使用 nrm 管理 registry 地址
