# Javascript 笔记

将笔记本里写的东西转为数字化的信息。这里的笔记有些会被丢弃，斟酌之后会记录下来。来自于红皮TengSheng NOTEBOOK 这本笔记本，算是第一本JS笔记本了。

## 1. 事件流
描述的是从页面中接受事件的顺序。   
* 事件冒泡流  
即事件最开始由最具体的元素接收，然后逐层向上传播到最不具体的那个节点（文档）。
* 事件捕获流  
不太具体的节点更早的接收的事件，向深层次最具体的节点传播事件。

### 使用事件处理程序
1. HTML事件处理程序
2. DOM 0 级事件处理程序： 先把元素取出来让这个事件以这个对象属性的形式添加事件。（eg:`button.onclick = function(){....}`）;
3. * DOM 2 级事件处理程序：（IE8不支持）  
  DOM2级事件定义了两个方法：`addEventListener()` 和 `removeEventListener()`。方法接受三个参数，事件名、处理事件的函数、决定是在捕获阶段（true）调用函数还冒泡阶段（false）调用函数的布尔值。  
   * 对于IE浏览器，其有自身的方法：  
  `attachEvent()`、`detachEvent()`。接受两个参数，事件名、处理事件的函数。  
  IE8以及更早版本的只支持事件冒泡。

### 事件对象
1. 在触发DOM上的事件时都会产生一个事件对象event，通常为了兼容IE，需要写成 `event = event || window.event`。
  ① 阻止事件冒泡：`event.stopPropagation()`;IE中为`cancelBubble()`;
  ② 阻止事件的默认行为： `event.preventDefault()`;IE中为`returnValue`属性为false即可阻止。
  ③ type属性： 获得事件类型
  ④ target属性：获取事件目标，在IE中，用srcElement。

## 2. AJAX

```js
  var xmlhttp;
  //IE7+, firefox, chrome,opera, safari
  if(window.XMLHttpRequest){
    xmlhttp = new XMLHttpRequest();
  }else{
    //IE6,5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
      //处理逻辑
    }else{
      //处理逻辑
    }
  }；
  xmlhttp.open("GET",MIME,true);
  xmlhttp.send();
```

## 3. JS类型转换
* 对象转字符串：
  * 如果对象具有toString()方法，则调用这个方法，如果返回原始值，JS将这个值转换为字符串，并返回。
  * 如果没有toString()方法，那么js会调用valueOf()方法。
  * 如果没有上述两个方法，那么就会报类型错误。
> 对于所有非日期的对象来说，对象到原始值的转换基本上是首先调用ValueOf(),而日期对象则首先调用toString();

## 4. 属性访问表达式

属性访问表达式运算得到一个数组元素的值，JS定义了两种方式：  
`expression.identifier`  
`expression[identifier]`
> 注：方括号比“.”的性能高。


## 5. 原型链

原型对象也是简单的对象并且可以拥有他们自己的原型，如果一个原型对象是一个非null的应用，那么以此类推，这就叫原型链。  
原型链是一个用来实现继承和共享属性的有限对象链。  
ECMAScript中没有类的概念，但是代码重用的风格并没有太多不同。
**原型链继承**：

```javascript 
  var a = {
    x: 10,
    calculate: function(z){
      return this.x + this.y + z;
    }
  };

  var b = {
    y: 20,
    __proto__: a
  };
  
  var c = {
    y: 30,
    __proto__: a
  };

  //调用继承的方法
  b.calculate(20);
  c.calculate(30);
```

如果没有明确为一个对象指定原型，那么它将使用`__proto__`的默认值——`Object.prototype`。 Object.prototype对象自身也有一个`__proto__`属性，这是原型链的终点并且为null。

>  ES5标准化了一个实现原型继承的可选方法，使用Object.create函数：

```js
 var b = Object.create(a, {y:{value:20}});
```

## 6. 执行上下文堆栈

这里有三种ECMAScript代码，全局代码、函数代码、eval代码。每一个代码是在其执行上下文中被求值的。只有一个全局上下文。
一个出发其它上下文的上下文叫做**caller**。被触发的上下文叫做**callee**。callee在同一时间内可能是一些其它callee的caller（比如，一个在全局上下文中被调用的函数，之后调用了一些内部函数）。  
当一个caller触发（调用）了一个callee，这个caller会暂缓自身的执行，然后把控制权传递给callee。这个callee被push到栈中，成为一个运行中的执行上下文。在callee的执行上下文结束后，它会把控制权返回给caller，然后caller上下文继续执行直到结束。

* **执行上下文**

一个执行上下文可以抽象的表示成一个简单的对象。每一个执行上下文拥有一些属性用来跟踪和它相关的执行过程。

![JS笔记执行上下文.JPG](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/JS笔记执行上下文.JPG)

  * 变量对象VO  
    变量对象是与执行上下文相关的数据作用域。他是一个与上下文相关的特殊对象，其中存储了在上下文中定义的变量和函数声明。
  * 活动对象AO
    当一个函数被caller触发，活动对象将会被创建。这个对象中包含形参和arguments对象。活动对象之后会作为函数上下文的变量对象来使用。

> 注意，在ES5中变量对象和活动对象被并入了词法环境模型。

