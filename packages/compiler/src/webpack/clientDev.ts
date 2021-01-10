import path from 'path';
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { WEBPACK_HOST, WEBPACK_PORT } from '../config';

export const clientDevConfig: Configuration = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  entry: {
    bundle: [
      `webpack-hot-middleware/client?path=${WEBPACK_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
      path.resolve(process.cwd(), 'src/client.tsx')
    ]
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/static'),
    filename: '[name].js',
    publicPath: `${WEBPACK_HOST}:${WEBPACK_PORT}/static/`,
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js'
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
    new WebpackManifestPlugin({ fileName: 'manifest.json' }),
    new DefinePlugin({
      __SERVER__: false,
      __BROWSER__: true
    })
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
  },
  performance: {
    hints: false
  }
};
