<https://www.npmjs.com/package/classnames>

A simple javascript utility for conditionally joining classNames together.

Install with npm or Bower.

```
npm install classnames
```

```
var classNames = require('classnames');

classNames('foo', 'bar'); // => 'foo bar' 
classNames('foo', { bar: true }); // => 'foo bar' 
classNames({ 'foo-bar': true }); // => 'foo-bar' 
classNames({ 'foo-bar': false }); // => '' 
classNames({ foo: true }, { bar: true }); // => 'foo bar' 
classNames({ foo: true, bar: true }); // => 'foo bar' 
 
// lots of arguments of various types 
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux' 
 
// other falsy values are just ignored 
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1' 
```

### Dynamic class names with ES2015
```
let buttonType = 'primary';
classNames({ [`btn-${buttonType}`]: true });