https://github.com/luin/ioredis

https://github.com/luin/ioredis/blob/master/API.md 

http://www.redis.cn/

https://github.com/luin/ioredis/blob/master/benchmarks/single_node.js (实例)

 ioredis 不仅支持了 Cluster 和 Sentinel，还在 API 层面和 node redis 保持了兼容。在 50 并发测试时性能达到了 node redis 的 2-3 倍。


 ## 遇到的坑
 1. 在ioredis中使用redis命令的方法的时候，如果`有2个以上的参数，必须使用then方法来接收返回的结果`，
 比如:
```
    redis.hget('key','field').then(function(result){})

    <!--注意，这里的redis客户端不能是你订阅消息的redis客户端-->
```

 2. 如果直接将数据库里返回的文档对象直接存到redis中，再从redis中返回的数据`不是有效的json字符串`，因为_id和created的值不是字符串，所以必须再将文档存到redis中的时候需要调用JSON.stringify方法

```
<!--这是没有调用JSON.stringify方法通过ioreids的hget方法从redis中取到的数据-->
<!--_id和created的值没有用引号包裹，是无效的json字符串-->

{ _id: 592920df66531718a0b405f2,
  id: 87,
  email: 'abc@qq.com',
  name: 'kevinwu',
  password: 'ebee31dd54b0d8d67b9876e9c34b2c7e51d587edc82a4edf3690d76bf3b9c16b',
  __v: 0,
  status: 1,
  created: 2017-05-27T06:46:55.477Z,
  role: 'admin' }
```

## Pub/Sub
当客户端发出订阅或PSUBSCRIBE时，该连接被放入“subscriber”模式。此时，只有修改订阅集的命令才是有效的。当订阅集为空时，连接被放回常规模式。

如果在订阅模式下需要向Redis发送常规命令，只需打开另一个连接。


## Pipelining
如果您想发送一批命令(例如> 5)，您可以使用流水线来对内存中的命令进行排队，然后一次性将它们发送到Redis。通过这种方式，性能提高了50%~300%(参见基准部分)。

redis.pipeline()创建一个管道实例。您可以调用它上的任何Redis命令，就像Redis实例一样。命令在内存中排队，通过调用exec方法刷新到Redis:

```
var pipeline = redis.pipeline();
pipeline.set('foo', 'bar');
pipeline.del('cc');
pipeline.set('foo', 'bar1');
pipeline.exec(function (err, results) {
  console.log(results);  //[ [ null, 'OK' ], [ null, 0 ], [ null, 'OK' ] ]
  console.log(err);  //null
  // `err` is always null, and `results` is an array of responses
  // corresponding to the sequence of queued commands.
  // Each response follows the format `[err, result]`.
});

// You can even chain the commands:
redis.pipeline().set('foo', 'bar').del('cc').exec(function (err, results) {
   console.log(results); //[ [ null, 'OK' ], [ null, 0 ] ]
});

// `exec` also returns a Promise:
var promise = redis.pipeline().set('foo', 'bar').get('foo').exec();
promise.then(function (result) {
  // result === [[null, 'OK'], [null, 'bar']]
});
```

## Transaction
大多数情况下，事务命令multi & exec与管道一起使用。因此，当multi被调用时，默认会自动创建一个流水线实例，所以您可以使用multilike Pipeline:
```
redis.multi().set('foo', 'bar').get('foo').exec(function (err, results) {
  // results === [[null, 'OK'], [null, 'bar']]
});
```

如果事务的命令链中有语法错误(例如参数数量错误、命令名错误等)，则不会执行任何命令，并返回错误:
```
redis.multi().set('foo').set('foo', 'new value').exec(function (err, results) {
  // err:
  //  { [ReplyError: EXECABORT Transaction discarded because of previous errors.]
  //    name: 'ReplyError',
  //    message: 'EXECABORT Transaction discarded because of previous errors.',
  //    command: { name: 'exec', args: [] },
  //    previousErrors:
  //     [ { [ReplyError: ERR wrong number of arguments for 'set' command]
  //         name: 'ReplyError',
  //         message: 'ERR wrong number of arguments for \'set\' command',
  //         command: [Object] } ] }
});
```

