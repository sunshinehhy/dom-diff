npm: <https://www.npmjs.com/package/superagent>
docs: <http://visionmedia.github.io/superagent/>

SuperAgent是一个小型的渐进式客户端HTTP请求库，该模块具有和nodejs原生相同的API，体现了许多高层次的HTTP客户端功能。

```
request
  .post('/api/pet')
  .send({ name: 'Manny', species: 'cat' }) // sends a JSON post body
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
    // Calling the end function will send the request
  });
```