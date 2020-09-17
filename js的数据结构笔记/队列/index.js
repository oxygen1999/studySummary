/*
 * @Author: angula
 * @Date: 2020-09-16 17:02:20
 * @LastEditTime: 2020-09-16 18:15:10
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\队列\index.js
 */
// 实现一个队列

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




// ------------------测试--------------------------------
let queue = new Queue();

// 将元素插入到队列中
queue.enqueue('a');
queue.enqueue('b');
queue.enqueue('c');
queue.enqueue('d');
queue.enqueue('e');

console.log('插入元素：' + queue.toString())

// 删除元素
queue.dequeue();
console.log('删除元素之后：' + queue.toString());

// front方法
console.log('队列前端的元素：' + queue.front());

//判断是否为空
console.log('是否为空：' + queue.isEmpty())

//队列长度
console.log('队列长度：' + queue.size());