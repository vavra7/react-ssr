import UrlPattern from 'url-pattern';

import { BuiltRouteConfig, BuiltRoutesConfig, RawLocation, RoutesConfig } from '../types';

export class Matcher {
  private routesConfig: BuiltRoutesConfig;

  constructor(routesConfig: RoutesConfig) {
    this.routesConfig = this.buildRoutesConfig(routesConfig);
  }

  public getPath(rawLocation: RawLocation): string | null {
    const routeConfig = this.getRouteConfig(rawLocation);
    if (routeConfig) return routeConfig.path;
    else return null;
  }

  public getRouteConfig(rawLocation: RawLocation): BuiltRouteConfig | null {
    if (typeof rawLocation === 'string') {
      return this.getConfigByPath(rawLocation);
    } else {
      return this.getConfigByName(rawLocation.name);
    }
  }

  private getConfigByName(name: string): BuiltRouteConfig | null {
    for (const routeConfig of this.routesConfig) {
      if (routeConfig.name === name) return routeConfig;
    }
    return null;
  }

  private getConfigByPath(path: string): BuiltRouteConfig | null {
    for (const routeConfig of this.routesConfig) {
      if (routeConfig.urlPattern.match(path)) return routeConfig;
    }
    return null;
  }

  private buildRoutesConfig(routesConfig: RoutesConfig): BuiltRoutesConfig {
    return routesConfig.map(routeConfig => ({
      ...routeConfig,
      children: routeConfig.children ? this.buildRoutesConfig(routeConfig.children) : undefined,
      urlPattern: new UrlPattern(routeConfig.path)
    }));
  }
}
