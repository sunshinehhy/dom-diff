## __proto__属性（前后各两个下划线）

- 用来读取或设置当前对象的prototype对象。

- 不要使用这个属性。

## Object.setPrototypeOf()（写操作）

此方法的`作用与__proto__相同`，`用来设置一个对象的prototype对象`，`返回参数对象本身`。

`如果第一个参数不是对象，会自动转为对象。`
但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。
```
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);

// 实例
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);   //返回obj

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40
```

```
由于返回的还是第一个参数，所以这个操作不会产生任何效果
Object.setPrototypeOf(1, {}) === 1 // true
Object.setPrototypeOf('foo', {}) === 'foo' // true
Object.setPrototypeOf(true, {}) === true // true

由于undefined和null无法转为对象
Object.setPrototypeOf(undefined, {})
// TypeError: Object.setPrototypeOf called on null or undefined

Object.setPrototypeOf(null, {})
// TypeError: Object.setPrototypeOf called on null or undefined
```
## Object.getPrototypeOf()（读操作）
用于读取一个对象的原型对象。
如果参数不是对象，会被自动转为对象。
```
// 等同于 Object.getPrototypeOf(Number(1))
Object.getPrototypeOf(1)
// Number {[[PrimitiveValue]]: 0}

// 等同于 Object.getPrototypeOf(String('foo'))
Object.getPrototypeOf('foo')
// String {length: 0, [[PrimitiveValue]]: ""}

// 等同于 Object.getPrototypeOf(Boolean(true))
Object.getPrototypeOf(true)
// Boolean {[[PrimitiveValue]]: false}

Object.getPrototypeOf(1) === Number.prototype // true
Object.getPrototypeOf('foo') === String.prototype // true
Object.getPrototypeOf(true) === Boolean.prototype // true

Object.getPrototypeOf(null)
// TypeError: Cannot convert undefined or null to object

Object.getPrototypeOf(undefined)
// TypeError: Cannot convert undefined or null to object
```
## Object.create()（生成操作)