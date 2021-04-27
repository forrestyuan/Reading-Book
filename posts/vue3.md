```js
import { reactive } from "vue";
const state = reactive({
  count: 0,
});

watchEffect(() => {
  document.body.innerHTML = `count is ${state.count}`;
});
```

`reactive` 几乎等价于 2.x 中的`vue.observable()`API, 且为了避免 RxJS 中的 observable 混淆而做了重命名。这里返回的 state 是一个所有 cue 用户都熟悉的响应式对象。

`watchEffect`应该接收一个应用预期副作用。他会立即执行该函数，并将该执行过程用到所有响应式状态的 property 作为依赖进行追踪。

当你在组件中从 data()返回一个对象，内部实质上通过调用 reactive()使其变为响应式。而模版会被编译为渲染函数。

> watchEffect 和 2.x 中的 watch 选项类似，但是他不需要把被依赖的数据源和副作用回调分开。组合式 API 同样提供了一个 watch 函数，其行为和 2.x 完全一致。

```js
const count = ref(0);
console.log(count.value);
count.value++;
console.log(count.value);
```

**揭开 ref**
可以将一个 ref 值暴露给渲染上下文，在渲染过程中，vue 会之间使用内部的值，也就是说在模版中可以把{{count.value}}直接写成{{count}}。

```js
<template>
 <button @click ="increment">
      Count is {{state.count}}, double is :{{state.double}}
    </button>
</template>
<script>
import {reactive, computed, watchEffect} from 'vue'
export default{
  setup(){
    const state = reactive({
      count:0,
      double: computed(()=>state.count *2)
    })

    function increment(){
      state.count ++
    }
    onMounted(()=>{
      console.log('component is mounted!)
    })
    return {
      state,
      increment
    }
  }
}
</script>
```

生命周期函数只能在 setup 中声明。它会通过内部的全局状态自动找到调用此 setup 钩子的示例。是为了减少讲逻辑提取到外部函数时的冲突。

将相同逻辑关注点的代码并列在一起。这正是组合式 api 所能做到的。建议使用 use 作为函数的开头，以表示它是一个组合函数。

setup 中最后的 return 语句作为单一的出口确认暴露给模版的内容。

**逻辑提取与复用**

```js
import { ref, onMounted, onUnmounted } from "vue";

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function update(e) {
    x.value = e.pageX;
    y.value = e.pageY;
  }
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  return { x, y };
}
```

调用该函数：

```js
import { useMousePosition } from "./mouse";
export default {
  setup() {
    const { x, y } = useMousePostion();
    return {
      x,
      y,
    };
  },
};
```

相比于 mixins，高阶组件等方式，这些都有各自的弊端：

- 渲染上下文中暴露的 property 来源不清晰。例如很难在一个运用了多个 mixin 的模版，看出某个 property 是从哪个 mixin 中注入的。
- 命名空间冲突。
- 性能方面，高阶组件和无渲染组件需要额外的有状态组件实例，从而使得性能有损耗。

**和现有 API 配合**  
组合是 API 完全可以和现有的基于选项的 API 配合使用。

- 组合式 API 会在 2.x 的选项（data, computed 和 method）之前解析，并且不能提前访问这些选中的 property
- setup()函数返回的 property 将会暴露给 this。在 2.x 的选项中可以访问到。

**与 React Hooks 相比**  
基于函数的组合式 API 提供了与 React Hooks 同等级别的逻辑组合能力，但是与他还是有很大不同：组合式 API 的 setup()函数只会被调用一次。

- 不需要顾虑调用顺序，也可以在条件语句中。
- 不会在每次渲染时重复执行，以降低垃圾回收的压力。
- 不存在内敛处理函数导致子组件永远更新的问题，也不需要 useCallback
- 不存在忘记记录依赖的问题，也不需要 useEffect 和 useMemo 并传入依赖数组

**新的自定义指令写法**

```js
const myDirective = {
  beforeMount(el, binding, vnode, preVnode) {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unomounted() {},
};
```

**编写插件**  
插件是自包含的代码，通常向 Vue 添加全局级功能。它可以是公开 install()方法的 object，也可以是 function。

插件的功能没有严格的限制：

1. 添加全局方法或者 property
2. 添加全局资源：指令/过滤器/过渡等
3. 通过全局混入一些组件选项
4. 添加全局示例方法，通过他们添加到 config.globalProperties 上实现
5. 一个库，提供自己的 API，同时提供上面提到的一个或者多个功能。

当这个插件被添加到应用程序中，如果他是一个对象，就会调用 isntall 方法，如果他是一个 function，则函数本身会被调用。

