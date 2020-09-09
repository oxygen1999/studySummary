> 大家好，我是醉心于前端的 angula，目前大四在读，欢迎志同道合的朋友一起交流呐！

这次来聊一下 vue 的生命周期！
毫无疑问，想要搞清楚这个，还得尤大大给咱们的图镇楼！！！
**来吧，展示！**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904204303291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
可以看到 vue 一整个的生命周期中会有很多钩子函数提供给我们在 vue 生命周期不同的时刻进行操作，那么先列出所有的钩子函数，然后慢慢来！

- beforeCreate
- created
- beforeMount
- mounted
- beforeUpdate
- updated
- beforeDestroy
- destroyed

# 生命周期

## 首先灵魂发问，**什么是 vue 的生命周期？**

> 这么说吧：vue 实例从创建到销毁的过程，就是生命周期。也就是从 开始创建、初始化数据、编译模板、挂载 DOM-渲染、更新-渲染、卸载，等等一系列的过程，我们称之为 vue 的生命周期

## 那么再次灵魂发问：**vue 生命周期的作用是啥呢？**

> vue 所有的功能的实现都是围绕其生命周期进行的，在生命周期的不同阶段调用对应的钩子函数可以实现组件数据管理和 DOM 渲染两大重要功能。生命周期中有多个事件钩子，在控制整个 vue 实例的过程时更容易形成好的逻辑！

