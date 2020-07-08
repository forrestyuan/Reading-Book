# H5 related

### 盒模型
HTML 文档中的每个元素都可以被描绘成矩形盒子，这些矩形盒子通过一个模型来描述其占用的空间，这个模型称为标准盒模型。盒模型通过四个边界来呈现元素的大小：margin（外边距）、border（边框）、padding（内边距）、content（内容区域）

### CSS 或 srcset 让浏览器自动切换 1X/2X/3X 图像
1. 媒体查询
  ```scss
  @mixin bg-image($url) {
    background-image: url($url + "@2x.png");
    @media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
      background-image: url($url + "@3x.png")
    }
  }

  div{
    width:30px;
    height:20px;
    background-size:30px  20px;
    background-repeat:no-repeat;
    @include bg-image('special_1');     
  }
  ```
2. image-set  样式属性  
可以根据用户设备的分辨率匹配合适的图像。
![imgset](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/imgset.JPG)
```css
div {
  background-image: url(test.png);
  background-image:-webkit-image-set( url(test.png) 1x, url(test-2x.png) 2x );
}
```
3. srcset 标签属性
```html
<img width="100" height="100" src="image100.png" srcset="image200.png 2x,image300.png 3x"/>
```

### 响应式页面开发
#### 1. 步骤一：添加 viewport meta 标签  

在页头head标签内添加 viewport meta 标签是实现响应式页面的第一步。   
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
### 2. 步骤二：使用 Media Queries  

参数名称|参数描述
-------|-------
min-width|	当视窗宽度大于或等于指定值时，@media 规则下的样式将被应用
max-width	|当视窗宽度小于或等于指定值时，@media 规则下的样式将被应用
min-height|	当视窗高度大于或等于指定值时，@media 规则下的样式将被应用
max-height|	当视窗高度小于或等于指定值时，@media 规则下的样式将被应用
orientation=portrait|	当视窗高度大于或等于宽度时，@media 规则下的样式将被应用
orientation=landscape|	当视窗宽度大于高度时，@media 规则下的样式将被应用

```css
@media (max-width: 640px) {
  /*当视窗宽度小于或等于 640px 时，这里的样式将生效*/
}
```
**样式断点:**  
断点名称|	断点描述
-------|--------
mobile	|移动设备断点，视窗宽度 ≤ 768 px
tablet	|平板电脑设备断点，视窗宽度 ≥ 769 px
desktop	|桌面电脑断点，视窗宽度 ≥ 1024 px
widescreen|	宽屏电脑断点，视窗宽度 ≥ 1216 px
fullhd	|高清宽屏电脑断点，视窗宽度 ≥ 1408 px

在实际工作中，「样式断点」的制定需要我们同视觉设计师一起沟通确认，因为视觉设计师可能需要根据不同的断点为页面设计不同的视觉表现。

### 3. 步骤三 - 使用 Viewport 单位及 rem  

Media Queries 只解决了「为不同特性的浏览器视窗使用不同的样式代码」的问题，而 Viewport 单位及 rem 的应用，则是为了解决第二个问题：让页面元素的尺寸能够依据浏览器视窗尺寸变化而平滑变化。

**方法 1 - 仅使用 vw 作为 CSS 长度单位**  
在仅使用 vw 单位作为唯一 CSS 单位时，我们需遵守：  
1. 利用 Sass 函数将设计稿元素尺寸的像素单位转换为 vw 单位
```scss
// iPhone 6尺寸作为设计稿基准
$vw_base: 375; 
@function vw($px) {
    @return ($px / $vm_base) * 100vw;
}
```
2. 无论是文本字号大小还是布局高宽、间距、留白等都使用 vw 作为 CSS 单位
```scss
.mod_nav {
    background-color: #fff;
    &_list {
        display: flex;
        padding: vw(15) vw(10) vw(10); // 内间距
        &_item {
            flex: 1;
            text-align: center;
            font-size: vw(10); // 字体大小
            &_logo {
                display: block;
                margin: 0 auto;
                width: vw(40); // 宽度
                height: vw(40); // 高度
                img {
                    display: block;
                    margin: 0 auto;
                    max-width: 100%;
                }
            }
            &_name {
                margin-top: vw(2);
            }
        }
    }
}
```
3. `1 物理像素线`（也就是普通屏幕下 1px ，高清屏幕下 0.5px 的情况）采用 transform 属性 scale 实现
```scss
.mod_grid {
    position: relative;
    &::after {
        // 实现1物理像素的下边框线
        content: '';
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #ddd;
        height: 1px;
        left: 0;
        right: 0;
        top: 0;
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            -webkit-transform: scaleY(0.5);
            -webkit-transform-origin: 50% 0%;
        }
    }
    ...
}
```
4. 对于需要保持高宽比的图，应改用 padding-top 实现  
```scss
.mod_banner {
    position: relative;
    // 使用padding-top 实现宽高比为 100:750 的图片区域
    padding-top: percentage(100/750);
    height: 0;
    overflow: hidden;
    img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
    }
}

```

