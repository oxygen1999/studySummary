/*
 * @Author: angula
 * @Date: 2020-09-10 09:54:05
 * @LastEditTime: 2020-09-10 11:44:52
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\笔试相关\美团笔试\编程1.js
 */
/**
 * 形如1, 1, 2, 3, 5, 8, 13, 21, 34, 55的数列，
 * 后一位是前面两位相加（斐波那契数列），
 * 写出函数要求找到第 N 位是多少，如：fib(3) => 3 ， fib(5) => 8, 要求时间复杂度为O(n)。
 */

//  失败，存在性能问题 复杂度不为o(n)
// function fib(n) {
//   if (n == 0) return 0;
//   if (n == 1) return 1;
//   if (n >= 2) {
//     return fib(n - 1) + fib(n - 2);
//   }
// }
// console.log(fib(50))

//for循环实现 
//!完全可以实现题目要求，但是牛客上判题不通过，说输出值为空 
function fib(n) {
  let last = 1;
  let last2 = 0;
  let current = last2;
  for (let i = 1; i <= n; i++) {
    current = last + last2;
    last2 = last;
    last = current;
  }
  return current;
}
console.log(fib(5))


// 牛客可以AC解法
/*
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout
})
let inArr = []
rl.on('line', line=>{
    if(!line) return
    inArr.push(line.trim())
    if(inArr.length === 1){
        let n = +inArr[0]
        let dp = [1,1,2]
        for (let i = 3; i < n+1; i++) {
            dp[i]= dp[i-1]+dp[i-2]
        }
        console.log(dp[n])

    }
})
*/