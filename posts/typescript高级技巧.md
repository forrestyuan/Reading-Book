# 总结日常使用的 Typescript 高级技巧

## 技巧

1. 使用范型来代替 any

   如果使用 any，在任何情况下，我们都只能知道返回的类型是 any，而无法更确切的知道具体的类型

   - 函数中使用范型

   ```ts
   //NOT GOOD
   function identity(arg: any): any {
     return arg; //获得的类型型始终是any
   }
   //GOOD
   function identity<T>(arg: T): T {
     return arg; //获得的类型是 T
   }
   ```

   - 范型类

   ```ts
   class GenericNumber<NumType> {
     zeroValue: NumType;
     add: (x: NumType, y: NumType) => NumType;
   }

   let myGenericNumber = new GenericNumber<Number>();
   myGenericNumber.zeroValue = 0;
   myGenricNumber.add = function (x, y) {
     return x + y;
   };
   ```

2. `keyof`

    `keyof'主要用于取得任意类型`T`上的已知的 key 的 union

    ```ts
    interface Person{
      name:string
      age:string
    }
    let personTypeKeys = keyof Person;
    // === let personTypeKeys = 'name' | 'age'

    function getProperty<T, K extends keyof T>(o:T, name:K):T[K]{
      return o[name]
    }
    ```

3.  `Record<T, U>`

    在 Typescript 标准库里，对于`Record`的定义如下

    ```ts
    type Record<K extends string, T> = {
      [P in K]: T;
    };
    ```

    ```ts
    //use
    type langVal = 0 | 1 | 2;
    type Lang = "zh-hans" | "zh-hant" | "en";

    const indexMap: Record<Lang, langVal> = {
      "zh-hans": 0,
      "zh-hant": 1,
      en: 2,
    };
    ```

4.  `Pick<T>`

    在 Typescript 标准库里，对于`Pick`的定义如下

    ```ts
    type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
    };
    ```

    ```ts
    //使用
    interface person {
      age: number;
      name: string;
      sex: number;
    }

    type fox = Pick<person, "age" | "name">;
    //等同于:
    type fox = { age: number; name: string };
    ```

5.  `Partial<T>`

    在 Typescript 标准库里，对于`Partial`的定义如下

    ```ts
    type Partial<T> = {
      [P in keyof T]?: T[P];
    };
    ```

    ```ts
    //使用

    interface person {
      age: number;
      name: string;
      sex: number;
    }
    type PersonPartial = Partial<Person>;

    //等同于
    type PersonPartial = {
      name?: string;
      age?: number;
      sex?: number;
    };
    ```

6.  `Exclude<T, U>`

    `Exclude<T, U>` -- 从 T 中剔除可以赋值给 U 的类型

    ```ts
    type AD = "a" | "b" | "c" | "d";
    type AF = "a" | "c" | "f";

    type T00 = Exclude<AD, AF>; // "b" | "d"
    ```

7. `Extract<T, U>`
      
    `Extract<T, U> `-- 提取 T 中可以赋值给 U 的类型。

    ```ts
    type AD = "a" | "b" | "c" | "d";
    type AF = "a" | "c" | "f";

    type T01 = Extract<AD, AF>; // "a" | "c"
    ```

8. 条件类型（Condition Type）

    类似于三目运算符`?:`

    ```ts
    interface Animal {
      live(): void;
    }
    interface Dog extends Animal {
      woof(): void;
    }

    type Example1 = Dog extends Animal ? number : string;
    //   ^ = type Example1 = number
    ```

9.  `ReturnType<T>`

    ReturnType<T> -- 获取函数返回值类型。

    ```ts
    function f1(s: string) {
      return { a: 1, b: s };
    }
    type T14 = ReturnType<typeof f1>;
    // { a: number, b: string }
    ```

10. `Required<T>`

    将类型 T 中所有的属性变为必选项。

    ```ts
    type Required<T> = {
      [P in keyof T]-?: T[P];
    };
    ```

## Q&A

1. **类型定义文件(.d.ts)如何放置**

    A: 这个好像业界也没有特别统一的规范，我的想法如下：

    临时的类型，直接在使用时定义

    如自己写了一个组件内部的 Helper，函数的入参和出参只供内部使用也不存在复用的可能，可以直接在定义函数的时候就在后面定义。
    function format(input: {k: string}[]): number[] { /\*\*\*/ }
    复制代码

    组件个性化类型，直接定义在 ts(x)文件中

    如 AntD 组件设计，每个单独组件的 Props、State 等专门定义了类型并 export 出去。

    ```ts
    // Table.tsx
    export type TableProps = {
      /***/
    };
    export type ColumnProps = {
      /***/
    };
    export default function Table() {
      /***/
    }
    ```

    这样使用者如果需要这些类型可以通过 import type 的方式引入来使用。

    范围/全局数据，定义在.d.ts 文件中

    全局类型数据，这个大家毫无异议，一般根目录下有个 typings 文件夹，里面会存放一些全局类型定义。
    假如我们使用了 css module，那么我们需要让 TS 识别.less 文件(或者.scss)引入后是一个对象，可以如此定义：

    ```ts
    declare module "*.less" {
      const resource: { [key: string]: string };
      export = resource;
    }
    ```

    而对于一些全局的数据类型，如后端返回的通用的数据类型，我也习惯将其放在 typings 文件夹下，使用 Namespace 的方式来避免名字冲突，如此可以节省组件 import 类型定义的语句。

    ```ts
    declare namespace EdgeApi {
      interface Department {
        description: string;
        gmt_create: string;
        gmt_modify: string;
        id: number;
        name: string;
      }
    }
    ```

    这样，每次使用的时候，只需要 const department: EdgeApi.Department 即可，节省了不少导入的精力。开发者只要能约定规范，避免命名冲突即可。
