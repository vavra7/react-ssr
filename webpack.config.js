const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const client = {
  name: 'client',
  target: 'web',
  entry: path.resolve(__dirname, 'src/client.tsx'),
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

const server = {
  name: 'server',
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, 'src/server.tsx'),
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = [client, server];
