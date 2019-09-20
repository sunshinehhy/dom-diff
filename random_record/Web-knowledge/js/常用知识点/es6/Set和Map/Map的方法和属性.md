## 实例方法
1. ）size 属性
2. ）set(key, value)
3. ）get(key):如果找不到key，返回undefined
4. ）has(key)
5. ）delete(key)
6. ）clear()

## 遍历方法
Map 结构原生提供三个遍历器生成函数和一个遍历方法。

keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历 Map 的所有成员。forEach方法还可以接受第二个参数，用来绑定this。

- `Map 的遍历顺序就是插入顺序。`
- Map 结构的默认遍历器接口（Symbol.iterator属性），就是entries方法。
map[Symbol.iterator] === map.entries   // true

- Map 还有一个`forEach方法，与数组的forEach方法类似，也可以实现遍历`。
- Map 结构`转为数组结构，比较快速的方法是使用扩展运算符（...）`
- 结合数组的map方法、filter方法，实现 Map 的遍历和过滤（`Map 本身没有map和filter方法`）

## 与其他数据结构的互相转换
1. ）Map 转为数组
- 使用扩展运算符（...）
```
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

2. ）数组 转为 Map
- 将数组传入 Map 构造函数，就可以转为 Map
```
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```


3. ）Map 转为对象
- `如果所有 Map 的键都是字符串`，它可以无损地转为对象。
- 如果有`非字符串的键名，那么这个键名会被转成字符串`，再作为对象的键名。
```
传入map对象，然后用for...of遍历，再保存到对象中
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```


4. ）对象转为 Map
- 把对象的键值循环出来，用Map的set方法传入值
```
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```


5. ）Map 转为 JSON
- 区分两种情况。一种是，Map 的键名都是`字符串`，这时可以选择转为对象 JSON。
- 另一种是，Map 的键名有`非字符串`，这时`可以选择转为数组 JSON。`
```
//Map 的键名都是`字符串`
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));   //比Map转为对象多一步用JSON.stringify
}
let myMap = new Map()
.set('yes', true)
.set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'


//Map 的键名有`非字符串`
function mapToArrayJson(map) {
  return JSON.stringify([...map]);  //转为数组 JSON
}
let myMap = new Map()
.set(true, 7)
.set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

6. ）JSON 转为 Map
- JSON 转为 Map，`正常情况下，所有键名都是字符串`。
```
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```
- 有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。

```
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```
