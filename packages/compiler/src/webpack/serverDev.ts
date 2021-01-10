import path from 'path';
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
    publicPath: `${WEBPACK_HOST}:${WEBPACK_PORT}}/static/`
  },
  externals: [nodeExternals(), { express: 'commonjs express' }],
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
    new DefinePlugin({
      __SERVER__: true,
      __BROWSER__: false
    })
  ]
};