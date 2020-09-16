<!--
 * @Author: angula
 * @Date: 2020-09-14 10:51:26
 * @LastEditTime: 2020-09-16 00:14:53
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\Node.js学习笔记\Buffer\buffer.md
-->
# Buffer
Buffer 对象用于表示固定长度的字节序列，许多Node.js的API都支持Buffer

Buffer 类是 JavaScript 的 Uint8Array 类的子类，且继承时带上了涵盖额外用例的方法。 只要支持 Buffer 的地方，Node.js API 都可以接受普通的 Uint8Array。

Buffer 类在全局作用域中，因此无需使用 require('buffer').Buffer。

为何使用buffer?
- js自身只有字符串数据类型,没有二进制数据类型.
- 但在处理像TCP流或者文件流时必须室友二进制数据,所以定义了一个buffer类
- buffer类用来创建一个专门存放二进制数据的缓存区


## 创建buffer类
buffer提供了以下几个API来创建Buffer类
- Buffer.alloc(size[,fill[,encoding]]):返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

示例:
```js
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

//字符串转buffer
const buffer7 = Buffer.from('angula','utf-8');
console.log(buffer7)  //输出 <Buffer 61 6e 67 75 6c 61>
```
## 缓冲区的长度
```
语法:buf.length
返回buffer对象所占据的内存长度
```
示例:
```js
var e = Buffer.from('angula');
var f = e.length;
console.log('缓冲区e的长度:', f)   //输出:缓冲区e的长度: 6
```


## 写入缓冲区

```
语法:buf.write(string[,offset[,length]][,encoding])

```
参数:
- string:写入缓冲区的字符串
- offset:缓冲区开始写入的索引值,默认为0
- length:写入的字节数,默认为buffer.length
- encoding:使用的编码,默认为utf-8

根据encoding的字符编码写入string到buf中的offset位置.length参数是写入的字节数.如果buf没有足够的空间保存整个字符串,则只会写入string的一部分,只部分解码的字符不会被写入

返回值: 返回实际写入的大小,如果buffer空间不足,则只会写入部分字符串

```js
buf = Buffer.alloc(256);
len = buf.write("angula is the best");
console.log("写入的字节数:", len);   //写入字节数:18

```

## 从缓冲区读取数据

```
语法:buf.toString([encoding[,start[,end]]])
返回值: 解吗缓冲区数据并使用指定的编码返回字符串
```
参数:
- encoding:编码方式,默认为utf-8编码
- start : 指定开始读取的索引位置
- end:结束位置,默认为缓冲区的末尾

```js

let buf7 = Buffer.alloc(26);
for (let i = 0; i < 26; i++) {
  buf7[i] = i + 97
}
console.log(buf7.toString('ascii'))
console.log(buf7.toString('ascii', 0, 5));  // mascii编码,abcde
console.log(buf7.toString('utf-8', 0, 5));  //utf-8   abcde
console.log(buf7.toString(undefined, 0, 5));  //默认为utf-8编码
```

## 将Buffer转换为JSON对象
```
buf.toJSON()
返回JSON对象
```
当字符串化一个buffer实例时,JSON.stringify()会隐式的调用该toJSON();

```js

const buf8 = Buffer.from([0x1, 0x2, 0x3, 0x4]);
const json = JSON.stringify(buf8);
console.log(json);  //{"type":"Buffer","data":[1,2,3,4]}
const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ? Buffer.from(value.data) : value
})
console.log(copy)  //<Buffer 01 02 03 04>
```
## 缓冲区合并
```
语法:Buffer.concat(list[, totalLength])
返回一个多个成员合并的新 Buffer 对象。
```
参数:
- list - 用于合并的 Buffer 对象数组列表。
- totalLength - 指定合并后Buffer对象的总长度。

示例:
```js

//缓存区合并
let buffer1 = Buffer.from('name:')
let buffer2 = Buffer.from('angula')
let buffer3 = Buffer.concat([buffer1, buffer2]);
console.log('新对象buffer3:' + buffer3.toString());
```

## 缓冲区比较
```
语法:buf.compare(otherBuffer);
返回一个数字,表示buf在otherbuffer之前之后或者相同
```

参数:
- otherBuffer:与buf对象比较的另外一个buffer对象

```js
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
```

## 缓冲区的拷贝
```
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
没有返回值
```
参数:
- targetBuffer - 要拷贝的 Buffer 对象。
- targetStart - 数字, 可选, 默认: 0
- sourceStart - 数字, 可选, 默认: 0
- sourceEnd - 数字, 可选, 默认: buffer.length

示例:
```js
var a = Buffer.from('abcdefghjkl');
var b = Buffer.from('angula');

//从a的index=2开始,用b替换a之后的值,替换的长度为b的长度
b.copy(a, 2);
console.log(a.toString());   //输出abangulajkl
```


## 缓冲区的裁剪
```
语法:buf.slice([start[, end]])
返回一个新的缓冲区,它和旧的缓冲区指向同一块内存,但是从索引start到end的位置剪切( >= start && < end)
```
参数:
- start - 数字, 可选, 默认: 0
- end - 数字, 可选, 默认: buffer.length

示例:
```js

let c = Buffer.from('angula');
let d = c.slice(0, 3);
console.log(d.toString())  //输出:ang
```
# buffer应用场景
## I/O操作
关于 I/O 可以是文件或网络 I/O，以下为通过流的方式将 input.txt 的信息读取出来之后写入到 output.txt 文件
```js
const fs = require('fs');

const inputStream = fs.createReadStream('input.txt'); // 创建可读流
const outputStream = fs.createWriteStream('output.txt'); // 创建可写流

inputStream.pipe(outputStream); // 管道读写

```
在 Stream 中我们是不需要手动去创建自己的缓冲区，在 Node.js 的流中将会自动创建。

## 加解密
在一些加解密算法中会使用Buffer
使用Buffer.alloc()初始化一个实例,然后使用fill方法作填充

buf.fill(value[, offset[, end]][, encoding])

- value: 第一个参数为要填充的内容
- offset: 偏移量，填充的起始位置
- end: 结束填充 buf 的偏移量
- encoding: 编码集


以下为 Cipher 的对称加密 示例:
```js
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

```