# ✈你不知道的Javascripit
<!-- TOC -->

- [✈你不知道的Javascripit](#✈你不知道的javascripit)
  - [1. 作用域](#1-作用域)
  - [2. 词法作用域](#2-词法作用域)
  - [3. 提升](#3-提升)
  - [4 .类型](#4-类型)
  - [5. 值](#5-值)
    - [数组](#数组)
    - [数字](#数字)
  - [6. 原生函数（原生对象）](#6-原生函数原生对象)

<!-- /TOC -->
## 1. 作用域

1. 程序中的一段源代码在执行过程中会经历三个步骤，统称为“编译”：

   **分词/词法分析**：对代码字符串进行分词，形成此法单元。  
   **解析/语法分析**：将词法单元转换生成一棵“抽象语法树”AST  
   **代码生成**：将AST转换成可执行代码。  
作用域共有两个主要的工作模型。第一种最为普遍：词法作用域。另外一种叫做：动态作用域，仍有一些语言使用，如perl.

## 2. 词法作用域

1.  词法作用域只会查找一级标识符，比如a,b和c。如果代码中应用了foo.bar.baz，词法作用域查找只会视图查找foo，找到这个变量后，对象属性访问规则会分别接管对bar和baz的访问。

## 3. 提升

Javascript 引擎在解释JS代码之前首先对其编译。编译阶段的一部分工作就是找到所有的声名，并用合适的作用域将他们关联起来。  
包括变量和函数在内的所有声名都会在任何代码被执行前首先被处理。  
当你看到 var a = 2;会看成两个声明： var a; 和 a = 2;。第一个声明是在编译阶段执行。第二个赋值声明会被留在原地等待执行阶段。

函数声明和变量声明都会提升。但是一个值得注意的细节是（这个细节可以出现在有多个“重复”声明的代码中）是函数会首先被提升，然后才是变量（如果函数声明和变量声明重复，则变量声明会被忽略）。

## 4 .类型 

其中内置类型：

* 空值(null)
* 未定义(undefined)
* 布尔值(boolean)
* 数字(number)
* 字符串(string)
* 对象(object)
* 符号(symbol,ES6新增)

## 5. 值

### 数组

和其它强类型不一样，在JS中，数组可以容纳任何类型的值，可以是字符串，数字，对象，甚至是其它数组。

> 使用delete运算符可以将单元从数组中删除，但是数组的长度不会变化，此时数组会变成一个“稀疏”数组。

数组通过数字进行索引，但有趣的是他们也是对象，所以也可以包含字符串键值和属性，如果字符串键值可以被转化为十进制，它会被当做数字索引来处理。 

**类数组**：

通常需要转为数组进行操作，通常采用 slice 或 Array.from()来转化。  

```js
  function foo(){
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
  }

  //或者

  var  arr = Array.from(arguments);
```

### 数字

Javascript只有一种数值类型 number。

* 数字的语法
  * JS中的数字常量一般用十进制表示：
  var a = 42; var b = 42.3; var c = 42.0 或42.(小数点后的0可以省略);

由于数字值可以使用Number对象进行封装，因此数字可以调用Number.prototype上的方法。其中的方法不仅适用于数字变量，也适用于数字常量。不过对于“.”运算符需要给予特变的注意，因为他是一个有效的数字字符，会被优先识别为数字常量的一部分，然后才是对象属性访问运算符。

```js
  //无效语法
  42.toFixed(3); //syntax error

  //下面的语法都有效
  42["toFixed"](2);
  (42).toFixed(2);
  0.42.toFixed(2);
  42..toFiexd(2);
```

`42.toFixed(2)`报错的原因就是因为“.”被视为“42.”的一部分，所以没有“.”运算符来调用toFixed()方法。

* void运算符  

使用void 0 获得undefined  



## 6. 原生函数（原生对象）

String  
Number  
Boolean  
Array
Object  
Function  
RegExp  
Date  
Error
Symbol(ES6 添加)

* 内部属性`[[Class]]`

所有typeof返回值为“object”的对象（如数组）都包含一个内部属性`[[Class]]`,这个属性无法直接访问，一般通过
`Object.prototype.toString()`来查看。例如：

```js
  Object.prototype.toString.call([1,2,3]);   //"[object Array]"
```

