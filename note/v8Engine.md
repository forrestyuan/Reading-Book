##  🏊‍ deep dive into V8 Engine source code

V8是谷歌开源的用c++语言编写的高性能javascript 和 webAssembly引擎。

V8 Engine 既可以单独运行也可以集成到C++应用中。

V8 编译并运行javascript代码，给对象分配内存，并回收垃圾。V8’s `stop-the-world`, `generational`, accurate garbage collector is one of the keys to V8’s performance.

V8提供了ECMA标准中指定的所有数据类型，运算符，对象和函数。

V8能让任何C++应用给Javascript暴露对象或者函数.

### v8 Torque 语言
V8 Torque是一种领域专用语言，类似于TypeScript的语法（可以简化编写和理解V8代码），它也可以与CodeStubAssembler内置程序和C++编写的macro进行交互操作。  
CodeStubAssembler，简称CSA，是V8的一个组件，允许我们直接用C++编写低级别的TurboFan中间层，随后用TurboFan后端将其生成合理结构的机器码。

### 关于排序算法在v8中的实现

原来的v8中`array.sort`排序使用js实现的，且应用了快排和插入排序相结合的方式。
> * In-place QuickSort algorithm.  
> * For short (length <= 22) arrays, insertion sort is used for efficiency.  

但在最新版的v8源码中使用Torque（类似TypeScript）语言实现的一个叫TimSort的排序算法，其实就是归并排序和折半插入排序的混合算法。  

> BinaryInsertionSort is the best method for sorting small arrays:   
> it does few compares, but can do data movement quadratic in the number of elements.   
> This is an advantage since comparisons are more expensive due to calling into JS.  
> [low, high) is a contiguous range of a array, and is sorted via binary insertion. This sort is stable.
> On entry, must have low <= start <= high, and that [low, start) is already sorted. Pass start == low if you do not know!.

**注意：** 原来的sort源码在采用插入排序策略的是临界条件是`length <= 22`, 在最新的sort源码实现中，采用折半插入排序的临界条件是`length <= 64`  .  
```ts
// Compute a good value for the minimum run length; natural runs shorter
// than this are boosted artificially via binary insertion sort.
//
// If n < 64, return n (it's too small to bother with fancy stuff).
// Else if n is an exact power of 2, return 32.
// Else return an int k, 32 <= k <= 64, such that n/k is close to, but
// strictly less than, an exact power of 2.
//
// See listsort.txt for more info.
macro ComputeMinRunLength(nArg: Smi): Smi {
  let n: Smi = nArg;
  let r: Smi = 0;  // Becomes 1 if any 1 bits are shifted off.

  assert(n >= 0);
  while (n >= 64) {
    r = r | (n & 1);
    n = n >> 1;
  }

  const minRunLength: Smi = n + r;
  assert(nArg < 64 || (32 <= minRunLength && minRunLength <= 64));
  return minRunLength;
}
```
排序算法实现的源码路径：  
`third_party/v8/builtins/array-sort.tq`