import { Container, Inject } from 'typedi';

import { CompileBase, StyledLog } from '../services';
import { BindThis } from '../utils';
import { clientProdConfig, serverProdConfig } from '../webpack';

class Build extends CompileBase {
  @Inject()
  protected styledLog: StyledLog;

  constructor() {
    super(clientProdConfig, serverProdConfig);
  }

  @BindThis()
  public run(): void {
    this.clearDistFolder();
    this.createMultiCompiler();
    this.multiCompiler.run((err, stats) => {
      const _stats = stats?.toJson();
      if (err?.stack) {
        this.styledLog.error(err.stack);
        this.styledLog.doneError();
      } else if (stats?.hasErrors() && _stats?.errors) {
        _stats.errors.forEach(error => {
          if (typeof error === 'string') this.styledLog.error(error);
          else if (typeof error === 'object') this.styledLog.error(error.stack || error.message);
        });
        this.styledLog.doneError();
      } else if (stats?.hasWarnings() && _stats?.warnings) {
        _stats.warnings.forEach(warning => this.styledLog.warn(warning.stack));
        this.styledLog.doneWarning();
      } else {
        this.styledLog.doneSuccess();
      }
    });
  }
}

export const build = Container.get(Build).run;
