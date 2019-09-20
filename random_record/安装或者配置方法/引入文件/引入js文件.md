```
1. 使用正确
function testIm(){
    console.log('test');
}
export {testIm}

import {testIm} from './subscribe.js';  //需要添加括号和加上.js；不能重命名
testIm();

现象：如果文件名是subscribe-api.js，然后./subscribe-api.js这样import ，会出错

2. 使用正确
export default function testIm(){
    console.log('test');
}
或者 export default testIm;
import testIm from './subscribe'; //不加括号，加括号会出错；但是可以重命名，比如用testIm1
testIm();

3. 使用错误
export function testIm(){
    console.log('test');
}

```

## 我的理解（有待求证）

假如是有多个函数或者属性导出，用export；或者把函数封装到一个对象或类中，即可以用export，又可以用export default
