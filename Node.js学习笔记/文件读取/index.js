/*
 * @Author: angula
 * @Date: 2020-09-11 21:23:46
 * @LastEditTime: 2020-09-12 16:50:39
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\文件读取\index.js
 */
//导入文件系统模块
var fs = require('fs');
/**
 * node.js文件系统（fs模块）中均有异步喝同步版本，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()
 * 
 * 异步的方法函数最后一个参数为回调函数，回调函数恶的第一个参数包含了错误信息(error)
 * 
 * 最好使用异步方法，因为相对于同步，异步方法性能更高，速度更快，并且没有阻塞
 */

//异步读取
fs.readFile('hello.txt', function (err, data) {
  if (err) {
    return console.log(err);
  }
  console.log('异步读取：', data.toString());
})


// 同步读取
var data = fs.readFileSync('hello.txt');
console.log('同步读取：', data.toString());

console.log('结束！')