# yarn workspace

## yarn 工作区

随着时间的推移，项目将变得越来越大，并且，有时候一些项目在其它项目中可能被依赖。例如，通用的测试工具`jest`，衍生了很多 packages。其中的`jest-snapshot`就被用于像`chai-jest-snapshot`这样的项目中。

### Monorepos

那些尝试过将一个项目拆分为多个包的人知道一次跨多个包进行更改有多难。为了简化这个过程，一些大型项目采用了 monorepo 方法或多包存储库，这减少了跨包编写代码的负担。JavaScript 开发人员最常使用的几个项目都作为 monorepos 进行管理：Babel、React、Jest、Vue 和 Angular。  
然而，将项目的各个部分分离到它们自己的文件夹中有时是不够的。测试、管理依赖关系和发布多个包很快就会变得复杂，许多这样的项目采用了诸如 Lerna 之类的工具来简化 monorepos 的工作。

### Lerna

Learn 是一个优化使用 npm 和 git 管理的多包仓库工作流的工具，在内部，它使用 Yarn 或 npm 的 cli 启动（即为每个包安装所有第三方依赖项）项目。简而言之，Lerna 为项目中的每个包调用`yarn/npm install`，然后在相互引用的包之间创建 symlinks。  
作为包管理器，Lerna 无法有效地操作节点模块的内容：

- Lerna 为每个包多次调用 yarn install，这会产生开销，因为每个包`package.json`被认为是独立的，它们之间不能共享依赖关系。这会导致每个`node_modules`文件夹大量重复，这些文件夹通常使用相同的第三方软件包。
- Lerna 在安装完成后手动创建相互引用的包之间的链接。这在包管理器可能不知道的 node_modules 中引入了不一致性，因此从包中运行 yarn install 可能会破坏 Lerna 管理的元结构。

诸如此类的问题使作为包管理器开发人员的我们确信，我们应该直接在 Yarn 中支持多包存储库。从 Yarn 0.28 开始支持这样的存储库。

## yarn workspace 简介

yarn workspace 是一个允许用户从根目录下的多个子目录中的 packge.json 中安装依赖的特性。yarn 管理的 workspace 可以更快，更轻安装依赖，通过防止重复安装。Yarn 也可以在不同的互相依赖的 workspace 中创建软链接（symlink），并确保所有目录的一致性和正确性。

## 使用 yarn workspace 特性

从 yarn 1.0 开始，workspace 的特性默认开启，不需要手动开启特性。

```bash
yarn config set workspaces-experimental true
```

以 Jest 项目为例子：

```
| jest/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ package.json
| -------- jest-diff/
| ------------ package.json
...
```

最顶层的 package.json 定义项目的根目录，以及其他文件夹包含 package.json 文件的是工作区。虽然根目录不应该作为包使用，但它通常包含粘合代码或特定于业务的代码，这些代码对于与其他项目共享没用，这就是为什么我们将其标记为“private”的原因。

下面的示例是一个简化的根 packge.json 文件，它为项目启用工作区，并定义项目构建和测试环境所需的第三方包。

```json
{
  "private": true,
  "name": "jest",
  "devDependencies": {
    "chalk": "^2.0.1"
  },
  "workspaces": ["packages/*"]
}
```

下面是两个 Jest 下的两个 workspace：

1. jest-matcher-utils Workspace:

```json
{
  "name": "jest-matcher-utils",
  "description": "...",
  "version": "20.0.3",
  "license": "...",
  "main": "...",
  "browser": "...",
  "dependencies": {
    "chalk": "^1.1.3",
    "pretty-format": "^20.0.3"
  }
}
```

2. jest-diff Workspace that depends on jest-matcher-utils:

```json
{
  "name": "jest-diff",
  "version": "20.0.3",
  "license": "...",
  "main": "...",
  "browser": "...",
  "dependencies": {
    "chalk": "^1.1.3",
    "diff": "^3.2.0",
    "jest-matcher-utils": "^20.0.3",
    "pretty-format": "^20.0.3"
  }
}
```

如果我们单单使用 lerna 来管理依赖，lerna 会首先执行`yarn install`,然后`yarn link`生成`软链`,那么我们会得到下面的依赖情况：

```json
| jest/
| ---- node_modules/
| -------- chalk/
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- pretty-format/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ---------------- diff/
| ---------------- jest-matcher-utils/  (symlink) -> ../jest-matcher-utils
| ---------------- pretty-format/
| ------------ package.json
...
```

如果我们使用 yarn 来管理。yarn 会生成一个更优的依赖结构，通过在项目的任何地方执行`yarn install`，我们可以得到下面的依赖关系：

```json
| jest/
| ---- node_modules/
| -------- chalk/
| -------- diff/
| -------- pretty-format/
| -------- jest-matcher-utils/  (symlink) -> ../packages/jest-matcher-utils
| ---- package.json
| ---- packages/
| -------- jest-matcher-utils/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
| -------- jest-diff/
| ------------ node_modules/
| ---------------- chalk/
| ------------ package.json
...
```

`diff`、`pretty format`和`symlink to jest matcher utils`等包被提升到根 node_modules 目录中，使得安装更快、更小。但是，无法将包`chalk`移动到根目录，因为根目录已经依赖于不同的、不兼容的`chalk`版本。

上述两种结构都是兼容的，但后者更为优化，同时在性能方面仍然是正确的 Node.js 模块解析逻辑。

## 管理工作区依赖

如果想要修改工作区的依赖， 只需要到达对应的工作区执行安装依赖的命令

```bash
cd packages/jest-matcher-utils/
yarn add left-pad
✨ Done in 1.77s.
git status
modified: package.json
modified: ../../yarn.lock
```

`注意`：工作区没有自身的`yarn.lock`文件,根目录下的`yarn.lock`包含了所有工作区的依赖。

## 集成 lerna

yarn workspace 并没有让 lerna 过时。相反可以很容易的于 lerna 集成。
从 lerna2.0 开始，运行 lerna 命令的时候，传递 `--use-workspace`，lerna 会使用 yarn 去引导项目,并使用`package.json/workspaces`字段去查找 packages,而不是`lerna.json/packages`

下面的是 Jest 的 lerna 配置。

```json
{
  "lerna": "2.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```
Jest依赖于Yarn引导项目，依赖于Lerna运行publish命令。