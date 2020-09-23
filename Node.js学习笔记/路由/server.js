/*
 * @Author: angula
 * @Date: 2020-09-22 17:11:37
 * @LastEditTime: 2020-09-23 14:29:14
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\路由\server.js
 */
let http = require('http');
let url = require('url');


function start(route) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname;
    console.log('Request for' + pathname + "received");

    route(pathname)

    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write('hello world');
    response.end();
  }
  http.createServer(onRequest).listen(8888);
  console.log('Server has started')
}

exports.start = start;