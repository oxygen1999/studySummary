/*
 * @Author: angula
 * @Date: 2020-09-14 17:33:57
 * @LastEditTime: 2020-09-14 21:41:59
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\JS相关\防抖节流\debounce.js
 */
// func 要执行的函数，wait要等待的时间
// function debounce(func, wait) {
//   let timeout;
//   return function () {
//     // 清空上从定时器
//     clearTimeout(timeout);
//     timeout = setTimeout(func, wait)
//   }

// }


//2 修改this指向  event指向

// function debounce(func, wait) {
//   let timeout;
//   return function () {
//     // console.log(this);  //=>从中可以测试出this指向的container
//     //保存this
//     let _this = this;
//     // 解决前面的event指向问题
//     let args = arguments;
//     // 清空上从定时器
//     clearTimeout(timeout);
//     timeout = setTimeout(function () {
//       // console.log(this)  //=>这里面的this指向window，也就是前面的count那的this是指向window
//       //但是防抖函数的this应该是指向container
//       func.apply(_this, args);

//     }, wait)
//   }

// }


//3 增加立即执行功能

// function debounce(func, wait, immediate) {
//   let timeout;
//   return function () {
//     // console.log(this);  //=>从中可以测试出this指向的container
//     //保存this
//     let _this = this;
//     // 解决前面的event指向问题
//     let args = arguments;
//     // 清空上从定时器
//     clearTimeout(timeout);


//     if (immediate) {
//       let callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, wait);
//       if (callNow) func.apply(_this, args);

//     } else {
//       timeout = setTimeout(function () {
//         // console.log(this)  //=>这里面的this指向window，也就是前面的count那的this是指向window
//         //但是防抖函数的this应该是指向container
//         func.apply(_this, args);

//       }, wait)
//     }


//   }

// }


//4 增加取消操作

// function debounce(func, wait, immediate) {
//   let timeout, result;

//   // 检查func是否为函数
//   if (typeof func !== 'function') {
//     throw new TypeError('Expected a function');
//   }

//   // wait如果忘记设置,,默认为0
//   wait = wait || 0;
//   var debounced = function () {
//     // console.log(this);  //=>从中可以测试出this指向的container
//     //保存this
//     let _this = this;
//     // 解决前面的event指向问题
//     let args = arguments;
//     // 清空上从定时器
//     if (timeout) clearTimeout(timeout);


//     if (immediate) {
//       let callNow = !timeout;
//       timeout = setTimeout(() => {
//         timeout = null;
//       }, wait);
//       if (callNow) result = func.apply(_this, args);

//     } else {
//       timeout = setTimeout(function () {
//         // console.log(this)  //=>这里面的this指向window，也就是前面的count那的this是指向window
//         //但是防抖函数的this应该是指向container
//         func.apply(_this, args);

//       }, wait)
//     }

//     return result;
//   }
//   debounced.cannel = function () {

//     clearTimeout(timeout);
//     timeout = null;
//   }
//   return debounced;

// }


function debounce(func, wait, immediate) {
  let timeout, result;
  if (typeof func !== 'function') {
    throw new TypeError('expected a function')
  }

  const debounced = function () {
    let _this = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) {
        result = func.apply(_this, args);
      }

    } else {
      timeout = setTimeout(function () {
        func.apply(_this, args)
      }, wait)

    }
    return result;

  }
  return debounced;

}