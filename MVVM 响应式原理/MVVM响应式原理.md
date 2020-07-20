### 实现双向数据绑定的做法
实现数据绑定的做法大致有如下几种：
> 发布者-订阅者模式  (backbone.js)
> 脏治检查（angular.js)  
> 数据劫持（vue.js）

**发布者-订阅模式：**一般通过sub,pub的方式实现数据和视图的绑定监听，更行数据方式通常做法是vm.set('property', value),这种方式现在就比较用得少了，更希望通过vm.propery = value这种方式更新数据，同时自动更新视图，于是就有了下面两种方式。

**脏值检查：**angular.js是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过setInterval()定时轮询检测数据变动，angular只在指定的事件触发时进入脏值检测，大致如下：  
* DOM事件，譬如用户输入文本，点击按钮等。（ng-click）
* XHR响应事件
* 浏览器Location变更事件（$location）
* Timer事件（$timeout, $interval）
* 执行$digest() 或$apply()

* 数据劫持： vue.js则采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。


首先，我们来看一下，这个图我们基本上所有的东西都实现了，一开始实现了Compile解析指令，找到对应的双大括号，事件，指令等。然后在解析哪些text、html等指令或大括号之前，需要订阅数据变化，绑定更新函数，new Watcher.

创建Watcher之前，需要劫持数据，所以创建了Observer，把当前的数据的所有属性都劫持了，做了get和set的监听。get的时候是在初始化的时候，set是在未来更改数据的时候。  

get和set的时候，向Dep通知变化，那么Dep有两个作用，添加订阅者，和通知订阅者有变化。


### 实现一个指令解析器Compile

### 实现一个数据监听器 Observer

Dep 订阅器，相当于一个数组，存储watcher。有一个类似添加watcher的方法。

### 实现一个watcher去更新视图

### 实现一个proxy

阐述一下你所理解的MVVM响应式的原理：  

Vue是采用数据劫持配合 发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时，发布消息给依赖收集器，去通知观察者，做出对应的回调函数，去更新试图。

MVVM作为绑定的入口，整合Observer, Compile和Watcher三者，通过Observer来监听model数据变化，通过Copile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化，然后影响视图的更新；视图交互变化，然后更新数据。