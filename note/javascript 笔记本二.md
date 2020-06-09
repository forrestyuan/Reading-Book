# javascript 笔记二


## 事件总线EventBus
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


## ES6 相关小记
**特别注意：以下纪录并不完整，只是摘录**

### 正则的拓展
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

### 数值扩展
**Number.parseInt(), Number.parseFloat()**
ES6 将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。

// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

**Math.trunc()**
Math.trunc方法用于去除一个数的小数部分，返回整数部分。

Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
对于非数值，Math.trunc内部使用Number方法将其先转为数值。

Math.trunc('123.456') // 123
Math.trunc(true) //1
Math.trunc(false) // 0
Math.trunc(null) // 0
对于空值和无法截取整数的值，返回NaN。

Math.trunc(NaN);      // NaN
Math.trunc('foo');    // NaN
Math.trunc();         // NaN
Math.trunc(undefined) // NaN
对于没有部署这个方法的环境，可以用下面的代码模拟。

Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

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
ES2016 新增了一个指数运算符（**）。
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

### 函数的拓展
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
