require.main变量可以用来检测到一个模块是否为应用程序的主模块
```
if(module === require.main) {
    console.log('module');
}
```

编写一个 app.js 通过何种方式既能被require('./app.js')，又能node app.js来作为执行入口？
```
if (require.main === module) {
  styles('client/chart.css')
    .then(result => {
      return fs.writeAsync('build/styles/chart.css', result);
    })
    .catch(err => {
      console.log(err);
    });
}
```


