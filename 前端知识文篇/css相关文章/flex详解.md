# 初了解
在学习弹性布局之前首先就要明白其概念
flex 就是flexible box的缩写，意为弹性布局，用来为盒装模型提供最大的灵活性
任何一个容器都可以指定为flex布局

```javascript
.box{
  display: flex;
}
```
行内元素当然也可以使用flex布局

```javascript
.box{
  display: inline-flex;
}
```
Webkit 内核的浏览器，必须加上-webkit前缀。

```javascript
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```

> 注意：设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。
# 基本概念
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811233531648.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
以上这些基础概念，请务必牢记，下面说属性时，不再重复说明！
# 属性
## 容器属性(container)
>  - flex-direction 
>   -  justify-content
>   -  align-items
>    -  flex-wrap
>     -  align-content
>      -  flex-flow
 
### 1.flex-direction 
```
	flex items默认都是沿着main axis（主轴）从main start 开始往main end方向排布
	flex-direction决定了main axis的方向，有四个取值row（默认值）、row-reverse、column、column-reverse
```

```javascript
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
### 2.justify-content
```
	justify-content决定了flex item在main axis上的对齐方式
	
	flex-start(默认值):与main start对齐
	flex-end：与main end对齐
	center：居中
	space-between：flex items 之间的距离相等，与main start、main end两端对齐
	space-evenly: flex items 之间的距离相等,flex items与main start 、main end 之间的距离等于flex items之间的距离
	space-around :flex items 之间的距离相等,flex items与main start 、main end 之间的距离等于flex items之间的距离的一半
```
这个属性的目的主要就是为了排列main axis的item位置
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200811234226439.png#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020081123425811.png#pic_center)
当然，这些属性你可以自己尝试一下，这里就不再一一尝试了，但是注意，这些都是容器的属性，要写在容器的css中！
### 3.align-items 
```
    决定flex items在cross axis上的对齐方式
   
	normal：在弹性布局中，效果和stretch一样
	stretch：前提是items不设置高度，当flex items 在cross axis 方向的size为auto时，会自动拉伸至填充flex container(或者换句话说：如果项目未设置高度或设为auto，将占满整个容器的高度。)
	flex-satrt:与cross start 对齐
	flex-end:与cross end 对齐
	center:居中对齐
	baseline:与基准线对齐
```
### 4.flex-wrap
```
   决定了flex container 是单行还是多行
	nowrap(默认)：单行
	warp：多行
	//这个比较少用
	wrap-reverse:多行（对比wrap，cross start 与cross end相反）

```
默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
### 5 align-content 
```
 决定了多行flex items 在cross axis的对齐方式 用法与justify-content相似 一个是横轴。一个控制竖轴
	stretch(默认值)：与align-items的stretch类似，当items有高度的时候，无效果
	flex-start:与cross start 对齐
	flex-end :与cross end 对齐
	center：居中对齐
	space-between:flex items 之间的距离相等，与cross start、cross end两端对齐
	space-evently: flex items 之间的距离相等,flex items与cross start 、cross end 之间的距离等于flex items之间的距离
	space-around :flex items 之间的距离相等,flex items与cross start 、cross end 之间的距离等于flex items之间的距离的一半
```

### 6 flex-flow 是flex-direction与flex-wrap的简写
也就是说，当你使用这个属性的时候，你可以使用上述两个的属性值，例如：**flex-flow: row wrap;**（水平排列，多行显示）

## flex 项目属性（item属性）

>  - order
>   -  flex-grow
>   -  flex-shrink
>    -  flex-basis
>     -  align-self
>      -  flex
 
### 1 order
```
    order 决定flex items的排布顺序  (用的不多)
	可以设置为任意整数（正整数、负整数、0），值越小越排在前面
	默认值为0
```
这个属性了解即可，说实话没怎么用过
### 2 align-self 
```
    可以通过align-self 覆盖flex container 设置的align-items
	auto(默认值):遵从flex container的align-items设置
	stretch、flex-start、flex-end、center、baseline效果与align-items一致
```
相当于继承父元素的align-items属性，如果没有父元素，则等同于stretch。
### 3 flex-grow
```
    决定了flex items如何扩展
	可以设置为任意非父数字（小数，整数 0），默认为0
	当flex container 在main axis方向上有剩余得size时，flex-grow属性才会有效
	
	如果所有flex items 的flex-grow 综合sum不超过1，这直接乘以剩余size就是扩展大小、
	如果超过1 扩展size=剩余size*flex-grow/sum