**方法 2 - vw 搭配 rem，寻找最优解**  
方法 1 实现的响应式页面虽然看起来适配得很好，但是你会发现由于它是利用 Viewport 单位实现的布局，依赖于视窗大小而自动缩放，无论视窗过大还是过小，它也随着视窗过大或者过小，失去了最大最小宽度的限制，有时候不一定是我们所期待的展示效果。试想一下一个 750px 宽的设计稿在 1920px 的大屏显示器上的糟糕样子。

当然，你可以不在乎移动端页面在 PC 上的展现效果，但如果有低成本却有效的办法来修复这样的小瑕疵，是真切可以为部分用户提升体验的。

我们可以结合 rem 单位来实现页面的布局。rem 弹性布局的核心在于根据视窗大小变化动态改变根元素的字体大小，那么我们可以通过以下步骤来进行优化：  
* 给根元素的字体大小设置随着视窗变化而变化的 vw 单位，这样就可以实现动态改变其大小
* 其他元素的文本字号大小、布局高宽、间距、留白都使用 rem 单位
* 限制根元素字体大小的最大最小值，配合 body 加上最大宽度和最小宽度，实现布局宽度的最大最小限制
```scss
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}
// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}

```


### css3 动画
**css3d**  
    在dom结构上需要一个 场景（playground） + 容器(wrapper) + 3d元素(wrapper>div)  
  1. 设置persepective
    可以在父元素（playgrond）上设置persepective 或者在子元素（wrapper）上设置transform:persepective()
  2. 设置transform-style:preserve-3d
    在子元素wrapper上设置transform-style， 设置transform-origin等相关
  3. 对3d元素做相应的变换设置，达到需要的视觉效果
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .playgrond{position: relative;display: flex;justify-content: center;align-items: center;width:800px;height: 800px;margin:0 auto;}
    .wrapper{
      display:flex;justify-content: center;align-items: center;position: relative;width:400px;height:400px;
      transform-style: preserve-3d;transform-origin: center center 100px;transform:perspective(10000px) rotate3d(1,0,0,0);transition:all linear 5s;/*变换相关设置*/
    }
    .playgrond:hover .wrapper{transform:perspective(10000px) rotate3d(1,0,0,180deg);}
    .wrapper div{position: absolute;width:200px;height:200px;text-align: center;line-height: 200px;font-weight: 700;font-size: 30px;color: #fff;transition:all linear 2s;transform-origin: center center 100px; }
    .wrapper div:nth-child(1){background-color:red;transform:rotateY(0deg);}
    .wrapper div:nth-child(2){background-color: blueviolet;transform: rotateY(90deg);}
    .wrapper div:nth-child(3){background-color: rgb(0, 102, 255);transform: rotateY(180deg);}
    .wrapper div:nth-child(4){background-color: darkgoldenrod;transform: rotateY(270deg);}
    .wrapper div:nth-child(5){background-color:coral;transform: rotateX(90deg);}
    .wrapper div:nth-child(6){background-color: darkslategrey;transform: rotateX(-90deg);}
    .wrapper div b{display: inline-block;transform: rotateY(180deg) }

  </style>
</head>
<body>
  <main class="playgrond">
    <div class="wrapper">
      <div><b>1</b></div>
      <div><b>2</b></div>
      <div><b>3</b></div>
      <div><b>4</b></div>
      <div><b>5</b></div>
      <div><b>6</b></div>
    </div>
  </main>
</body>
</html>
```
**perspective概念理解**  
