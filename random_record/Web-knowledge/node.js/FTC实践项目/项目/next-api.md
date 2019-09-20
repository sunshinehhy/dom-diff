## go 安装
brew install go

环境变量会默认配置好

GOPATH="/Users/huiyun/go"
GOROOT="/usr/local/Cellar/go/1.11/libexec"

## dep 安装
方法1 
go get -u github.com/golang/dep/cmd/dep

方法2
brew install dep

## 安装依赖包
dep ensure -v

## build项目，根据MakeFile中命令运行

make build


## 注意

假如next-user项目在https://gitlub.com/ftchinese/next-user，项目必须放在：/Users/huiyun、go/src/gitlab/ftchinese/next-api下面。也就是需要放在GOPATH的src下面。