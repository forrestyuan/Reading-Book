const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
module.exports = {
  entry: {
    main:'.src/index.js'
  },
  output: {
    filename: 'myfirst.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
      {test:/\.(js|jsx)$/, use:'babel-loader'}
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({template: './src/public/index.html'})
  ]
}
