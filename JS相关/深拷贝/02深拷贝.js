/*
 * @Author: angula
 * @Date: 2020-09-02 18:22:46
 * @LastEditTime: 2020-09-02 22:50:35
 * @FilePath: \JS\深拷贝\02深拷贝.js
 */

/*
 *深拷贝
 */

//  1. 一个简单的深拷贝
/**
let obj1 = {
  a: {
    b: 1
  },
  c: 1
};

let obj2 = {};

obj2.a = {};
obj2.c = obj1.c;
obj2.a.b = obj1.a.b;

console.log("原obj1:", obj1);   //原obj1: { a: { b: 1 }, c: 1 }
console.log("复制的obj2", obj2);  //复制的obj2 { a: { b: 1 }, c: 1 }
// 修改原obj1中的b为2
obj1.a.b = 2;
//观察复制的obj2会不会发生改变
console.log("修改后的obj1:", obj1);  // 修改后的obj1: { a: { b: 2 }, c: 1 }
console.log("obj2:", obj2);   // obj2: { a: { b: 1 }, c: 1 }
*/

// 2. JSON.stringify
// let obj1 = {
//   a: 1,
//   b: [1, 2, 3]
// }

// let str = JSON.stringify(obj1);
// let obj2 = JSON.parse(str);
// console.log(obj2);  //{ a: 1, b: [ 1, 2, 3 ] }

// //修改obj1
// obj1.a = 2;
// obj1.b.push(4);
// console.log(obj1);   //{ a: 2, b: [ 1, 2, 3, 4 ] }
// console.log(obj2);   //{ a: 1, b: [ 1, 2, 3 ] }

// function deepClone(source) {
//   const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
//   for (let keys in source) { // 遍历目标
//     if (source.hasOwnProperty(keys)) {
//       if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
//         targetObj[keys] = source[keys].constructor === Array ? [] : {};
//         targetObj[keys] = deepClone(source[keys]);
//       } else { // 如果不是，就直接赋值
//         targetObj[keys] = source[keys];
//       }
//     }
//   }
//   return targetObj;
// }

// var str1 = {
//   arr: [1, 2, 3],
//   obj: {
//     key: 'value'
//   },
//   fn: function () {
//     return 1;
//   }
// };
// var str3 = deepClone(str1);

// console.log(str3 === str1); // false
// console.log(str3.obj === str1.obj); // false
// console.log(str3.fn === str1.fn); // true

function deepClone(source) {
  // 判断复制的目标是数组还是对象
  const targetObj = source.constructor === Array ? [] : {};
  for (let keys in source) { //遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { //如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);

      } else {  //如果2不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}


//测试
let str1 = {
  arr: [1, 2, 3],
  obj: {
    key: 'value'
  },
  fn: function () {
    return 1;
  }
};
let str = deepClone(str1);
console.log(str === str1);  //false
console.log(str.obj === str1.obj);   //false
// console.log(str.obj)
console.log(str.fn === str1.fn);     //false
