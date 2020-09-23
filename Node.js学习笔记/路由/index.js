/*
 * @Author: angula
 * @Date: 2020-09-23 14:24:45
 * @LastEditTime: 2020-09-23 14:25:59
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\路由\index.js
 */
let server = require('./server')
let router = require('./router')

server.start(router.route)