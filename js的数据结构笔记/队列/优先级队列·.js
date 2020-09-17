/*
 * @Author: angula
 * @Date: 2020-09-17 15:36:12
 * @LastEditTime: 2020-09-17 16:49:07
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\队列\优先级队列·.js
 */
// 疯转一个优先级队列
function PriorityQueue() {

  //创建一个类
  function QueueElement(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  //属性
  this.items = [];

  // 插入
  PriorityQueue.prototype.enqueue = function (element, priority) {
    //创建QueueElement对象
    var queueElement = new QueueElement(element, priority);
    // 判断队列是否为空
    if (this.items.length == 0) {
      this.items.push(queueElement)
    } else {
      let added = false;
      for (let i = 0; i < this.items.length; i++) {

        if (queueElement.priority < this.items[i].priority) {
          this.items.splice(i, 0, queueElement)
          added = true;
          break;
        }
      }
      if (!added) {
        this.items.push(queueElement)
      }
    }
  }

  //其他方法与Queue相同


}


//test

let pq = new PriorityQueue();
pq.enqueue('aa', 10);
pq.enqueue('bc', 9)
pq.enqueue('da', 22)
pq.enqueue('de', 12)
pq.enqueue('dads', 1)
pq.enqueue('ad', 200)
pq.enqueue('dasda', 13)
console.log(pq.items)