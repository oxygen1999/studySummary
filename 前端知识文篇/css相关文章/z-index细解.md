<!--
 * @Author: angula
 * @Date: 2021-07-06 10:17:37
 * @LastEditTime: 2021-07-06 10:18:10
 * @FilePath: \studySummary\前端知识文篇\css相关文章\z-index细解.md
-->
z-index看似很简单，其实其中还是有不少的探究之处！

css为盒模型的布局提供了三种不同的定位方案

 1. 正常文档流
 2. 浮动
 3. 定位
 
最后一种方案（特指绝对定位）将会把元素从正常文档流中完全移走，其最终的落脚点将取决于开发者。

通过设置 top，left，bottom 和 right 的值，你可以在二维空间中对元素进行定位，但 CSS 同时也允许你使用 z-index 把它放置在三维空间中。

表面看起来，z-index 似乎是一个很简单的属性，你给它设置哪个值，元素就会位于 y 轴的哪个位置，就这样。但它实际上并没有我们想象的这么简单，这个属性背后是一系列决定元素所在层级的规则。


## z-index的基础概念
x 轴代表水平方向，y 轴代表垂直方向，z 轴则代表我们的目光向页面（屏幕）看进去的时候，各元素的布局情况。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317155131480.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
屏幕是一个二维平面，所以完美实际上是看不到z轴的，z轴实际上是通过透视的形式展示的。也就是说，多个元素共享同一块二维平民啊时，友得元素在顶部，有的元素在底部，因此而感受到z轴的存在。

**css**允许我们给z-index设置三种值来决定某个元素在z轴方向上的位置。
- auto（默认值） 堆叠顺序与父元素相等
- number             元素的堆叠顺序
- inherit               规定应该从父元素继承z-index属性的值

主要来看一下它的number值，number可以为正整数，负整数或者0，值越大的话，元素就会距离我们的眼睛越近，值越小就会距离我们的眼睛越远。

如果两个元素在定位之后共享同一块二维空间，那么在这块空间中，z-index越大的元素将会覆盖z-index较小的元素。

这些东西还是相对比较容易理解的，因为跟我们的直觉是一样的没有太大偏差，但是下面的一些东西就不会很好回答了。
- 当设置了定位和z-index的元素与一个位于正常文档流种的元素重叠时，哪一个会在顶层？
- 一个元素设置定位，另一个元素设置浮动，哪一个在顶层？
- 父元素和子元素都设置了定位，会发生什么呢？

所以，如果想要理清这些问题，我们有必要进一步理解与z-index工作原理相关的一些概念，也就输层叠上下文，层叠等级和层叠顺序。

## 层叠上下文和层叠等级
针对层叠上下文和层叠等级，可能很难给出一个清晰易懂的概念，所以我们这里用通俗的例子来理解。想象一下，现在有一张桌子，上面摆满了各种东西。那么这张桌子就代表了一个层叠上下文，假设还有另一张与之并排的桌子，那么就产生了另一个层叠上下文

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317160441497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
如图所示，层叠上下文 1 指的就是文档根部，而层叠上下文 2 和 3 位于 1 的某个层叠等级中。此外，这两个层叠上下文各自会包含新的层叠等级。

现在想象一下，第一张桌子上面并排摆了四个砖头，这四个砖头上面放着一个玻璃杯，而玻璃杯上面还放着一个水果盘。那么，砖头、玻璃杯、水果盘，各自都处于不同的层叠等级中，但它们共处于“桌子”这一层叠上下文中。

对每一个网页来说，默认都会创建一个层叠上下文 ，这个上下文（这张桌子）的根部就是 html 元素，html 元素的所有子元素都会位于这个默认的层叠上下文中的某个层叠等级，就好比东西会摆放在桌子的不同位置上一样。

当你给某个元素设置一个非 auto 的 z-index 时，就会创建一个新的 层叠上下文 ，它和它所包含的层叠等级都是独立于其它层叠上下文和层叠等级的，就好比你搬了一张新的桌子放在房间里，它和旧的桌子是互相独立的。

## 层叠顺序

我们可以通过一个非常简单的例子来理解层叠顺序，这个例子甚至还不需要涉及到 定位元素 。

想象一下，现在有一个非常简单的网页，不考虑默认的 <html>, <head>, <body> 等元素，就只需要考虑每个网页至少都会有的一个 div。在 CSS 文件中设置 html 的背景颜色为蓝色，设置 div 的背景颜色为红色，并设置宽高。

当加载页面的时候，你觉得会看到什么？

这个自然不用多想，引入眼帘的肯定是一大片的蓝色，同时还有一个此前设置好尺寸的红色块级元素。除非你做了额外的设置，否则这个元素将正常地出现在左上角。

你可能会说“就这？太简单了吧”，不过有一个问题可能不那么简单：为什么红色的块级元素就一定会位于蓝色背景的上层呢？为什么我们看到的就是 div 位于 html 的上层呢？原因是，它们都遵循了层叠顺序的规则。

在这个简单的例子中，根据规则，正常文档流的子块（div）的层级将会高于根元素（html）的背景和边框。我们看到div 位于顶层，这是因为它的层叠等级更高。

