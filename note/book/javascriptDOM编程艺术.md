# Javascript DOM 编程艺术 第二版
## 🚪 Javascript 语法

1. script标签放在body之前,可以是浏览器更快的加载页面。
> 浏览器解析页面的时候，从上往下解析网页。浏览器对网页的解析又分两块，①UI渲染引擎 ②JS解析引擎。  
> 解析CSS和HTML是同时进行的，互不影响，但是解析JS会阻塞页面的渲染，暂停CSS和DOM的解析，因为JS可能会修改DOM或者CSS。  
> 如果脚本是外部的，则会等脚本下载完毕，再继续解析文档，此种情况可以添加defer或者async，这两个属性有一定的区别：  
> 1. defer和async都是异步加载script，不会阻塞后续dom的渲染。  
> 2. defer 加载的js会在DOM渲染完毕后，DomContentLoaded事件调用之前执行。并且会按照顺序执行拥有defer属性的script标签
> 3. asnyc 加载的js会在加载完毕就执行，多个含有async的script标签，谁先加载完谁先执行。

2. 程序设计语言分为解释性和编译型两大类。
> 编译型语言需要编译器， 直接将代码编译成在电脑执行的机器码。解释型语言不需要编译器，需要解释器。  
> 用编译型的语言编写的代码，能在编译阶段就发现。解释型语言的代码则需要在执行到时才能发先。  
> 编译型比解释性速度快，可移植性好。

3. 变量的作用域
> 讨论全局变量和局部变量其实就是讨论变量作用域。
> 1. 全局变量： 可以在脚本中任何位置引用。
> 2. 局部变量： 只存在于声明它的函数的内部。

4. 对象
> 对象是一种数据类型，包含了属性和方法。
> Javscript语言里的对象分三种类型：
>   1. 用户自定义对象
>   2. 内建对象：内建在JS语言里的对象，如Array
>   3. 宿主对象： 由浏览器提供的对象。