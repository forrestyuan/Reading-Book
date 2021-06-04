## webpack内部模块机制
  * webpack 构建原理
  * tapable构建流程管控
## 抽象语法树
  * 状态机，正则匹配， AST
  * 代码编译流程
  * 手写一个
## bundle、bundleless
  * tree shaking

> 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

* entry-option(初始化 option)
* run(开始编译)
* make(从 entry 开始递归的分析依赖，对每个依赖模块进行 build)
* before-resolve(对模块位置进行解析)
* build-modue(开始构建某个模块)
* normal-modue-loader(将 load 而加载完成的 module 进行编译，生成 AST 树)
* program(遍历 AST，当遇到 require 等一些调用表达式时，收集依赖)
* seal(所有依赖 build 完成，开始优化)
* emit(输出到 dist 目录)



> 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

* loader:  loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。本质上，webpack loader 将所有类型的文件，转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。

* plugin； loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

* 开发一个 loader 同时也可能需要安装其他的插件，比如开发一个解析 markdown 文件的 loader，可能需要用到 marked 插件，总而言之最终 loader 无论如何输出的结果只有两种
  * 生成一段 js 代码供给 webpack 直接使用
  * 如果不能生成一段 js 代码就必须把输出的数据交给下一个 loader 进行处理，就比如 css-loader 后面必须使用 style-loader 才能正常打包 css 文件，因为 css-loader 生成的数据 webpack 无法直接使用
* 开发一个 Plugin 需要将任务挂载在 webpack 生命周期的钩子（相当于事件监听）上才能实现
  * webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。
  * 我们可以发现，几乎每一个插件使用的时候都要 new 一个新对象，所以我们可以使用创建一个构造函数（类）的方法创建一个新插件，内部添加一个 apply 方法
  * apply 接受一个 webpack 核心对象参数 compiler，使用 compiler 对象中的 compiler.hooks.钩子.tap()方法的方式实现插件的加载,例如：
  ```js
      class MyPlugin {
      apply(compiler) {
        compiler.hooks.钩子.tap('MyPlugin', compilation =>{
        	...
        })
      }
    }
  ```