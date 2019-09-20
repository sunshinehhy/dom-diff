<https://www.npmjs.com/package/mysql2>

API DOCS:和Node MySQL的API是一致的：<https://github.com/mysqljs/mysql>

MySQL client for Node.js with focus on performance. Supports prepared statements, non-utf8 encodings, binary log protocol, compression, ssl much more

针对Node.js的MySQL客户端。支持预编译语句、非utf8编码、二进制日志协议、压缩、ssl等。

### First Query
```
//get the client
const mysql = require('mysql2');

//create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

// simple query
connection.query(
  'SELECT * FROM table WHERE name = "Page" AND age > 45',
  function(err, results, fields) {
    console.log(results);//results contains rows returned by server
    console.log(fields); //fields contains extra meta data about results
  }
)
```

### Using Promise Wrapper
MySQL2 also support Promise API. Which works very well with ES7 async await.

```
async function main() {
  // get the client
  const mysql = require('mysql2/promise');

  // create the connection
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

  //query database
  const [rows, fields] = await connection.execute('SELECT * FROM table WHERE name = ? AND age > ?', ['Morty', 14])
}

```


### pooling-connections
<https://github.com/mysqljs/mysql#pooling-connections>

与一个一个创建和管理连接不同，该模块还通过mysql.createPool(config)提供了内置的连接池.

```
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'example.org',
  user            : 'bob',
  password        : 'secret',
  database        : 'my_db'
});

pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
```

### Pool options
<https://github.com/mysqljs/mysql#pool-options>

Pools接受和connection一样的options.(Pools accepts all the same options as a connection.) 

> Connection options: <https://github.com/mysqljs/mysql#connection-options>

- host: The hostname of the database you are connecting to. (Default: localhost)
- port: The port number to connect to. (Default: 3306)
- localAddress: The source IP address to use for TCP connection. (Optional)
- socketPath: 连接到unix域套接字的路径。此时主机和端口被忽略。(The path to a unix domain socket to connect to. When used host and port are ignored.)
- user: The MySQL user to authenticate as.
- password: The password of that MySQL user.
- database: Name of the database to use for this connection (Optional).
- timezone: 在MySQL服务器上配置的时区。这用于将服务器日期/时间值转换为JavaScript Date对象，反之亦然。可以是'local','Z',或形式为+HH:MM或-HH:MM的偏移量(The timezone configured on the MySQL server. This is used to type cast server date/time values to JavaScript Date object and vice versa. This can be 'local', 'Z', or an offset in the form +HH:MM or -HH:MM.) (Default: 'local')
- dateString:强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串的形式返回。而不是以JavaScript Date对象的形式。可以是true/false,或者是一个类型名称数组。
- ...


当创建一个新的连接时，options就会被简单地传递给connection构造函数。

除了以上那些options值为，pools还会接受这些额外参数:

- acquireTimeout: 连接获取期间发生超时之前的毫秒数。与connectTimeout稍有不同，因为获取池连接并不总是涉及建立连接。（默认值：10000）

- waitForConnections: 当连接达到上限没有连接可用时，决定连接池的操作。如果设为true,则池将对连接请求进行排队，并在有可用的时候调用它。如果设为false, 那么池会立即回调并返回错误。 (Default: true)

- connectionLimit: 一次可创建的最大连接数。(Default: 10)

- queueLimit: 在从getConnection返回错误之前，池将配对的最大连接请求数。如果设置为0，则配对连接请求的数量不受限制。(Default: 0)


### Pool events
<https://github.com/mysqljs/mysql#pool-events>

暂略

### Closing all the connections in a pool
When you are done using the pool, you have to end all the connections or the Node.js event loop will stay active until the connections are closed by the MySQL server. This is typically done if the pool is used in a script or when trying to gracefully shutdown a server. To end all the connections in the pool, use the end method on the pool:

当你完成连接池的使用后，你必须结束所有连接，否则Node.js时间循环将一直保持活跃状态指定MySQL服务器关闭连接。该完成通常发生于在script中使用连接池或者尝试正常关闭服务器时。要结束池中的所有连接，请使用池的end方法。

```
pool.end(function (err) {
  // all connections in the pool have ended
});
```

一旦pool.end()被调用，pool.getConnection及其他操作都不再执行。