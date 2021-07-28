// 首先安装一下node-sass插件，用于识别scss语法并编译为css
const nodeSass = require("node-sass");
const path = require("path")

const loaderUtils = require('loader-utils') //来处理参数，该情况用于有时候我们传给loader的参数不是一个对象，可能是一个字符串。
let result = nodeSass.renderSync({
  file: path.resolve(__dirname, "../src/scss/index.scss"),
  outputStyle: 'expanded',
})
module.exports = function(content, map, meta) {
  //函数里面暴露了一些方法，this.query获取loader传过来的参数
  // console.log(loaderUtils.getOptions(this))
  // setTimeout(() => {
  //   this.callback(1, source)
  // }, 3000)
  return result.css.toString()
}




/*
// 配置示例
module: {
    rules: [
        {
            test: /\.css/,
            use: [
                "testLoader?name=前端娱乐圈"
            ]
        }
    ]
}

//配置示例
module: {
  rules: [
      {
          test: /\.css/,
          use: [{
              loader: "testLoader",
              query: "前端娱乐圈"
          }]
      }
  ]
}

//配置示例
module: {
    rules: [
        {
            test: /\.css/,
            use: [{
            	loader: "testLoader?name=前端娱乐圈",
              //新版本用options，有了options或query，loader后接的参数被忽略。
            	options: {
            		name: "前端娱乐圈"
            	}
            	
            	// or（旧版本）
            	
            	query: {
            		name: "前端娱乐圈"
            	}
            }]
        }
    ]
}


*/