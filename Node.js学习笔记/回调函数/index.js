/*
 * @Author: angula
 * @Date: 2020-09-21 20:10:06
 * @LastEditTime: 2020-09-21 20:21:07
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\回调函数\index.js
 */
let fs = require('fs');

// 阻塞
let data_one = fs.readFileSync('test.txt');
console.log(data_one.toString())

//非阻塞
fs.readFile('test.txt', function (err, data) {
  if (err) console.log(err);
  console.log(data.toString())  //hello, my name is angula;
})