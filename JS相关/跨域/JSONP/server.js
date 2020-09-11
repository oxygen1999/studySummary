/*
 * @Author: angula
 * @Date: 2020-09-11 16:08:11
 * @LastEditTime: 2020-09-11 16:24:31
 * @FilePath: \JS\Test_one\跨域\JSONP\server.js
 */
let express = require('express');
let app = express();
app.listen(8001, () => {
  console.log('开始监听...');
})

app.get('/list', (req, res) => {
  let { callback } = req.query;
  let data = {
    code: 0,
    message: 'angula'
  };
  res.send(`${callback}(${JSON.stringify(data)})`)
})