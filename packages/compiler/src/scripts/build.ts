import path from 'path';
import rimraf from 'rimraf';
import { Container, Inject } from 'typedi';
import { Compiler, Configuration, MultiCompiler, webpack } from 'webpack';
import { Log } from '../services';
import { BindThis } from '../utils';
import { clientProdConfig, serverProdConfig } from '../webpack';

class Build {
  private clientProdConfig: Configuration = clientProdConfig;
  private serverProdConfig: Configuration = serverProdConfig;
  private multiCompiler: MultiCompiler;
  private clientName: string;
  private serverName: string;

  @Inject()
  private log: Log;

  constructor() {
    this.multiCompiler = webpack([this.clientProdConfig, this.serverProdConfig]);
    this.clientName = this.clientProdConfig.name || 'client';
    this.serverName = this.serverProdConfig.name || 'server';
    rimraf.sync(path.resolve(process.cwd(), 'dist'));
  }

  get clientCompiler(): Compiler {
    return this.multiCompiler.compilers.find(compiler => compiler.name === this.clientName);
  }

  get serverCompiler(): Compiler {
    return this.multiCompiler.compilers.find(compiler => compiler.name === this.serverName);
  }

  private addLogs(name: string, compiler: Compiler): void {
    compiler.hooks.compile.tap(name, () => {
      console.log(`[${name}] COMPILING...`);
    });
    compiler.hooks.done.tap(name, stats => {
      if (stats.hasErrors()) {
        console.log(`[${name}] ERROR`);
      } else {
        console.log(`[${name}] DONE`);
      }
    });
  }

  @BindThis()
  public run(): void {
    this.addLogs(this.clientName, this.clientCompiler);
    this.addLogs(this.serverName, this.serverCompiler);
    this.multiCompiler.run((err, stats) => {
      if (err) {
        console.error(err);
      }
      if (stats.hasErrors()) {
        stats.toJson().errors.forEach(error => this.log.error(error.message));
        this.log.doneError();
      } else {
        this.log.doneSuccess();
      }
    });
  }
}

export const build = Container.get(Build).run;
