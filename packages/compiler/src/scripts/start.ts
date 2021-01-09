import nodemon from 'nodemon';
import path from 'path';
import Container, { Inject } from 'typedi';
import { CompileBase, WebpackServer } from '../services';
import { BindThis } from '../utils';
import { clientDevConfig, serverDevConfig } from '../webpack';

class Start extends CompileBase {
  @Inject()
  private webpackServer: WebpackServer;

  constructor() {
    super(clientDevConfig, serverDevConfig);
  }

  /**
   * Returns promise of first compilation
   */
  private createCompilationPromises(): Promise<void>[] {
    return [
      new Promise<void>((resolve, reject) => {
        this.clientCompiler.hooks.done.tap(this.clientName, stats => {
          if (stats.hasErrors()) {
            reject();
          } else {
            resolve();
          }
        });
      }),
      new Promise<void>((resolve, reject) => {
        this.serverCompiler.hooks.done.tap(this.serverName, stats => {
          if (stats.hasErrors()) {
            reject();
          } else {
            resolve();
          }
        });
      })
    ];
  }

  /**
   * Restarts client server on its change
   */
  private startNodemon(): void {
    const script = nodemon({
      script: path.resolve(process.cwd(), 'dist/index.js'),
      watch: [path.resolve(process.cwd(), 'dist/index.js')]
    });
    script.on('restart', () => {
      console.log('Server side app has been restarted.');
    });
    script.on('quit', () => {
      console.log('Process ended');
      this.webpackServer.close();
      process.exit(1);
    });
    script.on('error', () => {
      console.log('An error occurred. Exiting.');
      this.webpackServer.close();
      process.exit(1);
    });
  }

  @BindThis()
  public async run(): Promise<void> {
    this.clearDistFolder();
    this.createMultiCompiler();

    this.addLogs(this.clientName, this.clientCompiler);
    this.addLogs(this.serverName, this.serverCompiler);

    this.webpackServer.createServer();
    this.webpackServer.runWebpackMiddleware(this.clientConfig, this.clientCompiler);

    const compilationPromises = this.createCompilationPromises();

    this.serverCompiler.watch({ ignored: /node_modules/ }, (err, stats) => {
      const _stats = stats?.toJson();
      if (err?.stack) {
        this.log.error(err.stack);
      } else if (stats?.hasErrors() && _stats?.errors) {
        _stats.errors.forEach(error => {
          if (typeof error === 'string') this.log.error(error);
          else if (typeof error === 'object') this.log.error(error.stack || error.message);
        });
      } else if (stats?.hasWarnings() && _stats?.warnings) {
        _stats.warnings.forEach(warning => this.log.warn(warning.stack));
      }
    });

    await Promise.all(compilationPromises);

    this.webpackServer.start();
    this.startNodemon();
  }
}

export const start = Container.get(Start).run;
