# 1. javascript 笔记二
<!-- TOC -->

- [1. javascript 笔记二](#1-javascript-笔记二)
  - [1.1. 事件总线EventBus](#11-事件总线eventbus)
  - [1.2. ES6 相关小记](#12-es6-相关小记)
    - [1.2.1. 正则的拓展](#121-正则的拓展)
    - [1.2.2. 数值扩展](#122-数值扩展)
    - [1.2.3. 函数的拓展](#123-函数的拓展)
    - [1.2.4. 数组的拓展](#124-数组的拓展)
    - [1.2.5. 对象拓展](#125-对象拓展)
    - [1.2.6. Symbol](#126-symbol)
    - [1.2.7. Set和Map数据结构](#127-set和map数据结构)
    - [1.2.8. Proxy](#128-proxy)

<!-- /TOC -->

## 1.1. 事件总线EventBus
> EventBus 需要使用到Vue的三个全局API  
> 1. vm.$on( event, callback )  
> 监听当前实例上的自定义事件。事件可以由vm.\$emit触发。回调函数会接收所有传入事件触发函数的额外参数。  
> 2. vm.$emit( event, […args] )  
> 触发当前实例上的事件。附加参数都会传给监听器回调，如果没有参数，形式为vm.\$emit(event)  
> 3. vm.$off( [event, callback] )  
> 移除自定义事件监听器。  
> 如果没有提供参数，则移除所有的事件监听器；  
> 如果只提供了事件，则移除该事件所有的监听器；  
> 如果同时提供了事件与回调，则只移除这个回调的监听器。  
> 
> ```js
>   import Vue from 'vue';
>   Vue.prototype.$EventBus = new Vue();
> ```
> 当A组件需要通过EventBus传参给B组件时，此时，A组件emit事件应该在beforeDesctory生命周期中，因为此时B组件已经加载好。  
>  A = created  
>  A = beforeMount  
>  A = mounted  
>  A = beforeUpdate   
>  A = updated  
>  B = beforeCreated  
>  B = created  
>  B = beforeMounted  
>  A = beforeDestoryed  
>  A = destroyed  
>  B = mounted  


## 1.2. ES6 相关小记
**特别注意：以下纪录并不完整，只是摘录**

### 1.2.1. 正则的拓展
ES2018 引入了具名组匹配（Named Capture Groups），允许为每一个组匹配指定一个名字，既便于阅读代码，又便于引用。
```js
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31
```
上面代码中，“具名组匹配”在圆括号内部，模式的头部添加“问号 + 尖括号 + 组名”（?<year>），然后就可以在exec方法返回结果的groups属性上引用该组名。同时，数字序号（matchObj[1]）依然有效。

具名组匹配等于为每一组匹配加上了 ID，便于描述匹配的目的。如果组的顺序变了，也不用改变匹配后的处理代码。

如果具名组没有匹配，那么对应的groups对象属性会是undefined。
```js
const RE_OPT_A = /^(?<as>a+)?$/;
const matchObj = RE_OPT_A.exec('');

matchObj.groups.as // undefined
'as' in matchObj.groups // true
```
上面代码中，具名组as没有找到匹配，那么`matchObj.groups.as`属性值就是undefined，并且as这个键名在groups是始终存在的。
字符串替换时，使用$<组名>引用具名组。
```js
let re = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;

'2015-01-02'.replace(re, '$<day>/$<month>/$<year>')
// '02/01/2015'
```

**引用**  
如果要在正则表达式内部引用某个“具名组匹配”，可以使用\k<组名>的写法。
```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```
数字引用（\1）依然有效。
```js
const RE_TWICE = /^(?<word>[a-z]+)!\1$/;
RE_TWICE.test('abc!abc') // true
RE_TWICE.test('abc!ab') // false
```
这两种引用语法还可以同时使用。
```js
const RE_TWICE = /^(?<word>[a-z]+)!\k<word>!\1$/;
RE_TWICE.test('abc!abc!abc') // true
RE_TWICE.test('abc!abc!ab') // false
```

### 1.2.2. 数值扩展  
**Number.parseInt(), Number.parseFloat()**   
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
```js
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true
```
**Math.trunc()**  
Math.trunc方法用于去除一个数的小数部分，返回整数部分。  
```js
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
```
对于非数值，Math.trunc内部使用Number方法将其先转为数值。
```js
Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
```
对于空值和无法截取整数的值，返回NaN。
```js
Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
```
对于没有部署这个方法的环境，可以用下面的代码模拟。
```js
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
```
**Math.hypot()**  
Math.hypot方法返回所有参数的平方和的平方根。
```js
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3
```
上面代码中，3 的平方加上 4 的平方，等于 5 的平方。

如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回 NaN。

**双曲函数方法**  
ES6 新增了 6 个双曲函数方法。
`Math.sinh(x)` 返回x的双曲正弦（hyperbolic sine）  
`Math.cosh(x)` 返回x的双曲余弦（hyperbolic cosine）  
`Math.tanh(x)` 返回x的双曲正切（hyperbolic tangent）  
`Math.asinh(x)` 返回x的反双曲正弦（inverse hyperbolic sine）  
`Math.acosh(x)` 返回x的反双曲余弦（inverse hyperbolic cosine）  
`Math.atanh(x)` 返回x的反双曲正切（inverse hyperbolic tangent）  

**指数运算符**  
ES2016 新增了一个指数运算符（<span>**</span>）。
```js
2 ** 2 // 4
2 ** 3 // 8
```
这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。  
```js
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```
上面代码中，首先计算的是第二个指数运算符，而不是第一个。  
指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。  
```js
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

### 1.2.3. 函数的拓展  
**作用域**  
一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。
```js
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```
上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

>下面这样写，会报错。
```javascript
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
```
上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。

**箭头函数**  
>使用注意点
箭头函数有几个使用注意点。

（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。  
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。  
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。  
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。  
上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

> this指向的固定化，并不是因为箭头函数内部有绑定this的机制，
> 实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。
> 正是因为它没有this，所以也就不能用作构造函数。

所以，箭头函数转成 ES5 的代码如下。
```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
```
上面代码中，转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。

**不适用场合**  
由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

1. 第一个场合是定义对象的方法，且该方法内部包括this。

```js
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
}
```
上面代码中，cat.jumps()方法是一个箭头函数，这是错误的。调用cat.jumps()时，如果是普通函数，该方法内部的this指向cat；如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

2. 第二个场合是需要动态this的时候，也不应使用箭头函数。
```js
var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});
```
上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。


### 1.2.4. 数组的拓展
**替代数组的apply方法**  
由于扩展运算符可以展开数组，所以不再需要使用 apply 方法将数组转为函数的参数。
```js
//ES5 的写法
function f(x, y ,z){
  // ......
}
var args = [0,2,3];
f.apply(null, args);

// ES6的写法
function f(x, y, z){
  //..........
}
var args = [0,2,3];
f(...args);
```

下面是扩展运算符取代apply方法的一个实际例子：应用Math.max方法简化求出一个数组中的最大元素。
```js
//ES5的写法
Math.max.apply(null, [1,23,4]);
//ES6的写法
Math.max(...[1,23,4]);
```

> v8 引擎中的Array.prototype.push()的源码：
```js
function ArrayPush () {  
  var n = TO_UNIT32(this.length); 
  var m = %_ArgumentsLength();  
  for (var i = 0; i < m; i++) { // 逐个复制元素
    this[i + n ] = %_Arguments(i);
  }  this.length = n + m; // 修改数组的length
  return this.length;
}

```
从源码可以看出，push操作其实只是简单的复制元素。只要一个对象具有下面的两个特性，就可以使用Array.prototype.push()：
1. 可读写length属性
2. 对象本身可以存取属性
  
**字符串**  
扩展运算符还可以将字符串转为真正的数组
```js
[...'hello'];
//['h','e','l','l','o']
```
>提示: 实际上, 展开语法和 Object.assign() 行为一致, 执行的都是浅拷贝(只遍历一层)。  
>如果想对多维数组进行深拷贝, 下面的示例就有些问题了。
```js
var a = [[1], [2], [3]];
var b = [...a];
b.shift().shift(); // 1
// Now array a is affected as well: [[], [2], [3]]
```

**Array.from**  
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）对象（包括ES6新增的数据结构Set和Map）。

下面是一个类似数组的对象，Array.from将它转为真正的数组。
```js
let arrayLike = {
  '0': 'a',
  '1':'b',
  '2':'c',
  length:3
};
//ES5 写法
var arr1 = [].slice.call(arrayLike); //['a','b','c']

//ES6的写法
let arr2 = Array.from(arrayLike);
```
**Array.of**  
`Array.of`方法用于将一组值转换为数组。  
```js
Array.of(3,11,8); //[3,11,8];
Array.of(3); //[3];
```
这个方法的主要目的是弥补数组构造函数 Array（）的不足。因为参数个数的不同会导致Array（）的行为有差异。
```js
Array(); //[]
Array(4); //[,,,,]
Array(3,11,8); //[3,11,8]
```
**数组实例的find（）和findIndex（）**  
数组实例的 find 方法用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
```js
[1,4,5,-5,10].find(n=>n<0); //-5

find方法接受三个参数，依次为当前的值，当前的位置，和原数组
[].find((value, index, arr)=>{})
findIndex方法接受三个参数，依次为当前的值，当前的位置，和原数组
[].findIndex((value, index, arr)=>{})
```
**数组实例的fill()**  
fill方法使用给定值填充一个数组。
```js
['a','b','v'].fill(7); //[7,7,7];
```
fill 方法用于空数组的初始化时非常方便。数组中已有的元素会被全部抹去。  
fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。  
```js
[1, 2,3].fill(7,1,2);//[1,7,3]
```
### 1.2.5. 对象拓展
**Object.assign()**  
`Object.assign`方法用于将源对象（source）的所有可枚举属性复制到目标对象（target）。
```js
var target = {a:1};
var source1 = {b:1};
var source2 = {c:1};

Object.assign(target, source1, source2);
//target: {a:1,b:2,c:3}
```
`Object.assign`方法的第一个参数是目标对象，后面的参数都是源对象。  
* 注意！如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。 

* 如果只有一个参数，`Object.assign`会直接返回该参数。  
* 如果该参数不是对象，则会先转成对象，然后返回。  
* 如果非对象参数出现在源对象的位置（即非首参数），那么处理规则将有所不同。
  * 首先，这些参数都会转成对象，如果无法转成对象便会跳过。这意味着，如果`undefined`和`null`不在首参数便不会报错。  
* 其他类型的值（即数值、字符串和布尔值）不在首参数也不会报错。但是，除了字符串会以数组形式复制到目标对象，其他值都不会产生效果。

> `Object.assign`方法实行的是浅复制，而不是深复制。也就是说，如果源对象某个属性的值是对象，那么目标对象复制得到的是这个对象的引用。

克隆对象：  
```js
function clone(origin){
  return Object.assign({}, origin);
}
```
上面的代码将原始对象复制到一个空对象中，就得到了原始对象的克隆。不过，采用这种方法只能克隆原始对象自身的值，不能克隆它继承的值。如果要保持继承链，可以采用下面的代码。  
```js
function clone(origin){
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
```

**Null传导运算符**  
在编程实务中，如果读取对象内部某个属性，往往需要判断独享是否存在。比如，要读取message.body.user.firstName, 安全的写法如下：
```js
var msg = {}
const firstName = (msg && msg.body && msg.body.user && msg.body.user.firstName) || 'default';
```
上面这样层层判断非常麻烦，于是引入了“Null传到运算符”，可以简化上面写法。
```js
//改写成
const firstName = msg?.body?.user?.firstName || 'default';
```
上面的代码有3个`?.`运算符，只要其中一个返回null或undefined， 就不再继续运算，而是返回undefined。  
“Null传到运算符”有4种用法。
* `obj?.prop`:读取对象属性  
* `obj?.[expr]`:同上  
* `obj?.(...args)`:函数或对象方法调用  
* `new C?.(...args)`:构造函数调用  

### 1.2.6. Symbol

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。  
我们使用一个他人提供的对象，但又想为这个对象添加新的方法（mixin模式），新方法的名字就有可能与现有方法产生冲突。  
如果有一种机制，能够保证每个属性的名字都是独一无二的就好了，这样就能从根本上防止属性名冲突。  
这就是ES6引入类型Symbol的原因。  

ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第7种数据类型，前6种分别是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）和对象（Object）。  

Symbol值通过Symbol函数生成。也就是说，对象的属性名现在可以有两种类型：一种是原来就有的字符串，另一种就是新增的Symbol类型。只要属性名属于Symbol类型，就是独一无二的，可以保证不会与其他属性名产生冲突。  

```js
let s = Symbol();
typeof s; //"symbol"
```

**作为属性名的Symbol**  
由于每一个Symbol值都是不相等的，这意味着Symbol值可以作为标识符用于对象的属性名，保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
```js
var mySymbol = Symbol();
//写法一
var  a = {};
a[mySymbol] = 'Hello!';

//写法二
var  a = {
  [mySymbol]:'Hello!'
}
//写法三
var a = {};
Object.defineProperty(a,mySymbol,{value:'Hello!'});

console.log(a[mySymbol]);//  Hello!
```
>注意，Symbol值作为对象属性名时不能使用点运算符。

使用Object.getOwnPropertyNames方法得不到Symbol属性名，需要使用Object.getOwnPropertySymbols方法。  
另一个新的API——Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和Symbol键名。  

**Symbol.for()、Symbol.keyFor()**  
Symbol.for（）与 Symbol（）这两种写法都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，而后者不会。Symbol.for（）不会在每次调用时都返回一个新的Symbol类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。比如，如果调用 Symbol.for（″cat″）30 次，每次都会返回同一个 Symbol 值，但是调用Symbol（″cat″）30次则会返回30个不同的Symbol值。  

Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的 iframe 或 service worker中取到同一个值。  

Symbol.keyFor方法返回一个已登记的Symbol类型值的key。

### 1.2.7. Set和Map数据结构  
**Set**  
Set结构的实例有以下属性。

* Set.prototype.constructor：构造函数，默认就是Set函数。

* Set.prototype.size：返回Set实例的成员总数。

Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍4个操作方法。

* add（value）：添加某个值，返回Set结构本身。

* delete（value）：删除某个值，返回一个布尔值，表示删除是否成功。

* has（value）：返回一个布尔值，表示参数是否为Set的成员。

* clear（）：清除所有成员，没有返回值。

Set结构的实例有4个遍历方法，可用于遍历成员。

* keys（）：返回键名的遍历器。

* values（）：返回键值的遍历器。

* entries（）：返回键值对的遍历器。

* forEach（）：使用回调函数遍历每个成员。

需要特别指出的是，Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用。  

keys() 、values() 、entries()
keys方法、values方法、entries方法返回的都是遍历器对象。由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。  
```js
let set = new Set([1,2,3]);
for(let item of set.keys()){
  console.log(item);
}
//output:
//1
//2
//3
for(let item of set.values()){
  console.log(item)
}
//output:
//1
//2
//3
for(let item of set.entries()){
  console.log(item)
}
//output:
//[1,1]
//[2,2]
//[3,3]
```
**WeakSet**  
WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

第一，WeakSet的成员只能是对象，而不能是其他类型的值。  
第二，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象是否还存在于WeakSet之中。WeakSet 里面的引用都不计入垃圾回收机制。WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在WeakSet里面的引用就会自动消失。  

由于上面这个特点，WeakSet的成员是不适合引用的，因为它会随时消失。另外，WeakSet内部有多少个成员取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此ES6规定WeakSet不可遍历。

WeakSet 结构有以下3个方法。  

* WeakSet.prototype.add（value）：向WeakSet实例添加一个新成员。  
* WeakSet.prototype.delete（value）：清除WeakSet实例的指定成员。  
* WeakSet.prototype.has（value）：返回一个布尔值，表示某个值是否在WeakSet实例中。  
WeakSet没有size属性，没有办法遍历其成员。


**Map**  

JavaScript 的对象（Object）本质上是键值对的集合（Hash 结构），但是只能用字符串作为键。这给它的使用带来了很大的限制。为了解决这个问题，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。

Map结构的实例有以下几个属性和操作方法。
* size属性:size属性返回Map结构的成员总数。  
* set(key,value):set方法设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键。set方法返回的是当前的Map对象，因此可以采用链式写法。  
* get(key):get方法读取key对应的键值，如果找不到key，则返回undefined。  
* has(key):has方法返回一个布尔值，表示某个键是否在Map数据结构中。  
* delete(key):delete方法删除某个键，返回true。如果删除失败，则返回false。  
* clear():clear方法清除所有成员，没有返回值。

Map原生提供了3个遍历器生成函数和1个遍历方法。  
* keys（）：返回键名的遍历器。  
* values（）：返回键值的遍历器。  
* entries（）：返回所有成员的遍历器  
* forEach（）：遍历Map的所有成员。

需要特别注意的是，Map的遍历顺序就是插入顺序。

**WeakMap**
WeakMap与Map的区别有以下两点。

第一，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。  
第二，WeakMap的键名所指向的对象不计入垃圾回收机制。

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对这个对象的引用。    
一旦不再需要这两个对象，我们必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。一旦忘了，就会造成内存泄漏。  
WeakMap就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。  

基本上，如果要向对象中添加数据又不想干扰垃圾回收机制，便可以使用WeakMap。一个典型应用场景是，在网页的DOM元素上添加数据时就可以使用WeakMap结构。当该DOM元素被清除，其所对应的WeakMap记录就会自动被移除。

WeakMap与Map在API上的区别主要有两个。   
* 一是没有遍历操作（即没有key（）、values（）和entries（）方法），也没有size属性。
* 二是无法清空，即不支持clear方法。因此，WeakMap只有4个方法可用：get（）、set（）、has（）、delete（）。

### 1.2.8. Proxy

Proxy可以理解成在目标对象前架设一个“拦截”层，外界对该对象的访问都必须先通过这层拦截，因此提供了一个种机制可以对外界的访问进行过滤和改写。Proxy这个词的原意是代理。

```js
let obj = new Proxy({},{
  get(target, key, receiver){
    console.log(`getting${key}`);
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    console.log(`setting ${key}`);
    return Reflect.set(target, key, value, receiver);
  }
})
```
上面的代码对一个空对象进行了一层拦截，重定义了属性的get 和 set 设置行为。这里暂时先不解释具体的语法，只看运行结果。
