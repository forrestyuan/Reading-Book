<!-- TOC -->

- [1. redux](#1-redux)
  - [1.1. 🚗什么情况下使用redux？](#11-🚗什么情况下使用redux)
  - [1.2. 🚗Redux的核心API。](#12-🚗redux的核心api)
    - [1.2.1. 🚲createStore()](#121-🚲createstore)
    - [1.2.2. 🚲sotre对象](#122-🚲sotre对象)
    - [1.2.3. 🚲applyMiddleware()](#123-🚲applymiddleware)
    - [1.2.4. 🚲combineReducers()](#124-🚲combinereducers)
  - [1.3. 🚗redux的三个核心概念](#13-🚗redux的三个核心概念)
    - [1.3.1. 🚲action](#131-🚲action)
    - [1.3.2. 🚲reducer](#132-🚲reducer)
  - [🆒问题](#🆒问题)
    - [🚲 react-redux](#🚲-react-redux)
- [自己实现createStore](#自己实现createstore)

<!-- /TOC -->
# 1. redux 
* redux 是专门做状态管理的独立第三方库，不是react独有的插件，但一般都在react项目中使用  
* 对应用中状态进行集中式管理。
* 与react-redux, react-thunk搭配使用。

![redux](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/redux.png)  

## 1.1. 🚗什么情况下使用redux？
* 总体原则，能不用就不用，如果不用比较吃力才考虑使用。
* 某个组件的状态需要共享。
* 某个状态需要在任何地方都可以拿到。
* 一个组件需要改变全局状态。
* 一个组件需要改变另一个组件的状态。

## 1.2. 🚗Redux的核心API。
介绍四个：createStore()、store对象、applyMiddleware()、combineReducers();
### 1.2.1. 🚲createStore()
接收的参数为reducer函数，返回为store对象  
创建包含指定reducer的store对象。  
创建store对象内部会第一次调用reducer()的到初始状态值
```js
import {createStore} from 'redux'
//reducer 提供数据
import counter from './reducers/counter'
//将数据交给store
const store = createStore(counter)
```
### 1.2.2. 🚲sotre对象
1. 作用：redux最核心的管理对象
2. 内部维护者： `state` 和 `reducer`
3. 核心方法： `getState()`, `dispatch(action)`, `subscribe(listener)`
4. 编码：
  * `store.getState()`
  * `store.dispatch({type:"INCREMENT", number})`
  * `store.subscripbe(render)`
> 给store绑定状态更新的监听
> store 内部的状态数据发生改变时回调
```js
 store.subscribe(()=>{
   ReactDOM.render(<App store={store}, document.getElementById("root")/>)
 })
```
### 1.2.3. 🚲applyMiddleware()
1. 作用： 应用上基于redux的中间件（插件库）
2. 编码：
```js
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const store = createStore(
  counter,
  applyMiddleware(thunk)//应用上异步中间件
)
```

### 1.2.4. 🚲combineReducers()
接受包含n个reducer方法的对象，返回一个新的reducer函数  
1. 作用：合并多个reducer
2. 编码：
```js
function user(state={}, action){}
function cahtUser(state={}, action){}
export default combineReducer({
  user,
  chatUser,
})
```
## 1.3. 🚗redux的三个核心概念
三个核心概念包括： action、reducer、store

### 1.3.1. 🚲action
1. 标识要执行行为的对象
2. 包含2个方面的属性：
  * type: 标识属性，值为字符串，唯一， 必要属性
  * xxx:数据属性，值为任何类型，可选属性
3. 例子：
```js
const action = {
  type:"INCREMENT",
  data:2
}
```
4. Action Creator(创建Action的工厂函数)
```js
const increment = number => ({type:"INCREMNET", data:number})
```
### 1.3.2. 🚲reducer
1. 根据老的state和action，产生新的state的纯函数
2. 样例：
```js
 export default function counter(state = 0, action){
   switch(action.type){
     case "INCREMENT": return state + action.data;
     case "DECREMENT": return state - action.data;
     default: return state;
   }
 }
```
## 🆒问题
1. 与react代码耦合都高。
2. 编码不够简洁
3. redux 默认不支持异步
### 🚲 react-redux
一个react插件库，专门用来简化react应用中使用redux  
**相关API**
  * provider
    ```js
    //让所有组件都可以得到state数据
    <Provider store={store}>
      <App/>
    </Provoider>
    ```
  * connect()
    ```js
      //用于包装UI组件生成容器组件,向UI组件传入特定的属性
      connect(
        mapStateToProps,
        mapDispatchProps
      )(Counter)
    ```
  ### 🚲redux-thunk
  一个用于实现redux异步的插件。

```js
import {createStore, applyMidlleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducer.js'

export default createStore(reducer,applyMiddleware(thunk))

```

# 自己实现createStore
```js
//根据指定的reducer函数创建一个store对象并返回
export function createStore(reducer){
  //用来存储内部状态数据的变量,初始值为调用reducer函数返回的结果（外部指定的默认值）
  let state = reducer(undefined, {type:'@@redux/init'})
  //用来存储监听state更新回调函数的数组容器
  const listeners = [];
  // 返回当前内部的值
  function getState(){
    return state;
  }
  //分发action，触发reducer调用，产生新的state
  // 保存新的state
  // 调用所有已存在的监听回调函数
  function dispatch(action){
    const newState = reducer(state,action);
    state = newState;
    listeners.forEach(listener => listener())
  }
  //绑定内部state改变的回调
  function  subscribe(listener){
    listeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}

export function combineReducers(reducers){
  //返回一个新的总状态
  return (state={}, action)=>{
    const totalState = {};
    Object.keys(reducers).forEach(key => {
      totalState[key] = reducers[key](state[key],action);
    })
    return totalState;
  }

}
```