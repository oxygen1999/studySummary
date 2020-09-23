/*
 * @Author: angula
 * @Date: 2020-09-23 14:37:35
 * @LastEditTime: 2020-09-23 16:15:36
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\全局对象\index.js
 */

console.log(__filename);
console.log(__dirname);


process.on('exit', code => {
  setTimeout(() => {
    console.log('该行代码不会执行');
  }, 0);
  console.log('退出码为：' + code);
})
console.log('程序执行结束')

//打印：程序执行结束  退出码为：0
//---------------------------------------------
console.log('当前目录:' + process.cwd());
console.log('当前版本：' + process.version);
console.log('内存使用情况：', process.memoryUsage());