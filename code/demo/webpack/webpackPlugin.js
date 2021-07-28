const pluginName = 'ConsoleLogOnBuildWebpackPlugin'
/**
 * @desc webapck 插件是一个具有apply方法的对象，apply方法会被webpack compiler调用，并且在整个编译生命周期可以访问compiler对象。
 *       compiler hook 的 tap 方法的第一个参数，应该是驼峰式命名的插件名称。建议为此使用一个常量，以便它可以在所有 hook 中重复使用。
 */
class cosoleLogOnBuildWebpackPlugin {
  apply(compiler){
    compiler.hooks.run.tap(pluginName, (compilation)=>{
      console.log('webpack 构建开始。')
    })
  }
}