## 操作顺序
1. Install MySQL.
2. Use `https://gitlab.com/ftchinese/sql-schema` to setup schema and populate data.
3. Install Golang
4. Clone this repository `https://gitlab.com/ftchinese/next-api` into golang's designated path, which should be `~/go/src/gitlab.com/ftchinese`. （目录一定要放在GOPATH下面）
5. `cd` into `~/go/src/gitlab.com/ftchinese/next-api`
6. Execute `make`.
7. npm run start
8. 手动打开： http://localhost:4100/user/login 
