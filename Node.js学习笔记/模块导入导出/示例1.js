/*
 * @Author: angula
 * @Date: 2020-09-11 10:20:48
 * @LastEditTime: 2020-09-11 10:35:44
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\模块导入导出\示例1.js
 */
class User {
  constructor() {
    this.username = 'angula';
    this.password = '123456';
  }
}

var u1 = new User();
console.log(u1);

let a = require('./01')
console.log(a);