```
flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
### 4 flex-shrink
```
flex-shrink (shrink 缩小，收缩)与flex-grow相似，一个扩展，一个伸缩 
	可以设置为任意非父数字（小数，整数 0），默认为1
	当flex items在main axis 方向上超过了flex container 的size flex-shrink属性才会生效、
	如果所有flex items 的flex-shrink 总和sum超过1，每个flex item 收缩的size为：
		flex item 超出flex container 的size*收缩比例/每个flex items 的收缩比例之和
	如果sum不超过1，每个flex item 收缩的size为：
		size = 超出的size * flex-shrink值
	flex items收缩后的最终size不能小于min-width\min-height
```
有扩大自然就会有缩小，flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。具体的可以自己动手尝试一下哦，最后将会给出一个骰子布局的案例！
### 5  flex-basis
```
用来设置flex items 在 main axis方向上的base size
	默认为auto，可以设置具体的宽度数值
	
	决定flex items最终base size 的因素，优先级从高到低
		max-width\max-height\min-width\min-height
		flex-basis
		width\height
		内容本身的size
```
flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目(item)的本来大小。也可以设置跟width，height一样的宽高，表示item将占据固定的空间！
### 6 flex
```
flex 是flex-grow || flex-shink||flex-basis的简写
可以指定1 2 3个值 依次按照上述顺序！默认值为 0 1 auto
```

```javascript
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

> 注意：
> 1. 该属性的默认值为 0 1 auto（注意顺序），后两个属性可选
> 2. 该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
> 3. 如果需要这三个属性的时候，建议使用flex，而不是单独的三个分离的属性，因为浏览器会推算相关值

# 骰子布局实践
**光说不练假把式，手撕代码真功夫！**
下面利用flex写了几个骰子布局，可以参考一下！

```javascript
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
		<style type="text/css">
			#container{
				background-color: #CCCCCC;
				height: 600px;
				width: 500px;
				/* flex */
				display: flex;
				justify-content: space-evenly;
				align-items: center;
			}
			.item{
				background-color: yellow;
				width: 100px;
				height: 100px;
				
			}
			/* 单点 */
			.one{
				/* 对点使用flex布局 */
				display: flex;
				justify-content: center;
				align-items: center;
			}
			/* 点 */
			.item-one{
				display: block;
				height: 20px;
				width: 20px;
				background-color: #1890FF;
				border-radius: 50%;
			}
			/* 三点 */
			.two{
				
				display: flex;
				justify-content: space-between;
			}
			.two span{
				margin: 2px;
				display: block;
				height: 20px;
				width: 20px;
				border-radius: 50%;
				background-color: #1890FF;
			}
			.two2{
				align-self: center;
			}
			.two3{
				align-self: flex-end;
			}
			/* 五点 */
			.three{
				display: flex;
				justify-content: space-around;
			}
			.three span{
				display: block;
				height: 20px;
				width: 20px;
				border-radius: 50%;
				background-color: #1890FF;
			}
			#three_one, #three_three{
				padding: 2px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
			#three_two{
				display: flex;
				flex-direction: column;
				justify-content: center;
			}
			/* 六点 */
			.four{
				display: flex;
				justify-content: space-around;
			}
			.four span{
				display: block;
				height: 20px;
				width: 20px;
				border-radius: 50%;
				background-color: #1890FF;
			}
			#four1,#four2{
				padding: 2px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		</style>
	</head>
	<body>
		<div id="container">
			<!-- 一个点居中 -->
			<div class="item one">
				<span class="item-one"></span>
			</div>
			<!-- 三点 -->
			<div class="item two">
				<span class="two1"></span>
				<span class="two2"></span>
				<span class="two3"></span>
			</div>
			<!-- 五点 -->
			<div class="item three">
				<div id="three_one">
					<span></span>
					<span></span>
				</div>
				<div id="three_two">
					<span></span>
				</div>
				<div id="three_three">
					<span></span>
					<span></span>
				</div>
			</div>
			<!-- 六点 -->
			<div class="item four">
				<div id="four1">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div id="four2">
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			
		</div>
	</body>
</html>

```
## 测试结果
![在这里插入图片描述](https://img-blog.csdnimg.cn/202008120011511.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70#pic_center)

> 这篇文章就到这里了，总结不易，如果对你有所帮助的话，请动动你的小手给我点个赞吧！
