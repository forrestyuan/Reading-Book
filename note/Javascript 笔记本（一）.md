# Javascript 笔记
<!-- TOC -->

- [Javascript 笔记](#javascript-笔记)
  - [📘 笔记本一（红色的那本）](#📘-笔记本一红色的那本)
  - [1. 事件流](#1-事件流)
    - [🖊 使用事件处理程序](#🖊-使用事件处理程序)
    - [🖊 事件对象](#🖊-事件对象)
  - [2. AJAX](#2-ajax)
  - [3. JS类型转换](#3-js类型转换)
  - [4. 属性访问表达式](#4-属性访问表达式)
  - [5. 原型链](#5-原型链)
  - [6. 执行上下文堆栈](#6-执行上下文堆栈)
  - [7. 函数参数](#7-函数参数)
  - [8.自执行函数 IIFE](#8自执行函数-iife)
  - [9. 闭包](#9-闭包)
  - [10. with关键字](#10-with关键字)
  - [11. JS类型转换](#11-js类型转换)
  - [12. 执行上下文](#12-执行上下文)
  - [13. 作用域](#13-作用域)

<!-- /TOC -->
将笔记本里写的东西转为数字化的信息。这里的笔记有些会被丢弃，斟酌之后会记录下来。

## 📘 笔记本一（红色的那本）

## 1. 事件流
描述的是从页面中接受事件的顺序。   
* 事件冒泡流  
即事件最开始由最具体的元素接收，然后逐层向上传播到最不具体的那个节点（文档）。
* 事件捕获流  
不太具体的节点更早的接收的事件，向深层次最具体的节点传播事件。

### 🖊 使用事件处理程序
1. HTML事件处理程序
2. DOM 0 级事件处理程序： 先把元素取出来让这个事件以这个对象属性的形式添加事件。（eg:`button.onclick = function(){....}`）;
3. * DOM 2 级事件处理程序：（IE8不支持）  
  DOM2级事件定义了两个方法：`addEventListener()` 和 `removeEventListener()`。方法接受三个参数，事件名、处理事件的函数、决定是在捕获阶段（true）调用函数还冒泡阶段（false）调用函数的布尔值。  
   * 对于IE浏览器，其有自身的方法：  
  `attachEvent()`、`detachEvent()`。接受两个参数，事件名、处理事件的函数。  
  IE8以及更早版本的只支持事件冒泡。

### 🖊 事件对象
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
**修改原型链方式（构造函数继承）实现继承**
```js
function Rectangle(length, width) {
　　this.length= length;
　　this.width= width;
}
Rectangle.prototype.getArea= function() {
　　return this.length* this.width;
};
Rectangle.prototype.toString= function() {
　　return "[Rectangle " + this.length+ "x" + this.width+ "]";
};
// inherits from Rectangle
function Square(size) {
　　this.length= size;
　　this.width= size;
}
Square.prototype= new Rectangle();
Square.prototype.constructor= Square;
Square.prototype.toString= function() {
　　return "[Square " + this.length+ "x" + this.width+ "]";
};
var rect= new Rectangle(5, 10);
var square = new Square(6);
console.log(rect.getArea()); 　　　　　　　　　 // 50
console.log(square.getArea()); 　　　　　　　　 // 36
console.log(rect.toString()); 　　　　　　　　　// "[Rectangle 5x10]"
console.log(square.toString()); 　　　　　　　　// "[Square 6x6]"
console.log(rect instanceof Rectangle); 　　　// true
console.log(rect instanceof Object); 　　　　　// true
console.log(square instanceof Square); 　　　　// true
console.log(square instanceof Rectangle); 　　// true
console.log(square instanceof Object); 　　　　// true
```
这段代码里有两个构造函数：Rectangle和Square。Square构造函数的prototype属性被改写为Rectangle的一个对象实例。此时不需要给Rectangle的调用提供参数，因为它们不需要被使用，而且如果提供了，
那么所有的Square的对象实例都会共享同样的维度。
用这种方式改变原型对象链时，你需要确保构造函数不会在参数缺失时抛出错误（很多构造函数包含的初始化逻辑会需要参数）且构造函数不会改变任何全局状态，比如追踪有多少对象实例被创建等。Square.prototype被改写后，其constructor属性会被重置为Square。然后，rect作为Rectangle的对象实例被创建，而square则被作为Square的实例创建。两个对象都有getArea()方法，因为那继承自Rectangle.prototype。instanceof操作符认为变量square同时是Square、Rectangle和Object的对象实例，因为instanceof使用原型对象链检查对象类型。
<p style="color:deeppink">
<b>Square.prototype</b> 并不真的需要被改写为一个Rectangle对象，毕竟Rectangle构造函数并没有真的为Square做什么必要的事情。事实上，唯一相关的部分是Square.prototype需要指向Rectangle.prototype，使得继承得以实现。
</p>

![this is prototype link img](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/prototype.JPG)  

**借用构造函数实现继承**
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


## 7. 函数参数
参数对象（argument对象）是所有（非箭头）函数中可用的局部变量。参数对象就像通配符，可以向数组一样对其遍历来访问任意数量的参数。argument对象不是要给Array,它类似于Array,但除了length属性和索引外没有任何Array的属性。例如，它没有pop方法。  
可以通过特殊手段，将其转换为一个真正的Array。
```js
  var args = Array.prototype.slice.call(arguments);
  var args = [].slice.call(arguments) ;
  //ES6
  const args = Array.from(arguments);
  const args = [...arguments];
```

> arguments.callee  
> 指向当前执行的函数。  

早期版本的 JavaScript不允许使用命名函数表达式，出于这样的原因, 你不能创建一个递归函数表达式。
例如，下边这个语法就是行的通的：
```js
function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}
[1,2,3,4,5].map(factorial);

//但是:
[1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : /* what goes here? */ (n - 1) * n;
});

//这个不行。为了解决这个问题， arguments.callee 添加进来了。然后你可以这么做
[1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});
```
> arguments.caller   
> 指向调用当前函数的函数。(已经废弃)  
> 
> arguments.length  
> 指向传递给当前函数的参数数量。  
> 
> arguments[@@iterator]  
> 返回一个新的Array迭代器对象，该对象包含参数中每个索引的值。  
>
>注意:现在在严格模式下，arguments对象已与过往不同。arguments[@@iterator]不再与函数的实际形参之间共享，同时caller属性也被移除。  

## 8.自执行函数 IIFE
立即调用函数表达式（IIFE）是一个个模式，你可以在很多的库和框架中看到这一模式：
```js
//1.
;(function(){
  //....
})();

//2.
;!function(){
  //....
}();

//3.
;-function(){
  //...
}();
//4.
;+function(){
  //...
}();
//5.
;~function(){
  //....
}();
```

IIFE提供了以下功能：
* 防止命名冲突
* 提供了类块级作用域
* 防止变量污染
* 促进代码模块化

在前面加上分号是一种防御性的编程方式，防止其他的模块没有分号结尾。

## 9. 闭包


## 10. with关键字
> 关键字with 拓展一个语句的作用域链。以对象做为参数，然后是一对大括号，其中包含代码块。
```js
  with(expression){
    //statement
  }
```
**利：** with语句可以在不造成性能损失的情況下，减少变量的长度。其造成的附加计算量很少。使用'with'可以减少不必要的指针路径解析运算。需要注意的是，很多情況下，也可以不使用with语句，而是使用一个临时变量来保存指针，来达到同样的效果。

**弊：** with语句使得程序在查找变量值时，都是先在指定的对象中查找。所以那些本来不是这个对象的属性的变量，查找起来将会很慢。如果是在对性能要求较高的场合，'with'下面的statement语句中的变量，只应该包含这个指定对象的属性。

## 11. JS类型转换
* 对象类型转为数字
  * valueOf()方法会先试图被调用，如果返回的结果为基础类型，则再将其转为数字。如果返回的结果不是基础类型，则会再试图调用toString()方法。最后试图将字符串转为数字，如果返回的结果是基础类型，则会得到一个数字或NaN.如果不是基础类型，则抛出一个异常。

* 对象转字符串  
  * 如果对象具有toString()方法，则调用这个方法，如果返回原始值，JS将这个值转换为字符串。
  * 如果没有toString()方法，那么JS会调用valueOf()
  * 如果没有上述两个方法，则报类型异常。
> 注意： 对于所有非日期的对象来说，对象到原始值的转换基本上是首先调用valueOf()方法。而日期对象则先调用toString().

* Number类定义的toString()方法可以接收表示转换基数的可选参数，如果不指定，默认十进制。

## 12. 执行上下文
> js 代码的整个执行过程分为两个阶段，代码编译阶段和代码执行阶段。  
> 
> * 编译阶段由编译器完成，将代码翻译成可执行代码，这个阶段作用域规则会确定。  
> 
> * 执行阶段有引擎完成，主要任务是执行可执行代码（全局代码，函数代码，eval代码），执行上下文在这个阶段创建。


js引擎创建了 **执行上下文栈** （Execution context stack, ECS）来管理上下文。  
* 举栗子：
```js
  function out(){
    function inner(){}
    inner();
  }
  out();
  /*
    这个函数的执行上下文栈会经历一下过程
    ECS.push(globalContext);
    ECS.push(outContext);
    ECS.push(innerContext);
    ECS.pop(outContext);
    ECS.pop(innerContext);
    ECS.pop(globalContext);
  */
```
**强调： 上下文是在函数调用的时候才产生！！！！**  
执行上下文的生命周期同样可以分为两个阶段。
* 创建阶段
  执行上下文分别创建变量对象，建立作用域链，以及确定this的指向。
* 代码执行阶段
  在这个阶段会生成三个重要的东西：
  * 变量对象 VO
  * 作用域链 Scope chain
  * this

1. 变量对象
   
2. 

## 13. 作用域

