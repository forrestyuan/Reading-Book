## 谈谈 promise/async/await 的执行顺序与 V8 引擎的 BUG

故事还是要从下面这道面试题说起：请问下面这段代码的输出是什么？

```js
console.log('script start');
async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();
setTimeout(function () {
  console.log('setTimeout');
}, 0);
new Promise((resolve) => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });
console.log('script end');
```

上述代码中，在 Chrome 66 和 node v10 中，正确输出是：

```
script start
async2 end
Promise
script end
promise1
promise2
async1 end
setTimeout
```

> **注意 ⚠️**在新版本的浏览器中，await 输出顺序被`“提前”`了，请看官耐心慢慢看
> 边看输出结果，边做解释吧：

1. 正常输出 script start
2. 执行 async1 函数，此函数中又调用了 async2 函数，输出 async2 end。回到 async1 函数，遇到了**await**，让出线程。
3. 遇到 setTimeout，扔到下一轮宏任务队列
4. 遇到 Promise 对象，立即执行其函数，输出 Promise。其后的 resolve，被扔到了微任务队列
5. 正常输出 script end
6. 此时，此次 Event Loop 宏任务都执行完了。来看下第二步被扔进来的微任务，因为 async2 函数是 async 关键词修饰，因此，将 await async2 后的代码扔到微任务队列中
7. 执行第 4 步被扔到微任务队列的任务，输出 promise1 和 promise2
8. 执行第 6 步被扔到微任务队列的任务，输出 async1 end
9. 第一轮 EventLoop 完成，执行第二轮 EventLoop。执行 setTimeout 中的回调函数，输出 setTimeout。

> ### 在最新的浏览器输出结果为：

简单点说，前面两段不同代码的运行结果都是：

```
script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
```

await 就是让出线程，其后的代码放入微任务队列（不会再多一次放入的过程），就这么简单了。

### 题目 一：

```js
setTimeout(function () {
  console.log('1');
}, 0);
async function async1() {
  console.log('2');
  const data = await async2();
  console.log('3');
  return data;
}
async function async2() {
  return new Promise((resolve) => {
    console.log('4');
    resolve('async2的结果');
  }).then((data) => {
    console.log('5');
    return data;
  });
}
async1().then((data) => {
  console.log('6');
  console.log(data);
});
new Promise(function (resolve) {
  console.log('7');
  //   resolve()
}).then(function () {
  console.log('8');
});

/*
 * 输出结果：2，4，7，5，3，6，async2的结果，1
 */
```
