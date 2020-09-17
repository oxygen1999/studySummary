/*
 * @Author: angula
 * @Date: 2020-09-16 18:21:48
 * @LastEditTime: 2020-09-16 19:08:53
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\队列\击鼓传花.js
 */

let Queue = require('./Queue')
// console.log(queue)
function passGame(nameList, num) {
  // 创建一个队列结构

  let queue = new Queue();

  // 将所有人依次加入到队列中
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i]);
  }


  // 进行数数字，
  /**
   * 1. 下标值如果小于num-1时，说明还没有数到num，那么只需要将队列前面的加入到队尾即可
   * 2. 如果是这个数字的位置的时候，将其从队列中删除
   * 3. 当数组的长度大于1时，说明数组中的元素不是最后一个，那么继续进行循环 用while循环
   */

  while (queue.size() > 1) {
    //将num之前的数加入到队尾
    for (let i = 0; i < num - 1; i++) {
      queue.enqueue(queue.dequeue());
    }
    //将num对应的这个人删除
    queue.dequeue();
  }
  //输出剩下的那个人
  console.log('剩余几人：' + queue.size())
  console.log('胜利者为：' + queue.front());
  console.log('胜利者在原数组的位置' + nameList.indexOf(queue.front()))

}


// 测试
let arr = ['a', 'b', 'c', 'd', 'e', 'f'];
let num = 3;
passGame(arr, num);