那么，真正的问题来了，第一次页面加载会触发哪几个钩子呢？
那么我们来实现一下，实际测试一波

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>生命周期</title>
		<script src="../../vue.js"></script>
	</head>
	<body>
		<div id="app">
			<h1>{{message}}</h1>
		</div>
	</body>
	<script type="text/javascript">
		let vm = new Vue({
			el:'#app',
			data:{
				message:'angula'
			},
			beforeCreate:function(){
				console.group('------beforeCreate创建前状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);
				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			created:function(){
				console.group('------create创建后状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);
				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			beforeMount:function(){
				console.group('------beforeMount挂载前状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);
				console.log(this.$el);
				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			mounted:function(){
				console.group('------mounted挂载后状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);
				console.log(this.$el);
				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			beforeUpdate:function(){
				console.group('------beforeUpdate更新前状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);
				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			updated:function(){
				console.group('------updated更新完成状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);

				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			beforeDestroy:function(){
				console.group('------beforeDestroy销毁前状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);

				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},
			destroyed:function(){
				console.group('------destroyed 销毁后状态------');
				console.log("%c%s",'color:red','el   :'+this.$el);

				console.log("%c%s",'color:red','data   :'+this.$data);
				console.log("%c%s",'color:red','message   :'+this.message);
			},

		})
	</script>
</html>

```

来吧，展示！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904204059622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
从上面可以看到，第一次页面加载 hi 触发 4 个钩子函数哦！

> beforeCreate ， created ， beforeMount ，mounted 这几个钩子

## 1. 在 beforeCreate 和 created 钩子函数之间的生命周期

在这个生命周期之间，进行**初始化事件**，进行**数据的观测**，可以看到，在**created**的时候，数据已经和**data 属性进行绑定**(放在 data 中的属性当值发生改变的同时，视图也会发生改变)，注意：**此时并没有 el 选项哦！**

## 2. created 钩子函数和 beforeMount 间的生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904205217307.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
这个阶段叫做**模板编译阶段**，这个阶段的目的是将模板编译为渲染函数，只存在于完整版中，如果只在包含运行时的构建版本中执行 new Vue()，则不存在这个阶段。

这个阶段做的事情还是很多的，首先判断对象有没有 el 选项，如果有的话就绩效向下编译，如果没有 el 选项的话，则停止编译，也就意味着停止了生命周期，直到在该 vue 实例上调用 vm.\$mount(el)。

> 尝试一下：注释掉 el:'#app'

然后看到运行到 created 的时候就停止了！
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904205813545.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
然后我们后面在调用一下 vm.\$mount(el),再看一下结果看一下

```javascript
vm.$mount("#app");
```

ok,此时发现代码又往下执行啦！
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020090421000771.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
**template 参数选项堆生命周期的影响**

1.  如果 vue 实例对象中有 template 参数选项，则将其作为模板编译成 render 函数
2.  如果没有 template 选项，则将其外部 HTML 作为模板编译。
3.  可以看出 template 中的模板优先级要高于 outer HTML 的优先级

来吧，动手试一试！

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>生命周期02</title>
		<script src="../../vue.js"></script>
	</head>

	<body>
		<div id="app">
			<h1>{{message+ "---这是在outer HTML中的"}}</h1>
		</div>
	</body>
	<script type="text/javascript">
		const vm = new Vue({
			el:'#app',
			template:"<h1>{{message+'---这是在template中的'}}</h1>",
			// render:function(createElement){
			// 	return createElement('h1','this is createElement');
			// },
			data:{
				message:'Vue的生命周期'
			}
		})
	</script>
</html>

```

执行后结果为：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904210539809.png#pic_center)
然后，我们将 vue 中的 template 的选项注释掉之后，再看一下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904210804980.png#pic_center)

> 所以呀，这下就明白为什么 el 的判断要再 template 之前了吧，是因为 vue 需要通过 el 找到对应的 outer template。

在 vue 的对象中呢，还有一个 render 函数，它是以 createElement 作为参数，然后做渲染操作。

```javascript
			render:function(createElement){
			 	return createElement('h1','this is createElement');
			 },

```

此时呢，页面中渲染的是：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904211100123.png#pic_center)

> 因此他们之间的优先级为：render 函数选项>template 选项>outer HTML

## 3.beforeMount 和 mounted 钩子函数间的生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904211252912.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
可以看到此时是给 vue 实例对象添加\$el 成员，并且替换掉挂载的 DOM 元素。因为在之前的 console 中打印的结果可以看到 beforeMounted 之前 el 上还是 undefined

## 4.mounted

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904211628315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
在 mounted 之前的 h1 中还是通过{{message}}进行占位的，因为此时还要挂载到页面上，还是 js 中的虚拟 DOM 形式存在的。在 mounted 之后可以看到 h1 的内容发生改变。

## beforeUpdate 钩子函数和 updated 钩子函数间的生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904211837540.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
当 vue 发现 data 中的数据发生改变，会触发对应组件的冲洗渲染，先后调用 beforeUpdate 和 updated 钩子函数。我们在 console 中输入：

```javascript
vm.message = "触发组件更新";
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904212148245.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)

## 6. beforeDestroy 和 destroyed 钩子函数间的生命周期

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200904212245188.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
beforeDestroy 钩子函数在实例销毁之前调用，在这一步，实例仍然完全可用。
destroyed 钩子函数在 vue 实例销毁后调用，调用后，vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

# 每个周期具体适合哪些场景

- beforeCreate
  > 创建前，此阶段为实例初始化之后，this 指向创建的实例，此时的数据观察事件机制都未形成，不能获得 DOM 节点。
  > data，computed，watch，methods 上的方法和数据均不能访问。
  > 可以在这加个 loading 事件。
- created
  > 创建后，此阶段为实例已经创建，完成数据（data、props、computed）的初始化导入依赖项。
  > 可访问 data computed watch methods 上的方法和数据。
  > 初始化完成时的事件写在这里，异步请求也适宜在这里调用（请求不宜过多，避免白屏时间太长）。
  > 可以在这里结束 loading 事件，还做一些初始化，实现函数自执行。
  > 未挂载 DOM，若在此阶段进行 DOM 操作一定要放在 Vue.nextTick()的回调函数中。
- beforeMount
  > 挂载前，虽然得不到具体的 DOM 元素，但 vue 挂载的根节点已经创建，下面 vue 对 DOM 的操作将围绕这个根元素继续进行。
  > beforeMount 这个阶段是过渡性的，一般一个项目只能用到一两次。
- mounted
  > 挂载，完成创建 vm.\$el，和双向绑定
  > 完成挂载 DOM 和渲染，可在 mounted 钩子函数中对挂载的 DOM 进行操作。
  > 可在这发起后端请求，拿回数据，配合路由钩子做一些事情。
- beforeUpdate
  > 数据更新前，数据驱动 DOM。
  > 在数据更新后虽然没有立即更新数据，但是 DOM 中的数据会改变，这是 vue 双向数据绑定的作用。
  > 可在更新前访问现有的 DOM，如手动移出添加的事件监听器。
- updated
  > 数据更新后，完成虚拟 DOM 的重新渲染和打补丁。
  > 组件 DOM 已完成更新，可执行依赖的 DOM 操作。
  > 注意：不要在此函数中操作数据（修改属性），会陷入死循环。
- beforeDestroy
  > 销毁前，可做一些删除提示，如：您确定删除 xx 吗？
- destroyed
  > 销毁后，当前组件已被删除，销毁监听事件，组件、事件、子实例也被销毁。
  > 这时组件已经没有了，无法操作里面的任何东西了。

## 父子组件的生命周期

- . 执行顺序
  - 父组件开始执行到 beforeMount 然后开始子组件执行，最后是父组件 mounted。
  - 如果有兄弟组件，父组件开始执行到 beforeMount，然后兄弟组件依次执行到 beforeMount，然后按照顺序执行 mounted，最后执行父组件的 mounted。
- 当子组件挂载完成后，父组件才会挂载。
- 当子组件完成挂在后，父组件会主动执行一次 beforeUpdated/updated 钩子函数（仅首次）
- 父子组件在 data 变化中是分别监控的，但是更新 props 中的数据是关联的。
- 销毁父组件时，先将子组件销毁后才会销毁父组件。
- 兄弟组件的初始化（mounted 之前）是分开进行，挂载是从上到下依次进行
- 当没有数据关联时，兄弟组件之间的更新和销毁是互不关联的

> 写在最后，上述参考自网络和官方文档，以及自己的一些理解
> 参考链接： https://juejin.im/post/6844903945530245128 >https://segmentfault.com/a/1190000011381906#comment-area
