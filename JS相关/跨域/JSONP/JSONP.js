/*
 * @Author: angula
 * @Date: 2020-09-11 16:20:46
 * @LastEditTime: 2020-09-11 16:27:17
 * @FilePath: \JS\Test_one\跨域\JSONP\JSONP.js
 */
// jquery写法
$.ajax({
  url: 'http://127.0.0.1:8001/list',
  method: 'get',
  dataType: 'jsonp',
  success: res => {
    console.log(res.message);
  }
})