在接口方面，multi不同于流水线，在为每个链式命令指定回调时，队列状态被传递到回调，而不是命令的结果:
```
redis.multi().set('foo', 'bar', function (err, result) {
  // result === 'QUEUED'
  console.log(result); //QUEUED
}).get('foo').exec(function (err, results) {
  // results === [[null, 'OK'], [null, 'bar']]
  console.log(results);  //[ [ null, 'OK' ], [ null, 'bar' ] ]
});
```

如果您想使用没有管道的事务，请将{pipeline: false}传递给multi，每个命令将立即发送到Redis，而无需等待exec调用:

```
redis.multi({ pipeline: false });
redis.set('foo', 'bar');
redis.get('foo');
redis.exec(function (err, result) {
  // result === [[null, 'OK'], [null, 'bar']]
});
```

multi的构造函数也接受了一批命令:

```
redis.multi([
  ['set', 'foo', 'bar'],
  ['get', 'foo']
]).exec(function () { /* ... */ });
```

管道支持内联事务，这意味着您可以将管道中的命令子集分组到事务中:

```
redis.pipeline().get('foo').multi().set('foo', 'bar').get('foo').exec().get('foo').exec(function (err, results) {

  console.log(results);  
  /*
  [ [ null, 'bar' ],
  [ null, 'OK' ],
  [ null, 'QUEUED' ],
  [ null, 'QUEUED' ],
  [ null, [ 'OK', 'bar' ] ],
  [ null, 'bar' ] ]*/
});

```

## Lua Scripting
ioredis支持所有脚本命令，如EVAL、EVALSHA和SCRIPT。然而，在真实的场景中使用是`很乏味的`，因为开发人员必须处理脚本缓存，并检测何时使用EVAL，何时使用EVALSHA。ioredis`公开了一个defineCommand方法，使脚本更容易使用`:

```
var redis = new Redis();

// This will define a command echo:
redis.defineCommand('echo', {
  numberOfKeys: 2,
  lua: 'return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}'
});

// Now `echo` can be used just like any other ordinary command,
// and ioredis will try to use `EVALSHA` internally when possible for better performance.
redis.echo('k1', 'k2', 'a1', 'a2', function (err, result) {
  // result === ['k1', 'k2', 'a1', 'a2']
});

// `echoBuffer` is also defined automatically to return buffers instead of strings:
redis.echoBuffer('k1', 'k2', 'a1', 'a2', function (err, result) {
  // result[0] === new Buffer('k1');
});

// And of course it works with pipeline:
redis.pipeline().set('foo', 'bar').echo('k1', 'k2', 'a1', 'a2').exec();
```

如果在定义命令时不能确定键数，则可以省略numberOfKeys属性，并在调用命令时将键数作为第一个参数传递:

```
redis.defineCommand('echoDynamicKeyNumber', {
  lua: 'return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}'
});

// Now you have to pass the number of keys as the first argument every time
// you invoke the `echoDynamicKeyNumber` command:
redis.echoDynamicKeyNumber(2, 'k1', 'k2', 'a1', 'a2', function (err, result) {
  // result === ['k1', 'k2', 'a1', 'a2']
});
```

## Transparent Key Prefixing
该特性允许您指定一个字符串，该字符串将自动包含在命令中的所有键中，这`使得管理键名称空间更加容易`。

