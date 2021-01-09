import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';

export const clientDevConfig: Configuration = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
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
    new HotModuleReplacementPlugin(),
    new WebpackManifestPlugin({ fileName: 'manifest.json' })
  ],
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    children: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: false,
    version: false
  }
};
