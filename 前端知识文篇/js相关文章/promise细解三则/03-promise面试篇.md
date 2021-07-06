<!--
 * @Author: angula
 * @Date: 2021-07-06 10:26:22
 * @LastEditTime: 2021-07-06 10:39:19
 * @FilePath: \studySummary\前端知识文篇\js相关文章\promise细解三则\03-promise面试篇.md
-->
> promise在面试过程中会经常考察，这篇文章主要是判断promise代码的执行顺序问题，如果是基础部分，请移步到[详解promise第一弹(基础篇)](https://blog.csdn.net/weixin_42878211/article/details/107970602)
自己手写实现promise相关功能请看这里[详解Promise第二弹(手写Promise)](https://angula.blog.csdn.net/article/details/108031342)

# 简单的示例
```js
<script type="text/javascript">
			setTimeout(()=>{
				//放入宏队列
				console.log(1);
			},0)
			
			Promise.resolve().then(()=>{
				// 放入微队列
				console.log(2);
			})
			Promise.resolve().then(()=>{
				// 放入微队列
				console.log(3);
			})
			
			console.log(4);
			
			//最终打印结果 4 2 3 1 
		</script>
```
## 分析
定时器自然直接放入微队列，Promise异步函数放入微队列，只有当前微队列执行完全后，才会取出一个宏队列进行执行
如果宏队列内部含有微队列的话，那么将再次执行微队列之后再次取出下一个宏队列进行执行
所以打印结果为 4 2 3 1

# 第二种
```js
		<script type="text/javascript">
			setTimeout(()=>{
				console.log(1);
			},0);
			
			new Promise((resolve)=>{
				console.log(2);   //同步执行
				resolve()
			}).then(()=>{
				console.log(3);
			}).then(()=>{
				console.log(4);
			})
			console.log(5);   //同步执行
			
			//  2 5 3 4  1
		</script>
```
## 分析
先看同步执行，很明显2 和 5都是同步执行的，如果没搞清楚的话，建议去翻看一下前面的博客
所以先会输出 2 5
从头看，先是1立刻放入宏队列中，此时宏队列：[1],然后接着执行下面的new Promise
里面输出2，然后立即执行了resolve(),此时pending改变了状态为resolve，执行成功，只不过成功的结果为undefined，
然后接着执行then 此时then中的回调函数会立刻放入微队列中，即微队列：[3]，但是并未执行
然后接着执行下一个then，这时候问题来了，第二个then中的回调函数会不会放入微队列中呢？
很明显并不会，此时上一个then并未执行，第二个then需要依靠上一个then执行的结果
但是上一个then的状态并未确定(还没有执行)，只有第一个then执行完之后才能确定
所以此时第二个then中的回调函数，只会在内部用callbacks才保存起来 然后下面输出5，
同步代码执行完毕
然后开始执行微队列中的3，打印输出3，此时第一个then执行完毕，即状态变成成功
此时第二个then中的回调函数将放入微队列中，开始执行打印4，此时微队列执行完毕
开始执行宏队列，打印1
**则此时打印结果为 2 5 3 4 1**


# 第三种
```js
	<script type="text/javascript">
			const first = ()=>(new Promise((resolve,reject)=>{
				console.log(3);  //同步
				let p = new Promise((resolve,reject)=>{
					console.log(7);  //同步
					setTimeout(()=>{
						console.log(5);
						resolve(6);  //状态只能改变一次，6并不能输出
					},0)
					resolve(1);
				})
				resolve(2);
				p.then((arg)=>{
					console.log(arg);
				})
			}))
			
			first().then((arg)=>{
				console.log(arg);
			})
			console.log(4);
			
			// 3 7 4 1 2 5 
			// 宏队列:[5]
			// 微队列:[1,2] 清空
			// 微队列:[] 清空
		</script>
```
## 分析
我们来进行一个简单的分析
首先肯定要先执行同步的代码，所以毫无疑问首先输出3
然后接着往下走，进入p这个promise中，执行同步代码，打印7
setTimeout 毫无疑问，立刻放入宏队列中，但是并不会立刻执行 此时宏队列:[5]
接着往下，resolve(1)，此时改变当前promise的状态
再接着往下走，resolve(2)，改变first的promise的状态
再接着往下走，开始p.then，此时由于上面改变了状态，所以会立刻放入微队列中，此时微队列:[1]
再接着走，就到了first的then，此时上面也改变了状态，所以会立刻放入微队列中，此时微队列:[1,2]
然后再接着走，打印4，则此时第一遍会输出打印 3 7 4
然后同步代码执行完毕后，开始执行微队列，则打印 1 2，此时会微队列为空
开始执行宏队列，打印5 然后到了执行resolve(6)改变p的promise的状态(想一想)
此时会在p.then中执行回调函数吗？很显然，并不会（小声bb，如果会了也不会不打印6了）
为什么？ 因为promise中的状态只能改变一次，再次改变的话就重复了，所以resolve(1)已经改变过状态了
因此resolve(6)无效，不起作用，因此就不会打印6
**综上：打印结果为 3 7 4 1 2 5**

# 第四种
```js
		<script type="text/javascript">
			setTimeout(()=>{
				//立刻进入宏队列
				console.log("0");
			})
			new Promise((resolve,reject)=>{
				console.log("1");   //同步
				resolve()
			}).then(()=>{
				console.log("2");
				new Promise((resolve,reject)=>{
					console.log("3");
					resolve()
				}).then(()=>{
					console.log("4");
				}).then(()=>{
					console.log("5");
				})
			}).then(()=>{
				console.log("6");
			})
			
			new Promise((resolve,reject)=>{
				console.log("7");  //同步
				resolve()
			}).then(()=>{
				console.log("8");
			})
		</script>
```

## 分析
开局一个定时器，那没得说了，直接进宏队列:[0]
接着走，new 了一个Promise ，指定了一个执行器函数，执行器函数是同步执行的
所以直接打印1，得到第一个结果，然后resolve()改变了状态，将下面的then中的回调函数进入微队列此时微队列:[2]
但是并不会立刻执行呀，所以下一个then中的回调函数会被保存，但不会进入微队列
那么接着往下走，又一个new Promise() ，那这一步就不多作解释了把，直接打印7
然后执行resolve()，改变状态，此时8进入微队列，此时微队列:[2,8]
这样第一遍走下来 只输出了 1 7
然后开始执行微队列 ，那么自然会执行2所在的代码啦，直接输出2
然后呢，里面又new 了一个promise ，那又没的说了，直接打印3吧，然后执行resolove()改变状态
再接着走将4放入了微队列，此时微队列剩余[8,4],但是5并不会放入微队列但是.then会执行，内部缓存5所在的回调函数
因为then是同步的呀，里面的回调函数是异步的，所以当.then执行完，此时 new Promise的第一个then就要产生返回值啦
上面没有写return ,那么就会返回一个undefined，就有了结果，第一个then中的回调函数执行完了
那么二个then就要进入微队列了 即6进入微队列，此时微队列:[8,4,6];
然后接着往下走，开始执行微队列8，输出8
然后接着输出4 ，此时4所在的回调函数执行完毕，那么就有了结果，然后5进入微队列，此时微队列剩余:[6,5]
然后就很简单了，输出6 ，然后接输出5，此时微队列执行完毕
然后开始执行宏队列，打印0，结束！
**综上输出结果为：1 7 2 3 8 4 6 5 0**

