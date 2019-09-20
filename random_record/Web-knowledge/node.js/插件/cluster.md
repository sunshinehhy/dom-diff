http://nodejs.cn/api/cluster.html

Node.js在单个线程中运行单个实例。 用户(开发者)为了使用现在的多核系统，有时候,用户(开发者)会用一串Node.js进程去处理负载任务。

cluster 模块允许简单容易的创建共享服务器端口的子进程。