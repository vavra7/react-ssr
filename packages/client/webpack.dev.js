const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.ts')
  },
  output: {
    publicPath: './',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ]
};

module.exports = [client];
