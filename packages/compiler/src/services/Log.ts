import chalk from 'chalk';
import { Service } from 'typedi';

export type LogType = 'success' | 'error' | 'warning';

@Service()
export class Log {
  public doneSuccess(message: ` ${string} ` = ' Success '): void {
    console.log(chalk.bgGreen.gray.bold(message));
  }

  public doneError(message: ` ${string} ` = ' Error '): void {
    console.log(chalk.bgRed.whiteBright.bold(message));
  }

  public error(message: string): void {
    console.log('');
    console.log(`----------------------------------------------------------`);
    console.log('');
    console.log(chalk.red(message));
  }
}
