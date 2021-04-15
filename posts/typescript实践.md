- [1. TypeScript](#1-typescript)
  - [1.1. 什么是 TypeScript 🧬](#11-什么是-typescript-)
  - [1.2. 安装 TypeScript 🔧](#12-安装-typescript-)
  - [1.3. 项目中使用 TypeScript 📦](#13-项目中使用-typescript-)
    - [1.3.1. 在 React 项目中使用 TypeScript](#131-在-react-项目中使用-typescript)
  - [1.4. TypeScript 知识点 🤔](#14-typescript-知识点-)
    - [1.4.1. 静态类型](#141-静态类型)
    - [1.4.2. 范型(Generics) (🔥 玩转 ts 必须掌握)](#142-范型generics--玩转-ts-必须掌握)
      - [1.4.2.1. 使用范型](#1421-使用范型)
      - [1.4.2.2. 类型约束](#1422-类型约束)
      - [1.4.2.3. 在范型中使用类类型](#1423-在范型中使用类类型)
      - [1.4.2.4. 范型操作符](#1424-范型操作符)
    - [1.4.3. 类（Class）](#143-类class)
    - [1.4.4. Utility Types (🔥 常用)](#144-utility-types--常用)

# 1. TypeScript

## 1.1. 什么是 TypeScript 🧬

`TypeScript` 是一种由微软开发的自由和开源的编程语言，它是 `Javascript` 的一个超集，扩展了 `Javascript` 的语法。 
 
![](https://segmentfault.com/img/bVPAEG?w=308&h=310)

**背景**  
TypeScript 起源于使用 Javascript 开发的大型项目 。由于 Javascript 语言本身的局限性，难以胜任和维护大型项目开发。因此微软开发了 TypeScript ，使得其能够胜任开发大型项目。  
2012 年 10 月，微软发布了首个公开版本的 TypeScript，2013 年 6 月 19 日，在经历了一个预览版之后微软正式发布了正式版 TypeScript。当前最新版本为 TypeScript 4.0

**TypeScript 和 Javascript 的区别**  
TypeScript 是 Javascript 的超集，扩展了 Javascript 的语法，因此现有的 Javascript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。
TypeScript 可处理已有的 Javascript 代码，并只对其中的 TypeScript 代码进行编译。

**有什么特性/功能**

- 类型注解和编译时类型检查
- 类型推断
- 类型擦除
- 类型组合
- 结构化类型系统
- 泛型编程

等等很多强大的功能.... [🔘点我点我](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

## 1.2. 安装 TypeScript 🔧

**安装 TypeScript**

```bash
 npm install -g TypeScript
```

安装完成后我们就可以使用 TypeScript 编译器，名称叫 tsc，可将编译结果生成 js 文件

**编译代码**

```bash
tsc demo.ts
```

编译成功，就会在相同目录下生成一个同名 js 文件

## 1.3. 项目中使用 TypeScript 📦

### 1.3.1. 在 React 项目中使用 TypeScript

想要在 React 项目中使用 TypeScript，可以通过 React 官方的脚手架`create-react-app`创建一个支持 TypeScript 环境的空项目,也可以对已有的 React 项目进行改造。

**1.项目安装 TypeScript**

---

> 要创建一个支持 TypeScript 的 Create React App 项目，可以运行：

```bash
npx create-react-app my-app --template TypeScript
# or
yarn create react-app my-app --template TypeScript
```

这里推荐使用`npx`,不推荐在全局安装`create-react-app`命令，通过 npx 可以保证每次用的`create-react-app`是最新版本的。

---

> 要创建一个已有的 Create React App 项目，需要执行一下命令：

```bash
npm install --save TypeScript @types/node @types/react @types/react-dom @types/jest
# or
yarn add TypeScript @types/node @types/react @types/react-dom @types/jest
```

**2.替换文件后缀**  
执行完命令后，将文件重命名为 TypeScript 文件（例如`src/index.js` 改成 `src/index.tsx`或者`index.ts`),
然后重启一下服务`yarn run start`.重启项目后会生成`tsconfig.json`配置文件，可以在此基础基础上进行配置。

**3.配置 tsconfig.path.json**  
`注意：`下面的配置项是示例，具体的配置，根据项目实际情况配置。

`tsconfig.path.json`这个文件名是自定义的，用于单独设置`TypeScript`的`paths配置`，需要在`tsconfig.json`中 extends 该文件。

设置 paths：通常我们在`webpack`中用`@`符号配置了路径别名，在非 TypeScript 项目中，可以正常识别，但是在 TypeScript 项目中，需要在 paths 配置项添加说明，ts 才能识别@的意思。

设置`baseUrl`来告诉编译器到哪里去查找模块。 所有非相对模块导入都会被当做相对于 `baseUrl`。  
`baseUrl`的值由以下两者之一决定：

- 命令行中 `baseUrl` 的值（如果给定的路径是相对的，那么将相对于当前路径进行计算）
- `tsconfig.json`里的 `baseUrl` 属性（如果给定的路径是相对的，那么将相对于`tsconfig.json`路径进行计算）

`注意:`相对模块的导入不会被设置的 `baseUrl` 所影响，因为它们总是相对于导入它们的文件。

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**4.更多配置项**  
默认情况下，通过`create-react-app`生成的 TypeScript 项目已经有了一份基础的`tsconfig`配置, 对于更多配置项可以通过[点此参考官方文档](https://www.typescriptlang.org/docs/handbook/compiler-options-in-msbuild.html)来查看，根据项目的需求选择合适的配置。

```json
{
  "compilerOptions": {
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "noEmit": true,
    "jsx": "react",
    "isolatedModules": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "downlevelIteration": true
  },
  "include": ["src"],
  "extends": "./tsconfig.paths.json"
}
```

## 1.4. TypeScript 知识点 🤔
### 1.4.1. 静态类型

### 1.4.2. 范型(Generics) (🔥 玩转 ts 必须掌握)

在软件工程中，很重要的一部分就是构建一个不仅具有良好定义和一致性 API，而且还具有可重用性。像 Java 语言一样，Typscript 用于创建可重用组件的主要特性之一也是泛型，也就是说，能够创建可以处理多种类型而不是单个类型的组件。这允许用户使用这些组件并使用自己的类型。

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

为了应对以上的的情况，`TypeScript` 里的范型（Generic）便可以很好的解决。在调用的时候提供一个作用于类型的类型变量（例如`number`），后续便可以获得该类型信息。使用范型和使用`any`很类似，都可以接受任意的类型，但是，`any`会导致类型信息丢失，而范型则会保留类型信息。

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

#### 1.4.2.1. 使用范型

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

#### 1.4.2.2. 类型约束

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

#### 1.4.2.3. 在范型中使用类类型

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

#### 1.4.2.4. 范型操作符

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

    let a = createLabel("TypeScript");
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

### 1.4.3. 类（Class）

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
TypeScript 中的类可以继承（实现）多个接口，继承接口用`implements`,继承基类用`extends`。派生类可以重写基类字段或属性。用 `super .` 的方式访问基类方法或属性。

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
当我们继承内置类型（eg. Error, Array），且编译目标为`ES5`的时候特别需要注意一个地方。在 ES2015 中，在构造函数中调用`super（…）`会隐式地将`this`值替换。对于 `Error`,`Array` 等原生 `class`，他们的 `constructor` 使用了 `new.target` 来调整原型链。但在 `es5` 中无法保证 `new.target` 一定存在，所以会导致继承出来的 `class` 在原型链上缺失。

> `new.target`属性允许你检测函数或构造方法是否是通过 new 运算符被调用的。在通过 new 运算符被初始化的函数或构造方法中，`new.target`返回一个指向构造方法或函数的引用。在普通的函数调用中，`new.target` 的值是`undefined`。

如果 ts 编译目标是 ES5，我们需要做一定的处理。

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);
  }

  sayHello() {
    return "hello " + this.message;
  }
}
new MsgError("good") instanceof MsgError; //ES5 target下为false
console.log(new MsgError("good").sayHello()); //ES5 target下为undefined
```

调整原型链,手动调整 this 的指向，从原先的指向 Error 的，重新指向 MsgError。

```ts
class MsgError extends Error {
  constructor(m: string) {
    super(m);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, MsgError.prototype);
  }

  sayHello() {
    return "hello " + this.message;
  }
}
```

MsgError 的任何子类也必须手动设置原型。对于不支持`Object.setPrototypeOf`对象，则可以使用`__proto__`。

**公共，私有与受保护的修饰符**
|修饰符|描述|
|------|-------|
|public|类成员的默认可见性是 public。公共成员可以在任何地方访问|
|protected|受保护的成员仅对声明它们的类的子类可见。|
|private|private 类似于 protected，但不允许从子类访问成员|

**静态成员**  
这些成员与类的特定实例没有关联。可以通过类构造函数对象本身访问它们.
静态成员还可以使用相同的 public、protected 和 private 可见性修饰符.

```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

覆盖函数原型的属性通常是不安全的/不可能的。因为类本身就是可以用 new 调用的函数，所以不能使用某些静态名称。函数属性（如`name`、`length`和`call`）不能定义为静态成员

```ts
class S {
  static name = "S!";
  //Static property 'name' conflicts with built-in property 'Function.name' of constructor function 'S'.
}
```

泛型类的静态成员永远不能引用类的类型参数。静态成员是共享的，不同的地方实例化同一个类，传进来的的范型类型可能不一样，这是 很不好的。下面的代码将会编译错误

```ts
class Box<Type> {
  static defaultValue: Type;
  //Static members cannot reference class type parameters.
}
```

**参数属性**  
TypeScript 提供了特殊的语法，用于将构造函数参数转换为具有相同名称和值的类属性。这些称为参数属性，通过在构造函数参数前面加上可见性修饰符`public`、`private`、`protected`或`readonly`来创建。结果字段获取这些修饰符：

```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
```

### 1.4.4. Utility Types (🔥 常用)

**`Partial<Type>`**  
构造一个类型，该类型的所有属性都设置为`optional`。返回一个表示给定类型的所有子集的类型。

```ts
interface Todo {
  title: string;
  description: string;
}
type PTodo = Partial<Todo>;
```

**`Required<Type>`**  
构造一个类型，该类型包含类型设置为 `required` 的所有属性。与`partial<T>`相反。

```ts
interface Props {
  a?: number;
  b?: string;
}
type RProps = Required<Props>;
```

**`Readonly<Type>`**  
构造一个类型，该类型的所有属性都设置为 readonly，这意味着无法重新修改所构造类型的属性。

```ts
interface Todo {
  title: string;
}

type RTodo: Readonly<Todo>
```

**`Record<Keys,Type>`**  
构造一个对象类型，其属性键是`keys`，属性值是`Type`。可用于将一个类型的属性映射到另一个类型。

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};
```

**`Pick<Type, Keys>`**  
通过从`Type`中选取一组属性`keys`（字符串字面量或字符串字面量的并集）来构造类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
```

**`Omit<Type, Keys>`**
通过从`Type`中选取所有属性，然后删除`keys`（字符串字面量或字符串字面量的并集）来构造类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;
```

**`Exclude<Type, ExcludedUnion>`**
通过从`Type`中排除可分配给`ExcludedUnion`的所有联合成员来构造类型。

```ts
type T0 = Exclude<"a" | "b" | "c", "a">;
//    ^ = type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
//    ^ = type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;
//    ^ = type T2 = string | number
```

**`Extract<Type, Union>`**
通过从`Type`中提取可分配给`Union`的所有联合成员来构造类型。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
//    ^ = type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;
//    ^ = type T1 = () => void
```

**`NonNullable<Type>`**
通过从`Type`中排除`null`和`undefined`来构造类型。

```ts
type T0 = NonNullable<string | number | undefined>;
//    ^ = type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>;
//    ^ = type T1 = string[]
```

**`Parameters<Type>`**  
从函数类型的参数类型构造一个元祖（`tuple`）或数组类型

```ts
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;
//    ^ = type T0 = []
type T1 = Parameters<(s: string) => void>;
//    ^ = type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>;
//    ^ = type T2 = [arg: unknown]
```

**`ConstructorParameters<Type>`**
从构造函数类型的参数类型构造一个元祖（`tuple`）或数组类型

```ts
type T0 = ConstructorParameters<ErrorConstructor>;
//    ^ = type T0 = [message?: string]
type T1 = ConstructorParameters<FunctionConstructor>;
//    ^ = type T1 = string[]
type T2 = ConstructorParameters<RegExpConstructor>;
//    ^ = type T2 = [pattern: string | RegExp, flags?: string]
type T3 = ConstructorParameters<any>;
//    ^ = type T3 = unknown[]
```

**`ReturnType<Type>`**
构造由函数类型的返回类型组成的类型。

```ts
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;
//    ^ = type T0 = string
```

除了以上这些，还有很多官方实现的类型工具[`InstanceType<Type>`], [`ThisParameterType<Type>`], [`OmitThisParameter<Type>`], [`ThisType<Type>`],[`Lowercase<StringType>`], [`Uppercase<StringType>`], [`Capitalize<StringType>`], [`Uncapitalize<StringType>`].这些都可以在[官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)中可以看到具体的使用案例
