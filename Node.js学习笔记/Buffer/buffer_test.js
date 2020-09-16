/*
 * @Author: angula
 * @Date: 2020-09-14 10:51:18
 * @LastEditTime: 2020-09-16 00:02:19
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\Buffer\buffer_test.js
 */


// 创建一个长度为10,用0填充的Buffer
const buf1 = Buffer.alloc(10);

//创建一个长度为10,用0x1填充的buffer
const buf2 = Buffer.alloc(10, 1);

//创建一个长度为10,且未初始化的buffer 
//!这个方法比调用Buffer.alloc()更快,但返回的buffer实例可能包含旧数据
//所以需要fill或者write重写
const buf3 = Buffer.allocUnsafe(10)

//创建一个包含[0x1,0x2,0x3]的buffer
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
const buffer7 = Buffer.from('angula', 'utf-8');
console.log(buffer7)  //输出 

//--------------------------------------

buf = Buffer.alloc(256);
len = buf.write("angula is the best");
console.log("写入的字节数:", len);   //写入字节数:18


let buf7 = Buffer.alloc(26);
for (let i = 0; i < 26; i++) {
  buf7[i] = i + 97
}
console.log(buf7.toString('ascii'))
console.log(buf7.toString('ascii', 0, 5));  // mascii编码,abcde
console.log(buf7.toString('utf-8', 0, 5));  //utf-8   abcde
console.log(buf7.toString(undefined, 0, 5));  //默认为utf-8编码



///JSON对象------------------------------------------
/*

const buf8 = Buffer.from([0x1, 0x2, 0x3, 0x4]);
const json = JSON.stringify(buf8);
console.log(json);  //{"type":"Buffer","data":[1,2,3,4]}
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ? Buffer.from(value.data) : value
})
console.log(copy)  //<Buffer 01 02 03 04>
*/

//缓存区合并------------------------------
/*
let buffer1 = Buffer.from('name:')
let buffer2 = Buffer.from('angula')
let buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('新对象buffer3:' + buffer3.toString());
*/

// 缓冲区比较--------------------------------------
/*
let buff1 = Buffer.from('abc');
let buff2 = Buffer.from('abcd');
var result = buff1.compare(buff2);

if (result < 0) {
  console.log(buff1 + '在' + buff2 + '之前');
}
else if (result == 0) {
  console.log(buff1 + '在' + buff2 + '相同');
} else {
  console.log(buff1 + '在' + buff2 + '之后');
}
*/
//缓冲区的拷贝----------------------------------------
/*
var a = Buffer.from('abcdefghjkl');
var b = Buffer.from('angula');

//从a的index=2开始,用b替换a之后的值,替换的长度为b的长度
b.copy(a, 2);
console.log(a.toString());   //输出abangulajkl
*/

//缓冲区的裁剪-----------------------------------------

let c = Buffer.from('angula');
let d = c.slice(0, 3);
console.log(d.toString())  //输出:ang


//缓冲区的长度----------------------------------------
var e = Buffer.from('angula');
var f = e.length;
console.log('缓冲区e的长度:', f)

