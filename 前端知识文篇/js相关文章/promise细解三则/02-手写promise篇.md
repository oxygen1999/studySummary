# 手写promise
源码上传到了csdn [源码](https://download.csdn.net/download/weixin_42878211/12716577)
也可以私信我发你！
上篇文章[详解Promise第一弹(基础篇)](https://blog.csdn.net/weixin_42878211/article/details/107970602)
下一篇[详解Promise第三弹(面试篇)](https://blog.csdn.net/weixin_42878211/article/details/108031377)
## 主体结构
```js
// 自定义promise函数模块


(function (params){
	// Promise构造函数
	//excutor :执行器函数(同步执行)
	function Promise(excutor){
		
	}
	/*
	*promise原型对象的then()
	* 指定成功和失败的回调函数
	* 返回一个新的promise对象
	*/
   Promise.prototype.then = function (onResolved,onRejected){
	   
   }
   /*
   *promise原型对象的catch()
   * 指定失败的回调函数
     返回一个新的promise对象
   */
	Promise.prototype.catch = function (onRejected){
		   
	}
	
	/*
	*promise函数对象的resolve
	* 返回一个指定结果的成功的promise(后面有些许偏差)
	*/
	Promise.resolve = function (value){
		
	}
	
	/*
	*promise函数对象的reject
	* 返回一个指定的reason的失败的promise
	*/
	Promise.reject = function (reason){
		
	}
	
	/*
	*promise函数对象的all
	* 返回一个promise,只有当所有promise都成功时才成功,否则失败
	*/
	Promise.all = function (promises){
		
	}
	
	/*
	*promise函数对象的race
	* 返回一个promise,其结果由第一个完成的promise决定
	*/
	Promise.resolve = function (promises){
		
	}
	
	
	// 向外暴露promise
	window.Promise = Promise
})(window)
```
## Promise构造函数的实现
promise构造函数内部应该有什么属性:status data callback
```js
	function Promise(excutor){
		// 保存this
		const self = this;
		// 给promise对象指定status属性,初始值为pending
		self.status = 'pending'
		// 给promise对象指定一个用于存储结果数据的属性
		self.data = undefined
		//每个元素的结构:{onResolved(){},onRejected(){} }
		self.callbacks = []
		function resolve(value){
			// 如果当前状态不是pending,直接结束(状态只能改一次)
			if(self.status !== 'pending'){
				return
			}
			
			// 将状态改为resolved
			self.status = 'resolved';
			// 保存value数据
			self.data = value;
			// 如果有待执行的callback函数,立即异步执行回调函数onResolved
			if(self.callbacks.length > 0){
				setTimeout(()=>{  //放入队列中执行所有成功的回调
					self.callbacks.forEach(callbacksObj=>{
						callbacksObj.onResolved(value)
					})
				});
			}
			
		}
		function reject(reason){
			// 如果当前状态不是pending,直接结束(状态只能改一次)
			if(self.status !== 'pending'){
				return
			}
			// 将状态改为rejected
			self.status = 'rejected';
			// 保存value数据
			self.data = reason;
			// 如果有待执行的callback函数,立即异步执行回调函数onRejected
			if(self.callbacks.length > 0){
				setTimeout(()=>{  //放入队列中执行所有成功的回调
					self.callbacks.forEach(callbacksObj=>{
						callbacksObj.onRejected(reason)
					})
				});
			}
		}
		
		
		//立即同步执行excutor 
		//excutor 要执行resolve或者reject函数
		try{
			excutor(resolve,reject)
		} catch(error){  //如果执行器抛出异常,promise对象变为rejected状态
			reject(error)
		}
		
		
	}
```
## Promise的原型對象then()
```js
	/*
	 *promise原型对象的then()
	 * 指定成功和失败的回调函数
	 * 返回一个新的promise对象
	 */
	Promise.prototype.then = function(onResolved, onRejected) {
		// 假设当前状态还是PENDING状态
		// 保存this
		const self = this;
		//指定回调函数的默认值(必须是函数)
		onResolved = typeof onResolved === 'function' ? onResolved : value => value,
		onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
				
		//返回一个新的Promise
		return new Promise((resolve, reject) => {
			/*
			执行指定的回调函数
			根据执行结果改变return的promise的状态/数据
			*/
			function handle(callback) {
				/*
				返回peomise的结果由onResolved/onRejected的执行结果决定
				1.抛出异常,返回promise的结果为失败,reason为异常
				2.返回的是promise,返回promise的结果就是这个结果
				3.返回的不是promise,返回promise为成功,value就是返回值
				*/
				try {
					const result = callback(self.data);
					if (result instanceof Promise) {
						//2.返回的是promise,返回promise的结果就是这个结果
						result.then(
						value=> resolve(value),
						reason => reject(reason)
						)
						//等价与下述写法
						// result.then(resolve, reject)

					} else {
						//3.返回的不是promise,返回promise为成功,value就是返回值
						resolve(result);
					}
				} catch (error) {
					//1.抛出异常,返回promise的结果为失败,reason为异常
					reject(error)
				}


			}

			//当前promise的状态是resolved
			if (self.status === RESOLVED) {
				//立即异步执行成功的回调函数
				setTimeout(() => {
					handle(onResolved)
				})
			} else if (self.status === REJECTED) { //当前promise的状态是rejected
				//立即异步执行失败的回调函数
				setTimeout(() => {
					handle(onRejected)
				})
			} else { //当promise的状态是pending
				//将成功和失败的回调函数保存到callbacks容器中保存起来
				self.callbacks.push({
					onResolved(value) {
						handle(onResolved)
					},
					onRejected(reason) {
						handle(onRejected)
					}
				})

			}
		})

	}
```
## Promise原型对象的catch()
```js
	/*
	*promise原型对象的catch()
	* 指定失败的回调函数
	  返回一个新的promise对象
	*/
	Promise.prototype.catch = function(onRejected) {
		return this.then(undefined,onRejected)
	}
```
## promise函数对象的resolve
```js
	/*
	 *promise函数对象的resolve
	 * 返回一个指定结果的成功的promise(后面有些许偏差)
	 */
	Promise.resolve = function(value) {
		//返回一个成功/失败的promise
		return new Promise((resolve,reject)=>{
			//value是promise
			if(value instanceof Promise){
				//使用value的结果作为promise的结果
				value.then(resolve,reject);
				// value.then(
				// value=> resolve(value),
				// reason => reject(reason)
				// )
				
			}else{
				//value不是promise => promise变为成功,数据是value
				resolve(value)
			}
			
		})
	}
```
## promise函数对象的reject
```js
	/*
	 *promise函数对象的reject
	 * 返回一个指定的reason的失败的promise
	 */
	Promise.reject = function(reason) {
		//返回一个失败的promise
		return new Promise((resolve,reject)=>{
			reject(reason)
		})
	}
```
## promise函数对象的all
```js
	/*
	 *promise函数对象的all
	 * 返回一个promise,只有当所有promise都成功时才成功,否则失败
	 */
	Promise.all = function(promises) {
		//用来保存所有成功value的数组
		const values = new Array(promises.length);
		//用来保存成功promise的数量
		let resolvedCount = 0;
		//返回一个新的promise
		return new Promise((resolve,reject)=>{
			// 遍历promises获取每个promise的结果
			promises.forEach((p,index)=>{
				Promise.resolve(p).then(
					value=>{
						resolvedCount++;
						//p成功，将成功的value保存values 并且要按照promises中数组元素的排序来排列
						values[index] = value;
						//如果全部成功，将return的promise改变为成功
						if(resolvedCount === promises.length){
							resolve(values)
						}
						
					},
					reason=>{
						reject(reason)
					}
				)
			})
		})
	}

```
## promise函数对象的race
```js
	/*
	 *promise函数对象的race
	 * 返回一个promise,其结果由第一个完成的promise决定
	 */
	Promise.race = function(promises) {
		//返回一个新的promise
		return new Promise((resolve,reject)=>{
			promises.forEach((p,index)=>{
				Promise.resolve(p).then(//看第一个返回的结果
					//一旦成功，将return变为成功
					value => resolve(value),
					//一旦失败，将return变为失败
					reason=> reject(reason)
				)
			})
		})
	}
```
