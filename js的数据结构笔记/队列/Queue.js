/*
 * @Author: angula
 * @Date: 2020-09-16 18:38:03
 * @LastEditTime: 2020-09-16 19:10:10
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\队列\Queue.js
 */

function Queue() {
  // 属性
  this.items = [];

  // 方法
  // 1. 将元素加入到队列·中
  Queue.prototype.enqueue = function (element) {
    this.items.push(element);
  }
  // 2. 从队列中删除前端元素  dequeue
  Queue.prototype.dequeue = function () {
    return this.items.shift();
  }

  //3. 查看前端的元素   front
  Queue.prototype.front = function () {
    return this.items[0];
  }

  // 4. 查看队列是否为空  isEmpty
  Queue.prototype.isEmpty = function () {
    return this.items.length === 0;
  }

  // 5. 查看队列中元素的个数  size
  Queue.prototype.size = function () {
    return this.items.length;
  }

  // 6. toString方法
  Queue.prototype.toString = function () {
    let result = '';
    for (let value of this.items) {
      result += value + ' '
    }
    return result;
  }
}
module.exports = Queue;