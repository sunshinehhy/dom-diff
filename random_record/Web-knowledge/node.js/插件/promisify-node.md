<https://www.npmjs.com/package/promisify-node>

### Introduction
Wraps Node modules, functions, and methods written in the Node-callback style to return Promises.

### Examles

#### 1. Wrap entire Node modules recursively(递归地）:
```
var promisify = require("promisify-node");
var fs = promisify("fs");

// This function has been identified as an asynchronous function so it has 
// been automatically wrapped. 
fs.readFile("/etc/passwd").then(function(contents) {
  console.log(contents);
});
```
#### 2.Wrap a single function:
```
var promisify = require("promisify-node");
 
function async(callback) {
  callback(null, true);
}
 
// Convert the function to return a Promise. 
var wrap = promisify(async);
 
// Invoke the newly wrapped function. 
wrap().then(function(value) {
  console.log(value === true);
});
```