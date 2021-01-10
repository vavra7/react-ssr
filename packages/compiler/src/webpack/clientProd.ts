import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

export const clientProdConfig: Configuration = {
  name: 'client',
  mode: 'production',
  target: 'web',
  devtool: false,
  entry: {
    bundle: [path.resolve(process.cwd(), 'src/client.tsx')]
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/static'),
    filename: '[name].[contenthash].js',
    publicPath: '/static/'
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
    new WebpackManifestPlugin({ fileName: 'manifest.json' }),
    new DefinePlugin({
      __SERVER__: false,
      __BROWSER__: true
    })
  ]
};
