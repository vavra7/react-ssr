import path from 'path';
import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';

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
    filename: 'index.js'
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
  }
};
