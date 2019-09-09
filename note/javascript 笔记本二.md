# javascript 笔记二


## 事件总线EventBus
> EventBus 需要使用到Vue的三个全局API  
> 1. vm.$on( event, callback )  
> 监听当前实例上的自定义事件。事件可以由vm.\$emit触发。回调函数会接收所有传入事件触发函数的额外参数。  
> 2. vm.$emit( event, […args] )  
> 触发当前实例上的事件。附加参数都会传给监听器回调，如果没有参数，形式为vm.\$emit(event)  
> 3. vm.$off( [event, callback] )  
> 移除自定义事件监听器。  
> 如果没有提供参数，则移除所有的事件监听器；  
> 如果只提供了事件，则移除该事件所有的监听器；  
> 如果同时提供了事件与回调，则只移除这个回调的监听器。  
> 
> ```js
>   import Vue from 'vue';
>   Vue.prototype.$EventBus = new Vue();
> ```
> 当A组件需要通过EventBus传参给B组件时，此时，A组件emit事件应该在beforeDesctory生命周期中，因为此时B组件已经加载好。  
>  A = created  
>  A = beforeMount  
>  A = mounted  
>  A = beforeUpdate   
>  A = updated  
>  B = beforeCreated  
>  B = created  
>  B = beforeMounted  
>  A = beforeDestoryed  
>  A = destroyed  
>  B = mounted  