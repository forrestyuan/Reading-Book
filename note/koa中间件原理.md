## koa 中间件的基本运作原理

在中间件系统的是线上 Koa 中间件通过 async/await 来在不同中间件之间交换控制权，工作机制和栈结构相似。但是和 express 中间件系统的实现风格不同。
`express使用ES5的回调风格语法，KOA使用ES7的扁平式异步async/await风格语法`但在框架基本原理上是很类似的，只是中间件写法和遍历机制稍有不同。

核心类的定义：

```js
class MiddleWare {
  constructor() {
    this.queue = [];
  }
  //添加中间件函数
  use(fn) {
    this.queue.push(fn);
  }
  //合并中间件处理流，是一个高阶函数，调用后会生成真正需要的函数
  compose() {
    return function (ctx, next) {
      let _this = this;
      let index = -1;

      return dispatch(0);

      // Koa中间件的工作的步进函数
      function dispatch(i) {
        index = i;
        //依次取用函数中添加的中间件函数
        let fn = i === _this.queue.length ? next : _this.queue[i];
        if (!fn) return Promise.resolve();
        try {
          /*
            中间件函数的形式为async fn(ctx, next)，可以看到此处透传了ctx的引用，
            同时next是一个延迟执行中间件队列中的下一个中间件函数，也就是说如果在前
            一个中间件函数体中调用await next(), 就会启动下一个中间件，实际执行的函数是dispatch(i + 1)
          */
          return Promise.resolve(
            fn(ctx, () => {
              return dispatch(i + 1);
            }),
          );
        } catch (e) {
          return Promise.reject(err);
        }
      }
    };
  }
}
```
