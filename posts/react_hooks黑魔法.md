1. [揭秘 react hook 黑魔法](https://zhuanlan.zhihu.com/p/350215488)

## useState 的那些坑

> 至于说 setState 为什么被设置为异步的，这是因为 react 的设计者想给那些不完全合格的设计者加一个强限制，假如说 setState 是同步的，那么每次 setState 都会调用 diff 算法去更新虚拟 dom。一个不合格的设计者在一个合成事件函数里面多次调用 setState，假如他被设计成同步的，一个合成事件函数被执行的时候，界面就会因为频繁操作虚拟 dom 而卡死。

1. useState 不适合复杂对象的更改。
   因为 useState 不能像 setState 那样进行合并更新，当使用 useState 第二个参数进行数据更新的时候，必须传入一个完整的结构，而不仅仅只是改变的那一部分。
2. useState 异步回调的问题

   当使用 usestate 对数据进行更新，并不能立刻获取到最新的数据,需要在 useEffect 里拿。

   ```js
   const [name, setName] = useState("dx");

   const handleTest = () => {
     console.log(name); // dx
     setName("dx1");
     console.log(name); // dx
   };
   useEffect(() => {
     console.log(name); //dx1
   }, [name]);
   ```

3. useState 存入的值只是该值的引用（引用类型）。

   这样存会导致多个 state 改变的同一个值。可以存字面量

4. useState,如果保存引用数据，useEffect 检测不到变化，返回一个新的对象,useEffectc 才能检测得到
5. useState 无法保存一个函数。  
   在 useState 中，函数会自动调用，并且保存函数返回的值，而不能保存函数本身

## 扒一扒 useState 源码：

1. 找到 useState 的定义

```ts
export function useState<S>(
  initialState: (() => S) | S
): [S, Dispatch<BasicStateAction<S>>] {
  //这里调用了 resolveDispatcher()
  const dispatcher = resolveDispatcher();
  //返回一个useState
  return dispatcher.useState(initialState);
}
```

2. 继续走进 resolveDispatcher()
