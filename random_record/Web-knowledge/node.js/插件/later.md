http://bunkat.github.io/later/

https://github.com/bunkat/later

http://blog.fens.me/nodejs-cron-later/

定时任务
什么是定时任务？
Later介绍
Later安装
Later基本使用
Later Schedules – 设置时间表
Later Time Periods – 时间定义和时间计算
Later Modifiers – 行为修饰符
Later Parsers – 规则解释器
Later Occurrences – 时间控制
Later Executing – 启动运行

创建一个每5分钟启动的定时器规则，输出启动时间。
```
var later = require('later');
var sched = later.parse.text('every 5 mins'),
    occurrences = later.schedule(sched).next(10);

for(var i=0;i<10;i++){
    console.log(occurrences[i]);
}
```

## 我的理解
服务器可以在指定时间执行任务