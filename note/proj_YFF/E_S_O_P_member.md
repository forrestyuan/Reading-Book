1. 在较旧的JavaScript环境中使用MobX(看mobx文档-配置栏)

默认情况下，MobX使用Proxy来获得最佳性能和兼容性。但是在较旧的JavaScript引擎Proxy上不可用 (请查看 Proxy support)。例如Internet Explorer（Edge之前），Node.js <6，iOS <10，RN 0.59之前的Android或iOS上的Android。

在这种情况下，MobX可以回退到与ES5兼容的实现，该实现几乎相同地工作，尽管不使用Proxy有一些限制limitations without Proxy support。您将必须通过配置明确启用降级方案 useProxies:
```js
import { configure } from "mobx"

configure({ useProxies: "never" }) // Or "ifavailable".
```