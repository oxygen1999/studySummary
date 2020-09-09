# 父子组件传值

## 1.父组件向子组件传值

父组件向子组件传值是通过属性的方式 传值，传的值可以是任意类型，甚至可以是父组件的方法或者父组件对象本身。为方便理解可以简单将父组件向子组件传值按以下步骤实现。

1. 在父组件中引入子组件；

2. 并在 components 中注册子组件；

3. 通过属性向子组件中传值。

> index.vue 为父组件，test.vue 为子组件

```js
<div>
    hello
    <test :father="title" :t="t"></test>

  </div>
<script>
import test from "./Comps/test";
export default {
  name: "index",
  data() {
    return {
      fatherData: "我是父组件中的fatherData",
      title: {
        name: "angula",
      },
    };
  },
  methods:{
  t(){
		console.log('父组件');
	}
  }
  </script>
```

在子组件中通过 props 属性接收父组件传过来的值

```js
<template>
  <div>
  //调用父组件的属性
    <h1>{{title.name}}</h1>
    //调用父组件的方法
    <button @click="t()">点击</button>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      message: "hello world 子组件",
    }
  },
    props: {
    father: {
    //属性
      type: Object,
      required: true,
      default: 100,
    },
    ttt: {
   		//方法
      type: Function,
      required: true,
    },
  },
</script>
```

实际上我们开发中都是先设计好子组件的，子组件中呢定义好需要父组件在使用子组件时所需要的属性，父组件在调用子组件时按子组件定义的属性传值、

> 总结：
>
> 1.  子组件在 props 中创建一个属性，用以接收父组件传过来的值
> 2.  父组件中注册子组件
> 3.  在子组件标签中添加子组件 props 中创建的属性
>
> 4.  把需要传给子组件的值赋值给该属性

## 2.子组件向父组件传值

> 子组件向父组件传值是通过自定义事件的方式向父组件传值。利用\$emit()

首先，在子组件中的\$emit()方法自定义事件向父组件传数据
子组件

```javascript
<button class="btn" @click="sendData">点击向父组件传值</button>
```

```javascript
 sendData() {
      this.$emit("sendChild", this.message);
    },
```

父组件通过监听子组件自定义的事件获取子组件的值

```javascript
 <test  @sendChild="recieveChilds" ></test>
```

```javascript
  methods: {
    recieveChilds(payload) {
      console.log(payload);
      this.message = payload;
    },
```

这样就简单实现了一个子组件向父组件传值的过程啦！

> 总结：
>
> 1.  子组件中需要以某种方式例如点击事件的方法来触发一个自定义事件
> 2.  将需要传的值作为\$emit 的第二个参数，该值将作为实参传给响应自定义事件的方法
> 3.  在父组件中注册子组件并在子组件标签上绑定对自定义事件的监听

# 父子组件相互调用属性或者方法

## 1.父组件调用子组件的属性和方法

利用 ref 属性获取到子组件的属性或者方法

```javascript
<test  ref="test"></test>
<button @click="handle">点击</button
```

```javascript
handle() {
	console.log(this.$refs.test.message)
      this.$refs.test.message = "shibai";
      console.log(this.$refs.test.message);
    },
```

这样就可以啦，是不是非常简单呢

## 子组件调用父组件的属性或方法

主要利用\$parent 属性获取父组件对象，从而调用父组件的属性或者方法

```javascript
<button @click="sendData">点击</button>
```

```javascript
sendData() {
      // console.log(this.$parent.handle_childen());
      console.log(this.$parent.title.name);
    },
```

这样就可以啦，是不是非常简单呢？

> 父调子组件，利用 ref、\$refs (ps:毕竟孩子比较多，所以得需要知道你要调用哪一个孩子)
>
> 子调分组件，只需要\$parent

完整代码如下：
index.vue

```javascript
<!--
 * @Author: angula
 * @Date: 2020-09-05 15:51:44
 * @LastEditTime: 2020-09-07 21:12:10
 * @FilePath: \JS\VUE相关\vueTest\study\src\views\index.vue
-->
<template>
  <div>
    hello
    <test :father.sync="title.name" :ttt="ttt" @sendChild="recieveChilds" ref="test"></test>
    子组件传递信息：{{ message }}
    <button @click="handle">点击</button>
  </div>
</template>

<script>
import test from "./Comps/test";
export default {
  name: "index",
  data() {
    return {
      fatherData: "我是父组件中的fatherData",
      title: {
        name: "angula",
      },
      message: "",
    };
  },
  methods: {
    recieveChilds(payload) {
      console.log(payload);
      this.message = payload;
      console.log(this.message);
    },
    handle() {
      this.$refs.test.message = "shibai";

      console.log(this.$refs.test.message);
    },
    handle_childen() {
      console.log("父组件");
    },
    ttt() {
      console.log("111");
    },
  },
  props: {},
  components: { test },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
};
</script>
<style scoped></style>

```

test.vue

```javascript
<!--
 * @Author: angula
 * @Date: 2020-09-05 16:04:34
 * @LastEditTime: 2020-09-07 21:11:49
 * @FilePath: \JS\VUE相关\vueTest\study\src\views\Comps\test.vue
-->
<template>
  <div>
    <h1>{{ father }}</h1>
    <button @click="ttt()">点击</button>
    <button @click="show" class="btn">点击修改父组件的值</button>
    <button class="btn" @click="sendData">点击向父组件传值</button>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      message: "hello world 子组件",
    };
  },
  methods: {
    show() {
      this.$emit("update:father", "angula_new");
    },
    // 子传父
    sendData() {
      this.$emit("sendChild", this.message);
      // console.log(this.$parent.handle_childen());
      console.log(this.$parent.title.name);
    },
    handleVal(t) {
      console.log(t);
      return "ok";
    },
  },
  props: {
    father: {
      type: String,
      required: true,
      default: 100,
    },
    ttt: {
      type: Function,
      required: true,
    },
  },
  components: {},
  watch: {},
  computed: {},
  created() {},
  mounted() {},
};
</script>
<style scoped>
.btn {
  width: auto;
  height: auto;
}
</style>

```

> 总结：
>
> 父子组件之间传值：
>
> 1. 父组件向子组件传值：通过属性传入，子组件通过 props 定义与传入属性相同的变量接收；
> 2. 子组件向父组件传值：通过子组件的\$emit 自定义事件，父组件通过监听子组件定义的事件获取子组件传的值；
>
> 主动调用子组件或主动调用父组件的属性或方法:
>
> 1. 父组件主动调用子组件的属性或方法：通过父组件的\$refs.子组件的 ref 属性值 来获取子组件对象，从而调用子组件的属性或方法
> 2. 子组件主动调用父组件的属性或方法：通过子组件的\$parent 获取父组件对象，从而调用父组件的属性或方法

最后的最后，请不要忘记点个 star 哦
