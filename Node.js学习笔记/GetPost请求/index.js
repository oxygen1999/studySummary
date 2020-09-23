/*
 * @Author: angula
 * @Date: 2020-09-23 20:44:45
 * @LastEditTime: 2020-09-23 21:33:06
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\GetPost请求\index.js
 */

//-----------------------------
const http = require('http');
const url = require('url');
const util = require('util');
//--------------------------------获取GET请求内容---------------------
/*
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-type': 'text/plain;charset=utf-8' });
  res.end(util.inspect(url.parse(req.url, true)))
}).listen(3000)

*/

//--------------------------------获取url参数------------------------
//利用url.parse()方法来解析URL中的参数
/*
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

  //解析url参数
  let params = url.parse(req.url, true).query;
  res.write('姓名：' + params.name);
  res.write('\n');
  res.write('网站url：' + params.url);
  res.end()
}).listen(3000)
*/
//-------------------------------获取post请求内容

const querystring = require('querystring');
var postHTML =
  '<html><head><meta charset="utf-8"><title>Test</title></head>' +
  '<body>' +
  '<form method="post">' +
  '姓名： <input name="name"><br>' +
  '博客地址： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  let post = '';
  //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post的变量中。
  req.on('data', function (chunk) {
    post += chunk;
  });
  //end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function () {
    //解析参数
    post = querystring.parse(post)
    //设置响应头部信息以及编码
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });

    if (post.name && post.url) {
      //输出提交的数据
      res.write('姓名：' + post.name);
      res.write('<br>')
      res.write('blog网址:' + post.url);
    } else {
      res.write(postHTML)
    }

    res.end();
  })
}).listen(3000)
