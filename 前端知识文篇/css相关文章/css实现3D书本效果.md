话不多说，先来看一下效果图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200610143950492.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)
源代码如下

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    *{
        margin: 0;
        padding: 0;
    }
    body{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 100vh;
        background: #333333;
        background-size: cover;
    }
    .book{
        width: 400px;
        height: 600px;
        position: relative;
        background-color: #ffffff;
        transform: rotate(-37.5deg) skewX(10deg);
        box-shadow: -35px 35px 50px rgb(0,0, 0, 1);
        transition: 0.5s;
        /* 光标呈现为指示链接的指针（一只手） */
        cursor: pointer;
    }
    .book:hover{
        /* rotate 定义 2D 旋转，在参数中规定角度。 */
        /* skewX()定义沿着 X 轴的 2D 倾斜转换。
            translate(x,y) 定义 2D 转换。
          */
        transform: rotate(-37.5deg) skewX(10deg) translate(20px,-20px);
        /* box-shadow 向框添加一个或多个阴影 */
        box-shadow: -50px 50px 100px rgba(0,0,0,1);
    }
    /* 伪元素必须配合content进行使用，至少为空 */
    .book::before{
        content:'';
        height:100%;
        width:30px;
        background: red;
        position: absolute;
        top: 0;
        left: 0;
        transform: skewY(-45deg) translate(-30px,-15px); 
        box-shadow: inset -10px 0 20px raba(0,0,0,0,2);
        background: url(cofe.jpg);
    }
    .book::after{
            content: '';
            height: 30px;
            width: 100%;
            background: #fff;
            position: absolute;
            bottom: 0;
            left: 0;
            transform: skewX(-45deg) translate(15px,30px);
            background: url(cofe.jpg);

    }
    .book h2{
        position: absolute;
        bottom: 100px;
        left: 10px;
        font-size: 5em;
        line-height: 1em;
        color: rgb(110, 21, 21);
    }
    .book h2 span{
        background-image: url(cofe.jpg);
        background-attachment: fixed;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    .book .write i{
        font-weight: 700;
    }
    .book .cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 70%;
        background-image: url(cofe.jpg);
        background-size: cover;
    }


</style>


<body>
    <div class="book">
        <div class="cover"></div>
        <h2>Book <span>javascript</span></h2>
        <span class="wirte"> written by fans</span>
    </div>
</body>
</html>
```
ok，效果还是相对可以得哦，如果喜欢得话，请点个赞吧！！！