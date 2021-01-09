import { Container } from 'typedi';
import { CompileBase } from '../services';
import { BindThis } from '../utils';
import { clientProdConfig, serverProdConfig } from '../webpack';

class Build extends CompileBase {
  constructor() {
    super(clientProdConfig, serverProdConfig);
  }

  @BindThis()
  public run(): void {
    this.createMultiCompiler();
    this.addLogs(this.clientName, this.clientCompiler);
    this.addLogs(this.serverName, this.serverCompiler);
    this.multiCompiler.run((err, stats) => {
      const _stats = stats?.toJson();
      if (err?.stack) {
        this.log.error(err.stack);
        this.log.doneError();
      } else if (stats?.hasErrors() && _stats?.errors) {
        _stats.errors.forEach(error => {
          if (typeof error === 'string') this.log.error(error);
          else if (typeof error === 'object') this.log.error(error.stack || error.message);
        });
        this.log.doneError();
      } else if (stats?.hasWarnings() && _stats?.warnings) {
        _stats.warnings.forEach(warning => this.log.warn(warning.stack));
        this.log.doneWarning();
      } else {
        this.log.doneSuccess();
      }
    });
  }
}

export const build = Container.get(Build).run;
