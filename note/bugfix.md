# bugfix

## 1. [Components with Dropdown Flash in IE11 #21039](https://github.com/ant-design/ant-design/issues/21039)

**FAQ**

> ### Reproduction link
>
> https://github.com/notamazing/test-ant-select
>
> ### Steps to reproduce
>
> Run `yarn` to install all dependencies
> Run `yarn dev` to run the application
> Click on the select or the tooltip component in Internet Explorer 11
>
> ### What is expected?
>
> The dropdown of the select/tooltip should render as it does in other browsers
>
> ### What is actually happening?
>
> The dropdowns of each component flash when the parent is selected
>
> Environment Info
> antd 4.0.0-rc.1
> React 16.12.0
> System Windows 10
> Browser Internet Explorer 11
> next.ant.design crashes on IE11 so it's difficult to know whether this is an issue everywhere or just in our project. The reproduction project uses Next.js as a framework

**good Anwser:**

> 结合了以上两种解决思路，是好用的。
> 对于 Select 组件来说，其自身弹出层可能会有滚动条，所以直接采用：
>
> ```
> @media only screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
>     .ant-dropdown,
>     .ant-select-dropdown,
>     .ant-picker-dropdown {
>         animation-duration: 0s !important;
>     }
> }
> ```
>
> 如果 Select 等组件所在页面（有可能是页面也有可能是 Modal 弹出框中等等）有滚动条，那找到这个滚动条所在的元素，然后为其添加伪元素（xxxxx 是滚动条所在元素）：
>
> ```
> xxxxx:after{
>   content: '';
>   position: fixed;
>   display: block;
> }
> ```

## 2. [react 项目想支持 Internet Explorer 9 , 10 和 11 ，那么需要 polyfills。](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md)

## 3. [基于lerna和yarn workspace的monorepo工作流 #24](https://github.com/hardfist/stackoverflow/issues/24)
