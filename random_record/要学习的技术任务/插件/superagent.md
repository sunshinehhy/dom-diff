https://www.npmjs.com/package/superagent

http://cnodejs.org/topic/5378720ed6e2d16149fa16bd

SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features. View the docs.
超级代理是一个小型的渐进客户端HTTP请求库和节点。具有相同API的js模块，具有许多高级HTTP客户端特性。查看文档。

Works with browserify and webpack.
```
const nocache = require('superagent-no-cache');
const request = require('superagent');
const prefix = require('superagent-prefix')('/static');
 
request
  .get('/some-url')
  .query({ action: 'edit', city: 'London' }) // query string
  .use(prefix) // Prefixes *only* this request
  .use(nocache) // Prevents caching of *only* this request
  .end((err, res) => {
    // Do something
  });
```