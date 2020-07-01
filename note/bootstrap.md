<!-- TOC -->

- [🛠 boostrap 源码阅读笔记](#🛠-boostrap-源码阅读笔记)
  - [bootstrap 的代码结构](#bootstrap-的代码结构)
    - [🔧一些scss函数：](#🔧一些scss函数)
    - [🎈functions.scss](#🎈functionsscss)
    - [🎈variables.scss](#🎈variablesscss)
    - [🎈 mixins.scss](#🎈-mixinsscss)
    - [🎈root.scss](#🎈rootscss)
    - [🎈reboot.scss](#🎈rebootscss)
    - [🎈tables.scss](#🎈tablesscss)
  - [响应式](#响应式)
  - [其它](#其它)

<!-- /TOC -->
## 🛠 boostrap 源码阅读笔记

### bootstrap 的代码结构

boostrap源码里主要有js和css, js使用es6 编写， css使用scss编写。阅读源码需要一定的scss和es6前置知识。

bootstrap-4.5.0
|------js
|------|----src
|------scss

在scss文件夹里，主入口文件是bootstrap.scss，这里引入了其它模块文件。
```scss
@import "functions";
@import "variables";
@import "mixins";
@import "root";
@import "reboot";
@import "type";
@import "images";
@import "code";
@import "grid";
@import "tables";
@import "forms";
@import "buttons";
@import "transitions";
@import "dropdown";
@import "button-group";
@import "input-group";
@import "custom-forms";
@import "nav";
@import "navbar";
@import "card";
@import "breadcrumb";
@import "pagination";
@import "badge";
@import "jumbotron";
@import "alert";
@import "progress";
@import "media";
@import "list-group";
@import "close";
@import "toasts";
@import "modal";
@import "tooltip";
@import "popover";
@import "carousel";
@import "spinners";
@import "utilities";
@import "print";
```
#### 🔧一些scss函数：
* `unitless()` 函数相对来说简单明了些，只是用来判断一个值是否带有单位，如果不带单位返回的值为 true，带单位返回的值为 false.  
* `unit()` 该函数接受一个scss变量，返回该变量表达式的单位。    
* Sass函数 `comparable` 判断两个数是否可进行加减、合并
* `@warn`指令将SassScript表达式的值打印到标准错误输出流。 对于需要警告用户已弃用或从轻微的混合使用错误中恢复的库而言，它很有用。 @warn和@debug之间有两个主要区别：您可以使用--quiet命令行选项或：quiet Sass选项关闭警告。 样式表跟踪将与消息一起打印出来，以便被警告的用户可以看到他们的样式在哪里引起警告。 
* `length()` 函数主要用来返回一个列表中有几个值
* `map-values($map)` 函数类似于 `map-keys($map)` 功能，不同的是 `map-values($map )`获取的是 \$map 的所有 value 值。`map-values($map)` 中如果有相同的 value 也将会全部获取出来。
* `nth($list,$n)` 函数用来指定列表中某个位置的值。  
* str-replace(\$string, \$search, \$replace: "")    

  str-index(\$string, \$search)    

  str-slice(\$string, 1, \$index - 1)  
*  sass-svg 是一个将 SVG 代码转化为 Data-URI 的 Sass 库
* color.red() for getting a color’s red channel.
* color.green() for getting a color’s green channel.
* color.blue() for getting a color’s blue channel.
* color.hue() for getting a color’s hue.
* color.saturation() for getting a color’s saturation.
* color.lightness() for getting a color’s lightness.

#### 🎈functions.scss
`@import "functions";` 这个文件里主要写了一系列工具函数 和一些声明为mixin的函数。

混合指令的用法是在 `@mixin` 后添加名称与样式，比如名为 large-text 的混合通过下面的代码定义：
```scss
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}

```
使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）
```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```
#### 🎈variables.scss
`@import "variables"` 这个文件里定义了一些列变量

#### 🎈 mixins.scss
这个文件里`import`了mixins文件下的mixins模块文件

#### 🎈root.scss
这个文件里声明了:root 是css4的规范，指根元素，在HTML 中就是`<html>`.    
下面的代码是css4的规范，定义变量。
```css
--blue: #007bff;
--indigo: #6610f2;
--purple: #6f42c1;
--pink: #e83e8c;
--red: #dc3545;
```

```scss
$properties: (margin, padding);
@mixin set-value($side, $value) {
    @each $prop in $properties {
        #{$prop}-#{$side}: $value;
    }
}
.login-box {
    @include set-value(top, 14px);
}

//它可以让变量和属性工作的很完美，上面的代码编译成 CSS：

.login-box {
    margin-top: 14px;
    padding-top: 14px;
}
```
#### 🎈reboot.scss

```scss
// Reboot
//
// Normalization of HTML elements, manually forked from Normalize.css to remove
// styles targeting irrelevant browsers while applying new styles.
//
// Normalize is licensed MIT. https://github.com/necolas/normalize.css


// Document
//
// 1. Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
// 2. Change the default font family in all browsers.
// 3. Correct the line height in all browsers.
// 4. Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS.
// 5. Change the default tap highlight to be completely transparent in iOS.
```
#### 🎈tables.scss
`@content`用在`mixin`里面的，当定义一个`mixin`后，并且设置了`@content`；
`@include`的时候可以传入相应的内容到`mixin`里面

官网给的例子：
```scss
$color: white;
@mixin colors($color: blue) {
  background-color: $color;
  @content;
  border-color: $color;
}
.colors {
  @include colors { color: $color; }
}

//---编译后
.colors {
  background-color: blue;
  color: white;
  border-color: blue;
}
```
### 响应式
1. bootstrap 里在响应屏幕大小变化方面使用媒体查询来做相应的样式变动。
2. bootstrap里的网格布局则采用的是flex布局。  
3. 元素的偏移offset则是通过margin值的设定来实现。   
4. 元素的排列顺序则是通过flex布局里的order属性来实现。  

### 其它
**1. -webkit-text-size-adjust**  
iPhone 和 Android 的浏览器纵向 (Portrate mode) 和橫向 (Landscape mode) 模式皆有自动调整字体大小的功能。控制它的就是 CSS 中的 -webkit-text-size-adjust。text-size-adjust 设为 none 或者 100% 关闭字体大小自动调整功能.尽量只使用100%;  

**2. calc**  
在一些元素的宽高计算上，bootstrap则也会少量使用calc属性，虽然性能上比不用calc会降低一点，但是，不滥用的情况下，性能的损耗其实影响不会很大，可以放心使用。  

**3. -webkit-overflow-scrolling**  
>`-webkit-overflow-scrolling` 属性控制元素在移动设备上是否使用滚动回弹效果.
> - auto: 使用普通滚动, 当手指从触摸屏上移开，滚动会立即停止。
> - touch: 使用具有回弹效果的滚动, 当手指从触摸屏上移开，内容会继续保持一段时间的滚动效果。继续滚动的速度和持续的时间和滚动手势的强烈程度成正比。同时也会创建一个新的堆栈上下文。

在移动端上，在你用`overflow-y:scorll`属性的时候，你会发现滚动的效果很木，很慢，这时候可以使用`-webkit-overflow-scrolling:touch`这个属性，让滚动条产生滚动回弹的效果，就像ios原生的滚动条一样流畅。但是使用`-webkit-overflow-scrolling:touch`这个属性会产生一种在ios端偶尔卡住不能滑动的bug。 
> 这是因为在ios8以上, Safari对于`overflow-scrolling`用了原生控件来实现。对于有`-webkit-overflow-scrolling`的网页，会创建一个`UIScrollView`，提供子layer给渲染模块使用。

解决办法:  
![方法1](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/bootstrapnote1.png)  
![方法2](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/bootstrapnote2.png)  
也就是说：在`webkit-overflow-scrolling:touch`属性的下一层子元素上，将height加1%或1px。从而主动触发scrollbar。  

除此之外，这个属性还有很多bug，包括且不限于以下几种:
* 滚动中 scrollTop 属性不会变化
* 手势可穿过其他元素触发元素滚动
* 滚动时暂停其他 transition