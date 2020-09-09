/*
 * @Author: angula
 * @Date: 2020-09-09 09:54:30
 * @LastEditTime: 2020-09-09 10:38:28
 * @FilePath: \JS\study\笔试相关\小红书笔试\02.js
 */
// !统计数组中字符出现的频率，>=2返回true，小于2返回false
/**
 * 
 * 首先检测typeof obj[str] 如果第一次肯定是不存在，然后打印undefined，这时候值修改为false
 * 如果还存在 ，那么typeof false 结果为Boolean，与undefined不等，返回true
 * 如果只有一个，那么则返回false
 */


function duplicates(arr) {
  let obj = {};
  arr.forEach((str) => {
    // console.log(str);
    console.log(obj[str]);
    obj[str] = typeof obj[str] === 'undefined' ? false : true;
  });

  return obj;
}
let arr = ['a', 'a', 'a', 'b', 'c', 'c'];
console.log(duplicates(arr));
console.log(typeof false)