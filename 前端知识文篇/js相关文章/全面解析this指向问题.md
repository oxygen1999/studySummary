> this 是一种特别复杂得机制，是一个很特别得关键字，被自动定义在所有函数得作用域中，所以我们有必要去了解，并且搞懂它！

# 调用位置

在理解 this 得绑定过程之前，首先要理解调用位置：调用位置就说函数在代码中被调用得位置（注意：不是声明得位置），只有明白调用位置，才能弄懂 this 到底引用的是什么！
最重要的就是分析调用栈（为了到达当前执行位置所调用的所有函数）。我们关心的调用位置

```javascript
function baz() {
  //当前调用栈：baz
  //当前调用位置是全局作用域
  console.log("baz");
  bar(); //<--bar的调用位置
}
function bar() {
  //当前调用栈是baz->bar
  //当前调用位置在baz中
  console.log("bar");
  foo(); //<--foo的调用位置
}
function foo() {
  //当前调用栈是baz-->bar--><tfoot>
  //当前调用位置在bar中
  console.log("foo");
}
baz(); //<-- baz的调用位置
```

> 可以把调用栈想象成一个函数调用链，就像我们在前面代码段的注释中所写的一样。还可以使用浏览器的调试工具进行查看。因此，想要分析 this 的绑定，使用开发者工具得到调用栈，然后找到栈中的第二个元素，这就是真正的调用位置！

# 绑定规则

## 一、 默认绑定

> 最常用的函数调用类型：独立函数调用，也可以看作无法应用其他规则时的默认规则

```javascript
function foo() {
  console.log(this.a);
}

var a = 2;
foo(); //2
```

当我们调用 foo()时，this.a 被解析为全局变量 a，因为函数调用时应用了默认绑定，因此 this 指向全局变量。在代码中，foo()是直接使用不带任何修饰的函数进行调用的，因此只能使用默认绑定！

### 严格模式

如果使用严格模式，则不能将全局对象用于默认绑定，因此 this 会被绑定到 undefined：

```javascript
function foo() {
  "use strict";
  console.log(this.a);
}

var a = 2;
foo(); //TypeError:this is undefined;
```

> 注意一个细节：虽然 this 的绑定规则完全取决于调用位置，但是只有 foo()**运行在非严格模式下时**，默认绑定才能绑定到全局对象；但是在严格模式下调用 foo()则不影响默认绑定

```javascript
function foo() {
  //处于非严格模式
  console.log(this.a);
}

var a = 2;
(function () {
  "use strict";
  foo();
})(); //2   不影响默认绑定
```

## 二、隐式绑定

> 第二种需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或包含

```javascript
			function foo(){
				console.log(this.a);
			}
			var obj={
				a:2，
				foo:foo
			}
            obj1.foo();   //2
```

调用位置使用 obj 上下文来引用函数，可以说函数被调用时 obj 对象**拥有**或者包含函数引用！当 foo()被调用时，它的前面确实加上了对 obj 的引用。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象，因为调用 foo()时 this 被绑定到 obj，因此 this.a 和 obj.a 时一样的！

**对象属性引用链中只有上一层或者说最后一层在调用位置中起作用**：

```javascript
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 10,
  foo: foo,
};
var obj1 = {
  a: 2,
  obj2: obj2,
};

obj1.obj2.foo(); //10
```

### 隐式丢失

一个最常见的 this 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把 this 绑定到全局对象或者 undefined 上。

```javascript
			function foo(){
				console.log(this.a);
			}
			var obj={
				a:2，
				foo:foo
			}
			var bar = obj.foo();
			var a="global";
			bar();   //global
```

虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的 bar()其实是一个不带任何修饰的函数调用，应用了默认绑定

还有一种就是传入回调函数时：

```javascript
function foo() {
  console.log(this.a);
}
function foo1(fn) {
  fn();
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "global";
foo1(obj.foo); //golbal
```

> 参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值

## 三、显示绑定

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};
foo.call(obj); //2
```

通过 call，可以在调用 foo 时强制把它的 this 绑定到 obj 上面。如果你传入一个原始值（string Boolean number）来当作 this 的绑定对象，这个原始值会被转换成它的对象形式（new String(...)等等.....）。通常被成为”装箱“
但是显示绑定并不能解决丢失绑定的问题，需要硬绑定。

### 硬绑定

```javascript
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
};

