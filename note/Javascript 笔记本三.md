# javascript 笔记本三

## JS Array 源码
```c++
// The JSArray describes JavaScript Arrays
//  Such an array can be in one of two modes:
//    - fast, backing storage is a FixedArray and length <= elements.length();
//       Please note: push and pop can be used to grow and shrink the array.
//    - slow, backing storage is a HashTable with numbers as keys.
class JSArray: public JSObject {
 public:
  // [length]: The length property.
  DECL_ACCESSORS(length, Object)
    
  // ...
   
  // Number of element slots to pre-allocate for an empty array.
  static const int kPreallocatedArrayElements = 4;
};
```
JSArray 是继承自 JSObject 的，所以在 JavaScript 中，数组可以是一个特殊的对象  
JSArray 继承于 JSObject ，从注释上看，它有两种存储方式：  
* fast：存储结构是 FixedArray ，并且数组长度 <= elements.length() ，push 或 pop 时可能会伴随着动态扩容或减容  
* slow：存储结构是 HashTable（哈希表），并且数组下标作为 key

fast 模式下数组在源码里面叫 FastElements ，而 slow 模式下的叫做 SlowElements 。  
1. 快数组（FastElements）  
FixedArray 是 V8 实现的一个类似于数组的类，它表示一段连续的内存，可以使用索引直接定位。新创建的空数组默认就是快数组。当数组满（数组的长度达到数组在内存中申请的内存容量最大值）的时候，继续 push 时， JSArray 会进行动态的扩容，以存储更多的元素。  

2. 慢数组（SlowElements）  
慢数组以哈希表的形式存储在内存空间里，它不需要开辟连续的存储空间，但需要额外维护一个哈希表，与快数组相比，性能相对较差。  

当处于以下情况时，快数组会被转变为慢数组：  

* 当加入的索引值 index 比当前容量 capacity 差值大于等于 1024 时（index - capacity >= 1024）  
* 快数组新容量是扩容后的容量 3 倍之多时  

## LRU 缓存淘汰策略

浏览器中的缓存是一种在本地保存资源副本，它的大小是有限的，当我们请求数过多时，缓存空间会被用满，此时，继续进行网络请求就需要确定缓存中哪些数据被保留，哪些数据被移除，这就是`浏览器缓存淘汰策略`，最常见的淘汰策略有 FIFO（先进先出）、LFU（最少使用）、LRU（最近最少使用）。  

LRU （ Least Recently Used ：最近最少使用 ）缓存淘汰策略，故名思义，就是根据数据的历史访问记录来进行淘汰数据，其核心思想是 如果数据最近被访问过，那么将来被访问的几率也更高 ，优先淘汰最近没有被访问到的数据。
![LRU缓存淘汰策略](https://raw.githubusercontent.com/forrestyuan/Reading-Book/master/assets/LRU缓存淘汰策略.png)

### LRU 在 keep-alive (Vue) 上的实现
1. keep-alive
keep-alive 在 vue 中用于实现组件的缓存，当组件切换时不会对当前组件进行卸载。
```html
<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

在 2.5.0 版本中，[keep-alive](https://github.com/vuejs/vue/blob/dev/src/core/components/keep-alive.js) 新增了 max 属性，用于最多可以缓存多少组件实例，一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉，看，这里就应用了 LRU 算法。即在 keep-alive 中缓存达到 max，新增缓存实例会优先淘汰最近没有被访问到的实例🎉🎉🎉
```js
// --------------------------------------------------
      // 如果在缓存里有则调整，
      // 没有则放入（长度超过 max，则淘汰最近没有访问的）
      // --------------------------------------------------
      // 如果命中缓存，则从缓存中获取 vnode 的组件实例，
      // 并且调整 key 的顺序放入 keys 数组的末尾
```