```js
export default {
  install: (app, options){
    app.config.globalProperties.$translate = key => {
      return key.split('.').reduce((obj, idx) =>{
        if(obj) return obj[idx]
      }, i18n)
    }
  }
}
//demo vue2.x写法
let vueTouch = {}
vueTouch.config = {}

vueTouch.install = function(Vue){
  Vue.directive('touch',{
    isFn:ture,
    acceptStatement:true,
    priority:Vue.directive('on').priority,

    bind:function(){}
  })
}
```

**Vue 如何追踪变化**  
当把一个普通的 js 对象作为 data 选项传给应用或组件实例的时候，Vue 会使用带有 getter 和 setter 的处理程序遍历所有 property 并将其转换为 Proxy。这是 ES6 仅有的特性，但是在 Vue3 版本也使用了 Object.defineProperty 来支持 IE 浏览器（这里所谓支持 IE 值得考量，作者说 vue3 将不在支持 IE,未来这个特性可能会被移除）

**解构响应式对象**  
在 vue3 中想要解构响应式的对象，不能通过 ES6 解构，因为它会消除响应的特性，可以通过使用 setup 函数中的 toRefs 来完成此操作。

```js
import {toRefs} from 'vue'
setup(props){
  const {title} = toRefs(props)
  console.log(title.value)
}
```

**生命周期钩子**  
|选项式 API|Hook inside setup|
|--|--|
|beforeCreate|--|
|created|--|
|beforeMount|onBeforeMount|
|mounted|onMounted|
|beforeUpdate|onBeforeUpdate|
|updated|onUpdated|
|beforeUnmount|onBeforeUnmount|
|unmounted|onUnmounted|
|errorCaptured|onErrorCaptured|
|renderTracked|onRenderTracked|
|renderTriggered|onRenderTriggered|

> 因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显式地定义他们。

**在 vue3 中使用 jsx**

```js
export default {
  import {ref} from 'vue'
  setup(){
    const root = ref(null)
    return ()=>(
      <div ref={root}>
        hello world. use jsx in vue3.0
      </div>
    )
  }
}
```

在函数式组件中：

```js
const FuncComp = (props, { emits, attrs, slots }) => {
  return () => <div ref={root}>hello world. use jsx in vue3.0</div>;
};
```

vue3 如果用 ts，导出时候要用 defineComponent，这俩是配对的，为了类型的审查正确.[详情](https://my.oschina.net/u/4592325/blog/4683084)

---

**使用 tsx 来编写组件的注意事项**  
在自己编写 vue3 的 demo 的时，用 tsx 文件编写了公共组件，在 `<script lang='tsx'>`的 `.vue` 文件中，发现引入的公共组件在 setup 返回的 tsx 中，怎样都无法渲染，这就很头痛，后来移到 tempalte 中才生效。

但是，我又发现，用`.vue`后缀的公共组件，可以在 template 也可以在 `<script lang='tsx'>`的 setup 返回的 tsx 中使用。

结论：用 tsx 编写的组件在以`.vue`为后缀的组件时，只能用于`<template>`中,不用用于 setup 返回的 tsx 组件中。如下例子：

> 1. `Button.tsx`

```tsx
import { ref, defineComponent, h, Fragment } from "vue";
const React = { createElement: h, Fragment };
export default defineComponent({
  name: "fox-button",
  props: {
    msg: {
      type: String,
      required: false,
    },
  },
  setup(props, { attrs, emit, slots }) {
    const count = ref(0);
    const page = ref(0);
    return () => (
      <div>
        <h1>{props.msg ?? "没有传递msg"}</h1>
        <button onClick={() => count.value++}>count is: {count.value}</button>
        <button onClick={() => page.value++}>page is: {page.value}</button>
      </div>
    );
  },
});
```

> 2. 在 index.ts

```tsx
import { App } from "vue";
import _Button from "./Button";

type WithInstall<T> = T & {
  install: (app: App) => void;
};
function withInstall<T>(comp: any): WithInstall<T> {
  comp.install = (app: App) => {
    const { name } = comp;
    app.component(`${name}`, comp);
  };
  return comp;
}
const Button = withInstall<typeof _Button>(_Button);

export { Button };
export default Button;
```

> 2. 在 HelloWorld.vue 中

```tsx
<template>
  <fox-button :msg="'fasdfasd'"></fox-button>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Button } from './index'
export default defineComponent({
  name: 'HelloWorld',
  components: {
    'fox-button': Button
  },
  props: {
    msg: {
      type: String,
      required: true
    }
  },

  setup(props, { attrs, emit, slots }) {
    console.log(props, attrs, emit, slots)
    const count = ref(0)
    const page = ref(0)
    return {
      count,
      page
    }
  }
})
</script>

```
