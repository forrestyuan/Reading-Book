1. electron

Electron是github开发的，使用html，css和js构建跨平台桌面应用的一个开源库。通过将Chromium和Node.JS合并到一个运行时环境中，并将其打包为mac，windows和linux系统下的应用。

**Chromium**  
Chromium 是谷歌为发展谷歌浏览器启动的开源项目。新功能会率先在chromium上实现，待验证后才会应用在chrome上。

**Electron主进程**  
Electorn运行package.json的main脚本的进程被称为主进程。一个Electron应用总是有且只有一个主进程。

职责：
* 创建渲染进程
* 控制应用生命周期（启动，退出app以及对app做一些事件监听
*　调用系统底层功能，调用原生资源



可调用的api

* Node.js API
* Electron提供的主进程API

**渲染进程**  
每个Electron中的web页面运行在它自己的渲染进程中。

职责：  
* 用HTML和css渲染页面
* 用javascript做页面交互

可调用的API：  
* DOM API
* Node.js API
* ELectorn 渲染进程API

**开源学习**  
[electron-playground](https://github.com/tal-tech/electron-playground)
[electron-api-demo](https://github.com/demopark/electron-api-demos-Zh_CN)