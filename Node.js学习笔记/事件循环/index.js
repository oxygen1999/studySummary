/*
 * @Author: angula
 * @Date: 2020-09-21 20:23:33
 * @LastEditTime: 2020-09-21 20:49:10
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\事件循环\index.js
 */
//引入events模块
let events = require('events');

//创建eventEmitter对象
let eventEmitter = new events.EventEmitter();

//创建事件处理程序
let connectHandle = function connected() {
  console.log('连接成功');
  //触发data_received事件
  eventEmitter.emit('data_received')
}

//绑定connection事件处理程序
eventEmitter.on('connection', connectHandle);

//使用匿名函数绑定data_received事件
eventEmitter.on('data_received', function () {
  console.log('数据接收成功');
})

//触发connecttion事件
eventEmitter.emit('connection');
console.log('程序执行完毕');