var bar = function () {
  foo.call(obj);
};
bar(); //2
setTimeout(bar, 1000); //2
//硬绑定的bar不可能再修改它的this
bar.call(window); //2
```

工作过程：我们创建了函数 bar()，并在它的内部手动调用了 foo.call(obj)，因此强制把 foo 的 this 绑定到了 obj。无论之后如何调用函数 bar，它总会手动在 obj 上调用 foo。这种绑定是一种显式的强制绑定，称为硬绑定！

**硬绑定的典型应用场景就是创建一个包裹函数，负责接收参数返回值**：

```javascript
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
var obj = {
  a: 2,
};

var bar = function () {
  return foo.apply(obj, arguments);
};
var b = bar(3); //2 3
console.log(b); // 5
```

<b>另一种使用方法就是创建一个可以重复使用的辅助函数</b>

```javascript
function foo(something) {
  console.log(this.a, something);
  return this.a + something;
}
//简单的辅助绑定函数
function bind(fn, obj) {
  return function () {
    return fn.apply(obj, arguments);
  };
}
var obj = {
  a: 2,
};
var bar = bind(foo.obj);
var b = bar(3); //2 3
console.log(b); // 5
```

### API 调用的“上下文”

> 第三方库的许多函数，以及 js 语言和宿主环境中许多新的内置函数，都提供了一个可选的参数，通常被称为”上下文“，其作用和 bind(...)一样，确保你的回调函数指的 this

```javascript
function(){
    console.log(el,this.id);
}
var obj = {
    id:"aada"
}
//调用foo时把this绑定到obj
[1,2,3].forEach(foo,obj);  //1 aada  2 aada 3  aada
```

这些函数实际上就是通过 call 或者 apply 实现了显示绑定。

## 四、new 绑定

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作

1.  创建（构造）一个全新的对象
2.  新对象会被执行[[Prototype]]连接
3.  新对象会绑定到函数调用的 this
4.  如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

```javascript
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log(bar.a); //2
```

使用 new 来调用 foo 时，我们会构造一个新对象把它绑定到 foo(..)调用中的 this 上，new 是最后一种可以影响函数调用时 this 绑定行为的方法，称之为 new 绑定

# 箭头函数中的 this 指向

箭头函数不适用 this 的四种标准规则，而是根据外层（函数或全局）作用域来决定 this 的

```javascript
function foo() {
  //返回一个箭头函数
  return (a) => {
    //this继承自foo()
    console.log(this.a);
  };
}
var obj1 = {
  a: 2,
};
var obj2 = {
  a: 3,
};
var bar = foo.call(obj1);
bar.call(obj2); //2,而不是3！
```

foo 内部创建的箭头函数会捕获调用时 foo()的 this，由于 foo()的 this 绑定到 obj1，bar(引用箭头函数)的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。(new 也不可以)

**箭头函数最常用于回调函数中，例如事件处理器或者定时器**

```javascript
function foo() {
  setTimeout(() => {
    //这里的this在词法上继承自foo();
    console.log(this.a);
  }, 1000);
}
var obj = {
  a: 2,
};

foo.call(obj); //2
```

> ES6 中的箭头函数并不会使用四条标准绑定规则，而是根据当前的词法作用域来决定 this，具体来说，箭头函数会继承外层函数调用的 this 绑定(无论绑定到什么)。

# 判断 this 的优先级

这里就不再进行演示优先级的判断过程了，有兴趣的可以自己去测试一下，直接说一下 this 的四条绑定规则的优先顺序

> 1. 函数是否再 new 中调用，如果是的话 this 绑定的是新创建的对象 ------new 绑定 var bar = new foo()
> 2. 函数通过 call，apply 或者硬绑定调用，this 绑定的是指定的对象 ------显示绑定 var bar = foo.call(obj);
> 3. 函数在上下文对象中调用，绑定的是上下文对象 ------ 隐式绑定 var bar = obj.foo()
> 4. 最后就是默认绑定了，如果是在严格模式下，绑定到 undefined，否则绑定到全局对象 ------var bar = foo()

以上就是 this 四大绑定规则的优先级先后顺序啦！

> 欢迎访问我的 csdn：angula.blog.csdn.net
