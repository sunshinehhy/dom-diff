
## Object结构对象和Set结构对象的区别
- Map 数据结构对象，也是键值对的集合，但是`“键”的范围不限于字符串，各种类型的值（包括对象）`都可以当作键。
- JS对象（Object），本质上是键值对的集合（Hash 结构），但是`只能用字符串当作键`。这给它的使用带来了很大的限制。
- Object 结构提供了`“字符串—值”`的对应，Map 结构提供了`“值—值”`的对应
- 如果你需要“键值对”的数据结构，Map 比 Object 更合适。

##  Map 接受一个数组作为参数,该数组的成员是`一个个表示键值对的数组`

```
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"

<!--我试了好像：['name', '张三','aaa'],['title', 'Author','bbb'] 即后面继续添加元素也能行，只不过会不起作用-->
```
```
<!-- {"name" => "张三", "title" => "Author"}-->
  const items = [
    ['name', '张三','aaa'],
    ['title', 'Author','bbb'],
    ['title1', 'Author1','bbb']
  ];

  const map = new Map();

  items.forEach(
    ([key, value]) => map.set(key, value)
  );

  map输出: {"name" => "张三", "title" => "Author", "title1" => "Author1"}

<!--注意理解：[key, value]是一个数组，也就是foreach后面中的value值，仅仅去了value值中的前2个参数，如果加上第三个（[key, value,aa]）,则第三个值能够输出来-->
```
```
  const items = [
    ['name', '张三','aaa'],
    ['title', 'Author','bbb'],
    ['title1', 'Author1','bbb']
  ];
  items.forEach(function(value, index, arr){   //arr就是items
    console.log(value);
    console.log(index);
  })

 ["name", "张三", "aaa"]
 0
 ["title", "Author", "bbb"]
 1
 ["title1", "Author1", "bbb"]
 2
```

## 要点
- 任何具有 Iterator 接口、且`每个成员都是一个双元素的数组的数据结构`都可以当作Map构造函数的参数.
```
每个成员都是双元素
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
Set 对象和 Map 对象，当作Map构造函数的参数
```

- 如果对`同一个键多次赋值，后面的值将覆盖前面的值`。
- 如果`读取一个未知的键，则返回undefined`
- 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。
```
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined
set和get方法，表面是针对同一个键，但实际上这是两个值，内存地址是不一样的
```

- Map 的键实际上是`跟内存地址绑定`的，只要内存地址不一样，就视为两个键。
- 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则`只要两个值严格相等`，Map 将其`视为一个键`，比如0和-0就是一个键，布尔值true和字符串true则是两个不同的键。
- undefined和null也是两个不同的键。
- `虽然NaN不严格相等于自身，但 Map 将其视为同一个键。`

