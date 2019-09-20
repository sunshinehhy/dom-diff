https://github.com/luin/ioredis

https://www.npmjs.com/package/ioredis

https://github.com/luin/medis

https://github.com/ddollar/redis-url

一个健壮的、性能集中的、功能齐全的Redis客户端和io.js。

ioredis是一个强大的、功能齐全的Redis客户端，它被用于世界上最大的在线商务公司阿里巴巴和许多其他令人敬畏的公司。

- 功能齐全的。它支持Cluster, Sentinel, Pipelining 和Lua脚本和Pub/Sub(在二进制消息的支持下)。
- 高性能。
- 令人愉快的API。它与node回调和Bluebird promises一起工作。
- 转换命令参数和应答。
- 透明键加前缀。
- Lua脚本的抽象，允许您定义自定义命令。
- 对二进制数据的支持。
- 支持TLS。
- 支持离线队列和准备检查。
- 支持ES6类型，如Map和Set。
- 支持GEO命令(Redis 3.2不稳定)。
- 复杂的错误处理策略。

当客户端发出订阅或订阅时，该连接被放入“订阅者”模式。此时，只有修改订阅集的命令是有效的。当订阅集为空时，连接将返回到常规模式。

如果您需要在订阅模式中向Redis发送常规命令，请打开另一个连接。

## Pipelining
如果您想发送一批命令(例如> 5)，您可以使用管道将这些命令在内存中排队，然后将它们发送到Redis。这样，性能提高了50%~300%(参见基准部分)。

redis.pipeline()创建一个Pipeline实例。可以调用任何Redis命令，就像Redis实例一样。命令在内存中排队，并通过调用exec方法将其刷新到Redis:

```
var pipeline = redis.pipeline();
pipeline.set('foo', 'bar');
pipeline.del('cc');
pipeline.exec(function (err, results) {
  // `err` is always null, and `results` is an array of responses
  // corresponding to the sequence of queued commands.
  // Each response follows the format `[err, result]`.
});
 
// You can even chain the commands:
redis.pipeline().set('foo', 'bar').del('cc').exec(function (err, results) {
});
 
// `exec` also returns a Promise:
var promise = redis.pipeline().set('foo', 'bar').get('foo').exec();
promise.then(function (result) {
  // result === [[null, 'OK'], [null, 'bar']]
});
```
每个链接的命令也可以有一个回调，当命令得到回复时，将调用这个回调:

## Transaction事务
大多数情况下，事务命令multi & exec与管道一起使用。因此，当调用multi时，默认情况下会自动创建一个管道实例，所以您可以使用multi just like Pipeline:

在接口方面，在为每个链接的命令指定回调时，multi 与 pipeline不同，排队状态被传递给回调而不是命令的结果:
```
redis.multi().set('foo', 'bar', function (err, result) { //为每个命令指定回调
  // result === 'QUEUED' 
}).exec(/* ... */);
```

pass { pipeline: false },每个命令将立即被发送到Redis，而无需等待exec调用:
```
redis.multi({ pipeline: false });
redis.set('foo', 'bar');
redis.get('foo');
redis.exec(function (err, result) {
  // result === [[null, 'OK'], [null, 'bar']]
});
```
multi的构造函数也接受一批命令:

内联事务由管道支持，这意味着您可以将管道中的命令子集分组到事务中:

## Lua Scripting
ioredis支持所有脚本命令，如EVAL、EVALSHA和SCRIPT。但是，在实际的场景中使用是很麻烦的，因为开发人员必须注意脚本缓存，并检测何时使用EVAL和何时使用EVALSHA。ioredis公开了defineCommand 方法，使脚本更容易使用:

如果在定义命令时不能确定键的数量，则可以省略numberOfKeys属性，并将键的数量作为第一个参数，当您调用该命令时:

## Transparent Key Prefixing
这个特性允许您指定一个字符串，该字符串将自动被预先处理到一个命令中的所有键，这使得管理您的关键名称空间变得更加容易。

