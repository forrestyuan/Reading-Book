## 什么是fiber

<!--  -->
Fiber 是一种数据结构

React 源码里，为了方便表示，也为了方便render的时候能暂停和恢复，把每个虚拟dom变成一个fiber节点  

### Fiber树  

* current fiber树 当渲染完成后会产生一个current Fiber树
* workInProgress fiber 树 在render阶段， 会基于current树创建新的wrokInProgress fiber树，更新完成后会把workInProgress fiber树赋给current fiber 树
* workInProgress fiber树的每个节点会有一个alternate指针指向current树对应的fiber节点

### Fiber是一个执行单元

Fiber是一个执行单元，每次执行完一个执行单元你，React就会检查还剩多少时间，如果没有时间就将控制权让出去

beginWork => completeWork  
（下一个节点，先找大儿子，没有找下一个弟弟，没有找下一个叔叔） => （自己所有的字节点完成后自己完成）

### 循环列表

* 循环列表是另一种形式的链式存储结构
* 特点是最后一个节点的指针域指向头结点，整个列表形成一个环  

![循环列表](https://s3.bmp.ovh/imgs/2021/08/19207103a45ba52b.png)

```js
//在组件更新的时候会用到
function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    }
    // const pending = queue.pending
    if(queue.pending === null){
      update.next = update
    } else{
      update.next = pending.next
      pending.next = update;
    }
    queue.pending = update
}
```
