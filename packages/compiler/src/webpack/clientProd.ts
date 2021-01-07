import path from 'path';
import { Configuration } from 'webpack';

export const clientProdConfig: Configuration = {
  entry: {
    bundle: [path.resolve(process.cwd(), 'src/test.js')]
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/client/static'),
    filename: 'index.js'
  }
};
