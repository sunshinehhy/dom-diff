
https://cnodejs.org/topic/5200755c44e76d216a1620df   (实例)

## 安装 Redis 客户端
在开始使用 redis 之前，首先需要安装 Redis 客户端

以 MAC OS 为例，通过 brew 安装 Redis: `brew install redis`  (第一步)

`启动 Redis:redis-server`   (第二步)

## 安装 ioredis 
npm install ioredis

## 实例：
redis.js文件：
```
var Redis = require('ioredis')
var redis = new Redis()

redis.set('test-redis-expire', 1)

// 设置过期时间 3s
redis.expire('test-redis-expire', 3)

redis.get('test-redis-expire', (err, value) => {
  console.log(value)
})

setTimeout(() => {
  redis.get('test-redis-expire', (err, value) => {
    console.log(value)
  })
}, 5000)
结果：

1
null
```
操作步骤：先启动Redis，再node redis.js


Node 调用 Redis 确实是异步的，只不过因为 Redis 是单线程的特点，任何操作都是原子操作。

在小试的代码中，redis.set redis.get 都只是向 Redis 发送了一个通知，添加到了 Redis 的任务队列中而已。