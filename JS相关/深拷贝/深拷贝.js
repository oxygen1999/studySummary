/*
 * @Author: angula
 * @Date: 2020-09-08 15:11:20
 * @LastEditTime: 2020-09-08 17:10:46
 * @FilePath: \JS\study\JS相关\深拷贝\深拷贝.js
 */
/** 
//  * 仅考虑对象做法
function clone(target) {
  if (typeof target === 'object') {
    // *创建一个新的对象
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
*/
/** 
// *考虑数组，简单将上式修改
function clone(target) {
  if (typeof target === 'object') {
    // *对此进行判断是数组还是对象
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
*/
// !解决循环引用的问题
/** 
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    // *对此进行判断是数组还是对象
    let cloneTarget = Array.isArray(target) ? [] : {};
    // 检查map中有无克隆过的对象
    if (map.get(target)) {
      return map.get(target);
    }
    // 没有克隆对象，将当前对象作为key，克隆对象作为value进行存储
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}
*/
// *这时候一个简单的深拷贝函数已经实现了，下面进行一些性能优化，上面主要使用的for in 而相对于for in,for while 来说，while是最好的
function forEach(array, iteratee) {
  let index = -1;
  while (++index < array.length) {
    iteratee(array[index], index);
  }
  return array;
}
function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    let cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);

    const keys = isArray ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
      if (keys) {
        key = value;
      }
      cloneTarget[key] = clone(target[key], map);
    });
    return cloneTarget;

  } else {
    return target;
  }
}
Date.prototype.clone = function () {
  return new Date(this.valueOf)
}

// !测试代码
const target = {
  age: 1,
  age2: undefined,
  nameL: 'angula',
  name2: {
    child1: 'child1',
    child2: {
      child2: 'child2'
    }
  },
  name3: [1, 2, 3],
}
target.target = target;  //!此时递归进入死循环导致栈内溢出 原因就是上面的对象存在循环引用的情况，即对象的属性间接或直接的引用了自身的情况
// *为解决循环引用的问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间找，有没有拷贝过这个对象
// *如果有的话直接返回，如果没有的话继续拷贝，这样就可以解决循环引用产生的问题啦！
const result = clone(target);
console.log(result);
