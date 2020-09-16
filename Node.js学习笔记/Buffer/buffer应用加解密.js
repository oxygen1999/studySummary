/*
 * @Author: angula
 * @Date: 2020-09-16 00:08:30
 * @LastEditTime: 2020-09-16 00:08:32
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\Buffer\buffer应用加解密.js
 */
const crypto = require('crypto');
const [key, iv, algorithm, encoding, cipherEncoding] = [
  'a123456789', '', 'aes-128-ecb', 'utf8', 'base64'
];

const handleKey = key => {
  const bytes = Buffer.alloc(16); // 初始化一个 Buffer 实例，每一项都用 00 填充
  console.log(bytes); // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
  bytes.fill(key, 0, 10) // 填充
  console.log(bytes); // <Buffer 61 31 32 33 34 35 36 37 38 39 00 00 00 00 00 00>

  return bytes;
}

let cipher = crypto.createCipheriv(algorithm, handleKey(key), iv);
let crypted = cipher.update('angula', encoding, cipherEncoding);
crypted += cipher.final(cipherEncoding);

console.log(crypted) //yjOrnUKXqxMyQWuAUBcjyQ==