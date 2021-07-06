<!--
 * @Author: angula
 * @Date: 2021-07-06 10:25:55
 * @LastEditTime: 2021-07-06 10:27:13
 * @FilePath: \studySummary\前端知识文篇\js相关文章\promise细解三则\01-promise基础篇.md
-->
promise是可以说是面试必考点，而且也是我们日常工作开发中的重要的知识点
对于promise的讲解，将会分成3部分来完成，其中包括基础篇，自定义promise、以及promise的经常考点
下一篇：[详解Promise第二弹(手写Promise)](https://angula.blog.csdn.net/article/details/108031342)
下一篇：[详解Promise第三弹(面试篇)](https://angula.blog.csdn.net/article/details/108031377)
# 一 、了解知识点
## 1.1区分实例对象和函数对象
   - 实例对象:new 函数产生的对象 称为实例对象,简称对象
   - 函数对象:将函数作为对象使用时,简称为函数对
```js
			function Fn(){
				//Fn函数
			}
			const fn = new Fn(){
				//Fn是构造函数,fn是实例化对象(简称对象)
			}
			console.log(Fn.prototype)  //Fn是函数对象
			Fn.call()  //Fn是函数对象
			$('#test)   //jQuery函数
			$.get('/test')  //jQuery函数对象
```

## 1.2 两种类型的回调函数
   - 同步回调:立即执行,完全执行了才结束,不会放入到回调队列中 例如:数组遍历相关的回调函数/promise的excutor函数
   - 异步回调:不会立即执行,会放入回调队列中将来执行 例如:定时器/ajax回调 /promise的成功/失败回调
 ```js
 // 1 同步回调函数
 const arr = [1,2,3]
 arr.forEach(item=>{ //遍历回调,同步回调函数,不会放入队列,开始就要执行
 	console.log(item);
 })
 console.log("111")
 //先输出1 2 3 在输出111
 // 2 异步回调函数
 setTimeout(()=>{  //异步回调函数 会放入队列中将来执行
 	console.log('timout callback')
 },0)
 console.log('222');
 // 先输出222 在输出timeout callback
 ```
## 1.3 JS的error处理
### 错误类型
  - error:所有的错误类型 
  - ReferenceError:引用的变量不存在
  - TypeError:数据类型不正确的错误
  - RangeError:数据值不在其所允许的范围内
  - syntaxError:语法错误
### 错误处理
  - 捕获错误:try...catch
  - 抛出错误:throw error
### 错误对象
  - message属性:错误相关信息
  - stack属性:函数调用栈记录信息
```js
			//try...catch
			try{
				let a;
				console.log(a.xxx);
			} catch(error){
				console.log(error.message);
				console.log(error.stack);
			}
			
			//throw
			function something(){
				if(Date.now()%2 === 1){
					console.log('当前时间为奇数,无报错');
				}
				else{
					throw new Error('当前时间为偶数,报错')
				}
			}
```
# 二 、promise的理解与使用
## 2.1 promise是什么?
### 1.抽象表达
  - promise是js中进行异步编程的新的解决方案
### 2.具体表达
  - 从语法上来说:promise是一个构造函数
  - 从功能上来说:promise对象用来封装一个异步操作并可以获取其结果
### 2.1.2 promise的状态改变
  - 1.pending变为resolved
  - 2.pending变为rejected
  - 说明:只有这两种,且一个promise对象只能改变一次,无论变为成功还是失败,都会有一个结果数据
  - 成功的结果数据一般为value,失败的结果数据一般称为reason
### 2.1.3 promise的基本流程
 - ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200813013416571.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)

### 2.1.4 promise的基本使用
```js
// 1.创建一个新的promise对象
			const p = new Promise((resolve,reject)=>{  //执行器函数
				// 2.执行异步操作任务
				setTimeout(()=>{
					const time = Date.now();  //假设当前时间为偶数代表成功,奇数代表失败
					// 3.1 若成功则调用resolve(value)
					if(time%2 === 0 ){
						resolve('成功,time='+ time);
					}else{
						// 3.2 若失败,则调用reject(reason)
						reject('失败,time='+time)
					}
				},1000)
			})
			p.then( 
				value=>{  //接收得到成功的value数据   onResolved
					console.log('成功的回调',value);
				},
				reason=>{  //接收得到失败的reason数据    onRejected
					console.log('失败的回调',reason);
				}
			)
```
## 2.2 为什么要用promise
### 指定回调函数的方式更加的灵活:
  - 旧的必须在启动异步任务之前指定
  - promise:启动异步任务=>返回promise对象=>给promise对象绑定回调函数(甚至可以在异步任务结束后指定)
  - 就是说可以在异步函数执行后得到了结果,再指定回调函数,比如上述代码执行1秒后调用成功
  - 假设我给回调函数再设置给setTimeout()函数,指定两秒,这样在得到结果后,再过1秒才能执行回调函数
### 支持链式调用,可以解决回调地狱问题
  - 回调地狱:回调函数嵌套调用,外部回调函数异步执行的结果是嵌套的回调函数执行的条件
  - 回调地狱缺点:不便于于都 / 不便于异常处理
  - 解决方案:promise的链式调用
  - 回调地狱的终极解决方案  async/await

```
伪代码:
			//回调地狱
			doSomething(function(result){
				doSomethingElse(result,function(newResult){
					doThirdThing(newResult,function(finalResult){
						console.log('get the final result:'+finalResult)
					},failureCallback)
				},failureCallback)
			},failureCallback)
			
			// 链式调用
			doSomething()
			.then(function(result){
				return doSomethingElse(result);
			})
			.then(function(newResult){
				return doThirdThing(newResult)
			})
			.then(function(finalResult){
				console.log('get the final result:'+finalResult)
			})
			.catch(failureCallback)
			
			// async/await
			async function request(){
				try{
					const result = await doSomething();
					const newResult = await doSomethingElse(result);
					const finalResult = await doThirdThing(newResult);
					console.log('get the final result:'+finalResult)
				} catch(error){
					failureCallback(error);
				}
			}
			
```
## 2.3 如何使用Promise
### 2.3.1 API
  **1. Promise构造函数:promise(excutor){}**
  - 1.1 excutor函数:执行器 (resolve,reject)=>{}
  - 1.2 resolve函数:内部定义成功时,我们调用的函数 value=>{}
  - 1.3 reject函数:内部定义失败时我们调用的函数 reason=>{}
  - 注意:excutor 会在promise内部立即同步回调.异步操作在执行器中执行
  
   **2. Promise.prototype.then 方法:(onResolved,onRejected)=>{}**
  - OnResolved函数:成功的回调函数 (value)=>{}
  - onRejected函数:失败的回调函数 (reason)=>{}
  - 说明:指定用于得到成功value的成功回调和用于得到失败reason的失败回调 返回一个新的promise对象
  
  **3. Promise.prototype.catch方法: (onRejected) => {}**
  - onRejected函数:失败的回调函数(reason) => {}
  - 说明: then()的语法糖,相当于: then(undefined, onRejected)
  
   **4. Promise.resolve方法: (value) => {}** 
  - value:成功的数据或promise对象
  - 说明:返回一个成功/失败的promise对象
  
  **5. Promise.reject方法: (reason) =>{}**
  - reason:失败的原因
  - 说明:返回一个失败的promise对象
  
   **6. Promise.a11方法: (promises) => {}**
  - promises:包含n个promise的数组
  - 说明:返回一个新的promise,只有所有的promise都成功才成功，只要有一个失败了就直接失败
  
   **7. Promise.race方法: (promises) => {}**
  - promises:包含n个promise的数组
  - 说明:返回一个新的promise,第一个完成的promise的结果状态就是最终的结果状态
#### 示例:
```js
			new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve('成功');
					// reject('失败');
				},1000)
			}).then(value=>{
				console.log('onResolved()1',value);
			}).catch(reason=>{
				console.log('onRejected()1',reason)
			})
```
promise.resolve promise.reject
```js
			const p1 = new Promise((resolve,reject)=>{
				resolve(1);
			})
			const p2 = Promise.resolve(2);
			const p3 = Promise.reject(3)
			p1.then(value=>{console.log(value)});
			p2.then(value=>{console.log(value)})
			p3.catch(reason=>{console.log(reason)})
```
promise.all

```js
			const p1 = new Promise((resolve,reject)=>{
				resolve(1);
			})
			const p2 = Promise.resolve(2);
			const p3 = Promise.reject(3)
			//const pAll = Promise.all([p1,p2])
			const pAll = Promise.all([p1,p2,p3])
			pAll.then(
				values => {
					console.log('all onResolved()',values);
					// 会返回一个数组,并且按照前面all里面的数组排序而排序
				},
				reason => {
					// 打印错误原因
					console.log('all onRejected',reason);
				}
			)
```
promise.race
```js
			//谁先返回,就使用谁的结果  注意,并不一定是race里面数组的第一个哦,得看谁先完成,谁最先完成就看谁咯
			//const pRace = Promise.race([p3,p2,p1])
			const pRace = Promise.race([p1,p2,p3])
			pRace.then(
				values => {
					console.log('race onResolved()',values);
				},
				reason => {
					// 打印错误原因
					console.log('race onRejected',reason);
				}
			)
```
### 2.3.2 promise的几个关键问题
**1. 如何改变promise的状态**
- (1)resolve(value)：如果当前是pendding就会变为resolved
- (2)reject(reason):如果当前是pendding就会变为rejected
- (3)抛出异常:如果当前是pendding就会变为rejected

**2. 一个promise指定多个成功/失败回调函数，都会调用吗?**
- 当promise改变为对应状态时都会调用

**3. 改变promise状态和指定回调函数谁先谁后?**
- (1)都有可能，正常情况下是先指定回调再改变状态，但也可以先改状态再指定回调
- (2)如何先改状态再指定回调?
- ① 在执行器中直接调用resolve()/reject()
- ② 延迟更长时间才调用then()
- (3)什么时候才能得到数据?
- ①如果先指定的回调，那当状态发生改变时，回调函数就会调用，得到数据
- ②如果先改变的状态，那当指定回调时，回调函数就会调用，得到数据
```js
			// 常规：先指定回调函数，后改变的状态
			new Promise((resolve,reject)=>{
				setTimeout(()=>{
					resolve(1);  //后改变的状态（同时指定数据），异步执行回调函数
				},1000)
			}).then(  //先指定回调函数，当前指定的回调函数
				value=>{console.log('value',value);},
				reason=>{ console.log('reason',reason)}
			)
			
			//先改变状态，后指定回调函数
			new Promise((resolve,reject)=>{
				resolve(1);    //先改变的状态（同时指定数据）
			}).then(     //后指定回调函数，异步执行回调函数  
				value=>{console.log('value',value);},
				reason=>{console.log('reaseon',reason)}
			)
```

**4. promise.then()返回的新promise的结果状态由什么决定?**
- (1)简单表达:由then()指定的回调函数执行的结果决定
- (2)详细表达:
- ①如果抛出异常，新promise变为rejected,reason为抛出的异常
- ②如果返回的是非promise的任意值，新promise变为resolved,value为返回的值
- ③如果返回的是另一个新promise,此promise的结果就会成为新promise的结果
```js
			new Promise((resolve,reject)=>{
				resolve(1);
			}).then(
				value=>{
					console.log('onResolved1()',value);  //输出 onResolved1() 1
					// return 2;
					return Promise.resolve(3);
					// return Promise.reject(4);
					// throw 5
					},
				reason=>{console.log('onRejected1()',reason);}
			).then(
				value=>{
					console.log('onResolved2()',value);  //输出onResolved1() 3
					},
				reason=>{console.log('onRejected2()',reason);}
				)
```

**5. promise如何串连多个操作任务?**
- (1)promise的then()返回一个新的promise, 可以开成then()的链式调用
- (2)通过then的链式调用串连多个同步/异步任务
```jsnsole.log('执行任务1（异步）');
					resolve(1);
				},1000)
			}).then(
			new Promise((resolve,reject)=>{
				setTimeout(()=>{
					co
				value=>{
					console.log('任务1执行结果：',value);
					console.log('执行任务2（同步）');
					return 2;
				}
			).then(
				value=>{
					console.log('任务2执行结果',value);
					return new Promise((resolve,reject)=>{
						setTimeout(()=>{
							console.log('执行任务3（异步）');
							resolve(3);
							
						},1000)
					})
				}
			).then(value=>{
				console.log('任务三执行结果',value);
			})
```
结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200814005713296.png#pic_center)


**6. promise异常传透?**
- (1)当使用promise的then链式调用时，可以在最后指定失败的回调，
- (2)前面任何操作出了异常，都会传到最后失败的回调中处理
```js
//异常传透
		new Promise((resolve,reject)=>{		
			
			reject(1);
		}).then(
			value=>{
				console.log('onResolved1()：',value);
				return 2;
			}
		).then(
			value=>{
				console.log('onResolved2()',value);
				return 3
			}
		).then(value=>{
			console.log('onResolved3()',value);
		}).catch(reason=>{
			console.log('onRejected()',reason);
		})
```
前面的then没有写失败的回调，只在最后写了错误的回调
但是没写其实相当于写了，写不写都行，就类似下述代码：
```esolved1()：',value);
				return 2;
			},
			// reason => {throw reason}
		).then(
			value=>{
				console.log('onResolved2()',value);
				return 3
			},
			// reason => {throw reason}
		).then(value=>{
			console.log('onResolved3()',value);
		},
		// reason => {throw reason} 
		//也可以换成下面这种写法，都可以
		reason => Promise.reject(reason)
		).catch(reason=>{
			console.log('onRejected()',reason);
		})
```
**7. 中断promise链?**
- (1)当使用promise的then链式调用时,在中间中断,不再调用后面的回调函数
- (2)办法:在回调函数中返回个pendding状态的promise对象
```js
		new Promise((resolve,reject)=>{		
			
			reject(1);
		}).then(
			value=>{
				console.log('onResolved1()：',value);
				return 2;
			},
			// reason => {throw reason}
		).then(
			value=>{
				console.log('onResolved2()',value);
				return 3
			},
			// reason => {throw reason}
		).then(value=>{
			console.log('onResolved3()',value);
		},
		// reason => {throw reason} 
		//也可以换成下面这种写法，都可以
		reason => Promise.reject(reason)
		).catch(reason=>{
			console.log('onRejected()',reason);
		}).then(
			value=>{
				console.log('catch执行成功，我会执行 onResolved:',value)
			},
			reason=>{
				console.log('catch 返回失败我会执行 onRejected:',reason)
			}
		)
```
上述代码执行结果：
onRejected() 1 
catch执行成功，我会执行 onResolved: undefined
上述代码中，catch执行成功，自然会接着执行，但是没有返回值，所以会打印一个undefined；
但是我们不想让catch之后的then()再执行，也就是说我们要中断promise链，那么我们怎么做呢？
我们只需要在catch中返会一个pending的promise即可，即：添加 return new Promise(()=>{})即可

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081400563730.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)

这时候就不会再执行后面的回调函数啦，即中断了promise链！
