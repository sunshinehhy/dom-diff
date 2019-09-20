一个用于node.js的多传输异步记录库。

Winston is designed to be a simple and universal logging library with support for multiple transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file.

There also seemed to be a lot of logging libraries out there that coupled their implementation of logging (i.e. how the logs are stored / indexed) to the API that they exposed to the programmer. This library aims to decouple those parts of the process to make it more flexible and extensible.

Winston被设计成一个简单和通用的日志库，支持多种传输。传输实际上是日志的存储设备。winston logger的每个实例都可以在不同级别配置多个传输。例如，您可能希望将错误日志存储在一个持久的远程位置(比如数据库)，但是所有的日志输出到控制台或本地文件。

似乎还有许多日志库，它们将日志的实现(即日志如何存储/索引)与它们向程序员公开的API结合在一起。该库旨在将流程的这些部分解耦，使其更加灵活和可扩展。