const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const client = {
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  entry: {
    client: path.resolve(__dirname, 'src/client.tsx')
  },
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/static')
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
  ]
};

const server = {
  mode: 'development',
  target: 'node',
  devtool: false,
  externals: [nodeExternals(), { express: 'commonjs express' }],
  entry: {
    server: path.resolve(__dirname, 'src/server.tsx')
  },
  output: {
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
  devServer: {
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    open: false
  }
};

module.exports = [client, server];
