npm:<https://www.npmjs.com/package/joi>
API:<https://github.com/hapijs/joi/blob/v13.2.0/API.md>

Object schema description language and validator for JavaScript objects.

对象模式描述语言和JavaScript对象验证器。

## Introduction
想象一下，你运行Facebook，你想让访问者在网站上注册真实姓名，而不是在名字栏中输入l337_p @ nda。您如何定义可输入内容的限制并根据设定的规则对其进行验证？



How would you define the limitations of what can be inputted and validate it against the set rules?
你如何定义输入的限制，并根据设定的规则进行验证？

This is joi, joi allows you to create blueprints or schemas for JavaScript objects (an object that stores information) to ensure validation of key information.

这就是joi的用途所在了。joi允许您为JavaScript对象（存储信息的对象）创建蓝图(blueprints)或模式(schemas)，以确保关键信息的验证。
## Example
```
  const Joi = require('joi');
  
  const schema = Joi.object().keys({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      access_token: [Joi.string(), Joi.number()],
      birthyear: Joi.number().integer().min(1900).max(2013),
      email: Joi.string().email()
  }).with('username', 'birthyear').without('password', 'access_token');
  
  // Return result.
  const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
  // result.error === null -> valid
  
  // You can also pass a callback which will be called synchronously with the validation result.
  Joi.validate({ username: 'abc', birthyear: 1994 }, schema, function (err, value) { }); 
```

以上schema定义了如下限制：

- username
  - a required string
  - must contain only alphanumeric characters(只能包含字母字符)
  - at least 3 characters long but no more than 30(长度在3-30)
  - must be accompanied by birthyear(必须伴随着birthyear)
- password
  - an optional string
  - must satisfy the custom regex(必须满足对应的正则表达式)
  - cannot appear together with access_token(和access_token不能同时出现)
- access_token
  - an optional, unconstrained string or number（可选的， 可以是string或number）
- birthyear
  - an integer between 1900 and 2013 （1900到2013之间的整数）
- email
  - a valid email address string（一个有效的email地址字符串）


以上result结果为
```
{ error: null,
  value: { username: 'abc', birthyear: 1994 },
  then: [Function: then],
  catch: [Function: catch] 
}
```
## API
### Errors
<https://github.com/hapijs/joi/blob/v13.2.0/API.md#errors>

Joi throws classical javascript Errors containing :

- name - 'ValidationError'.
- isJoi - true.
- details - an array of errors :
  - message - string with a description of the error.
  - path - ordered array where each element is the accessor to the value where the error happened.
  - type - type of the error.
  - context - object providing context of the error containing at least:
    - key - key of the value that errored, equivalent to the last element of details.path.
    - label - label of the value that errored, or the key if any, or the default language.root.
- annotate - function that returns a string with an annotated version of the object pointing at the places where errors occurred. Takes an optional parameter that, if truthy, will strip the colors out of the output.
- _object - the original object to validate.