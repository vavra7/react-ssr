import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { WEBPACK_BASE_URL } from '../config';

export const clientDevConfig: Configuration = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  entry: {
    bundle: [
      `webpack-hot-middleware/client?path=${WEBPACK_BASE_URL}/__webpack_hmr`,
      path.resolve(process.cwd(), 'src/client.tsx')
    ]
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/static'),
    filename: '[name].js',
    publicPath: `${WEBPACK_BASE_URL}/static/`,
    hotUpdateMainFilename: 'updates/[hash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[hash].hot-update.js'
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
