/*
 * @Author: angula
 * @Date: 2020-09-23 16:19:08
 * @LastEditTime: 2020-09-23 18:23:22
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\常用工具\index.js
 */
// const util = require('util');

// async function fn() {
//   return 'hello world';
// }
// const callbackFunction = util.callbackify(fn);

// callbackFunction((err, ret) => {
//   if (err) throw err;
//   console.log(ret)
// })


//!----------------------inherits---------------------
/*
const util = require('util')

function Base() {
  this.name = 'angula'
  this.base = 1999;
  this.sayHello = function () {
    console.log('Hello ' + this.name)
  }
}

Base.prototype.showName = function () {
  console.log(this.name);
}


function Sub() {
  this.name = 'nicai'
}

util.inherits(Sub, Base)

let objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);


let objSub = new Sub();
objSub.showName();
// objSub.sayHello();  该函数不能被继承哦
console.log(objSub);
*/
const util = require('util')
function Person() {
  this.name = 'angula';
  this.toString = function () {
    return this.name;
  }
}

let obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true))
