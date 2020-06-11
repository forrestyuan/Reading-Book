<!-- TOC -->

- [✈深入浅出React和Redux 学习](#✈深入浅出react和redux-学习)
- [1. 特点](#1-特点)
- [2. 基础](#2-基础)
  - [一、起步前置条件](#一起步前置条件)
    - [① 安装](#①-安装)
    - [②组件声明](#②组件声明)
    - [3、state,props](#3stateprops)
    - [4、生命周期](#4生命周期)
    - [5、事件](#5事件)
  - [二、JSX](#二jsx)
  - [三、注意](#三注意)
- [3. 设计高质量的React 组件](#3-设计高质量的react-组件)
- [4. redux](#4-redux)
  - [🖊 Action](#🖊-action)
  - [🖊Reducer](#🖊reducer)
  - [🖊Store](#🖊store)

<!-- /TOC -->
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
在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 。React里的event是合成事件，不存在兼容性问题。



## 二、JSX
React 中使用jsx来编写组件。在jsx中，由于jsx更接近Javascript,所以react Dom使用小驼峰命名来定义属性的名称。例如：class变成className.而tabindex变成tabIndex。JSX会被Babel转译成React.createElement()函数调用


## 三、注意

- 用bind()方法重新绑定this  
这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。
用箭头函数解决
 
- HTML 表标签属性（label的 for -> htmlFor, class属性 -> className）
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


***

# 4. redux
![React Redux](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/redux.jpg)

安装：
```bash
npm install --save redux
# 附加包：
npm install --save react-redux
npm install -D react-devtools
```
* **三大原则：**
> 1. 单一数据源：整个应用的state被储存在一颗object tree中，并且这个object tree只存在于唯一一个stroe中。
> 2. State是只读的：唯一改变state的方法就是触发action，action是一个用于描述已发生事件的对象。
> 3. 使用纯函数来执行修改： 为了描述action如何改变state，需要编写reducers。

* **要点:** 
  应用中所有的state都已一个对象树的形式储存于一个单一的store中。唯一改变state的方法是触发action（一个描述发生什么的对象）。为了描述action如何改变state树，你需要编写reducer。    

```js
  import { createStore } from 'redux'
 /**
  * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
  * 描述了 action 如何把 state 转变成下一个 state。
  *
  * state 的形式取决于你，可以是基本类型、数组、对象、
  * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
  * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
  *
  * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
  * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
  */
  function counter(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }

  // 创建 Redux store 来存放应用的状态。
  // API 是 { subscribe, dispatch, getState }。
  let store = createStore(counter)

  // 可以手动订阅更新，也可以事件绑定到视图层。
  store.subscribe(() => console.log(store.getState()))

  // 改变内部 state 惟一方法是 dispatch 一个 action。
  // action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
  store.dispatch({ type: 'INCREMENT' })
  // 1
  store.dispatch({ type: 'INCREMENT' })
  // 2
  store.dispatch({ type: 'DECREMENT' })
  // 1
```

## 🖊 Action

Action 是把数据从应用（译者注：这里之所以不叫 view 是因为这些数据有可能是服务器响应，用户输入或其它非 view 的数据 ）传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

* 本质是JS普通对象
* 约定action内使用一个字符串类型（通常用常量来表示）的type字段表示将要执行的动作。
* 除了type字段外，action对象的结构完全由你自己决定。

通常我们通过Action创建函数来返回一个action。易于移植和测试。在传统的Flux实现中，当调用action创建函数时，一般会触发一个dispactch。
```js
  function addTodoWithDispatch(text){
    const action = {
      type: ADD_TODO,
      text
    }
    dispatch(action);
  }
```
Redux中只需要把action创建函数的结果传给dispatch()方法即可发起一次dispatch过程。
```js
  dispatch(addTodo(text));
  dispatch(completeTodo(index));
```
或者创建一个被绑定的action创建函数
```js
  const boundAddTodo = text => dispatch(addTodo(text));
  //调用
  boundAddTodo(text);
```

store里能够通过store.dispatch()调用dispatch()方法，但是多数情况下我们会使用`react-redux`提供的connect()帮助器来调用。通过`bindActionCreators()`可以自动把多个action创建函数绑定到dispatch()方法上。

## 🖊Reducer
Reducers指定了应用状态的变化如何响应actions并发送到store的。
* reducer 是要一个纯函数，接受旧的state和action，返回新的state
* 不要在reducer中：1，修改传入参数。2，执行有副作用的操作，如api请求或路由跳转 3，调用非纯函数，如Date.now()

Redux 提供了combineReducers()工具类来整合所有reducer.

## 🖊Store

Store把Action和reducer联系到一起。
* 维持应用的state
* 提供getState()方法获取state
* 提供dispatch(action)方法更新state
* 通过subscribe(listener)注册监听器
* 通过subscribe(listener)返回的函数注销监听器。

```js
  import  {createStore} from 'redux'
  import todoApp from './reducers'
  let store = createStore(todoApp)

```

**传入Store**:  
所有容器组件都可以访问Redux store, 所以可以手动监听它。一种方式是把它以props的形式传入到所有容器组件中。但这太麻烦了，因为必须要用store把展示组件包裹一层，仅仅是因为恰好在组件树中渲染了一个容器组件。建议使用<Provider>来让所有容器组件都可以访问store，而不必显示的传递它。只需要在渲染根组件时使用即可。

```js
  import React from 'react'
  import {render} from 'react-dom'
  import {Provider} from 'react-redux'
  import {createStore} from 'redux'
  import todoApp from './reducers'
  import App from './components/App'

  let store = createStore(todoApp);

  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
  )
```