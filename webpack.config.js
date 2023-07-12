const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Room Editor',
        header: 'Room Editor',
        metaDesc: 'Room Editor Three js',
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
      })
  ],
  mode: 'development',
  output: {
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'app'),
      },
    open: true
  }
};