警告:这个特性不会应用于像键和扫描这样使用模式而不是实际键的命令(#239)，而且这个特性也不会应用于命令的响应，即使它们是键名(#325)。

```
var fooRedis = new Redis({ keyPrefix: 'foo:' });
fooRedis.set('bar', 'baz');  // Actually sends SET foo:bar baz

fooRedis.defineCommand('echo', {
  numberOfKeys: 2,
  lua: 'return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}'
});

// Works well with pipelining/transaction
fooRedis.pipeline()
  // Sends SORT foo:list BY foo:weight_*->fieldname
  .sort('list', 'BY', 'weight_*->fieldname')
  // Supports custom commands
  // Sends EVALSHA xxx foo:k1 foo:k2 a1 a2
  .echo('k1', 'k2', 'a1', 'a2',function (err, result) {
  // console.log(result);  //[ 'foo:k1', 'foo:k2', 'a1', 'a2' ]
})
  .exec(function (err, result) {
  console.log(result);//[ [ null, [] ], [ null, [ 'foo:k1', 'foo:k2', 'a1', 'a2' ] ] ]
})
```

## Transforming Arguments & Replies

大多数Redis命令将一个或多个字符串作为参数，并将响应作为单个字符串或字符串数组返回。然而，有时候你可能想要一些不同的东西。例如，如果HGETALL命令返回一个散列(例如{key: val1, key2: v2})，而不是一个键值数组(例如[key1, val1, key2, val2])，就会更方便。

ioredis有一个灵活的系统来转换参数和回复。变压器有两种类型，`参数变压器和回复变压器`:

```
var Redis = require('ioredis');

// Here's the built-in argument transformer converting
// hmset('key', { k1: 'v1', k2: 'v2' })
// or
// hmset('key', new Map([['k1', 'v1'], ['k2', 'v2']]))
// into
// hmset('key', 'k1', 'v1', 'k2', 'v2')
Redis.Command.setArgumentTransformer('hmset', function (args) {
  if (args.length === 2) {
    if (typeof Map !== 'undefined' && args[1] instanceof Map) {
      // utils is a internal module of ioredis
      return [args[0]].concat(utils.convertMapToArray(args[1]));
    }
    if ( typeof args[1] === 'object' && args[1] !== null) {
      return [args[0]].concat(utils.convertObjectToArray(args[1]));
    }
  }
  return args;
});

// Here's the built-in reply transformer converting the HGETALL reply
// ['k1', 'v1', 'k2', 'v2']
// into
// { k1: 'v1', 'k2': 'v2' }
Redis.Command.setReplyTransformer('hgetall', function (result) {
  if (Array.isArray(result)) {
    var obj = {};
    for (var i = 0; i < result.length; i += 2) {
      obj[result[i]] = result[i + 1];
    }
    return obj;
  }
  return result;
});
```
有三个内置变压器，两个参数变压器为hmset和mset和回复变压器为hgetall。以上提到了hmset和hgetall的变压器，而mset的变压器与hmset的变压器相似:

```
redis.mset({ k1: 'v1', k2: 'v2' });
redis.get('k1', function (err, result) {
  // result === 'v1';
});

redis.mset(new Map([['k3', 'v3'], ['k4', 'v4']]));
redis.get('k3', function (err, result) {
  // result === 'v3';
});
```
回复转换器的另一个有用的例子是将hgetall更改为返回数组数组，而不是返回对象数组，从而避免在处理二进制哈希键时将哈希键与字符串进行不必要的对话:
```
Redis.Command.setReplyTransformer('hgetall', function (result) {
  var arr = [];
  for (var i = 0; i < result.length; i += 2) {
    arr.push([result[i], result[i + 1]]);
  }
  return arr;
});
redis.hset('h1', Buffer.from([0x01]), Buffer.from([0x02]));
redis.hset('h1', Buffer.from([0x03]), Buffer.from([0x04]));
redis.hgetallBuffer('h1', function (err, result) {
  // result === [ [ <Buffer 01>, <Buffer 02> ], [ <Buffer 03>, <Buffer 04> ] ];
});
```

## Monitor
Redis支持MONITOR命令，它允许您查看Redis服务器`通过所有客户机连接接收的所有命令`，包括来自其他客户机库和其他计算机的命令。

监视器方法返回一个监视器实例。在发送MONITOR命令之后，该连接上没有其他命令是有效的。ioredis将为遇到的每个新监视器消息发出一个监视器事件。监视器事件的回调接受来自Redis服务器的时间戳和命令参数数组。

下面是一个简单的例子:

```
redis.monitor(function (err, monitor) {
  monitor.on('monitor', function (time, args, source, database) {
  });
});
```
## Streamify Scanning
Redis 2.8添加了SCAN命令，`以增量地遍历数据库中的键`。它与扫描中的键不同，`每次调用只返回少量元素`，因此它可以在生产中使用，而不会长期阻塞服务器。但是，每次调用扫描命令时，都需要在客户端记录光标，以便正确地遍历所有键。由于ioredis是一个相对常见的用例，因此它为SCAN命令提供了一个流接口，从而使事情变得更加简单。可读的流可以通过调用scanStream来创建:

```
var redis = new Redis();
// Create a readable stream (object mode)
var stream = redis.scanStream();
stream.on('data', function (resultKeys) {
  // `resultKeys` is an array of strings representing key names.
  // Note that resultKeys may contain 0 keys, and that it will sometimes
  // contain duplicates due to SCAN's implementation in Redis.
  for (var i = 0; i < resultKeys.length; i++) {
    console.log(resultKeys[i]);
  }
});
stream.on('end', function () {
  console.log('all keys have been visited');
});
```

scanStream接受一个选项，你可以用它来`指定匹配模式和计数参数`:

```
var stream = redis.scanStream({
  // only returns keys following the pattern of `user:*`
  match: 'user:*',
  // returns approximately 100 elements per call
  count: 100
});
```

与其他命令一样，scanStream有一个二进制版本的scanBufferStream，它返回一个缓冲区数组。当键名不是utf8字符串时，它很有用。

还有hscanStream, zscanStream和sscanStream来遍历散列，zset和set中的元素。每个元素的接口都类似于scanStream，除了第一个参数是键名:

```
var stream = redis.hscanStream('myhash', {
  match: 'age:??'
});
```

在`数据处理程序中执行异步任务是很常见的`。我们希望扫描过程暂停，直到异步任务完成。流#pause()和Stream.resume()可以做到这一点。例如，如果我们想将Redis中的数据迁移到MySQL:

```
var stream = redis.scanStream();
stream.on('data', function (resultKeys) {
  // Pause the stream from scanning more keys until we've migrated the current keys.
  stream.pause();

  Promise.all(resultKeys.map(migrateKeyToMySQL)).then(() => {
    // Resume the stream here.
    stream.resume();
  });
});

stream.on('end', function () {
  console.log('done migration');
});
```

## Auto-reconnect
默认情况下，除非通过Redis .disconnect()或Redis .quit()手动关闭连接，否则当到Redis的连接丢失时，ioredis将尝试重新连接。

使用retryStrategy选项，可以很灵活地控制断开连接后重新连接的等待时间:
```
var redis = new Redis({
  // This is the default value of `retryStrategy`
  retryStrategy: function (times) {
    var delay = Math.min(times * 50, 2000);
    return delay;
  }
});
```
retryStrategy是在连接丢失时调用的函数。参数乘以表示`正在进行的第n次重新连接`，返回值表示等待重新连接的时间(在ms中)。当返回值不是数字时，ioredis将停止尝试重新连接，如果用户不手动调用redis.connect()，连接将永远丢失。

当重新连接时，客户端将自动订阅上一个连接订阅的频道。通过将autoResubscribe选项设置为false，可以禁用这个行为。

如果之前的连接有一些未实现的命令(很可能是阻塞命令，比如brpop和blpop)，那么客户机将在重新连接时重新发送这些命令。通过将autoresendunfulledcommands选项设置为false，可以禁用此行为。

默认情况下，`所有挂起的命令每20次重试都会刷新一次错误`。这样`可以确保当连接关闭时命令不会永远等待`。您可以通过设置maxRetriesPerRequest来更改此行为:
```
var redis = new Redis({
  maxRetriesPerRequest: 1
});
```

将maxRetriesPerRequest设置为null以禁用此行为，每个命令都将永远等待，直到连接再次激活(这是ioredis v4之前的默认行为)。
## Reconnect on error
除了在连接关闭时自动重新连接外，ioredis还支持通过reconnectOnError选项重新连接指定的错误。这里有一个例子，将重新连接时，收到READONLY错误:
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

这个特性在使用Amazon ElastiCache时非常有用。一旦发生故障转移，`Amazon ElastiCache就会将我们当前连接的主服务器切换到从服务器`，导致以下写入失败，错误为只读。使用reconnectOnError，我们可以强制连接在这个错误上重新连接，以便连接到新的主服务器。

此外，如果reconnectOnError返回2,ioredis将在重新连接后重新发送失败的命令。

## Connection Events

connect / ready /error /close /reconnecting /end /select
## Offline Queue
当一个命令不能被Redis处理(在就绪事件之前发送)时，默认情况下，它被添加到脱机队列中，并在可以处理时执行。你可以通过设置enableOfflineQueue选项为false来禁用此功能:

```
var redis = new Redis({ enableOfflineQueue: false });
```
## TLS Options

Redis本身并不支持TLS，但是如果您想要连接的Redis服务器托管在TLS代理(例如stunnel)后面，或者由支持TLS连接的PaaS服务提供(例如Redis Labs)，您可以设置TLS选项:
```
var redis = new Redis({
  host: 'localhost',
  tls: {
    // Refer to `tls.connect()` section in
    // https://nodejs.org/api/tls.html
    // for all supported options
    ca: fs.readFileSync('cert.pem')
  }
});

```
## Sentinel
ioredis支持哨兵。它可以透明地工作，因为当您连接到单个节点时，所有可以工作的特性也可以在连接到sentinel组时工作。如果要使用这个特性，请确保运行Redis >= 2.8.12。哨兵有一个默认端口26379。

要使用Sentinel连接，请使用:
```
var redis = new Redis({
  sentinels: [{ host: 'localhost', port: 26379 }, { host: 'localhost', port: 26380 }],
  name: 'mymaster'
});

redis.set('foo', 'bar');
```
传递给构造函数的参数与连接到单个节点的参数不同，其中:

name标识一组Redis实例，它们由一个主实例和一个或多个从实例(本例中为mymaster实例)组成;
哨兵是要连接的哨兵列表。这个列表不需要列举所有的sentinel实例，但是有几个这样，`如果其中一个失败了，客户端就会尝试下一个`。
值为slave的角色(可选)将从Sentinel组返回一个随机的奴隶。
preferredslave(可选)可以用于根据优先级选择特定的slave或奴隶集。它接受一个函数或数组。

ioredis`确保您连接的节点始终是主节点，即使在故障转移之后也是如此`。当故障转移发生时，ioredis不会尝试重新连接失败的节点(当它再次可用时，将降级为从节点)，而是会请求前哨来获取新的主节点并连接到它。故障转移期间发送的所有命令都将排队等待，并将在新连接建立时执行，以便不会丢失任何命令。

通过指定带从值的选项角色，可以连接到从节点，而不是主节点，ioredis将尝试连接到指定主节点的随机从属节点，并保证所连接的节点始终是从属节点。`如果由于故障转移而将当前节点提升为主节点，ioredis将从该节点断开连接，并请求前哨站连接另一个从节点。`

如果您在角色中指定了preferredslave选项:“slave”ioredis将尝试在从可用的奴隶池中选择奴隶时使用这个值。preferredslave的值应该是一个函数，它接受一个可提供的slave数组并返回一个结果，或者是一个优先级最低的从属值数组，优先级的默认值是1。
```
// available slaves format
var availableSlaves = [{ ip: '127.0.0.1', port: '31231', flags: 'slave' }];

// preferredSlaves array format
var preferredSlaves = [
  { ip: '127.0.0.1', port: '31231', prio: 1 },
  { ip: '127.0.0.1', port: '31232', prio: 2 }
];

// preferredSlaves function format
preferredSlaves = function(availableSlaves) {
  for (var i = 0; i < availableSlaves.length; i++) {
    var slave = availableSlaves[i];
    if (slave.ip === '127.0.0.1') {
      if (slave.port === '31234') {
        return slave;
      }
    }
  }
  // if no preferred slaves are available a random one is used
  return false;
};

var redis = new Redis({
  sentinels: [{ host: '127.0.0.1', port: 26379 }, { host: '127.0.0.1', port: 26380 }],
  name: 'mymaster',
  role: 'slave',
  preferredSlaves: preferredSlaves
});
```
除了retryStrategy选项之外，还有sentinelRetryStrategy，在Sentinel模式下，当连接过程中所有的Sentinel节点都不可用时，会调用它。如果sentinelRetryStrategy返回一个有效的延迟时间，ioredis将尝试从头重新连接。sentinelRetryStrategy的默认值是:

```
function (times) {
  var delay = Math.min(times * 10, 1000);
  return delay;
}
```

## Cluster
Redis集群提供了一种运行Redis安装的方法，`其中数据可以在多个Redis节点之间自动分片`。你可以像这样连接到一个Redis集群:
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

第一个参数是要连接的集群的节点列表。就像Sentinel一样，`这个列表不需要列举所有的集群节点`，只要列举几个节点，如果一个节点无法访问，客户机就会尝试下一个节点，当至少有一个节点连接时，客户机就会自动发现其他节点。

第二个参数是选项，其中:
clusterRetryStrategy:当所有启动节点都不可到达时，将调用clusterRetryStrategy。当返回一个数字时，ioredis将尝试在指定的延迟(在ms中)之后从头重新连接到启动节点。否则，将返回“没有启动节点可用”的错误。此选项的默认值为:
```
function (times) {
  var delay = Math.min(100 + times * 2, 2000);
  return delay;
}
```
可以修改startupNodes属性来切换到这里的另一组节点:
```
function (times) {
  this.startupNodes = [{ port: 6790, host: '127.0.0.1' }];
  return Math.min(100 + times * 2, 2000);
}
```
enableOfflineQueue:类似于Redis类的enableOfflineQueue选项。

enableReadyCheck:当启用时，“就绪”事件将只在集群信息命令报告集群已准备好处理命令时发出。否则，它将在“连接”发出后立即发出。

配置在哪里发送读查询。更多细节见下文。

maxRedirections:当接收到与集群相关的错误(如move、ASK和CLUSTERDOWN等)时，客户端将命令重定向到另一个节点。这个选项限制了发送命令时允许的最大重定向。默认值是16。

retrydelayon故障转移:如果目标节点在发送命令时断开连接，ioredis将在指定的延迟之后重试。默认值是100。您应该确保retrydelayon故障转移* maxRedirections >集群节点超时，以确保在故障转移期间没有命令失败。

retryDelayOnClusterDown:当集群宕机时，所有命令都将被拒绝，错误是CLUSTERDOWN。如果这个选项是一个数字(默认情况下是100)，客户机将在指定的时间之后(在ms中)重新发送命令。

retryDelayOnTryAgain:如果这个选项是一个数字(默认情况下是100)，客户端将在指定的时间之后(在ms中)用TRYAGAIN错误重新发送被拒绝的命令。

redisOptions:在连接到节点时，将默认选项传递给Redis的构造函数。

slotsRefreshTimeout:当集群中的刷新槽刷新时，超时发生之前的毫秒数(默认1000)

slotsRefreshInterval:每个自动槽刷新间隔的毫秒数(默认为5000)

### 读写分离
`一个典型的redis集群包含三个或更多的主服务器和几个从服务器`。通过向从服务器发送读查询，并通过设置scaleReads选项将查询写入到主服务器，可以扩展redis集群。

scaleReads默认为“master”，这意味着ioredis将永远不会向从服务器发送任何查询。还有其他三种选择:

“全部”:向主服务器发送写查询，向主服务器或从服务器随机读取查询。
“从”:将写查询发送给主，并将查询读给从。
一个自定义函数(节点，命令):node:将选择自定义函数来选择发送读查询到哪个节点(写查询一直被发送到master)。节点中的第一个节点总是服务于相关插槽的主节点。如果函数返回一个节点数组，将选择该列表的一个随机节点。
```
var cluster = new Redis.Cluster([/* nodes */], {
  scaleReads: 'slave'
});
cluster.set('foo', 'bar'); // This query will be sent to one of the masters.
cluster.get('foo', function (err, res) {
  // This query will be sent to one of the slaves.
});
```
在上面的代码片段中，由于主从之间复制的延迟，res可能不等于bar。

### 向多个节点运行命令

每个命令将被精确地发送到一个节点。对于包含键的命令(例如GET、SET和HGETALL)， ioredis将它们发送到提供键的节点，而对于其他不包含键的命令(例如INFO、keys和FLUSHDB)， ioredis将它们发送到随机节点。

有时，您可能希望向集群的多个节点(主节点或从节点)发送命令，您可以通过cluster #nodes()方法获得节点。

Cluster#nodes()接受一个参数角色，可以是“master”、“slave”和“all”(默认)，并返回一个Redis实例数组。例如:
```
// Send `FLUSHDB` command to all slaves:
var slaves = cluster.nodes('slave');
Promise.all(slaves.map(function (node) {
  return node.flushdb();
}));

// Get keys of all the masters:
var masters = cluster.nodes('master');
Promise.all(masters.map(function (node) {
  return node.keys();
})).then(function (keys) {
  // keys: [['key1', 'key2'], ['key3', 'key4']]
});
```

### Transaction and pipeline in Cluster mode
几乎所有Redis支持的特性都被Redis支持。集群，例如自定义命令、事务和管道。但是在集群模式下使用事务和管道时存在一些差异:

管道中的所有键应该属于同一个槽，因为ioredis将管道中的所有命令发送到同一个节点。
没有管道(又名集群)就不能使用multi。多({管道:false}))。这是因为当您调用cluster时。ioredis不知道应该将多命令发送到哪个节点。
在集群模式下不支持在管道中链接自定义命令。
当管道中的任何命令收到移动或询问错误时，如果满足以下所有条件，ioredis将自动将整个管道重新发送到指定节点:

