/*
 * @Author: angula
 * @Date: 2020-09-09 10:38:37
 * @LastEditTime: 2020-09-09 11:02:44
 * @FilePath: \JS\study\笔试相关\小红书笔试\03.js
 */
/**
 * 使用js实现一个 f1lterSensitiveWord方法
 * 将指定字符串中的敏感词过滤 ，将指定字符串中的敏感词替换为星号字符(*)
 * @example
输入：f1lterSensitiveWord( 想要轻生，have sex, sexy babe', ['轻生'， 'sex'])
输出：'想要**,have sex ,sexy babe'

 * */

function fn(str, arr) {
  for (let item of arr) {
    let length = item.length;
    let ret = new RegExp(`${item}`, 'g');
    str = str.replace(ret, '*'.repeat(length));
  }
  return str;
}
let result = fn('想要轻生，have sex, sexy babe', ['轻生', 'sex'])
console.log(result)