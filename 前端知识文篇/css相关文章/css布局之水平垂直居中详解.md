首先先说明一下 html 和一些基础 css 样式，下面就不再赘述！
**html**

```
<body>
		<div class="div1">
			<div class="box  size">垂直水平居中</div>
		</div>
	</body>
```

**公共 css 代码如下**

```css
<style type="text/css">
			/* 公共样式 */
			.div1{
				width: 300px;
				height: 300px;
				border:1px solid aqua;

			}
			.box{
				background: #00FFFF;
			}
			.box.size{
				width:100px;
				height:100px;
			}
</style>
```

这些 css 样式在后续介绍中默认带上，不再赘述！

## 一、 absolute 和 margin auto（常用）

同样居中元素的宽高必须固定，并且需要得知子元素的宽高
这种方式通过设置各个方向的距离都是 0，此时再将 margin 设为 auto，就可以在各个方向上居中了

```css
.div1 {
  position: relative;
}
.box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  margin: auto;
}
```

## 二、absolute 和 margin（负值）

简单说一下原理，利用了绝对定位，绝对定位的百分比是相对于父元素的宽高，所以我们可以根据这个原理将元素居中显示。但是要注意：绝对定位是基于子元素的左上角来说的，但是要想让子元素居中显示，就要解决这个问题。
此时可以利用 margin 的负值来实现效果，当外边距为负值时，元素向相反方向定位，这样我们将子元素的外边距设置为子元素的宽高的一半就可以实现了。（PS：缺点就是必须得到子元素的宽高）

```css
.div1 {
  position: relative;
}
.box {
  top: 50%;
  left: 50%;
  position: absolute;
  margin-top: -50px;
  margin-left: -50px;
}
```

## 三、absolute 和 calc

同样需要子元素的宽高固定，并知道宽高，css3 具有计算属性。
top 的百分比是基于元素左上角减去宽度的一半即可（PS：依赖 calc 的兼容性）

```css
.div1 {
  position: relative;
}
.box {
  position: absolute;
  top: calc(50% - 50px);
  /* 减号前后没有空格，该样式不生效*/
  left: calc(50% - 50px);
}
```

当我在写这段代码的时候，发现一个有趣的事情，calc（50%-50px）如果减号前后没有空格的话，样式就不会生效，写上空格的话，就会正常生效了，具体原因我也不太清楚 emmmmm

**下面的方法将不需要知晓子元素的宽高即可设置**
html 修改为：

```
<body>
		<div class="div1">
			<div class="box">水平垂直居中，不需要子元素固定宽高</div>
		</div>
	</body>
```

**公共 css 如下**

```css
.div1 {
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
.box {
  background: #00ffff;
}
```

## 四、flex（常用）

flex 是现代的布局方案仅仅需要几行代码即可实现居中效果

```css
.div1 {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

## 五、lineheight

利用行内元素居中属性也可以做到水平垂直居中。把 box 设置为行内元素，通过 text-align 就可以实现水平居中 vertical-align 也可以在垂直方向做到居中（PS：这种方法需要在子元素中将文字显示重置为想要的效果）

```css
.div1 {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}
.box {
  font-size: 10px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
  /* 修正文字 */
  text-align: left;
}
```

## 六、absolute 和 transform

不需要子元素宽高固定，但是依赖于 translate2d 的兼容性

```css
.div1 {
  position: relative;
}
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

## 七、css-table

css 新增的 table 属性，可以把普通元素改变为 table 元素的显示效果，也可以实现水平居中

```css
.div1 {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.box {
  display: inline-block;
}
```

以上就是我总结的一些居中布局的方法了，还有什么其他的欢迎补充！
**个人感觉：** 我比较喜欢 **absolute +margin auto 、flex、absolute 和 transform**，移动端最好用 flex 吧，pc 端我喜欢 absolute +margin auto

**如果感觉对你有所帮助，请动动小手点个赞吧！你的点赞就是给我的最大支持**