虽然上面这个例子只涉及到了两个层叠等级，但实际上，在一个层叠上下文中，一共可能出现七个层叠等级，从最低到最高排列，依次是：

 1. 背景和边框 ：形成层叠上下文的元素的背景和边框，它是整个上下文中层叠等级最低的
 2. Z-Index 为负数 ：设置了 z-index 为负数的子元素以及由它所产生的层叠上下文
 3. 块级盒模型：位于正常文档流中的、块级的、非定位的子元素
 4. 浮动盒模型 ：浮动的、非定位的子元素
 5. 内联盒模型 ：位于正常文档流中的、内联的、非定位的子元素
 6. Z-index 为 0：设置了 z-index 为 0 的、定位的子元素以及由它所产生的层叠上下文
 7. Z-Index 为正数 ：设置了 z-index 为正数的、定位的子元素以及由它所产生的层叠上下文，它是整个上下文中层叠等级最高的

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317160949340.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
这七个层叠等级就构成了层叠顺序的规则。符合层叠等级七的元素，会比层叠等级在一到六的元素更“贴近我们”，符合层叠等级五的元素，会比层叠等级二的元素更“贴近我们”，以此类推。

第一次学习这些层叠规则的时候，我感觉收获了很多新的东西。如果只着眼于层叠等级二、六和七（也就是涉及到 z-index 的等级），那么大部分时候，我们对于 z-index 的理解是正确的。正的 z-index 的层级比 0 要高，而 0 又比负的要高，一切都符合直觉，可能大多数人到这里就不继续往后探究了。

我之前就是这样，在看到这些规则之前，以为除了正的和负的 z-index ，其它情况都可以看作是 z-index 为0 —— 不过现在我们很清楚了，这种想法是错误的。事实是，大部分元素的层级都要低于 z-index:0。

还有一个有趣的细节是，非定位的元素实际位于四种不同的层叠等级中。乍一想觉得很奇怪，不过其实这是很合理的。假设所有的非定位元素都位于同一个层叠等级，那么我们就没办法在 div （块级盒）上看到文本（内联盒）了。


## 示例
当你给一个元素设置非 auto 的 z-inde 时，会创建一个新的、完全独立的层叠上下文。

重新回顾一下之前拿桌子做比喻的案例。一开始的时候，我们的桌子上摆满了四块砖头，上面是一个玻璃杯，再上面是一个水果盘。现在，假设又有一张新的桌子，它摆放的东西和旧桌子差不多，唯一的不同是，新桌子少了一个水果盘。

不难想象，旧桌子的水果盘是整个房间中位于最顶层的物品（它有最大的 z-index），不过，如果把旧桌子以及它上面的所有东西整体搬到地下室呢？此时，水果盘的层级会比新桌子上的每一个物品都要低，这是因为，放置水果盘的旧桌子整体已经低于新桌子了。
对于网页上的定位元素来说，其实道理是一样的。假设有如下代码，思考一个问题：div.two 和 div.four，哪个在上哪个在下？

HTML
```html
<!--
 * @Author: angula
 * @Date: 2021-03-17 15:23:33
 * @LastEditTime: 2021-03-17 15:43:51
 * @FilePath: \JS\Test_one\z-index\z-index.html
-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="one">
    <div class="two"></div>
    <div class="three"></div>
  </div>
  <div class="four"></div>
</body>

</html>
```
CSS
```css
div {
      width: 200px;
      height: 200px;
      padding: 20px;
    }

    .one,
    .two,
    .three,
    .four {
      position: absolute;
    }

    .one {
      background-color: red;
      outline: 5px solid #000000;
      top: 100px;
      left: 200px;
      z-index: 10;
    }

    .two {
      background-color: aqua;
      outline: 5px solid #000000;
      top: 50px;
      left: 75px;
      z-index: 100;
    }

    .three {
      background-color: blue;
      outline: 5px solid #17896e;
      top: 125px;
      left: 25px;
      z-index: 150;
    }

    .four {
      background-color: blueviolet;
      outline: 5px solid #9a0e64;
      top: 200px;
      left: 350px;
      z-index: 50;
    }
```

来看看效果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317161629698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
由于div.two和div.three在div.one中，所以它的z-index是和div.one的层叠上下文是相关的。实际表现出来的z-index是下面这样的：

 

 - .one : z-index = 10
 - .two : z-index = 10.100
 - three : z-index = 10.150
 - .four : z-index = 50

div.one 和内部包含的一切将会在层级上低于 div.four，无论给  div.one 的子元素设置多大的 z-index，子元素的层级都无法超过 div.four。

此时我们将蓝色的three的z-index调整为99999看看会不会出现在four的上层呢？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210317162239171.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
此时我们将蓝色的z-index设置为99999，仍然显示在four的下面。

此时相信你对一个很大的z-index值却不能显示在一个小的z-index的值的上面有了理解了吧

>
>最后，记住一个很重要的结论：定位元素可以创建新的层叠上下文，在这个上下文中的所有层叠等级，都会高于或者低于另一个层叠上下文的所有层叠等级。