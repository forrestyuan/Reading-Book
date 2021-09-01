## service worker

Service Worker 只是一个常驻在浏览器中的 JS 线程，它本身做不了什么。它能做什么，全看跟哪些 API 搭配使用。

1. 跟 Fetch 搭配，可以从浏览器层面拦截请求，做数据 mock；
2. 跟 Fetch 和 CacheStorage 搭配，可以做离线应用；
3. 跟 Push 和 Notification 搭配，可以做像 Native APP 那样的消息推送，

Service workers 本质上充当 Web 应用程序、浏览器与网络（可用时）之间的代理服务器。这个 API 旨在创建有效的离线体验，它会拦截网络请求并根据网络是否可用采取来适当的动作、更新来自服务器的的资源。它还提供入口以推送通知和访问后台同步 API。

## web worker

web Worker 是一个独立于主线程之外的子线程，因为 Worker 不能读取本地文件，所以脚本必须要从网络中来。主线线程调用 postMessage 向 worker 发送消息（比如发送需要处理的数据）然后通过 onmessage 来获得 woker 处理后的数据，

## web worker 和 service worker 区别

> Web Worker 有两个特点：

1. 只能服务于新建它的页面，不同页面之间不能共享同一个 Web Worker。
2. 当页面关闭时，该页面新建的 Web Worker 也会随之关闭，不会常驻在浏览器中。）

> ServiceWorker 有两个特点：

1. Service Worker 不是服务于某个特定页面的，而是服务于多个页面的
2. （按照同源策略） Service Worker 会常驻在浏览器中，即便注册它的页面已经关闭，Service Worker 也不会停止。本质上它是一个后台线程，只有你主动终结，或者浏览器回收，这个线程才会结束。生命周期、可调用的 API 等等也有很大的不同。）