警告这个特性不会应用于像键和扫描这样的命令，而不是实际的键(#239)，而且这个特性也不会应用到命令的回复中，即使它们是关键的名称(#325)。

## Transforming Arguments & Replies
大多数Redis命令以一个或多个字符串作为参数，并以单个字符串或字符串数组的形式返回。然而，有时你可能想要一些不同的东西。例如，如果HGETALL命令返回一个散列(例如:{键:val1, key2: v2})，而不是一个键值数组(例如，[key1, val1, key2, val2])，那么它将更加方便。

ioredis拥有一个灵活的系统来转换参数和回复。转换类型有两种，参数转换和应答转换:

## Monitor
Redis支持MONITOR命令，它允许您查看所有客户机连接上的Redis服务器接收的所有命令，包括来自其他客户端库和其他计算机的命令。

监视器方法返回一个监视器实例。在发送了MONITOR命令之后，在该连接上没有其他命令是有效的。ioredis将为每一个遇到的新监控消息发出一个监视器事件。monitor事件的回调从Redis服务器获得一个时间戳和一个命令参数数组。

## Streamify Scanning
Redis 2.8添加了SCAN命令，以增量地遍历数据库中的键。它不同于KEYS in that SCAN，只返回每个调用的一小部分元素，因此它可以在生产中使用，而不需要长时间阻塞服务器。但是，它需要每次调用扫描命令时在客户端记录游标，以便正确地遍历所有键。由于它是一个相对常见的用例，所以ioredis为扫描命令提供了一个流接口，以使事情变得更容易。可以通过调用scanStream创建可读的流:

scanStream接受一个选项，您可以指定匹配模式和计数参数:

和其他命令一样，scanStream有一个二进制版本的scanBufferStream，它返回一个缓冲区数组。当关键名称不是utf8字符串时，它是有用的。

还有hscanStream、zscanStream和sscanStream，它们可以通过散列、zset和set的元素进行迭代。每个元素的接口与scanStream类似，除了第一个参数是关键名称:

## Auto-reconnect
默认情况下，ioredis将尝试在连接到Redis时重新连接，除非通过redis.disconnect()或redis.quit()手动关闭连接。

使用retryStrategy选项控制断开后等待重新连接的时间是非常灵活的:
```
var redis = new Redis({
  // This is the default value of `retryStrategy`
  retryStrategy: function (times) {
    var delay = Math.min(times * 50, 2000);
    return delay;
  }
});
```

retryStrategy是在连接失败时调用的函数。参数times表示这是正在进行的第n重连接，返回值表示等待重新连接的时间(在ms中)。当返回值不是一个数字时，ioredis将停止尝试重新连接，如果用户不调用redis.connect()，那么连接将永远丢失。

当重新连接时，客户端将自动订阅前面连接订阅的通道。通过将autoResubscribe选项设置为false，可以禁用此行为。

如果前面的连接有一些未完成的命令(很可能是阻塞命令，如brpop和blpop)，那么当重新连接时，客户机将重新发送它们。通过将autoResendUnfulfilledCommands选项设置为false，可以禁用此行为。

## Reconnect on error

除了在连接关闭时自动重新连接外，ioredis支持通过reconnectOnError选项指定的错误重新连接。这里有一个例子，当收到READONLY错误时将重新连接:
```
var redis = new Redis({
  reconnectOnError: function (err) {
    var targetError = 'READONLY';
    if (err.message.slice(0, targetError.length) === targetError) {
      // Only reconnect when the error starts with "READONLY"
      return true; // or `return 1;`
    }
  }
});
```
这个特性在使用Amazon ElastiCache时很有用。一旦发生故障转移，Amazon ElastiCache将切换我们当前连接的主服务器，导致下面的写操作失败。使用reconnectOnError，我们可以强制连接在这个错误上重新连接，以便连接到新主机。

此外，如果reconnectOnError返回2,ioredis将在重新连接后重新发送失败的命令。

## Connection Events
connect ready error close reconnecting end select
您还可以检查Redis#status属性以获得当前连接状态。

## Offline Queue
当一个命令不能被Redis处理(在就绪事件之前发送)，默认情况下，当它可以被处理时,它被添加到脱机队列中并将被执行。您可以通过将enableOfflineQueue选项设置为false来禁用该特性:
```
 var redis = new Redis({ enableOfflineQueue: false });
```

## TLS选项
Redis不支持TLS，但是如果您想要连接的Redis服务器托管在TLS代理(例如stunnel)后面，或者由PaaS提供支持TLS连接的服务(例如Redis Labs)，您可以设置TLS选项:

## Sentinel
ioredis支持Sentinel out of the box。当连接到一个节点时，它可以透明地工作，当连接到一个sentinel组时，它也会工作，因为当您连接到一个节点时，所有的功能都可以工作。如果想要使用这个特性，请确保运行Redis >= 2.8.12。哨兵的默认端口为26379。

使用哨兵线连接，使用:
```
var redis = new Redis({
  sentinels: [{ host: 'localhost', port: 26379 }, { host: 'localhost', port: 26380 }],
  name: 'mymaster'
});
 
redis.set('foo', 'bar');
```
ioredis保证您连接的节点始终是一个主节点，甚至在故障转移之后。当发生故障转移时，ioredis会询问新的主节点并连接到它，而不是尝试重新连接失败的节点(当它再次可用时将被降级为奴隶)。在故障转移期间发送的所有命令都将排队，并将在建立新连接时执行，这样就不会丢失任何命令。

通过指定具有奴隶和ioredis的值的选项角色，可以连接到一个奴隶而不是一个主人，它将尝试连接到指定主的一个随机的奴隶，并保证连接的节点始终是一个奴隶。如果当前节点由于故障转移而被提升到主节点，则ioredis将断开连接，并请求哨兵服务器连接到另一个从属节点。

如果您指定了the option preferredSlaves along with role: 'slave'，ioredis将尝试在从可用的奴隶池中选择奴隶时使用这个值。preferredSlaves的值应该是一个函数，该函数接受一个可接受的对象数组，并返回一个结果，或者一个从默认值为1的最低prio值优先级的一个从值序列。

除了retryStrategy选项外，在Sentinel模式中还有一种sentinelRetryStrategy，当所有的哨兵节点在连接过程中都无法访问时，将调用该策略。如果sentinelRetryStrategy返回有效的延迟时间，则ioredis将尝试从头重新连接。sentinelRetryStrategy的默认值为:

## Cluster

Redis Cluster提供了一种运行Redis安装的方法，在这个安装中，数据会自动在多个Redis节点上共享。你可以像这样连接到一个Redis集群:
```
var Redis = require('ioredis');
 
var cluster = new Redis.Cluster([{
  port: 6380,
  host: '127.0.0.1'
}, {
  port: 6381,
  host: '127.0.0.1'
}]);
 
cluster.set('foo', 'bar');
cluster.get('foo', function (err, res) {
  // res === 'bar'
});
```

集群构造函数接受两个参数，其中:

1. 第一个参数是要连接到的集群的节点列表。就像Sentinel一样，这个列表不需要枚举所有的集群节点，但是有几个节点，这样如果一个节点无法到达，客户端将尝试下一个节点，并且当至少一个节点连接时，客户端会自动发现其他节点。
2. 第二个参数是选项

### Read-write splitting
一个典型的redis集群包含三个或多个主人，每个主人都有几个奴隶。通过将读查询发送到奴隶，并通过设置scaleReads选项来编写查询，可以扩展redis集群。

scaleReads在默认情况下是“master”，这意味着ioredis永远不会向奴隶发送任何查询。还有其他三种选择:
- “所有”:将写查询发送给主人，并随机地阅读对主人或奴隶的查询。
- “slave”:发送写查询到主人，并阅读对奴隶的查询。
- 一个自定义函数(节点、命令):节点:将选择定制函数来选择要发送读查询的节点(编写查询一直被发送到主服务器)。节点中的第一个节点始终是服务于相关槽的主节点。如果函数返回一个节点数组，将选择该列表的一个随机节点。

### Running commands to multiple nodes
### Transaction and pipeline in Cluster mode
### Pub/Sub