## react-router 路由的实现原理

React Router 是一个基于 React 之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。
本文从两个方便来解析 react-router 实现原理。一：介绍 react-router 的依赖库 history；二：使用 history 库，实现一个简单的 react-router 路由。

history 有三种实现方式：

1. BrowserHistory：用于支持 HTML5 历史记录 API 的现代 Web 浏览器（请参阅跨浏览器兼容性）
2. HashHistory：用于旧版 Web 浏览器
3. MemoryHistory：用作参考实现，也可用于非 DOM 环境，如 React Native 或测试

### 1.页面跳转实现

> **BrowserHistory**：`pushState`、`replaceState`;
>
> **HashHistory**：`location.hash`、`location.replace`

```js
function push(){
  createKey(); // 创建location的key，用于唯一标示该location，是随机生成的
  if(BrowserHistory){
    globalHistory.pushState({ key, state }, null, href);
  }else if(HashHistory){
    window.location.hash = path;
  }
  //上报listener 更新state ...
}
function replace(){
  createKey(); // 创建location的key，用于唯一标示该location，是随机生成的
  if(BrowserHistory){
    globalHistory.replaceState({ key, state }, null, href);
  }else if(HashHistory){
    window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + "#" path);
  }
  //上报listener 更新state ...
}
```

###2.浏览器回退

> **BrowserHistory**：`popstate`;
>
> **HashHistory**：`hashchang`;

```js
if (BrowserHistory) {
  window.addEventListener('popstate', routerChange);
} else if (HashHistory) {
  window.addEventListener('hashchange', routerChange);
}
function routerChange() {
  const location = getDOMLocation(); //获取location
  //路由切换
  transitionManager.confirmTransitionTo(
    location,
    (callback = () => {
      //上报listener
      transitionManager.notifyListeners();
    }),
  );
}
```

### 核心

- 代码上的路由触发，直接上报 listener。
- 浏览器动作的路由触发，监听不同路由模式下的路由事件，进而上报 listener
