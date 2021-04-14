- [1. Typescript](#1-typescript)
  - [1.1. 什么是 Typescript](#11-什么是-typescript)
  - [1.2. Typescript 知识点](#12-typescript-知识点)
    - [1.2.1. 范型(Generics)](#121-范型generics)
      - [1.2.1.1. 1). 使用范型](#1211-1-使用范型)
      - [1.2.1.2. 2). 类型约束](#1212-2-类型约束)
      - [1.2.1.3. 3). 在范型中使用类类型](#1213-3-在范型中使用类类型)
      - [1.2.1.4. 4). 范型操作符](#1214-4-范型操作符)
    - [1.2.2. 类（Class）](#122-类class)

# 1. Typescript

## 1.1. 什么是 Typescript

Typescript 是 javascript 的超集。

## 1.2. Typescript 知识点

### 1.2.1. 范型(Generics)

在软件工程中，很重要的一部分就是构建一个不仅具有良好定义和一致性 API，而且还具有可重用性。像 C#和 Java 等语言一样，Typscript 用于创建可重用组件的主要特性之一也是泛型，也就是说，能够创建可以处理多种类型而不是单个类型的组件。这允许用户使用这些组件并使用自己的类型。

如下面的代码，在没使用范型特性前，我们通常会给`demo`函数使用具体的`number`类型或`any`类型，使用`number`可以保证类型信息的存在，但是可复用性性将会降低。然而使用`any`可以让复用的程度提升，但是会因此丢失类型信息，无论给的是什么参数，`demo`函数都将只返回`any`类型，使得程序的健壮性极度降低。

```ts
function demo(arg: number): number {
  return arg;
}
```

```ts
function demo(arg: any): any {
  return arg;
}
```

为了应对以上的的情况，`typescript` 里的范型（Generic）便可以很好的解决。在调用的时候提供一个作用于类型的类型变量（例如`number`），后续便可以获得该类型信息。使用范型和使用`any`很类似，都可以接受任意的类型，但是，`any`会导致类型信息丢失，而范型则会保留类型信息。

```ts
function demo<Type>(arg: Type): Type {
  return arg;
}
//调用
let output = demo<string>("myString");
//OR
let output2 = demo("myString");
```

如上代码，使用一对尖括号`<>` 声明一个范型，在调用的时候，我们可以显示传递一个类型变量，而是交由`typescirpt`类型参数推断。这将使得代码更简洁和高可读性。

#### 1.2.1.1. 1). 使用范型

- **🚀 范型函数**  
  跟前面代码例子，声明一个范型函数和非范型函数区别不大，唯一的就是多了范型的定义。

  ```ts
  //声明函数
  function identity<Type>(arg: Type): Type {
    return arg;
  }
  //函数表达式
  let myIdentity: <Type>(arg: Type) => Type = identity;
  ```

- **🚀 范型接口**  
  在接口中使用范型，在接口名后加上`<Type>`。接口的所有成员都可以使用传递进来的类型。

  ```ts
  interface GenericIdentityFn<Type> {
    (arg: Type): Type;
  }
  function identity<Type>(arg: Type): Type {
    return arg;
  }
  let myIdentity: GenericIdentityFn<number> = identity;
  ```

- **🚀 范型类**  
  根范型接口的定义很类似，在类名后加上`<Type>`。类的所有成员除了静态成员都可以使用传递进来的类型。

  ```ts
  class GenericNumber<NumType> {
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
  }

  let myGenericNumber = new GenericNumber<number>();
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };
  ```

#### 1.2.1.2. 2). 类型约束

有时候我们不想使用任何类型，而是希望将此函数约束为使用同样具有特定属性的任何类型。只要类型有这个成员，我们就允许它。要做到这一点，我们必须将我们可以对类型进行约束。

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}
```

在泛型约束中使用类型参数

```ts
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); //报错，m不在x的key中
```

#### 1.2.1.3. 3). 在范型中使用类类型

```ts
function create<Type>(c: { new (): Type }): Type {
  return new c();
}
```

```ts
class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
```

#### 1.2.1.4. 4). 范型操作符

- `keyof`  
   keyof 运算符采用对象类型并生成其 key 的`string`或`number`的字面并集：

  ```ts
  type Arrayish = { [n: number]: unknown };
  type A = keyof Arrayish;
  //   ^ = type A = number

  type Mapish = { [k: string]: boolean };
  type M = keyof Mapish;
  //   ^ = type M = string | number 这里是因为[0]与["0"]在对象key中总是相等的，number会被强制转换为string
  ```

- `typeof`  
   TypeScript 添加一个 typeof 运算符，您可以在类型上下文中使用该运算符来引用变量或属性的类型：

  ```ts
  let s = "hello";
  let n: typeof s;
  ```

- `ReturnType<T>`  
   接受函数类型并生成其返回类型。

  ```ts
  type Predicate = (x: unknown) => boolean;
  type K = ReturnType<Predicate>;
  //   ^ = type K = boolean

  function f() {
    return { x: 10, y: 3 };
  }
  type P = ReturnType<typeof f>;
  ```

- 索引访问类型  
   我们可以使用索引访问类型来查找其他类型的特定属性：

  ```ts
  type Person = { age: number; name: string; alive: boolean };
  type Age = Person["age"];
  //   ^ = type Age = number
  ```

  索引类型本身就是一种类型，因此我们可以完全使用 unions、keyof 或其他类型：

  ```ts
  type I1 = Person["age" | "name"];
  //   ^ = type I1 = string | number

  type I2 = Person[keyof Person];
  //   ^ = type I2 = string | number | boolean

  type AliveOrName = "alive" | "name";
  type I3 = Person[AliveOrName];
  //   ^ = type I3 = string | boolean
  ```

  当索引的属性不存在时会报错提示。除了索引声明的类型外，还可以对对象进行类型的获取。

  ```ts
  const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
  ];

  type Person = typeof MyArray[number];
  //   ^ = type Person = {
  //       name: string;
  //       age: number;
  //   }
  type Age = typeof MyArray[number]["age"];
  //   ^ = type Age = number
  ```

- 条件类型  
   条件类型看起来很像 js 中的条件表达式,但是也只是看起来像。

  ```ts
    SomeType extends OtherType ? TrueType : FalseType;
  ```

  此能力让类型定义变的更加灵活，需要注意：`extends` 运用在 type 和 class 中时完全是两种作用的效果。当`extends`左边的类型可分配给右边的类型时，您将获得第一个分支（“true”分支）中的类型；否则您将获得后一个分支（“false”分支）中的类型。

  - **📎 优化重载场景**

    ```ts
    interface IdLabel {
      id: number;
    }
    interface NameLabel {
      name: string;
    }
    function createLabel(id: number): IdLabel;
    function createLabel(name: string): NameLabel;
    function createLabel(nameOrId: string | number): IdLabel | NameLabel;
    function createLabel(nameOrId: string | number): IdLabel | NameLabel {
      throw "unimplemented";
    }
    ```

    对上面重载进行优化：

    ```ts
    type NameOrId<T extends number | string> = T extends number
      ? IdLabel
      : NameLabel;

    function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
      throw "unimplemented";
    }

    let a = createLabel("typescript");
    //  ^ = let a: NameLabel
    ```

  - **📎 条件类型约束**  
    就像使用类型保护缩小范围可以为我们提供更具体的类型一样，条件类型的`true`分支将进一步约束泛型。

    ```ts
    type MessageOf<T extends { message: unknown }> = T["message"];

    interface Email {
      message: string;
    }

    interface Dog {
      bark(): void;
    }

    type EmailMessageContents = MessageOf<Email>;
    ```

    上面的代码我们只能拿到满足约束条件的类型。但是如果我们想要`MessageOf`可以接收任意类型，在满足约束条件下，返回`T['message']`,不满足约束条件下，返回`never`或其它，我们可以将约束条件移到外面，并使用条件类型。

    ```ts
    type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;
    ```

  - **📎 条件类型推断 infer**  
    `infer` 相当与一个占位符，常常结合`extends ？：`使用，可以取到所占位置的类型。

    ```ts
    type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
      ? Return
      : never;

    type Num = GetReturnType<() => number>;
    //   ^ = type Num = number

    type Str = GetReturnType<(x: string) => string>;
    //   ^ = type Str = string

    type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
    //   ^ = type Bools = boolean[]
    ```

    > 一道来源于 leetcode 招聘的 infer 应用

    ```ts
    interface Action<T> {
      payload?: T;
      type: string;
    }

    class EffectModule {
      count = 1;
      message = "hello!";

      delay(input: Promise<number>) {
        return input.then((i) => ({
          payload: `hello ${i}!`,
          type: "delay",
        }));
      }

      setMessage(action: Action<Date>) {
        return {
          payload: action.payload!.getMilliseconds(),
          type: "set-message",
        };
      }
    }

    // 修改 Connect 的类型，让 connected 的类型变成预期的类型
    type Connect = (module: EffectModule) => any;

    const connect: Connect = (m) => ({
      delay: (input: number) => ({
        type: "delay",
        payload: `hello 2`,
      }),
      setMessage: (input: Date) => ({
        type: "set-message",
        payload: input.getMilliseconds(),
      }),
    });

    type Connected = {
      delay(input: number): Action<string>;
      setMessage(action: Date): Action<number>;
    };

    export const connected: Connected = connect(new EffectModule());
    ```

    > 题解

    ```ts
    //利用类型分发和class可以取值来做，如果是函数，那就提取，否则就不提取
    //这里同时利用value如果是never 则keyof就不会返回。
    //这段其实挺有启发性，因为很多时候，都想搞个循环判断类型，然后进行选择，这就是个很好的范例。
    type MethodName<T> = {
      [F in keyof T]: T[F] extends Function ? F : never;
    }[keyof T];
    type EE = MethodName<EffectModule>;

    type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
    type asyncMethodConnect<T, U> = (input: T) => Action<U>;
    type syncMethod<T, U> = (action: Action<T>) => Action<U>;
    type syncMethodConnect<T, U> = (action: T) => Action<U>;

    type EffectMethodAssign<T> = T extends asyncMethod<infer U, infer V>
      ? asyncMethodConnect<U, V>
      : T extends syncMethod<infer U, infer V>
      ? syncMethodConnect<U, V>
      : never;

    type Connect = (
      module: EffectModule
    ) => {
      [F in MethodName<typeof module>]: EffectMethodAssign<typeof module[F]>;
    };
    ```

    > https://blog.csdn.net/yehuozhili/article/details/108253532  
    > https://juejin.cn/post/6844904067420913678

  - **📎 条件分发类型（可分配条件类型）**
    当条件类型作用于泛型类型时，当给定一个并集类型时，它们就成为可分配的。

    ```ts
    type ToArray<Type> = Type extends any ? Type[] : never;
    ```

    如果在`ToArray`中插入一个联合类型，那么条件类型将应用于该联合的每个成员。

    ```ts
    type ToArray<Type> = Type extends any ? Type[] : never;

    type StrArrOrNumArr = ToArray<string | number>;
    //   ^ = type StrArrOrNumArr = string[] | number[]
    ```

    很明显此时返回的类型是将`string|number` 返回成 `string[]|number[]`。如果我们想要返回的结果是`(string|number)[]`, 此时我们可以给`extends`两边的类型用`[]`括起来。

    ```ts
    type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

    // 'StrOrNumArr' is no longer a union.
    type StrOrNumArr = ToArrayNonDist<string | number>;
    //   ^ = type StrOrNumArr = (string | number)[]
    ```

- 映射类型
  某些场景下我们可能想要利用已经声明的类型中的部分属性来构建新的类型.
  映射类型使用通过`keyof`创建的`union`来迭代一个类型的`key`以创建另一个类型的泛型类型

  ```ts
  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };
  ```

  - **📎 映射修饰符**  
    有两个附加的修饰符可以在映射期间应用：`readonly`和`？`分别影响可变性和可选性。
    可以通过在前面加上`-`或`+`，来删除或添加这些修饰符。如果不添加前缀，则默认为`+`。

    ```ts
    // Removes 'readonly' attributes from a type's properties
    type CreateMutable<Type> = {
      -readonly [Property in keyof Type]: Type[Property];
    };

    // Removes 'optional' attributes from a type's properties
    type Concrete<Type> = {
      [Property in keyof Type]-?: Type[Property];
    };
    ```

    在 TypeScript 4.1 及更高版本中，可以使用映射类型中的`as`子句重新映射映射映射类型中的键。

    ```ts
    //使用模版字符
    type Getters<Type> = {
      [Property in keyof Type as `get${Capitalize<
        string & Property
      >}`]: () => Type[Property];
    };

    //删除指定属性
    type RemoveKindField<Type> = {
      [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
    };
    ```

### 1.2.2. 类（Class）

ts 全面支持 ES2015 的`class`关键字。在面向对象语言入 java 中，我们经常会接触到类，面向对象的三大特性封装、继承、多态。使用类，我们可以写出健壮高可复用性的代码。声明一个类：

```ts
class Point {}
```

默认情况下，声明的类属性都是可以覆盖的。在属性名称前加上`readonly` 修饰符，则改属性将不能被覆盖。

**构造函数 🐶**  
类构造函数与函数非常相似。可以添加带有类型注释、默认值和重载的参数。构造函数不能传递类型参数，不能添加返回类型，构造函数返回的永远都是类实例类型

```ts
class Point {
  x: number;
  constructor(x = 0, y = 0) {
    this.x = x;
  }
}
//重载构造函数
class Point {
  // Overloads
  constructor(x: number, y: string);
  constructor(s: string);
  constructor(xs: any, y?: any) {
    // TBD
  }
}
```

**调用父类构造函数`super()`🐶**  
`super`关键字常常用于调用父类的成员属性或方法。`eg: super.age`。`super()`则是调用父类的构造函数，当我们在子类构造函数中使用`this`关键字的是否，需要在使用`this`之前调用`super()`方法。

**索引签名 🐶**  
类可以声明索引签名；它们的工作方式与其他对象类型的索引签名相同，这个特性用的比较少

```ts
class MyClass {
  [s: string]: boolean | ((s: string) => boolean);
  check(s: string) {
    return this[s] as boolean;
  }
}
```

**类继承**  
typescript 中的类可以继承（实现）多个接口，继承接口用`implements`,继承基类用`extends`。派生类可以重写基类字段或属性。用 `super .` 的方式访问基类方法或属性。

```ts
//继承多接口
interface A {}
interface B {}
class C implements A, B {}
```

在实例化派生类的时候，推荐用基类作为实例的类型。

```ts
class Base {}
class Derive extends Base {}

const dins: Base = new Derive();
```

**初始化顺序**  
类初始化顺序是：

```
基类字段已初始化
基类构造函数运行
派生类字段已初始化
派生类构造函数运行
```
**继承内置类型**
