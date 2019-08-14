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

通过outputPath,可以将打包的文件分类到不同目录下。
***

## 📃 打包多页应用

* 多入口，需要被打包的js文件
entry的值为一个对象，键值对表示不同的入口。
```js
  entry:{
    main:'main.js',
    about:'about.js'
  }
```
*  多出口，打包的js文件
```js
output:{
  filename:'[name].js', //这里的name,webpack会自动映射到entry的键值对的key。
  path:path.resolve(__dirname,'dist')
}
```
* 将打包的多出口的js文件插入到不同的html文件,需要使用html-webpack-plugin这个插件。
```js
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'main.html',
      chunks:['main'] //引入main.js代码块
    }),
    new HtmlWebpackPlugin({
      template:'./index2.html',
      filename:'about.html',
      chunks:['main','about'] //引入main和about
    })
  ]
```

## 📃 sourceMap的作用
在webpack.config.js文件中，添加devtool配置。  
1. 配置devtool的值为`source-map`   
源码映射，会单独生成一个sourcemap文件，代码出错时，会标识当前报错的行和列。
```js
  devtool:'source-map', //增加映射文件，可以帮助调试源代码
```
2. 配置devtool的值为`eval-source-map`  
   不会产生一个独立的sourcemap文件，但是可以映射行和列。
```js
  devtool:'eval-source-map'
```

3. 配置devtool的值为`cheap-module-source-map`  
   不会产生列，但是是一个单独的映射文件

4. 配置devtool的值为`cheap-module-eval-source-map`  
   不会产生文件，集成再打包后的文件中，不会产生列
```js
  devtool:`cheap-module-eval-source-map`
```

## 📃 watch的作用

实时监控打包代码，在webpack.config.js中配置watch选项。  
```js
watch:true,
watchOptions:{
  poll:1000, //每隔一秒查询
  aggreteTimeout:500,//防抖，编辑代码停止后500ms内打包
  ignored:/node_modules/,  //不监控哪个文件
}
```

## 📃 webpack小插件应用

1. cleanwebpackPlugin  
   每次打包生成文件前，将旧的打包的文件删除。
   ```js
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins:[
      new CleanWebpackPlugin('./dist')
    ]
   ```
2. copywebpackPlugin  
   用于将项目中的一些文件或目录拷贝到打包的文件夹内。
  ```js
    const CopyWebpackPlugin = require("copy-webpack-plugin");
    plugins:[
      new CopyWebpackPlugin({
        from:'doc',
        to:'./'
      })
    ]
   ```
3. bannerPlugin (内置的)  
   用于添加版权声明，使用时，需要引入webpack。
   ```js
   const webpack = require('webpack');
   plugins:[
     new webpack.BannerPlugin("make by fox,leany in 2019 Aug")
   ]
   ```

## 📃 webpack 跨域问题
1. 方法一，配置代理
在webapck.config.js中配置devServer,在其中配置相关选项。
```js
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:3000', // 配置了一个代理
        pathRewrite:{
          '/api':''
        }
      }
    }，

  }
```

2. 方法二， 在服务端启动webpack。  
   在服务端使用`webpack-dev-middleware`这个中间件，并引入webpack。
   ```js
    let webpack = require('webpack');
    //中间件
    let middleWare = require('webpack-dev-middleware');
    //拿到配置文件
    let config = require('./webpack.config.js');

    let compiler = webpack(config);
    app.use(middleWare(compiler));

    app.get('/user', (req, res) => {
      res.json({name:'fox'})
    });

    app.listen(3000)
   ```

3. 方法三，在devServer中配置express提供的方法
   ```js
   devServer:{
     before(app){
       app.get('/user', (req,res)=>{
         res.json({name:'fox'})
       })
     }
   }
   ```

## 📃 resolve 属性的配置
示例代码不完整
```js
  resolve:{
    modules:[path.resolve("node_modules")], // 表示在当前设置的路径下找第三方库，缩小查找范围。
    alias:{ //设置别名
      bootstrap:'bootstrap/dist/css/bootstrap.css',
      @:path.resolve(__dirname,'src')
    },
    mainFields:['style','main'], //设置引入库的文件的查找顺序，依次匹配直到没匹配到
    mainFiles:[], //入口文件的名字，可配置多个，依次查找，知道没找到。
    extensions:['.js','.css','.json','.vue'], //查找文件拓展名，依次解析。
  }
```