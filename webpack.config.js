var path = require('path') 
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js', 
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000", 
        pathRewrite: {"^/api" : ""}
      }
    },
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
}