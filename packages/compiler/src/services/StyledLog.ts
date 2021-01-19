import chalk from 'chalk';
import { Service } from 'typedi';

export type LogType = 'success' | 'error' | 'warning';

@Service()
export class StyledLog {
  public doneSuccess(message: ` ${string} ` = ' Success '): void {
    console.log('');
    console.log(chalk.bgGreen.black.bold(message));
  }

  public doneError(message: ` ${string} ` = ' Error '): void {
    console.log('');
    console.log(chalk.bgRed.whiteBright.bold(message));
  }

  public doneWarning(message: ` ${string} ` = ' Warning '): void {
    console.log('');
    console.log(chalk.bgYellow.black.bold(message));
  }

  public error(message: string): void {
    console.log('');
    console.log(chalk.red(message));
  }

  public warn(message: string): void {
    console.log('');
    console.log(chalk.yellow(message));
  }
}
