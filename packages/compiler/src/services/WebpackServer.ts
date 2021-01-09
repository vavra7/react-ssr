import express, { Application } from 'express';
import path from 'path';
import { Service } from 'typedi';
import { Compiler, Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { WEBPACK_PORT } from '../config';

@Service()
export class WebpackServer {
  private _app: Application | null = null;
  private server: any = null;

  get app(): Application {
    if (!this._app)
      throw new ReferenceError('"createServer" method must be run first before "app" is available');
    return this._app;
  }

  public createServer(): void {
    this._app = express();
    this._app.use((_, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      next();
    });
    this._app.use('/static', express.static(path.resolve(__dirname, 'dist/client')));
  }

  /**
   * Launches webpack compilation
   *
   * @param clientConfig
   * @param clientCompiler
   */
  public runWebpackMiddleware(clientConfig: Configuration, clientCompiler: Compiler): void {
    let publicPath: any;
    if (typeof (publicPath = clientConfig.output?.publicPath) !== 'string')
      throw new ReferenceError('"clientConfig" must have defined output public path');
    this.app.use(
      webpackDevMiddleware(clientCompiler, {
        writeToDisk: true,
        publicPath: publicPath
      })
    );
    this.app.use(webpackHotMiddleware(clientCompiler));
  }

  public start(): void {
    this.server = this.app.listen(WEBPACK_PORT);
  }

  public close(): void {
    if (this.server) this.server.close();
  }
}
