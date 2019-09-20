### 71.nunjucks-markdown
<https://www.npmjs.com/package/markdown-tag>

针对nunjucks的markdown扩展。添加了markdown的tag

#### Usage
Register the extension with nunjucks
```
  var nunjucks = require('nunjucks'),
      markdown = require('nunjucks-markdown'),
      marked = require('marked');
  
  var env = nunjucks.configure('views');
  
  // The second argument can be any function that renders markdown 
  markdown.register(env, marked);
```

Add markdown to your templates
```
{% markdown %}
Hello World
===========
# Do stuff
{% endmarkdown %}
```