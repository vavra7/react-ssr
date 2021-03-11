import path from 'path';
import rimraf from 'rimraf';
import webpack, { Compiler, Configuration, MultiCompiler } from 'webpack';

export class CompileBase {
  protected clientConfig: Configuration;
  protected serverConfig: Configuration;
  protected clientName: string;
  protected serverName: string;
  protected _multiCompiler: MultiCompiler | null = null;

  constructor(clientConfig: Configuration, serverConfig: Configuration) {
    this.clientConfig = clientConfig;
    this.serverConfig = serverConfig;
    this.clientName = this.clientConfig.name || 'client';
    this.serverName = this.serverConfig.name || 'server';
  }

  /**
   * Removes original dist folder if some
   */
  public clearDistFolder(): void {
    rimraf.sync(path.resolve(process.cwd(), 'dist'));
  }

  protected get multiCompiler(): MultiCompiler {
    if (!this._multiCompiler)
      throw new ReferenceError(
        '"createMultiCompiler" method must be run first before "multiCompiler" is available'
      );
    return this._multiCompiler;
  }

  protected get clientCompiler(): Compiler {
    const compiler = this.multiCompiler.compilers.find(
      compiler => compiler.name === this.clientName
    );
    if (!compiler) throw new Error(`No compiler with name ${this.clientName} was found`);
    return compiler;
  }

  protected get serverCompiler(): Compiler {
    const compiler = this.multiCompiler.compilers.find(
      compiler => compiler.name === this.serverName
    );
    if (!compiler) throw new Error(`No compiler with name ${this.serverName} was found`);
    return compiler;
  }

  /**
   * Creates multiCompiler
   * Without callback function, compilation doesn't run immediately
   */
  protected createMultiCompiler(): void {
    this._multiCompiler = webpack([this.clientConfig, this.serverConfig]);
    this.addLogs(this.clientName, this.clientCompiler);
    this.addLogs(this.serverName, this.serverCompiler);
  }

  protected addLogs(name: string, compiler: Compiler): void {
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
}
