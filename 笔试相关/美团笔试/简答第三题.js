/*
 * @Author: angula
 * @Date: 2020-09-10 09:29:24
 * @LastEditTime: 2020-09-10 10:43:40
 * @FilePath: \JS\study\笔试相关\美团笔试\简答第三题.js
 */
setTimeout(() => console.log('a'));
Promise.resolve().then(
  () => console.log('b')
).then(
  () => Promise.resolve('c').then(
    (data) => {
      setTimeout(() => console.log('d'));
      console.log('f');
      return data;
    }
  )
).then(data => console.log(data));
/**
 * setTimeout为放入宏队列
b放入微队列
开始执行，首先打印b
此时有了返回结果开始执行then函数
d放入宏队列
打印f
然后返回data ：c
有了返回结果之后开始执行第二个then
c放入微队列开始执行，打印c
此时宏队列：[a,d]
所以打印顺序为b，f，c，a，d
 */