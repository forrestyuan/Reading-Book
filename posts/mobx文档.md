# mobx
[现代前端框架响应模型对比: Vue, Mobx, React, Redux](https://juejin.cn/post/6929727475304005639/)
## 1. 安装
Mobx适用于什么es5环境，包括浏览器和nodejs.

## 2.  Mobx的宗旨
1. 使用action更新state  
建议您将任何更改observable的代码标记为Action。通过这种方式，MobX可以自动应用事务，轻松获得最佳性能。

2. 派生derivation
MobX区分了两种派生：
Computed，始终可以使用纯函数从当前可观察状态导出  
Reactions，当状态改变时需要自动发生的副作用（命令式编程和反应式编程之间的桥梁）  
当开始使用MobX时，人们往往会过度使用反应。黄金法则是，如果要基于当前状态创建值，请始终使用“Computed”。
```js
get unfinishedTodoCount() {
  return this.todos.filter(todo => !todo.finished).length
}
```
Reaction类似于Computed，但它们不会产生信息，而是产生副作用，如打印到控制台、发出网络请求、增量更新反应组件树以修补DOM等。  
到目前为止，最常用的Reaction形式是UI组件。注意，动作和反应都可能引发副作用。副作用有一个清晰、明确的来源，可以从中触发，例如在提交表单时发出网络请求，应该从相关事件处理程序显式触发.  

如果您使用的是React，则可以使用安装期间选择的绑定包中的observer函数包装组件，从而使组件成为被动组件。在本例中，我们将使用更轻量级的mobx-react-lite包。
```js
import * as React from "react"
import { render } from "react-dom"
import { observer } from "mobx-react-lite"

const TodoListView = observer(({ todoList }) => (
  <div>
    <ul>
      {todoList.todos.map(todo => <TodoView todo={todo} key={todo.id} />)}
    </ul>
    Tasks left: {todoList.unfinishedTodoCount}
  </div>
))

```

## 3. actions
1. 使用runInAction(()=>{})这个工具函数来创建一个会被立即调用的临时 action。在异步进程中非常有用。
2. 异步 actions  
从本质上讲，异步进程在 MobX 中不需要任何特殊处理，因为不论是何时引发的所有 reactions 都将会自动更新。 而且因为可观察对象是可变的，因此在 action 执行过程中保持对它们的引用一般是安全的。 然而，在异步进程中更新可观察对象的每个步骤（tick）都应该被标识为 action。我们可以通过利用上述的 API 以多种方式实现这一点，如下所示。  
例如，在处理 Promise 时，更新 state 的处理程序应该被 action 包装起来，或者被标记为 actions，如下所示。

await 之后的任何操作都不与其同在一个 tick 中，因此它们需要使用 action 包装。 在这里，我们可以利用 runInAction：
```js
import { runInAction, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            //使用runInAction
            runInAction(() => {
                this.githubProjects = filteredProjects
                this.state = "done"
            })
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```

3. 禁用强制性 action {🚀}  
默认情况下，MobX 6 和更高版本会要求您使用 action 来更改 state。 然而，你可以配置 MobX 来禁用这个行为。查看 enforceActions。 例如，这在单元测试场景中非常有用，因为警告并不总是很有价值。

## 4.通过 computeds 派生信息
计算值可以用来从其他可观察对象中派生信息。 计算值采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变时才会重新计算。 它们在不被任何值观察时会被暂时停用。

从概念上讲，它们和电子表格中的公式非常相似，并且作用强大、不可被低估。它们可以协助减少你需要存储的状态的数量，并且是被高度优化过的。请尽可能使用它们。

```js
import { makeObservable, observable, computed, autorun } from "mobx"

class OrderLine {
    price = 0
    amount = 1

    constructor(price) {
        makeObservable(this, {
            price: observable,
            amount: observable,
            total: computed
        })
        this.price = price
    }

    get total() {
        console.log("Computing...")
        return this.price * this.amount
    }
}

const order = new OrderLine(0)

const stop = autorun(() => {
    console.log("Total: " + order.total)
})
// 计算中...
// Total: 0

console.log(order.total)
// (不会重新计算!)
// 0

order.amount = 5
// 计算中...
// (无需 autorun)

order.price = 2
// 计算中...
// Total: 10

stop()

order.price = 3
// 计算值和 autorun 都不会被重新计算.
```
上面的例子很好地展示了 计算值 的好处，它充当了缓存点的角色。 即使我们改变了 `amount`，进而触发了 `total` 的重新计算， 也不会触发 `autorun`，因为 `total` 将会检测到其输出未发生任何改变，所以也不需要更新 `autorun`。

## 5. 使用 reactions 处理副作用 
**Autorun**  
用法：

`autorun(effect: (reaction) => void)`  

`autorun` 函数接受一个函数作为参数，每当该函数所观察的值发生变化时，它都应该运行。 当你自己创建 `autorun` 时，它也会运行一次。它仅仅对可观察状态的变化做出响应，比如那些你用 `observable` 或者 `computed` 注释的。

```js
autorun(() => {
    console.log("Energy level:", giraffe.energyLevel)
})

autorun(() => {
    if (giraffe.isHungry) {
        console.log("Now I'm hungry!")
    } else {
        console.log("I'm not hungry!")
    }
})
```
-------
**Reaction**  
用法：

```js
reaction(
  () => value, 
  (value, previousValue, reaction) => { sideEffect },
  options?
)
```
`reaction` 类似于 `autorun`，但可以让你更加精细地控制要跟踪的可观察对象。 它接受两个函数作为参数：第一个，data 函数，其是被跟踪的函数并且其返回值将会作为第二个函数，`effect` 函数，的输入。 重要的是要注意，副作用只会对 `data` 函数中被访问过的数据做出反应，这些数据可能少于 `effect` 函数中实际使用的数据。

一般的模式是在 `data` 函数中返回你在副作用中需要的所有数据， 并以这种方式更精确地控制副作用触发的时机。 与 `autorun` 不同，副作用在初始化时不会自动运行，而只会在 `data` 表达式首次返回新值之后运行。

调用了reaction需要手动在组件卸载的时候销毁reaction。reaction返回一个`IReactionDisposer`类型的方法，用于销毁。
```ts
//reaction的接口定义
(alias) reaction<T>(expression: (r: IReactionPublic) => T, effect: (arg: T, prev: T, r: IReactionPublic) => void, opts?: IReactionOptions | undefined): IReactionDisposer
```
我们可以将其封装成hook
```js
import { useRef } from 'react'
import useMount from 'react-use/esm/useMount'
import useUnmount from 'react-use/esm/useUnmount'
import {
  reaction,
  IReactionPublic,
  IReactionOptions,
  IReactionDisposer,
} from 'mobx'

export const useReaction = <T>(
  expression: (r: IReactionPublic) => T,
  effect: (value: T, prevValue: T, r: IReactionPublic) => void,
  opts?: IReactionOptions,
) => {
  let disposerRef: React.MutableRefObject<IReactionDisposer | null> = useRef(
    null,
  )
  useMount(() => {
    disposerRef.current = reaction(expression, effect, opts)
  })
  useUnmount(() => {
    if (disposerRef.current) {
      disposerRef.current?.()
    }
  })
}

```
调用hook
```js
useReaction(
    () => giraffe.isHungry,
    isHungry => {
        if (isHungry) {
            console.log("Now I'm hungry!")
        } else {
            console.log("I'm not hungry!")
        }
        console.log("Energy level:", giraffe.energyLevel)
    }
)
```
--------
**when**  
使用：
```
when(predicate: () => boolean, effect?: () => void, options?)
when(predicate: () => boolean, options?): Promise
```
`when `会观察并运行给定的 `predicate` 函数，直到其返回 `true`。 一旦 `predicate` 返回了 `true`，给定的 `effect` 函数就会执行并且`自动执行器函数将会被清理掉`。

如果你没有传入 `effect` 函数，`when` 函数返回一个 `Promise` 类型的 `disposer`，并允许你**手动取消**。

**await when(...)**  
如果你没有提供 `effect` 函数，`when` 将会返回一个 `Promise`。这样会跟 `async / await` 很好地结合在一起，让你可以等待可观察对象中的变化。  
如果要提前取消` when`，可以对它返回的`Promise `调用 `.cancel()` 函数。
```js
async function() {
    await when(() => that.isVisible)
    // etc...
}
```
-----
**上面api的options**  
Options {🚀}  
`name`  
`fireImmediately (reaction)`  
`delay (autorun, reaction)`  
`timeout (when)`  
`onError`  
`scheduler (autorun, reaction)`  
`equals: (reaction)`

-----
**规则**  
*Always dispose of reactions*  
传递给 `autorun`，`reaction` 和 `when` 的函数只有在它们观察的所有对象都被 GC 之后才会被 GC。原则上，它们一直等待可观察对象发生新的变化。 `为了阻止 reactions 永远地等待下去，它们总是会返回一个 disposer 函数`，该函数可以用来停止执行并且取消订阅所使用的任何可观察对象。
```js
const counter = observable({ count: 0 })
// 初始化一个 autorun 并且打印 0.
const disposer = autorun(() => {
    console.log(counter.count)
})
// 打印: 1
counter.count++
// 停止 autorun.
disposer()
// 不会打印消息.
counter.count++
```
我们强烈建议你，一旦不再需要这些方法中的副作用时，`请务必调用它们所返回的 disposer 函数。 否则可能导致内存泄漏`。  
`reaction` 和 `autorun` 中 effect 函数的第二个参数 reaction 也可以被用来提前把 reaction 清理掉（通过调用 `reaction.dispose()`）。

## 6. 集成React

**本地与外部状态（Local and external state）**  
在 Mobx 可以非常灵活的组织或管理（state）, 从（技术角度讲）它不关心我们如何读取可观察对象，也不关心他们来自哪里。 下面的例子将通过不同的设计模式去使用被 observer包裹的组件。

**observer 组件中使用外部状态 （Using external state in observer components）**
1. 使用props  
可被观察对象可以通过组件的props属性传入 (在下面的例子中):
```js
import { observer } from "mobx-react-lite"

const myTimer = new Timer() // See the Timer definition above.

const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

// 通过props传递myTimer.
ReactDOM.render(<TimerView timer={myTimer} />, document.body)
```
2. 使用全局变量  
虽然我们不关心是 如何 引用（reference）的可观察对象,但是我们可以使用 （consume） 外部作用域（outer scopes directly）的可观察对象 (类似通过 import这样的方法, 等等)：
```js
const myTimer = new Timer() //  Timer 定义在上面.

// 没有props, `myTimer` 立刻变成了闭包。
const TimerView = observer(() => <span>Seconds passed: {myTimer.secondsPassed}</span>)

ReactDOM.render(<TimerView />, document.body)
```
直接使用可观察对象效果很好，但是这通常会是通过模块引入，`这种写法可能会使单元测试变得复杂。 因此，我们建议使用React Context`。

3. 使用Reac Context  
   使用React Context共享整个可观察子树是一种很不错的选择：  
```js
import {observer} from 'mobx-react-lite'
import {createContext, useContext} from "react"

const TimerContext = createContext<Timer>()

const TimerView = observer(() => {
    // 从context中获取timer.
    const timer = useContext(TimerContext)
    return (
      <span>Seconds passed: {timer.secondsPassed}</span>
    )
})
```
需要注意的是我们并不推荐每一个不同的 值（value） 都通过不同的 Provider来传递 . 在使用Mobx的过程中不需要这样做, 因为共享的可观察对象会更新他自己。

可以将其封装出来：
```js
import React from 'react'

export function createStore<T>(ClassFactory: new () => T,): [() => T, T, React.Context<T>] {
  const store = new ClassFactory()
  const context = React.createContext(store)
  const useStore = () => React.useContext(context)
  return [useStore, store, context]
}

```
## 7.优化React组件渲染 {🚀}
**使用大量的小组件**  
`observer 组件`将跟踪他们使用的值，并且当它们中任何一个值发生时重新渲染。所以你的`组件越小`，它们重新渲染产生的`变化就越小`。这意味着用户界面的更多部分具备彼此独立渲染的可能性

**专用组件去渲染列表**  
这点在渲染大量数据时格外重要。 `React` 在渲染大量数据时表现非常糟糕，因为协调器必须评估每个集合变化的集合所产生的组件。 因此，建议使用专门的组件来映射集合并渲染这个组件，且不再渲染其他组件。

**不好的:**
```js
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <ul>
            {todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
    </div>
))
```
在上面的示例中，当 `user.name` 改变时，React 会不必要地协调所有的 TodoView 组件。尽管 TodoView 组件不会重新渲染，但是协调的过程本身是非常昂贵的。

**好的:**
```js
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <TodosView todos={todos} />
    </div>
))

const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
        ))}
    </ul>
))
```
**不要使用数组的索引作为 key**  
不用使用数组索引或者任何将来可能会改变的值作为 key 。如果需要的话为你的对象生成 ids。 还可以参见这篇[博客](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318)。

**晚一点使用间接引用值**  
使用 mobx-react 时，推荐尽可能晚的使用间接引用值。 这是因为当使用 `observable` 间接引用值时 MobX 会自动重新渲染组件。 如果间接引用值发生在组件树的层级越深，那么需要重新渲染的组件就越少。

**慢的:**

`<DisplayName name={person.name} />`  

**快的:**

`<DisplayName person={person} />`  
在这个快的示例中, 改变 name 属性只会触发 DisplayName 重新渲染  
在慢的示例中，组件的所有者也必须重新渲染。 前者这没有错, 如果组件的拥有者渲染的足够快(通常是这样!)，这种方式也能很好的运行。

## 8.配置 {🚀}  
根据你的使用偏好，目标JavaScript引擎以及是否需要MobX达到最佳表现，MobX提供了一系列的配置项。绝大部分配置项都可以使用 configure方法控制。
[点我啊！！！！在这里查看官方文档](https://zh.mobx.js.org/configuration.html)

## 9.mobx API阅览
[【点我啊😠】](https://zh.mobx.js.org/api.html)