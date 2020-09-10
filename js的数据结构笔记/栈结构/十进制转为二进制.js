/*
 * @Author: angula
 * @Date: 2020-09-10 21:34:28
 * @LastEditTime: 2020-09-10 22:09:29
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\js的数据结构笔记\栈结构\十进制转为二进制.js
 */
/**
 * 十进制转换成二进制
 * 比如十进制100转换成二进制为1100100
 * 首先要理解转换过程
 * 
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


function dec2bin(decNumber) {
  //  定义一个栈对象
  var stack = new Stack();

  // 循环操作
  while (decNumber > 0) {
    stack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }

  // 输出结果
  var result = '';
  while (!stack.isEmpty()) {
    result += stack.pop();
  }
  return result;

}
console.log(dec2bin(100)); //1100100



// 单纯实现十进制与二进制的转换
/**
function dec2bin(decNumber) {
  //  定义一个栈对象
  var stack = [];

  // 循环操作
  while (decNumber > 0) {
    stack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }

  // 输出结果
  var result = '';
  while (stack.length !== 0) {
    result += stack.pop();
  }
  return result;

}
console.log(dec2bin(100));
*/