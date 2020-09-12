/*
 * @Author: angula
 * @Date: 2020-09-12 23:48:16
 * @LastEditTime: 2020-09-13 00:09:41
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\文件读取\目录.js
 */
var fs = require('fs')
console.log('创建目录');
fs.mkdir('./img/test', {
  recursive: true
}, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('创建成功');
  }

})

// 读取目录
fs.readdir('./img', function (err, files) {
  if (err) {
    console.log(err);
  } else {
    files.forEach(function (file) {
      console.log(file);
    })
  }

})


// 删除目录
console.log('删除/img/test目录');
fs.rmdir('./img/test', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('删除成功')
  }
})