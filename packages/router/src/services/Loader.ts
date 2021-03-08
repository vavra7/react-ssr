import { BuiltRouteConfig, BuiltRoutesConfig } from '../types';

export class Loader {
  public builtRoutesConfig: BuiltRoutesConfig;

  constructor(builtRoutesConfig: BuiltRoutesConfig) {
    this.builtRoutesConfig = builtRoutesConfig;
  }

  /**
   * Loads component for every matched config.
   *
   * @param builtRoutesConfig
   */
  public async preloadMatchedConfigs(builtRoutesConfig: BuiltRouteConfig[]): Promise<void> {
    const promises: Promise<void>[] = [];
    builtRoutesConfig.forEach(builtRouteConfig => {
      if (!builtRouteConfig.component) promises.push(this.promiseComponent(builtRouteConfig));
    });
    await Promise.all(promises);
  }

  /**
   * Iterates all configs in tree and loads all components
   * that have dynamic import only.
   */
  public async preloadAllConfigs(): Promise<void> {
    const promises: Promise<void>[] = [];
    const promiseForEach = (_builtRoutesConfig: BuiltRoutesConfig): void => {
      _builtRoutesConfig.forEach(builtRouteConfig => {
        if (!builtRouteConfig.component) promises.push(this.promiseComponent(builtRouteConfig));
        if (builtRouteConfig.children?.length) promiseForEach(builtRouteConfig.children);
      });
    };
    promiseForEach(this.builtRoutesConfig);
    await Promise.all(promises);
  }

  /**
   * Runs load component function. Its result
   * saves under key component.
   *
   * @param builtRouteConfig
   */
  private async promiseComponent(builtRouteConfig: BuiltRouteConfig): Promise<void> {
    if (!builtRouteConfig.loadComponent)
      throw new ReferenceError(`Missing component to load for config: ${builtRouteConfig.name}`);
    builtRouteConfig.component = (await builtRouteConfig.loadComponent()).default;
  }
}
