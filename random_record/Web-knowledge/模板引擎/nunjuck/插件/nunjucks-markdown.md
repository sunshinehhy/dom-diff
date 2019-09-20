<https://www.npmjs.com/package/nunjucks-markdown>

A nunjuck extension that adds a markdown tag. This plugin allows you to choose your own markdown renderer.

## Usage

Register the extension with nunjucks：

```
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked');
 
var env = nunjucks.configure('views');

// The second argument can be any function that renders markdown
markdown.register(env, marked);
```


Add markdown to your templates

```html
{% markdown %}
Hello World
===========
# Do stuff
{% endmarkdown %}
```

You can also provide the markdown tag with a template to render
```
{% markdown "post.md" %}
```