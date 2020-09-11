<!--
 * @Author: angula
 * @Date: 2020-09-11 23:10:45
 * @LastEditTime: 2020-09-11 23:10:57
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\前端知识文篇\css相关文章\var let const区别.md
-->
js中存在三种声明变量的方式 **var let const**，但是他们之间的区别很多却分不清

## var

 1. var只有函数作用域，没有块作用域，可以声明全局/局部变量（在一共函数内声明的变量，只在该函数有效）
 2. var定义的变量不能跨函数访问，但是可以跨块访问！
 3. var 定义的变量如果不初始化会输出undefined，但不会报错
 4. 可以重复定义，后定义的会覆盖先定义的
 

```javascript
//3
var aaa;
console.log(aaa);   //会输出undefined，并不会报错
//-----------------------------------------
var a = 1;   //全局变量
console.log("全局变量a："+a);    //全局变量a： 1

function A(){
    a=2;
    console.log("局部变量a:"+a);  //局部变量a: 2
    
}
A();
console.log("调用A函数，a变为函数A内部修改的值："+a);   //调用A函数，a变为函数A内部修改的值：2
//---------------------------------------------
var b=1;
var b=2;
console.log(b);  //2,后面的声明覆盖了前面的声明
```

## let

 1. let是块级作用域，函数内部使用let定义后，对函数外部无影响
 2. let定义的变量只能在块作用域中访问，不能跨块访问，更不能跨函数访问
 3. 不能变量声明提前，否则会报错
 4. 不能重复定义，否则会报错
 

```javascript
//---1------
let a =1;
console.log("全局变量a："+a); // 1
function A(){
    let a = 2;
    console.log("函数内部定义a："+a);  //2
}
A();
console.log("A()函数调用后，let定义的a值在函数内部修改"+a);  //1  并不能访问到
//---2-----
var b=1;
{
    let b=2;
    console.log(b);  //  2
}
console.log(b);   //1

//---3------
console.log(aaa);
let aaa=1;   
//会进行报错，不能变量声明提前
//----4-------
let p = 1;
let p = 2;
console.log(p);  //重复定义，会报错


```

## const

 1. const 定义的变量**不可以修改**，并且必须进行**初始化**
 2. const一般用来声明常量，并且声明的常量不允许改变的，(**只读属性**)，因此**必须在声明的同时进行赋值** 
 3. const也是块级作用域，与let相同，只能在块作用域里访问，存在暂时性死区，不存在变量声明提前，不允许重复定义
 

```javascript
const a =1;   //正确
const b;   //报错
//-----------------
const c=1;
const c=1;
//重复定义会报错


```
