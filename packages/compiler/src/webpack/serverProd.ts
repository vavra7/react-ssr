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
    publicPath: '/static/',
    filename: 'index.js',
    chunkFilename: pathName => (pathName.chunk?.name ? '[name].[id].js' : 'chunk.[id].js')
  },
  externals: [nodeExternals() as any, { express: 'commonjs express' }],
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
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
            loader: 'url-loader',
            options: {
              limit: 2048,
              name: 'assets/[name].[contenthash].[ext]',
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
