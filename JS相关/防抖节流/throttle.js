/*
 * @Author: angula
 * @Date: 2020-09-15 15:09:09
 * @LastEditTime: 2020-09-15 17:10:27
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\JS相关\防抖节流\throttle.js
 */

//!第一版 第一次触发,最后不会调用触发函数
/*
function throttle(func, wait) {
  let _this, args;
  // 之前的时间戳
  let old = 0;
  return function () {
    // 保存this
    _this = this;
    //保存arguments
    args = arguments;

    // 获取当前时间戳
    let now = new Date().valueOf();
    if (now - old > wait) {
      // 立即执行
      func.apply(_this, args);
      lod = now;

    }
  }
}
*/

// !第二版  第一次不会被触发,最后一次会触发
/*
function throttle(func, wait) {
  let _this, args, timeout;
  return function () {
    _this = this;
    args = arguments;

    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(_this, args);
      }, wait)
    }
  }
}

*/
//! 第三版  完善第三个参数,第一次是否触发,最后一次是否触发
function throttle(func, wait, options) {
  let _this, args, timeout;
  let old = 0;     //时间戳
  //如果没有options就将其设置为空对象
  if (!options) options = {};

  let later = function () {
    old = new Date().valueOf();
    timeout = null;
    func.apply(_this, args);
  }
  return function () {
    _this = this;
    args = arguments;
    let now = new Date().valueOf();
    if (options.leading === false && !old) {
      old = now;
    }
    if (now - old > wait) {
      // 第一次直接执行
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      func.apply(_this, args);
      old = now;
    } else if (!timeout && options.trailing !== false) {
      //最后一次也被执行
      timeout = setTimeout(later, wait)
    }
  }
}

