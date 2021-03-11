import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
    chunkFilename: pathName =>
      pathName.chunk?.name ? '[name].[contenthash].js' : 'chunk.[contenthash].js',
    publicPath: '/static/'
  },
  module: {
    rules: [
      {
        test: /\.module\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[hash:base64:8]',
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
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: require.resolve('css-loader')
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      },
      {
        test: /.(js|jsx|ts|tsx)$/i,
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
              name: 'assets/[name].[contenthash].[ext]'
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
    new MiniCssExtractPlugin(),
    new WebpackManifestPlugin({ fileName: 'manifest.json' }) as any,
    new DefinePlugin({
      __SERVER__: false,
      __BROWSER__: true
    })
  ]
};
