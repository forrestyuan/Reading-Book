## Weex和web的平台差异

* Weex中没有原生DOM, Weex的运行环境以原生应用为主，在Android和ios环境中渲染出来的是原生的组件。

* 原生环境中不支持WebAPI，没有Element，Event、File等对象。不支持选中元素。
* 有限的事件类型。Weex支持在标签上绑定事件，和在浏览器中写法一样，但是Weex中的事件时由原生组件捕获并触发的。没有所谓事件捕获阶段或冒泡阶段，不支持事件修饰符
* Weex没有BOM，不支持浏览器提供的BOM接口，没有window，screen，document对象，没有history，location，navigator对象
* 可以调用移动设备的原生API，通过注册，调用模块来实现。
* 使用 [BroadcastChannel](https://weex.apache.org/zh/docs/api/broadcast-channel.html) 可以实现跨页通信
* 

