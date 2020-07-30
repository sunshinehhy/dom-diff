## 原型链基础
- Object.__proto__      //function () { [native code] }
- Function.__proto__   //function () { [native code] }
- Function.prototype   //function () { [native code] }
- Object.prototype     //Object {  }

- Function.prototype.__proto__      //Object {  }
- Object.__proto__.__proto__      // Object {  }
- Object.__proto__.__proto__.__proto__   //null

由以上基础得出以下结果

function Person() {}

## Object instanceof Object   //true
```
第一个Object的原型链：Object=>Object.__proto__ => Function.prototype=>Function.prototype.__proto__=>Object.prototype
第二个Object的原型：Object=> Object.prototype
```
## Function instanceof Function   //true
第一个Function的原型链：Function=>Function.__proto__ => Function.prototype
第二个Function的原型：Function=>Function.prototype

## Function instanceof Object   //true
Function=>Function.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
Object => Object.prototype

## Person instanceof Function     //true
Person=>Person.__proto__=>Function.prototype
Function=>Function.prototype

## String instanceof String   //false
第一个String的原型链：String=>String.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
第二个String的原型链：String=>String.prototype

## Boolean instanceof Boolean //false
第一个Boolean的原型链：Boolean=>Boolean.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
第二个Boolean的原型链：Boolean=>Boolean.prototype

## Person instanceof Person //false
第一个Person的原型链：Person=>Person.__proto__=>Function.prototype=>Function.prototype.__proto__=>Object.prototype
第二个Person的原型链：Person=>Person.prototype

## 模拟实现一个instanceof方法
```
function myInstanceof(left, right) {
  let proto = left.__proto__;
    let prototype = right.prototype;
    while(true){
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
console.log(myInstanceof(Object, Object))   //true
console.log(myinstanceof(Function, Function))  //true
console.log(myinstanceof(Boolean, Boolean))  //false
console.log(myinstanceof(Person, Person))   //false
```
