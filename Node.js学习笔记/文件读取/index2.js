/*
 * @Author: angula
 * @Date: 2020-09-12 17:04:00
 * @LastEditTime: 2020-09-12 23:46:37
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\文件读取\index2.js
 */
var fs = require('fs');
//! 1.异步打开文件

// fs.stat('./hello.txt', function (err, stats) {
//   console.log(stats.isFile()); //true
// })

// console.log('正在打开文件...');
// fs.open('hello.txt', 'r+', function (err, fd) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(fd)
//   console.log('文件已打开');
// })




//! 2. 获取文件信息

// fs.stat('hello.txt', function (err, stats) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(stats);
//   console.log('已读取');

//   // 检测文件类型
//   console.log('是否为文件？' + stats.isFile());
//   console.log('是否为目录？' + stats.isDirectory());
// })



//! 3. 异步写入文件

// console.log('写入文件...');
// fs.writeFile('test.txt', '我是fs.write写入文件的内容', function (err) {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('写入成功');

//   console.log('---------');
//   console.log('读取数据:');
//   fs.readFile('test.txt', (err, data) => {
//     if (err) return console.log(err);
//     console.log('异步读取数据：', data.toString());
//   })
// })



// ! 读取文件

var buf = new Buffer.alloc(1024);
console.log('打开文件...');
fs.open('hello.txt', 'r+', (err, fd) => {
  if (err) return err;

  console.log('打开完毕')

  // 截取文件
  console.log('截取10字节的内容，多余内容将被去除');
  fs.ftruncate(fd, 10, function (err) {
    if (err) {
      console.log(err);
    }
    console.log('截取成功')
  })

  console.log('读取文件...');

  fs.read(fd, buf, 0, buf.length, 0, (err, bytes) => {
    if (err) {
      console.log(err)
    }
    console.log(bytes + ' 字节被读取');

    //输出被读取的字节
    if (bytes > 0) {
      console.log(buf.slice(0, bytes).toString());
    }

    // 关闭文件
    fs.close(fd, function (err) {
      if (err) {
        console.log(err);
      }
      console.log('已关闭文件')
    })

    // 删除文件

  })


})

console.log('删除文件...');
fs.unlink('text.txt', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('删除文件成功')
})