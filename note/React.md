- [创建项目](#创建项目)
- [JSX 语法](#jsx-语法)
- [React 组件](#react-组件)
- [React State.](#react-state)
- [React 事件](#react-事件)
- [组件传值](#组件传值)
- [生命周期](#生命周期)
- [React 插槽](#react-插槽)
- [React Hooks](#react-hooks)
- [setState 异步更新](#setstate-异步更新)
- [setState 同步场景](#setstate-同步场景)

1. 声明式设计
2. 高效，采用虚拟 dom 来实现 DOM 的渲染，最大限度减少 dom 的操作。
3. 灵活，跟其他库灵活搭配使用
4. JSX，俗称 js 里面写 HTML，js 语法的拓展
5. 组件化，模块化，代码容易复用。
6. 单向数据流。没有实现数据双向绑定。

## 创建项目

1. 通过 script 方式引入
2. 通过 react 脚手架创建项目，开发，部署。

```bash
# 1. 安装脚手架，create-react-app
cnpm install -g create-react-app
# 2. 创建项目
create-react-app demoproject
```

## JSX 语法

JSX 执行快，编译为 js 代码时进行优化。  
类型更安全。

**注意**  
JSX 必须要有根节点。  
正常的 HTML 元素要小写，如果是大写，默认认为是组件。

- JSX 中的表达式
  JSX 是支持表达式的，用法很简单，你需要将表达式写到{}内即可。  
  不能使用 if else 的，不过可以使用三元运算表达式。
- JSX 上的 style

```html
<script type="text/babel">
  var ok = 1;
  var myStyle = {
    color: "red",
    fontSize: 50,
  };
  ReactDOM.render(
    <div>
      <p style={myStyle}>{ok == 1 ? "我很帅" : "我很有才华"}</p>
    </div>,
    document.querySelector("#wrap")
  );
</script>
<!-- 或者 -->
<script type="text/babel">
  var ok = 1;
  ReactDOM.render(
    <div>
      <p
        style={{
          color: "red",
          fontSize: 50,
        }}
      >
        {ok == 1 ? "我很帅" : "我很有才华"}
      </p>
    </div>,
    document.querySelector("#wrap")
  );
</script>
```

- JSX 上的数组输出  
  JSX 可以直接在模板输出 JavaScript 变量。如果这个变量是一个数组，会自动展开所有元素。

- JSX 当中的注释  
  只需要将注释写到{}当中即可

## React 组件

1. 函数式组件
   没有状态

```jsx
function Children(props) {
  let title = <h2>我是副标题</h2>;
  return (
    <div>
      函数式组件
      {title}
    </div>
  );
}
```

2. 类组件定义
   有状态

```jsx
class HelloWord extends React.Component {
  render() {
    return (
      <div>
        <h2>我是类组件</h2>
      </div>
    );
  }
}
```

## React State.

state 状态，相当于 vue 中的 data。通过 setState 来修改 state 里的数据，修改完数据后，并不会立即修改 DOM 里面的内容，react 会在这个函数内容所有设置状态改变后，统一对比虚拟 DOM 对象，然后在统一修改，提升性能。  
State 的更新可能是异步的

出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。  
因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。  
例如，此代码可能会无法更新计数器：

```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
上面使用了箭头函数，不过使用普通的函数也同样可以：

// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

## React 事件

必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。

这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关。通常情况下，如果你没有在方法后面添加 ()，例如 onClick={this.handleClick}，你应该为这个方法绑定 this。

如果觉得使用 bind 很麻烦，这里有两种方式可以解决。如果你正在使用实验性的 public class fields 语法，你可以使用 class fields 正确的绑定回调函数：

```js
class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

```js
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return <button onClick={() => this.handleClick()}>Click me</button>;
  }
}
```

向事件处理程序传递参数

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

**阻止默认事件**： e.preventDefault();

## 组件传值

父传子： props
子传父： 子组件调用父组件的方法传值。

## 生命周期

![生命周期](../assets/React生命周期.JPG)

- ComponentWillMount:组件将要渲染
- ComponentDidMount:组件渲染完毕
- ComponentWillReceiveProps:组件将要接收 props 数据
- SohuldComponentUpdate:组件接收到新的 state 或者 props 判断是否更新，返回布尔值。
- ComponentWillUpdate:组件将要更新
- ComponentDidUpdate:组件已经更新
- ComponentWillUnmount:组件将要卸载。

## React 插槽

组建中写入内容，这些内容可以被识别和控制。react 需要自己开发支持插槽功能。  
 原理：组件中写入的 HTML，可以传入到 props 中。

## React Hooks

- useState
- useEffect
- useRef

**路由里的**

- useParams
- useHistory

## setState 异步更新

调用 setState 其实是异步的，也就是 setState 调用之后，this.state 不会立即映射为新的值。上面代码会解析为以下形式：

```js
// 后面的数据会覆盖前面的更改，所以最终只加了一次.
Object.assign(previousState, { val: state.val + 1 }, { val: state.val + 1 });
```

在上面我们调用了两次 setState，但 state 的更新会被合并，所以即使多次调用 setState，实际上可能也只是会重新渲染一次。

如果想基于当前的 state 来计算出新的值，那么 setState 第一个参数不应该像上面一样传递一个对象，而应该传递一个函数。

```js
handleClick () {
    this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
     this.setState((prevState, props) => {
            val: prevState.val + 1
        }
    })
 }
```

此时，在 handleClick 方法内调两次 setState，就能实现每次点击都自增 2 了。

传递一个函数可以让你在函数内访问到当前的 state 值。 setState 的调用是分批的，所以可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突。

setState 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 componentDidUpdate 生命周期内执行。通常建议使用 componentDidUpdate 来代替此方式。在这个回调函数中你可以拿到更新后 state 的值。

```js
this.setState({
    key1: newState1,
    key2: newState2,
    ...
}, callback) // 第二个参数是 state 更新完成后的回调函数
```

通过上面内容，可以知道调用 setState 时，组件的 state 并不会立即改变， setState 只是把要修改的 state 放入一个队列， React 会优化真正的执行时机，并出于性能原因，会将 React 事件处理程序中的多次 React 事件处理程序中的多次 setState 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要。

批量更新的流程图如下：

```js
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务]
});
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务，count+1的任务]
});
                                          ↓
                                         合并 state，[count+1的任务]
                                          ↓
                                         执行 count+1的任务
```

**注意：** 在 React 中，不能直接使用 this.state.key = value 方式来更新状态，这种方式 React 内部无法知道我们修改了组件，因此也就没办法更新到界面上。所以一定要使用 React 提供的 setState 方法来更新组件的状态。

> 那为什么 setState 是异步的，React 官方团队的解释如下：

保持内部一致性。如果改为同步更新的方式，尽管 setState 变成了同步，但是 props 不是。
为后续的架构升级启用并发更新。为了完成异步渲染，React 会在 setState 时，根据它们的数据来源分配不同的优先级，这些数据来源有：事件回调句柄、动画效果等，再根据优先级并发处理，提升渲染性能。
简单总结如下：

setState 设计为异步，可以显著的提升性能。如果每次调用 setState 都进行一次更新，那么意味着 render 函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
如果同步更新了 state，但是还没有执行 render 函数，那么 state 和 props 不能保持同步。state 和 props 不能保持一致性，会在开发中产生很多的问题；

## setState 同步场景

上面的例子使我们建立了这样一个认知：setState 是异步的，但下面这个案例又会颠覆你的认知。如果我们将 setState 放在 setTimeout 事件中，那情况就完全不同了：

```js
class Test extends Component {
    state = {
        count: 0
    }
    componentDidMount(){
        this.setState({ count: this.state.count + 1 });
        console.log(this.state.count);
        setTimeout(() => {
          this.setState({ count: this.state.count + 1 });
          console.log("setTimeout: " + this.state.count);
        }, 0);
    }
    render(){
        ...
    }
```

这时就会输出 0，2。因为 setState 并不是真正的异步函数，它实际上是通过队列延迟执行操作实现的，通过 isBatchingUpdates 来判断 setState 是先存进 state 队列还是直接更新。值为 true 则执行异步操作，false 则直接同步更新。

在 onClick、onFocus 等事件中，由于合成事件封装了一层，所以可以将 isBatchingUpdates 的状态更新为 true；在 React 的生命周期函数中，同样可以将 isBatchingUpdates 的状态更新为 true。那么在 React 自己的生命周期事件和合成事件中，可以拿到 isBatchingUpdates 的控制权，将状态放进队列，控制执行节奏。而在外部的原生事件中，并没有外层的封装与拦截，无法更新 isBatchingUpdates 的状态为 true。这就造成 isBatchingUpdates 的状态只会为 false，且立即执行。所以在 addEventListener 、setTimeout、setInterval 这些原生事件中都会同步更新。

实际上，setState 并不是具备同步这种特性，只是在特定的情境下，它会从 React 的异步管控中“逃脱”掉。
