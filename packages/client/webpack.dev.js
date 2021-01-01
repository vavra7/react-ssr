const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const client = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    publicPath: '/',
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    open: false
  }
};

module.exports = [client];
