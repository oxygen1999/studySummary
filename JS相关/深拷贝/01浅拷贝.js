/*
 * @Author: angula
 * @Date: 2020-09-02 15:48:51
 * @LastEditTime: 2020-09-02 18:13:28
 * @FilePath: \JS\深拷贝\01浅拷贝.js
 */
// 浅拷贝
//Object.assign(target,...sources)
/*
let target = {};
let source = { a: { b: 2 } };
Object.assign(target, source);
console.log(target); //{ a: { b: 2 } }
*/

/*
 * 首先我们先通过 Object.assign 将 source 拷贝到 target 对象中，然后我们尝试将 source 对象中的 b 属性修改由 2 修改为 10
 */
// let target = {};
// let source = { a: { b: 2 } };
// Object.assign(target, source);
// console.log(target);
// source.a.b = 10;
// console.log(source);
// console.log(target);


// let target = {};
// let source = { a: { b: 2 } };
// Object.assign(target, source);
// console.log(target); // { a: { b:2 } };
// source.a.b = 10;
// console.log(source); // { a: { b: 10 } };
// console.log(target); // { a: { b: 10 } };

// let obj1 = {
//   a: {
//     b: 1
//   },
//   sym: Symbol(1)
// };
// Object.defineProperty(obj1, 'innumerable', {
//   value: '不可枚举属性',
//   enumerable: false
// });
// let obj2 = {};
// Object.assign(obj2, obj1)
// obj1.a.b = 2;
// console.log('obj1', obj1);
// console.log('obj2', obj2);


// 2. 扩展运算符 
// let obj = { a: 1, b: { c: 1 } };
// let obj2 = { ...obj };
// obj.a = 10;
// console.log(obj);   //{ a: 10, b: { c: 1 } }
// console.log(obj2);  //{ a: 1, b: { c: 1 } }
// obj.b.c = 2;
// console.log(obj);   //{ a: 10, b: { c: 2 } }
// console.log(obj2);   //{ a: 1, b: { c: 2 } }


/*
 * 3 Array.prototype.slice
 */

// Array.prototype.slice.call({ 0: 'aaa', length: 1 })   //['aaa]
// let arr = [1, 2, 3];
// console.log(arr.slice() === arr);
// let result = arr.slice();
// console.log(result);
// console.log(arr);

/*
 *Array.prototype.concat
 */

// let arr = [{ a: 1 }, { a: 1 }, { a: 1 }];
// let arr2 = [{ b: 1 }, { b: 1 }, { b: 1 }];
// let arr3 = arr.concat(arr2);
// arr2[0].b = 10;
// console.log(arr3)  //[ { a: 1 }, { a: 1 }, { a: 1 }, { b: 10 }, { b: 1 }, { b: 1 } ]


