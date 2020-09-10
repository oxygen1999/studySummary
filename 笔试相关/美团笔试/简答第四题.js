/*
 * @Author: angula
 * @Date: 2020-09-10 09:38:07
 * @LastEditTime: 2020-09-10 10:46:17
 * @FilePath: \JS\study\笔试相关\美团笔试\简答第四题.js
 */
/**
 * 将ES6代码转换为ES5代码
 */

/**
 * class Person {
    constructor (name) {
         this.name = name;
    }
    greet () {
         console.log(`Hi, my name is ${this.name}`);
    }
    greetDelay (time) {
         setTimeout(() => {
              console.log(`Hi, my name is ${this.name}`);
         }, time);
    }
}
 */


//  !主要考察this指向
function Person(name) {
  this.name = name;
}

Person.prototype = {
  greet: function () {
    console.log('Hi, my name is ' + this.name)
  },
  greetDelay: function (time) {
    let _this = this;
    setTimeout(function () {
      console.log('Hi, my name is ' + _this.name)
    }, time)
  }
}