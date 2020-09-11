CSS选择器优先级得关系为：
**`!important>内联>ID选择器>类选择器>标签选择器。`**

## 一种优先级算法
1. 内联样式表的权值最高 (style="") 权值为1000
2. 统计选择符中的ID属性个数。（#id） 权值为100
3. 统计选择符中的CLASS属性个数。(.class)  权值为10
4. 统计选择符中的HTML标签名个数。 {例如：p}  权值为1
**按这些规则将数字符串逐位相加，就得到最终的权重，然后在比较取舍时按照从左到右的顺序逐位比较。**

> 1、文内的样式优先级为1,0,0,0，所以始终高于外部定义。　
> 2、有 **!important** 声明的规则高于一切。
> 3、如果!important声明冲突，则比较优先权。
> 4、如果优先权一样，则按照在源码中出现的顺序决定，后来者居上。
> 5、由继承而得到的样式没有specificity的计算，它低于一切其它规则(比如全局选择符*定义的规则)。


## 浏览器中也具有优先级得算法

浏览器中得优先级是由A、B、C、D的值来决定的，计算规则如下：
- 如果存在**内联样式**，那么**A=1,否则A=0**；
- B的值为**ID选择器**出现的次数
- C的值为**类选择器**和**属性选择器**和**伪类**出现的总次数
- D的值为**标签选择器**和**伪元素**出现的总次数

```css
li                                  /* (0, 0, 0, 1) */
ul li                               /* (0, 0, 0, 2) */
ul ol+li                            /* (0, 0, 0, 3) */
ul ol+li                            /* (0, 0, 0, 3) */
h1 + *[REL=up]                      /* (0, 0, 1, 1) */
ul ol li.red                        /* (0, 0, 1, 3) */
li.red.level                        /* (0, 0, 2, 1) */
a1.a2.a3.a4.a5.a6.a7.a8.a9.a10.a11  /* (0, 0, 11,0) */
#x34y                               /* (0, 1, 0, 0) */
li:first-child h2 .title            /* (0, 0, 2, 2) */
#nav .selected > a:hover            /* (0, 1, 2, 1) */
html body #nav .selected > a:hover  /* (0, 1, 2, 3) */
```
**比较规则是: 从左往右依次进行比较 ，较大者胜出，如果相等，则继续往右移动一位进行比较 。如果4位全部相等，则后面的会覆盖前面的**

> 内联样式优先级最高，但是外部样式也可以覆盖内联样式，只需要 ! important，如果不是为了覆盖内联样式，尽量少使用！！！

## css基本选择器
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200404223850471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)

 1. 标签选择器：匹配所有使用p标签的样式p{color:red}
 2. id选择器：匹配指定的标签#p2{color:red}
 3. class选择器：谁指定的class谁变色，可选多个,比如.info{color:red}、div.info{color:red}
 4. 通用选择器：所有的标签都改变

## 组合选择器


```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			/*后代选择器，选择所有class为div1后的p标签*/
			.div1 p{
				background-color: red;
			}
			/*子代选择器*/
			.div3>p{
				color:#0000FF;
			}
			
			/*相邻选择器*/
			.div2+p{
				background-color: #008000;
			}
			
			/*兄弟选择器*/
			.div2~p{
				background-color: hotpink;
			}
			
			/*多元素选择器*/
			.div2,p{
				background-color: #7FFFD4;
			}
			.div1 .div2,.div1~p{
				background-color: blueviolet;
				font-size: 20px;
			}
		</style>
		
	</head>
	<body>
		<!--
			1.后代选择器：.div1 p
			2.子代选择器：.div3>p
			3.多元素选择器：同时匹配所有指定元素   .div1 .div2,.div1~p
		    4.相邻选择器（紧挨着找相邻的，只找下面不找上面）.div2+p
		    5.兄弟选择器   .div2~p
			
		-->
		<p>你好我是p</p>
		<div class="div1">
			<div class="div2">
				<p>我是div2下p1</p>
				<div class="div3">
					<p>div3</p>
				</div>
			</div>
			<p>我是div2相邻的元素p</p>
			<h1 class="h1">h1</h1>
			<h2>h2</h2>
		</div>
		
		<div class="div1">
			<em>hello world</em>
			<div class="div2">
				<p>hello world div2</p>
				
				<br/>
				<b>hello hello</b>
			</div>
		</div>
		<h3>h3</h3>
	    <p>最后一个p</p>
		
	</body>

</html>

```

## 属性选择器

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
		<style type="text/css">
			/*1.匹配所有A属性，并且在div中*/
			div[A]{
				color: aquamarine;
				
			}
			/*2.匹配所有A=a1的并且只是在div标签中的*/
			div[A=a1]{
				color: blueviolet;
				/*
				 * 这个和第一个优先级是相同的
				 * 应该显示下面的，但是第一个查找的范围广
				 * 所以也会显示第一个的样式
				 */
				
				/*3.匹配所有属性为A，并且具有多个空格分隔的值,其中一个只等于a1的*/
				div[A~=a1]{
					background-color: darkkhaki;
				}
				/*4.匹配属性值以指定值开头的每个元素，并且在div标签中*/
				div[A^=a]{
					background-color: antiquewhite
				}
				/*5.匹配属性值以指定值结尾的每个元素*/
				div[A$=1]{
					background-color: blue;
				}
				/*6.匹配属性值中包含指定值的每个元素 */
				
				div[A*=a] {
					background-color: saddlebrown;
				}
			}
			
		</style>
	</head>
	<body>
		<div>
			<div A="  a1  ">1111</div>
			<div A="a1">2222</div>
			<div A="a2">3333</div>
			<div B="a1">4444</div>
		</div>
	</body>
</html>

```

## 伪类
**anchor伪类：专用于控制链接的显示效果**

        a:link（没有接触过的链接）,用于定义了链接的常规状态。

        a:hover（鼠标放在链接上的状态）,用于产生视觉效果。
        
        a:visited（访问过的链接）,用于阅读文章，能清楚的判断已经访问过的链接。
        
        a:active（在链接上按下鼠标时的状态）,用于表现鼠标按下时的链接状态。
        
        伪类选择器 : 伪类指的是标签的不同状态:
        
                   a ==> 点过状态 没有点过的状态 鼠标悬浮状态 激活状态
        
        a:link {color: #FF0000} /* 未访问的链接 */
        
        a:visited {color: #00FF00} /* 已访问的链接 */
        
        a:hover {color: #FF00FF} /* 鼠标移动到链接上 */
        
        a:active {color: #0000FF} /* 选定的链接 */ 格式: 标签:伪类名称{ css代码; }
**before after 伪类**

```javascript
:before    p:before       在每个<p>元素之前插入内容     
:after     p:after        在每个<p>元素之后插入内容     

例：p:before{content:"hello";color:red;display: block;}

```

## css的继承
继承是一种机制，它允许样式不仅可以应用于某个特定的元素，还可以应用于它的后代

```javascript
body{color:blue;}
```
给body设置了颜色，这样body里面元素都会继承该样式，但是继承的权重很低，比普通元素还要低，给任意元素添加个颜色，都会把继承的颜色覆盖掉。由此可见：**任何显示申明的规则都可以覆盖其继承样式**。　
CSS继承也有一些限制，有一些属性**不可被继承**， 如：**border、margin、padding、background**。等