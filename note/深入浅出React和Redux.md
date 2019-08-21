# ✈深入浅出React和Redux 学习
> 我热爱React，也热爱Vue，React是灵魂，Vue是精神。
> 
# 1. 特点
React 的理念，归结为一个公式，就如：  
> UI = render(data)
用户看到的界面UI应该是一个函数（在这里叫render）执行的结果，只接受数据作为参数。这个函数是一个纯函数。
> 纯函数： 指的是没有任何副作用，输出完全依赖输入的函数，两次函数调用如果输入相同，得到的结果也绝对相同。

* ❤ 声明式
对比命令式。  
**声明式：** 就是只告诉程序想要什么结果，如何达成有程序保证，开发者不关心.如vue，react  
**命令式：** 一步一步告诉程序如何做，能否达成取决于开发者的设计。如jquery 数据变更操作Dom
* ❤ 组件化
  每个组件都是独立的，拥有各自的状态。

* Virtual DOM
Web前端开发关于性能优化有一个原则：尽量减少DOM操作。Virtual DOM 就是对DOM树的抽象。Virtual DOM 不会触及浏览器的部分，只是存在于内存中的树形结构，每次自上而下渲染React组件时，会对比这一次产生的Virtual DOM 和上一次渲染的Vitual DOM, 进行差异对比。





# 2. 基础
## 一、起步前置条件
- 基本熟悉HTML 和 CSS
- Javascript和编程的基础认识
- 对Dom的基本了解
  - Dom的渲染，Dom的结构....
- 熟悉ES6语法和功能
- NodeJS和npm
### ① 安装
- 可以使用script标签  
```html
  <!-- react 核心库，包含生成虚拟dom等核心-->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <!-- react-dom 主要用来将虚拟dom 变成实际的dom -->
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
  <!-- 解析JSX -->
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```
- 使用create-react-app脚手架构建项目目录。  
```bash
#1、安装脚手架包
npm install -g create-react-app
#2、创建项目
npx create-react-app todolist
#或者
create-react-app todolist
#3、运行
cd todolist
npm run start

```
### ②组件声明
- 纯函数
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
- ES6 class
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- createReactClass()方法
```jsx
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```

- 最新的使用ReactHook 👍
```jsx
  import React,{useState, useEffect} from 'react';
  function Counter(){
    let [count, setCount] = useState(0);
    return (
      <div>{{count}}</div>
      <button onClick = {()=>{setCount(count + 1)}}>click me to add</button>
    )
  }
```

### 3、state,props
- props
  - 声明默认props
    - 纯函数和ES6默认有defaultProps 
    - createReactClass()方法声明的组件则需要使用 getDefaultProps()
- state
  - 初始化state
    - ES6默认this.state
    - createReactClass()方法使用getInitialState()
    - 纯函数没有状态
  
### 4、生命周期
  ![React 生命周期](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/Reactlifecycle.png)

### 5、事件
在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：



## 二、高频
- render()方法
- JSX
1、JSX会被Babel转译成React.createElement()函数调用
- this.props

## 三、注意

- 用bind()方法重新绑定this  
这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。
用箭头函数解决
 
- HTML 表标签属性（label的 for -> htmlFor, class属性 -> className）
- JSX中的属性和方法是驼峰式命名（onclick -> onClick）
- 自动关闭标签必须要以斜线结尾(`<img/>`)
- 改变状态要用 this.setState(),可以传入对象或方法为参数,第二个参数为回调函数，this.setState为一个异步执行的函数，当多次执行this.setState,只会执行一次

- 自定义组件命名必须要大写字母开头
- key 不要用数组下标，因为如果数组下标改变，会导致diff算法性能降低。

> 注意：1、类组件必须包括render()。2、return 一个父元素 3、当返回的内容有多行是要用括号（）包裹。

# 3. 设计高质量的React 组件

> 合格的程序员不要只满足于编写出了可以运行的代码，而要了解代码背后的工作原理；

组件的划分要满足高内聚和低耦合的原则。  
**高内聚：** 指的是把逻辑紧密相关的内容放在一个组件中。
**低耦合：** 指的是不同组件之间的依赖关系要尽量弱化，也就是每个组件都要尽量独立。

> 差劲的程序员操心代码，优秀的程序员操心数据结构和他们之间的关系。

React组件的数据分为两种 props 和 state。这两者中任何一者的改变都将导致组件的重新渲染。
props是组件的对外接口，state是组件的内部状态。
* props用于定义外部接口，state用于记录内部状态
* props的赋值在外部使用组件时，state赋值在组件内部。
* 组件不应该改变props的值。

**propTypes 检查：**  

```js
  Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    tagNum：PropTypes.number
  };
```
propTypes虽然能够在开发阶段发现代码中的问题，但是放在产品环境中就不大合适了。在发布产品代码时用一种自动的方式将propTyps去掉，使用babel-react-optimize就具有这个功能。

## 组件向外传递数据