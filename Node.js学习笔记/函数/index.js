/*
 * @Author: angula
 * @Date: 2020-09-22 16:41:54
 * @LastEditTime: 2020-09-22 16:53:12
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\函数\index.js
 */
// function say(word) {
//   console.log(word);
// }

// function execute(someFunction, value) {
//   someFunction(value)
// }

// execute(say, 'hello')


//匿名函数

function execute(someFunction, value) {
  someFunction(value);
}

execute(function (word) { console.log(word) }, "Hello");


//让服务器工作
/*
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
*/
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);
