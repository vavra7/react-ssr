import { webpack } from 'webpack';
import { clientProdConfig } from '../webpack/clientProd';

export function build(): void {
  const clientCompiler = webpack(clientProdConfig);
  clientCompiler.run((err, stats) => {
    if (err) {
      console.error(err);
    }
    if (stats.hasErrors()) {
      stats.toJson().errors.forEach(error => console.error(error.message));
    }
  });
}
