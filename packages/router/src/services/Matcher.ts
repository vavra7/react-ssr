import { RawLocation, RouteConfig, RoutesConfig } from '../types';

export class Matcher {
  private routesConfig: RoutesConfig;

  constructor(routesConfig: RoutesConfig) {
    this.routesConfig = routesConfig;
  }

  public getRouteConfig(rawLocation: RawLocation): RouteConfig | null {
    if (typeof rawLocation === 'string') {
      for (const routeConfig of this.routesConfig) {
        if (routeConfig.path === rawLocation) return routeConfig;
      }
      return null;
    } else {
      for (const routeConfig of this.routesConfig) {
        if (routeConfig.name === rawLocation.name) return routeConfig;
      }
      return null;
    }
  }

  public getPath(rawLocation: RawLocation): string | null {
    const routeConfig = this.getRouteConfig(rawLocation);
    if (routeConfig) return routeConfig.path;
    else return null;
  }
}