在管道中接收到的所有错误都是相同的。例如，如果有两个移动错误指向不同的节点，我们就不会重新发送管道。
所有成功执行的命令都是只读命令。这确保重新发送管道不会产生副作用。

### Pub/Sub
集群模式下的发布/订阅与独立模式下完全相同。在内部，当集群的节点接收到消息时，它将把消息广播给其他节点。ioredis通过严格地同时订阅一个节点，确保每个消息只接收一次。
```
var nodes = [/* nodes */];
var pub = new Redis.Cluster(nodes);
var sub = new Redis.Cluster(nodes);
sub.on('message', function (channel, message) {
  console.log(channel, message);
});

sub.subscribe('news', function () {
  pub.publish('news', 'highlights');
});
```
### Password

设置密码选项以访问受密码监视的集群:
```
var Redis = require('ioredis');
var cluster = new Redis.Cluster(nodes, {
  redisOptions: {
    password: 'your-cluster-password'
  }
});
```
如果集群中的一些节点使用不同的密码，您应该在第一个参数中指定它们:
```
var Redis = require('ioredis');
var cluster = new Redis.Cluster([
  // Use password "password-for-30001" for 30001
  { port: 30001, password: 'password-for-30001'},
  // Don't use password when accessing 30002
  { port: 30002, password: null }
  // Other nodes will use "fallback-password"
], {
  redisOptions: {
    password: 'fallback-password'
  }
});
```

## Error Handling
## Plugging in your own Promises Library