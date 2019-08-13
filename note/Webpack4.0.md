# 🔐 webpack4.0 学习

## 📃 安装webpack

```bash
  # 安装webpack
  npm i -D webpack webpack-cli
```
* 在webpack.config.js 中设置mode为“production”或“development",默认为mode的值是production，会压缩打包后的代码。 * webpack是node写出来的，node的写法。
* 在package.json 设置启动打包命
* npm run 命令 传递参数需要加”--“
```bash
    npm run build -- --config webpack.config.js
```
```bash
  "script":{
    "build": "webpack --mode production",
    "dev": "webpack --mode development"
  }
```
```js
  module.exports = {
    // entry:"./src/index.js",
    mode:"development",
    entry:{
      main:"./src/index.js",
      about:"./src/about.js"
    },
    output: {
      // path: path.resolve(__dirname,"dist"),
      path: path.resolve(process.cwd(),"dist"),
      // filename:"bundle.js",
      // filename:"[name].[hash:6].js",
      filename:"js/[name].[chunkHash:6].js"
    }
  }
```


* webpack 内置了一个开发服务器，基于Express，webpack-dev-server,不会真实生成打包的文件，而是打包到内存中。可以通过```npx webpack-dev-server``` 或者在脚本中配置命令：  
```js
  module.exports = {
    devServer:{
      port:3000,
      contentBase:"./dist",
      progress:true,
      compress:true
    }
  }
```
* 使用html模板，使用html-webpack-plugin插件，可以打包html文件，并且将打包的js文件塞到html文件中。``` npm i -D html-webpack-plugin```
```js
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  module.exports = {
    plugins:[
      new HtmlWebpackPlugin({
        template:"./src/index.html",
        filename:"index.html",
        //压缩html文件
        minify:{
          removeAttributeQuotes:true, // 去除属性引号
          collapseWhitespace:true, //压缩成为一行
        },
        hash:true //添加hash戳
      })
    ]
  }
```
 
***
## 📃 处理样式文件
webpack默认只支持js文件，如何处理css或scss等样式文件呢？  
需要合适的loader进行转化。我们需要在webpack.config.js中添加loader。  
* style-loader 把css插入到head标签
* css-loader 转化css为webpack识别的内容。  
```bash
  #安装
  npm i -D style-loader css-loader
```
loader的特点：希望职责单一，一个loader处理一种类型的文件
loader的用法：一个loader用字符串即可，多个loader使用数组。loader的顺序默认是从右向左，从下向上执行。
```js
  module:{ //模块
    rules:[ //规则  css-loader 接续 @import这种语法的
        {
          test:/\.css$/,
          use:[
            { 
              loader:"style-loader",
              options:{
                insertAt:"top"
              }
            }, //写法一,可以设置更多的选项 
            "css-loader" //写法二
          ]
        }      
    ]
  }
```
相应的，如果要处理scss文件或者less文件，则需要安装相应的loader，```scss-loader``` 和```less-loader```.   
```bash
  #安装：
  npm i -D less-loader
```
在webpack.config.js文件中配置
```js
  module:{ //模块
    rules:[ //规则  css-loader 接续 @import这种语法的
        {
          test:/\.less$/,
          use:[
            {
              loader:'style-loader',
              options:{
                insertAt:'top'
              }
            },
            'css-loader',
            'less-loader'
          ]
        }      
    ]
  }
```
*** 
默认情况下我们处理完了CSS之后，css文件会被填充在html的head标签中，如果需要将css抽离成一个独立的文件，并且通过link标签在HTML中引入，则需要用到一个webpack插件来支持。  
```bash
  #安装
  npm i -D mini-css-extract-plugin
```
```js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  module.exports={
    module:{
      rules:[
        {
          test:/\.css$/,
          use:[
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        }
      ]
    }
    plugins:[
      new MiniCssExtractPlugin()
    ]
  }
```
***
对于写好的css代码，有时候需要给css代码添加特定的浏览器前缀，如flex，需要添加-ms-,-webkit-等前缀，往往我们手动添加的话容易漏掉并且费时费力，这是我们可用用一个webpack的loader来处理，```postcss-loader```和```autoprefixer```
```bash
  #安装
  npm i -D postcss-loader autoprefixer
```
安装好之后，我们需要添加一个postcss.config.js文件，并且在webpack.config.js中进行配置。  
在postcss.config.js文件中，我们需要：
```js
  module.exports={
    plugins:[
      require('autoprefixer')
    ]
  }
```

在webpack.config.js中我们需要配置loader
```js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  module.exports={
    module:{
      rules:[
        {
          test:/\.css$/,
          use:[
            MiniCssExtractPlugin.loader,
            'postcss-loader',
            'css-loader'
          ]
        }
      ]
    }
    plugins:[
      new MiniCssExtractPlugin()
    ]
  }
```
*** 
压缩CSS文件和JS文件，需要使用两个插件，uglifyjs-webapck-plugin和optimize-css-assets-webpack-plugin.
```bash
  npm i -D  optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```
```js
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports={
  optimization:{//优化项
      minimizer:[
        new UglifyJsPlugin({
          include:path.resolve(__dirname, "src"),
          exclude:/node_module/,
          cache:true,
          parallel:true,
          sourceMap:true
        }),
        new OptimizeCssPlugin()
      ]
    }
  }
}
```
## 📃 处理ES6

npm安装如下包：  

babel-loader (-D)
@babel/core  (-D)
@babel/preset-env  (-D)
babel-runtime-plugin  
@babel/runtime   (--save)
@babel/plugin-proposal-class-properties  (-D)
@babel/plugin-transform-runtime (-D)
@bable/polyfill (--save)

```js
module.exports={
  module:{
    rules:[
      {
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{
              presets:["@babel/preset-env"],
              plugins:[
                ["@babel/plugin-proposal-class-properties",{"loose":true}],
                ["@babel/plugin-proposal-decorators",{"legarcy":true}],
                "@babel/plugin-transform-runtime"
              ]
            }
          },
          include:path.resolve(__dirname, "src"),
          exclude:/node_module/
        }
    ]
  }
}
```

> ☞ [查看不同环境下的babel配置](https://www.babeljs.cn/setup#installation)

***

校验JS代码，需要安装eslint，eslint-loader，然后再webpack.config.js文件中配置loader
```bash
  npm i -D eslint eslint-loader
```
在根目录添加 `.eslintrc.json`文件。

***
## 📃 全局变量引入问题 （☞jquery为例子）
方式一：无法暴露给window
```js
import $ from 'jquery'
```

方法二: 可以暴露给window (内联loader)
```js
// npm i -D expose-loader
import $ from 'expose-loader?$!jquery'
```

方式三：直接在webpack.config.js文件中配置
```js
//在webapck.config.json中添加 loader
module:{
  rules:[
    {
      test:require.resolve('jquery'),
      use:'expose-loader?$'
    }
  ]
}
```

方式四：在每个模块都注入jquery （window拿不到）
```js
//添加插件
const webpack = require('webpack');
new webpack.ProvidePlugin({
  $:'jquery'
});
```

方式五： CDN 方式，在HTML文件中script引入。

> 注意：在webpack.config.js中配置external，可以不处理模块加载。

***



## 📃 处理图片

file-loader  
默认会在内部生成一张图片到build目录下，会把生成的图片的路径返回回来。  
通常会配合url-loader来使用，可以用来限制，当我们的图片小于多少k的时候，可以用BASE64来转化。。  


html-withimg-loader  
在HTML 中引入图片路径可解析。

***

## 📃 打包多页应用


* 