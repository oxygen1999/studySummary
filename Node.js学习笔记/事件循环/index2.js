/*
 * @Author: angula
 * @Date: 2020-09-21 22:29:18
 * @LastEditTime: 2020-09-22 11:27:56
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\事件循环\index2.js
 */
let events = require('events');
let eventEmitter = new events.EventEmitter();

// 监听器1
let listener1 = function listener1() {
  console.log('监听器listener1启动。。。');
}

// 监听器2
let listener2 = function listener2() {
  console.log('监听器listener2启动。。。');
}

// 绑定connection事件，处理函数为listener1
eventEmitter.addListener('connection', listener1);
// 绑定connection事件，处理函数为listener2
eventEmitter.on('connection', listener2);


//类，返回监听器的数量

let eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器监听连接事件。');


//处理connection事件
eventEmitter.emit('connection');

// 移除绑定的listener1
eventEmitter.removeListener('connection', listener1);
console.log('listener1不再受监听');

//触发连接事件
eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + '个监听器连接事件');

console.log('程序执行完毕');

