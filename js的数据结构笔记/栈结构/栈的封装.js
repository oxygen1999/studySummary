/*
 * @Author: angula
 * @Date: 2020-09-10 21:12:33
 * @LastEditTime: 2020-09-10 21:33:17
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\栈结构\栈的封装.js
 */
function Stack() {
  this.items = [];
  // 栈的相关操作实现
  // 1. 将元素压入栈
  Stack.prototype.push = function (element) {
    this.items.push(element);
  }
  // 2.从栈中取出元素
  Stack.prototype.pop = function () {
    return this.items.pop();
  }
  // 3. 查看栈顶元素
  Stack.prototype.peek = function () {
    return this.items[this.items.length - 1];
  }
  // 4. 判断栈中元素个数
  Stack.prototype.isEmpty = function () {
    return this.items.length == 0;
  }
  // 5. 获取栈中元素个数
  Stack.prototype.size = function () {
    return this.items.length;
  }
  // 6 toString方法
  Stack.prototype.toString = function () {
    var result = '';
    for (var i = 0; i < this.items.length; i++) {
      result += this.items[i] + ' ';
    }
    return result;
  }
}
var s = new Stack();

s.push(1);
s.push(2);
s.push(3);
s.push(4);
console.log('栈内元素：', s.items);

console.log('取出的元素为', s.pop())
console.log('取出元素后：', s.items);


console.log('此时栈顶元素', s.peek())
console.log(s.toString())