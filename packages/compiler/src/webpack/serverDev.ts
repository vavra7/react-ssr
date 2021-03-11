import path from 'path';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent';
import { Configuration, DefinePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';

import { WEBPACK_HOST, WEBPACK_PORT } from '../config';

export const serverDevConfig: Configuration = {
  name: 'server',
  mode: 'development',
  target: 'node',
  devtool: 'eval-cheap-source-map',
  entry: {
    server: path.resolve(process.cwd(), 'src/server.tsx')
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'index.js',
    chunkFilename: '[id].js',
    publicPath: `${WEBPACK_HOST}:${WEBPACK_PORT}/static/`
  },
  externals: [nodeExternals() as any, { express: 'commonjs express' }],
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                exportOnlyLocals: true,
                getLocalIdent: getCSSModuleLocalIdent,
                exportLocalsConvention: 'camelCase'
              }
            }
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          {
            loader: require.resolve('null-loader')
          }
        ]
      },
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 2048,
              name: 'assets/[name].[ext]',
              emitFile: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  plugins: [
    new DefinePlugin({
      __SERVER__: true,
      __BROWSER__: false
    })
  ]
};
