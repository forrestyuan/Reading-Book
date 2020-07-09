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

### indexOf 源码
```c++
Object* String::IndexOf(Isolate* isolate, Handle<Object> receiver,
                        Handle<Object> search, Handle<Object> position) {
  if (receiver->IsNullOrUndefined(isolate)) {
    THROW_NEW_ERROR_RETURN_FAILURE(
        isolate, NewTypeError(MessageTemplate::kCalledOnNullOrUndefined,
                              isolate->factory()->NewStringFromAsciiChecked(
                                  "String.prototype.indexOf")));
  }
  Handle<String> receiver_string;
  ASSIGN_RETURN_FAILURE_ON_EXCEPTION(isolate, receiver_string,
                                     Object::ToString(isolate, receiver));

  Handle<String> search_string;
  ASSIGN_RETURN_FAILURE_ON_EXCEPTION(isolate, search_string,
                                     Object::ToString(isolate, search));

  ASSIGN_RETURN_FAILURE_ON_EXCEPTION(isolate, position,
                                     Object::ToInteger(isolate, position));

  uint32_t index = receiver_string->ToValidIndex(*position);
  return Smi::FromInt(
      String::IndexOf(isolate, receiver_string, search_string, index));
}
```
确定字符编码对应的查找方法
```c++
int String::IndexOf(Isolate* isolate, Handle<String> receiver,
                    Handle<String> search, int start_index) {
  DCHECK_LE(0, start_index);
  DCHECK(start_index <= receiver->length());

  uint32_t search_length = search->length();
  if (search_length == 0) return start_index;

  uint32_t receiver_length = receiver->length();
  if (start_index + search_length > receiver_length) return -1;

  receiver = String::Flatten(isolate, receiver);
  search = String::Flatten(isolate, search);

  // 不开gc vectors保持有效
  DisallowHeapAllocation no_gc;  // ensure vectors stay valid
  // Extract flattened substrings of cons strings before getting encoding.
  // 获取扁平字串？
  String::FlatContent receiver_content = receiver->GetFlatContent();
  String::FlatContent search_content = search->GetFlatContent();

  // dispatch on type of strings
  // 根据字符串编码类型
  if (search_content.IsOneByte()) {
    Vector<const uint8_t> pat_vector = search_content.ToOneByteVector();
    return SearchString<const uint8_t>(isolate, receiver_content, pat_vector,
                                       start_index);
  }
  Vector<const uc16> pat_vector = search_content.ToUC16Vector();
  return SearchString<const uc16>(isolate, receiver_content, pat_vector,
                                  start_index);
}
```
我们进到 src/string-search.h 中来，
```c++
template <typename SubjectChar, typename PatternChar>
int SearchString(Isolate* isolate,
                 Vector<const SubjectChar> subject,
                 Vector<const PatternChar> pattern,
                 int start_index) {
  StringSearch<PatternChar, SubjectChar> search(isolate, pattern);
  return search.Search(subject, start_index);
}
```
里面定义了几种搜索算法
```
LinearSearch
BoyerMooreSearch
BoyerMooreHorspoolSearch
InitialSearch
SingleCharSearch
```
具体使用哪种，是由初始化StringSearch时定义的
```c++
StringSearch(Isolate* isolate, Vector<const PatternChar> pattern)
      : isolate_(isolate),
        pattern_(pattern),
        start_(Max(0, pattern.length() - kBMMaxShift)) {
    if (sizeof(PatternChar) > sizeof(SubjectChar)) {
      if (!IsOneByteString(pattern_)) {
        strategy_ = &FailSearch;
        return;
      }
    }
    int pattern_length = pattern_.length();
    if (pattern_length < kBMMinPatternLength) {
      if (pattern_length == 1) {
        strategy_ = &SingleCharSearch;
        return;
      }
      strategy_ = &LinearSearch;
      return;
    }
    strategy_ = &InitialSearch;
  }

  int Search(Vector<const SubjectChar> subject, int index) {
    return strategy_(this, subject, index);
  }
```

### split 源码
[split在v8中实现](https://github.com/v8/v8/blob/fc5765ce7901767ba9298241454f736c17b4f9b3/src/builtins/builtins-string-gen.cc#L1414)