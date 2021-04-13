- [Typescript](#typescript)
  - [什么是 Typescript](#什么是-typescript)
  - [Typescript 知识点](#typescript-知识点)
    - [范型(Generics)](#范型generics)

# Typescript

## 什么是 Typescript

Typescript 是 javascript 的超集。

## Typescript 知识点

### 范型(Generics)

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

1. 使用范型  
    **🚀 范型函数**  
    跟前面代码例子，声明一个范型函数和非范型函数区别不大，唯一的就是多了范型的定义。

   ```ts
   //声明函数
   function identity<Type>(arg: Type): Type {
     return arg;
   }
   //函数表达式
   let myIdentity: <Type>(arg: Type) => Type = identity;
   ```

   **🚀 范型接口**  
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

   **🚀 范型类**  
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

2. 类型约束  
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

3. 在范型中使用类类型

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

4. 范型操作符

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

     **📎 优化重载场景**

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

     **📎 条件类型约束**  
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

     **📎 条件类型推断 infer**
      https://blog.csdn.net/yehuozhili/article/details/108253532
      https://juejin.cn/post/6844904067420913678
5.
