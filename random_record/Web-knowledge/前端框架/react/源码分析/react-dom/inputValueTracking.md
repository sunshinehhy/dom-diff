https://github.com/facebook/react/blob/master/packages/react-dom/src/client/inputValueTracking.js

如果有人已经定义了一个值或Safari，那么保释后不跟踪值将导致对更改的报告过多，但这比硬失败要好(spyOn输入值和Safari需要的某些测试)