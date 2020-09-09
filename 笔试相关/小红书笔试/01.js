/*
 * @Author: angula
 * @Date: 2020-09-09 09:25:36
 * @LastEditTime: 2020-09-09 09:54:21
 * @FilePath: \JS\study\笔试相关\小红书笔试\01.js
 */


// 'use strict'
var name = 'Jay'
var person = {
  name: 'wang',
  pro: {
    name: 'Michael',
    getName: function () {
      // console.log(this);
      console.log(this)
      return this.name;
    }
  }
}

console.log(person.pro.getName());

// 注意此时this指向，为何在非严格模式下依然打印undefined
var people = person.pro.getName;
console.log(people());    