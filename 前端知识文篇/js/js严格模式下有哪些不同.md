<!--
 * @Author: angula
 * @Date: 2020-09-09 15:55:15
 * @LastEditTime: 2020-09-09 15:56:05
 * @FilePath: \JS\study\前端知识文篇\js\js严格模式下有哪些不同.md
-->

1. 不允许不使用 var 关键字去创建全局变量，抛出 ReferenceError

2. 不允许对变量使用 delete 操作符，抛 ReferenceError

3. 不可对对象的只读属性赋值，不可对对象的不可配置属性使用 delete 操作符，不可为不可拓展的对象添加属性，均抛 TypeError

4. 对象属性名必须唯一

5. 函数中不可有重名参数

6. 在函数内部对修改参数不会反映到 arguments 中

7. 淘汰 arguments.callee 和 arguments.caller

8. 不可在 if 内部声明函数

9. 抛弃 with 语句
