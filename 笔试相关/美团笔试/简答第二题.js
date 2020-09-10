/*
 * @Author: angula
 * @Date: 2020-09-10 10:30:19
 * @LastEditTime: 2020-09-10 10:38:37
 * @FilePath: \JS\study\笔试相关\美团笔试\简答第二题.js
 */

/**
 * 请按顺序写出打印结果，并说明原因。
 */
/*
var name = 'global';
var obj = {
 name: 'local',
 foo: function () {
   this.name = 'foo';
 }.bind(window)
};
var bar = new obj.foo();
setTimeout(function () {
 console.log(window.name);
}, 0);
console.log(bar.name);

var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name);

*/


// 解答
var name = 'global';
var obj = {
  name: 'local',
  foo: function () {
    this.name = 'foo';
  }.bind(window)
};

console.log(obj.foo);//此时调用的this是window
// 由于new绑定的优先级大于bind绑定，所以函数内部this是obj{}

var bar = new obj.foo();

// 定时器任务，在最后放入任务队列，window对象没有被改变，输出global
setTimeout(function () {
  console.log(window.name);
}, 0);

console.log(bar.name);  //输出foo，内部foo函数赋值了
//此时执行顺序是var bar3,bar2=bar,bar3=bar2, 所以bar3/bar2/bar都是指向同一个对象
var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name);  //输出foo2