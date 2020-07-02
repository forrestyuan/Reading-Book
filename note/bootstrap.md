<!-- TOC -->

- [1. bootstrap 4.5](#1-bootstrap-45)
  - [1.1. 🛠 boostrap 源码阅读笔记](#11-🛠-boostrap-源码阅读笔记)
      - [1.1.1.1. 🔧一些scss函数：](#1111-🔧一些scss函数)
      - [1.1.1.2. 🎈functions.scss](#1112-🎈functionsscss)
      - [1.1.1.3. 🎈variables.scss](#1113-🎈variablesscss)
      - [1.1.1.4. 🎈 mixins.scss](#1114-🎈-mixinsscss)
      - [1.1.1.5. 🎈root.scss](#1115-🎈rootscss)
      - [1.1.1.6. 🎈reboot.scss](#1116-🎈rebootscss)
      - [1.1.1.7. 🎈tables.scss](#1117-🎈tablesscss)
      - [1.1.1.8. 🎈custom_forms.scss](#1118-🎈custom_formsscss)
    - [1.1.2. 响应式](#112-响应式)
    - [1.1.3. 其它CSS相关](#113-其它css相关)
  - [🛠bootstrap js 源码阅读](#🛠bootstrap-js-源码阅读)
    - [🎈util.js](#🎈utiljs)

<!-- /TOC -->
# 1. bootstrap 4.5 
## 1.1. 🛠 boostrap 源码阅读笔记
**Bootstrap 3和4的区别**：
Bootstrap3|Bootstrap4
----------|----------
Less	    | Sass语言编写
4种栅格类  | 5种栅格类
使用px为单位|使用rem和em为单位（除部分margin和padding使用px）
使用push和pull向左右移动|	偏移列通过offset-类设置
使用float的布局方式|	选择弹性盒模型（flexbox）
img-circle只 对图片|roundde-circle对所有元素全部生效
hidden- 来隐藏 visible- 来显示|d-*-none 来影藏 d-block 来显示
hidden-md 只会在平等屏幕时隐藏其他屏幕会显示|d-md-none会在中等屏幕以上也隐藏。


Bootstrap3的4种栅格|Bootstrap4的5种栅格
------------------|------------------
特小（col-xs-） 适配手机(<768px)|特小（col-）(<576px)
小（col-sm-） 适配平板(≥768px)|小（col-sm-）(≥576px)
中（col-md-） 适配电脑(≥992px)|中（col-md-）(≥768px)
大（col-lg-） 适配宽屏电脑(≥1200px)|大（col-lg-） (≥992px)
 . |特大（col-xl-）（≥1200px）

bootstrap4 新特点：
* 新增网格层适配了移动端；
* 全面引入ES6新特性（重写所有JavaScript插件）；
* css文件减少了至少40%；
* 所有文档都用Markdown编辑器重写；
* 放弃对IE8的支持


boostrap4 源码里主要有js和css, js使用es6 编写， css使用scss编写。阅读源码需要一定的scss和es6前置知识。

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
#### 1.1.1.1. 🔧一些scss函数：
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

#### 1.1.1.2. 🎈functions.scss
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
#### 1.1.1.3. 🎈variables.scss
`@import "variables"` 这个文件里定义了一些列变量

#### 1.1.1.4. 🎈 mixins.scss
这个文件里`import`了mixins文件下的mixins模块文件

#### 1.1.1.5. 🎈root.scss
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
#### 1.1.1.6. 🎈reboot.scss

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
#### 1.1.1.7. 🎈tables.scss
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
#### 1.1.1.8. 🎈custom_forms.scss
这个文件里定义了一些表单组件的样式。
这里抽一些样式来讲讲：
1. > 针对`<input type ="range" />`  

    range的样式在不同浏览器下有不同的实现，需要通过设置针对不同浏览器的伪元素来实现样式修改。
    如下代码是bootstrap的对range的实现。
    ```scss
    // Range
    //
    // Style range inputs the same across browsers. Vendor-specific rules for pseudo
    // elements cannot be mixed. As such, there are no shared styles for focus or
    // active states on prefixed selectors.

    .custom-range {
      &::-moz-focus-outer {/*....*/}
      &::-webkit-slider-thumb {/*....*/}
      &::-webkit-slider-runnable-track {/*....*/}
      &::-moz-range-thumb {/*....*/}
      &::-moz-range-track {/*....*/}
      &::-ms-thumb {/*....*/}
      &::-ms-track {/*....*/}
      &::-ms-fill-lower {/*....*/ }
      &::-ms-fill-upper {/*....*/}
    } 
    ```
    以下资料来源于[w3c plus](https://www.w3cplus.com/css3/list-of-pseudo-elements-to-style-form-controls.html)  
    **Gecko**：火狐在Firefox22版提供::-moz-range-track and ::-moz-range-thumb来设置范围元素的样式。可以给他应用尽可能多的样式。 

    **TridentIE**： 引擎为定制范围元素样式提供一系列很棒的伪元素：
    >::-ms-fill-lower: 轨道手柄前面  
    >::-ms-fill-upper: 轨道手柄后面  
    >::-ms-ticks-before: 跟踪刻度线范围前  
    >::-ms-ticks-after: 跟踪刻度线范围后  
    >::-ms-thumb: 手柄  
    >::-ms-track: 轨道  
    >::ms-tooltip: 在用户选择一个范围元素时显示工具。注意，这个元素不能设置样式，只能用display隐藏。

    **WebKit**: 为范围元素提供::-webkit-slider-runnable-track和::-webkit-slider-thumb，然而不能给他们添加过多的样式，你可以添加一些颜色和留白。   
    对于范围元素有一点要注意，ＩＥ引擎和Webkit容许在划过状态时应用样式（它们分别是::-webkit-slider-thumb:hover和::-ms-thumb:hover）而火狐引擎暂不支持。  


### 1.1.2. 响应式
1. bootstrap 里在响应屏幕大小变化方面使用媒体查询来做相应的样式变动。
2. bootstrap里的网格布局则采用的是flex布局。  
3. 元素的偏移offset则是通过margin值的设定来实现。   
4. 元素的排列顺序则是通过flex布局里的order属性来实现。  

### 1.1.3. 其它CSS相关
**1. -webkit-text-size-adjust属性**  
iPhone 和 Android 的浏览器纵向 (Portrate mode) 和橫向 (Landscape mode) 模式皆有自动调整字体大小的功能。控制它的就是 CSS 中的 -webkit-text-size-adjust。text-size-adjust 设为 none 或者 100% 关闭字体大小自动调整功能.尽量只使用100%;  

**2. calc属性**  
在一些元素的宽高计算上，bootstrap则也会少量使用calc属性，虽然性能上比不用calc会降低一点，但是，不滥用的情况下，性能的损耗其实影响不会很大，可以放心使用。  

**3. -webkit-overflow-scrolling属性**  
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

**4. clip:rect(A,B,C,D) 属性**  
clip 属性剪裁绝对定位元素。也就是说，只有 position:absolute 的时候才是生效。
```css
img{
  position:absolute;
  clip:rect(0px,60px,200px,0px);
}

/*-------*/
img{
  position:absolute;
  clip:rect(A,B,C,D);
}
/*
  当然具体写的时候得写具体的像素值。

  这个图的作用是，说明这4个值到底指的是那个距离。

  A-上边框：剪裁矩形上边框距离父元素顶部的长度。

  B-右边框：剪裁矩形右边框距离父元素左边的长度。

  C-下边框：剪裁矩形下边框距离父元素顶部的长度。

  D-左边框：剪裁矩形左边框距离父元素左边的长度。
*/
```

**5. pointer-events 属性**
* >非SVG情况：  
  属性值支持=>`none`、`auto`
* > SVG情况:  
  属性值支持=> `visiblePainted` | `visibleFill` | `visibleStroke` | `visible` | `painted` | `fill` | `stroke`| `all`

[☞pointer-events 使用介绍](https://www.jianshu.com/p/1132f5b0e32c)

**6.prefers-reduced-motion属性**  
CSS 媒体查询特性 prefers-reduced-motion 用于检测用户的系统是否被开启了动画减弱功能。
* `no-preference` 用户未修改系统动画相关特性。
* `reduce`这个值意味着用户修改了系统设置，将动画效果最小化，最好所有的不必要的移动都能被移除。

**7.filter-drop**  
backdrop-filter CSS 属性可以让你为一个元素后面区域添加图形效果（如模糊或颜色偏移）。 因为它适用于元素背后的所有元素，为了看到效果，必须使元素或其背景至少部分透明。  
```css
/* 关键词值 */
backdrop-filter: none;

/* 指向 SVG 滤镜的 URL */
backdrop-filter: url(commonfilters.svg#filter);

/* <filter-function> 滤镜函数值 */
backdrop-filter: blur(2px);
backdrop-filter: brightness(60%);
backdrop-filter: contrast(40%);
backdrop-filter: drop-shadow(4px 4px 10px blue);
backdrop-filter: grayscale(30%);
backdrop-filter: hue-rotate(120deg);
backdrop-filter: invert(70%);
backdrop-filter: opacity(20%);
backdrop-filter: sepia(90%);
backdrop-filter: saturate(80%);

/* 多重滤镜 */
backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);

/* 全局值 */
backdrop-filter: inherit;
backdrop-filter: initial;
backdrop-filter: unset;
```

**8. min-content属性**    

```css
  .modal-dialog-centered::before {
    height: calc(100vh - 3.5rem);
    height: -webkit-min-content;
    height: -moz-min-content;
    height: min-content;
  }
```

**9. touch-action属性**  
CSS属性 touch-action 用于设置触摸屏用户如何操纵元素的区域(例如，浏览器内置的缩放功能)。
* `auto` 当触控事件发生在元素上时，由浏览器来决定进行哪些操作，比如对viewport进行平滑、缩放等。   
* `none` 当触控事件发生在元素上时，不进行任何操作。   
* `pan-x` 启用单指水平平移手势。可以与 pan-y 、pan-up、pan-down 和／或 pinch-zoom 组合使用。   
* `pan-y` 启用单指垂直平移手势。可以与 pan-x 、pan-left 、pan-right 和／或 pinch-zoom 组合使用。   
* `manipulation` 浏览器只允许进行滚动和持续缩放操作。任何其它被auto值支持的行为不被支持。 启用平移和缩小缩放手势，但禁用其他非标准手势，例如双击以进行缩放。 禁用双击可缩放功能可减少浏览器在用户点击屏幕时延迟生成点击事件的需要。 这是“pan-x pan-y pinch-zoom”（为了兼容性本身仍然有效）的别名。     
* `pan-left, pan-right, pan-up, pan-down`启用以指定方向滚动开始的单指手势。 一旦滚动开始，方向可能仍然相反。 请注意，滚动“向上”（pan-up）意味着用户正在将其手指向下拖动到屏幕表面上， 同样 pan-left 表示用户将其手指向右拖动。 多个方向可以组合， 除非有更简单的表示（例如，“pan-left pan-right”无效，因为“pan-x”更简单，而“pan-left pan-down”有效）。 
* `pinch-zoom` 启用多手指平移和缩放页面。 这可以与任何平移值组合。

最常见的用法是禁用元素（及其不可滚动的后代）上的所有手势，以使用自己提供的拖放和缩放行为（如地图或游戏表面）。 
```css
#map {
  touch-action: none;
}
```

另一种常见的模式是使用指针事件处理水平平移的图像轮播，但不想干扰网页的垂直滚动或缩放。  
```css
.image-carousel {
  width: 100%;
  height: 150px;
  touch-action: pan-y pinch-zoom;
}
```

触摸动作也经常用于完全解决由支持双击缩放手势引起的点击事件的延迟。  
```css
html {
  touch-action: manipulation;
}
```

## 🛠bootstrap js 源码阅读

Bootstrap4 的js使用ES6编写，按照组件模块进行份文件编写，其文件结构如下:  
```js
import Alert from './alert'
import Button from './button'
import Carousel from './carousel'
import Collapse from './collapse'
import Dropdown from './dropdown'
import Modal from './modal'
import Popover from './popover'
import Scrollspy from './scrollspy'
import Tab from './tab'
import Toast from './toast'
import Tooltip from './tooltip'
import Util from './util'

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.5.0): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

export {
  Util,
  Alert,
  Button,
  Carousel,
  Collapse,
  Dropdown,
  Modal,
  Popover,
  Scrollspy,
  Tab,
  Toast,
  Tooltip
}

```
### 🎈util.js
定义了很多工具函数。
* `toType`：通过`Object.prototype.toString.call('obj')` 返回对象的类型。
* `~~(Math.random() * MAX_UID)` 前面2个波浪号对数值向下取整，1个波浪号转为负数向下取整，比使用Math.floor速度更快。

