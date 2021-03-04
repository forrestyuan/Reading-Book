**React Hook 视频学习笔记**
**状态是什么**  
* 状态有一个隐含的意思，就是存在改变状态的行为
----
**如何描述UI**  
* 数据 > 视图 > 行为（包含异步行为） > 数据
* 不变的是属性，变化的是状态
* 状态影射了行为，因此行为可以封装在状态内
----
**3个基础的hook：状态，作用，上下文**
1. 状态：在某个上下文中（用户界面）数据和改变数据的行为
```js
//计数器例子
const [count, setCount] = useState(0)
//      状态    行为         hooks api
// 数据和行为进行了绑定
```
2. 作用：  
  * 客观世界有url，计时器，logger等等我们做不到完美而纯净的视图渲染
  * 相同（或类似）的作用如何进行复用，react团队提出了useEffect
```js
// 读作： 依赖count变化的作用
useEffect(()=>{
  console.log(count)
}, [count])
```
3. 上下文： 
```js
import React, { useContext, useState } from 'react'
const theme = {
  light: {
    forground: "#ffffff",
    background: "#eeeeee",
  },
  dark: {
    forground: "#ffffff",
    background: "#222222",
  }
}

const ThemeContext = React.createContext({
  theme: themes.light,
  toggle: () => {}
})

export default () => {
  const [theme, setTheme] = useState(themes.light)
  return (
    <ThemeContext.Provider
      theme,
      toggle: () => {
        setTheme(theme => {
          setTheme(theme === themes.light ? themes.dark : themes.light)
        })
      }
    >
      <Toolbar />
    </ThemeContext.Provider>
  )
}

const Toolbar = () => {
  return <ThemedButton />
}

cosnt ThemedButton = () => {
  const context = useContext(ThemeContext)
  return (
    <button
      style={{
        color: context.theme.forground,
        backgroundColor:context.theme.background
      }}
      onClick = {() => context.toggle()}
    > 
      Click me 
    </button>
  )

}
```

----
**reducer**
（设计模式） 提供一种抽象状态行为的通用封装（action），以及计算过程的抽象方案（reducer）  
* useReducer
```js
import React,{ useReducer} from 'react'
function reducer(state, action){
  case 'add':
    return {
      count: state.count + 1
    }
  case 'sub':
    return {
      count: state - 1
    }
  default:
    throw '---'
}

export default function Counter(){
  const [counter, dispatch] = useReducer(reducer, {count: 0})
  return (
    <div>
      your count is: {counter.count}
      <button onClick = {()=> dispatch({type:'add'})}>Add</button>
      <button onClick = {()=> dispatch({type:'sub'})}>SUb</button>
    </div>
  )
}
```
----
**引用行为ref**
* 引用React管理以外的对象
* 附带作用： 方便保存值
```js
import React, {useRef} from 'react'
export default function UseRefExample() {
  const refInput = useRef()
  return(
    <div>
      <input ref ={refInput}/>
      <button onClick = {()=>{refInput.current.focus()}}>Focus</button>
    </div>
  )
}
```
----
**缓存**
* 缓存一个函数（useCallback）
* 缓存一个值（useMemo）
```js
const UseMemoExample = () => {
  const [count, setCount] = useState(0)
  const memorizedText = useMemo(() => {
    console.log('run useMemo funciton')
    return `this is a memorized text ${Date.now()}`
  },[Math.floor(count / 10)])
  return (
    <div>
      {memeorizedText}
      <p>you clicked { count }  times</p>
      <button onClick = {()=>setCount(count + 1)}>Add</button>
    </div>
  )
}

export default ()=>{
  const [count, setCount] = useState(0)
  const add = useCallback(()=>{
    setCount(x => x + 1)
  }, [])
  return (
    <div>
      {count}
      <button onClick={add}>
        Add
      </button>
    </div>
  )
}
```
----
**建议**
1. 使用react.memo减少重绘次数
2. hooks同步问题
3. 可以构造自己的hooks封装行为
4. 不要再思考生命周期


----
**实践：拖拽列表**
![react-hook](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/react-hook.png)

> APP.js
```js
//APP.js
import React, {} from 'react'
import './styles.css
import useDraggable from './useDraggable'
const list = [{src:'',title:'吃吃吃'}]
export default function App(){

}
function DraggableList({list}){
  const {dragList} = useDraggable(list)
  return dragList.map((itme, i) => {
    if(item.type === "BAR"){
      return <Bar id={i} key={item.id} />
    }else{
      return (
        <Draggable key={item.id}>
          <Card {...item.data} />
        </Draggable>
      )
    }
  })
  
  <div className='draggable-list'>
    
  </div>
}
//list
//Draggable
//Bar
//
function Draggable({children}){
  return <div draggable={true} className='draggable'>{children}</div>
}

function Bar(){
  return <div className="draggable--bar"></div>
}

function Card({src, title}){
  return <div className="card">
    <img src={src}/>
    <span>{title}</span>
  </div>
}
```
> useDraggable.js
```js
//useDraggable.js
import {useState} from 'react'
const BAR = "BAR"
const DRAGGABLE = "DRAGGABLE"
function draggable(item, id){
  return {
    type: DRAGGABLE,
    id,
    data: item
  }
}
function insertBars(list){
  let i  = 0;
  const newBar = () => {
    return {
      type: BAR,
      type: i++
    }
  }
  return [newBar()].concat(
    ...list.map(item => {
      return [draggable(item, id++), newBar()]
    })
  )
}
function useDraggable(list){
  cosnt [dragList, setDragList] = useState(() => {
    return insertBars(list)
  })

  const [dragOver, setDragOver] = useState(null)
  const [dragging, setDragging] = useState(null)

  return {
    dragList,
    createDropperProps: id => {
      return {
        id,
        key: id,
        dragging,
        dragOver,
        eventHandlers:{
          onDragOver:(e) =>{
            e.preventDefault()
            setDragOver(id)
          },
          onDragLeave:(e) =>{
            e.preventDefault()
            setDragOver(null)
          },
        }
      }
    }
    createDraggerProps: id => {
      return {
        id,
        key:id,
        dragging,
        eventHandlers: {
          onDragStart: () =>{
            setDragging(id)
          },
          onDragEnd:() =>{
            setDragging(null)
          }
        }
      }
    }
  }
}

export default useDraggable
```

```css
/*styles.css*/
.App{
  font-family: sans-serif;
  text-align: center;
}
.draggable--bar{
  padding: 10px;
}
.card {
  display:flex;
  align-items: center;
  padding:10px;
  box-shadow: grey 1px 2px 3px;
  cursor: pointer;
  user-select:none
}
.card img{
  border-radius:36px;
  width:72px;
  height:72px;
}

.card span{
  margin-left:20px
}
```