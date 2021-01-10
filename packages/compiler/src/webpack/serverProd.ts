import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';

export const serverProdConfig: Configuration = {
  name: 'server',
  mode: 'production',
  target: 'node',
  devtool: false,
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
  },
  plugins: [
    new DefinePlugin({
      __SERVER__: true,
      __BROWSER__: false
    })
  ]
};
