在使用vue组件的时候，我们经常会遇到v-for必须要加key值
来举个例子进行说明吧！
# 不存在key的情况
```javascript
<!--
 * @Author: angula
 * @Date: 2020-08-07 00:05:05
 * @LastEditTime: 2020-09-11 23:16:52
 * @FilePath: \JS\Github-前端知识总结仓库\studySummary\前端知识文篇\vue相关文章\v-for为何要用key.md
-->
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="../vue.js"></script>
</head>

<body>
    <div id="box">
        <div>
            <input type='text' v-model="name">
            <button @click="add">添加</button>
        </div>
        <ul>
            <li v-for="(item,i) in list">
                <input type="checkbox">{{item.name}}
            </li>
        </ul>
    </div>

    <script>
        var vm = new Vue({
            el: '#box',
            data: {
                name: '',
                id: 3,
                list: [
                    { id: 1, name: '张三' },
                    { id: 2, name: '李四' },
                    { id: 3, name: '王二' }
                ]
            },
            methods: {
                add() {
                    this.list.unshift({ id: ++this.id, name: this.name })
                    this.namne = ''
                }
            }
        });
    </script>
</body>

</html>
```
此时我们选中最后一个值

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807002456524.png)

这时候我们选择添加一个值

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807002559703.png)

这时候我们会发现，选中的值由王二变成了李四
# 存在key值得情况

```javascript
div id="box">
        <div>
            <input type='text' v-model="name">
            <button @click="add">添加</button>
        </div>
        <ul>
            <li v-for="(item,i) in list" :key="item.id">
                <input type="checkbox">{{item.name}}
            </li>
        </ul>
    </div>

    <script>
        var vm = new Vue({
            el: '#box',
            data: {
                name: '',
                id: 3,
                list: [
                    { id: 1, name: '张三' },
                    { id: 2, name: '李四' },
                    { id: 3, name: '王二' }
                ]
            },
            methods: {
                add() {
                    this.list.unshift({ id: ++this.id, name: this.name })
                    this.namne = ''
                }
            }
        });
    </script>
```
此时我们依旧选中王二

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807002926261.png)、

然后我们添加一个麻子，再观察一下选中得是否还是王二呢？

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807003033728.png)

此时很明显，在加了key值之后，选中得值不会发生改变！

> 可以简单得理解：加了具有唯一性得key之后，id的checkbox跟内容进行了一个关联，是我们所要展示的效果
# diff
## diff算法的处理方法

对操作前后的dom树同一层的节点进行对比，一层一层对比，如下图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807003401219.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)

当某一层有很多相同的节点时，也就是列表节点时，Diff算法的更新过程默认情况下也是遵循以上原则。
比如下面这种情况：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807003448734.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)

我们希望可以在B和C之间加一个F，Diff算法默认执行起来是这样的：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807003511694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg3ODIxMQ==,size_16,color_FFFFFF,t_70)

即把C更新成F，D更新成C，E更新成D，最后再插入E，相当没有效率！
所以我们需要使用key来给每个节点做一个唯一标识，Diff算法就可以正确的识别此节点，找到正确的位置区插入新的节点。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200807003553747.png)

vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id 等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM。**但是我们不推荐使用index作为key！**
# 总结
> 总结：key的作用主要就是为了高效的更新虚拟DOM，使用key值，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素。它也可以用于强制替换元素/组件而不是重复的使用它。
## 为何不推荐index作为key值
> 当以数组为下标的index作为key值时，其中一个元素(例如增删改查)发生了变化就有可能导致所有的元素的key值发生改变
> diff算法时比较同级之间的不同，以key来进行关联，当对数组进行下标的变换时，比如删除第一条数据，那么以后所有的index都会发生改变，那么key自然也跟着全部发生改变，所以index作为key值是不稳定的，而这种不稳定性有可能导致性能的浪费，导致diff无法关联起上一次一样的数据。因此，能不使用index作为key就不使用index。







