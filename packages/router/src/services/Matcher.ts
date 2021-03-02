import UrlPattern from 'url-pattern';

import { BuiltRouteConfig, BuiltRoutesConfig, Match, RawLocation, RoutesConfig } from '../types';

export class Matcher {
  private builtRoutesConfig: BuiltRoutesConfig;

  constructor(routesConfig: RoutesConfig) {
    this.builtRoutesConfig = this.buildRoutesConfig(routesConfig);
  }

  public getPath(rawLocation: RawLocation): string | null {
    // const routeConfig = this.getRouteConfig(rawLocation);
    // if (routeConfig) return routeConfig.path;
    // else return null;
    return 'todo';
  }

  public getMatch(rawLocation: RawLocation): Match {
    if (typeof rawLocation === 'string') {
      return this.getMatchByPath(rawLocation);
    } else {
      return this.getMatchByName(rawLocation.name);
    }
  }

  private getMatchByPath(path: string): Match {
    let matchedConfigs: Match['configs'] = [];
    let matchedParams: Match['params'] = {};
    const findMatch = (configs: BuiltRoutesConfig, prevConfigs: Match['configs'] = []): boolean => {
      for (const config of configs) {
        if (config.children) {
          const success = findMatch(config.children, [...prevConfigs, config]);
          if (success) return true;
        } else {
          const _matchedParams = config.urlPattern.match(path);
          if (_matchedParams) {
            matchedConfigs = [...prevConfigs, config];
            matchedParams = _matchedParams;
            return true;
          }
        }
      }
      return false;
    };
    findMatch(this.builtRoutesConfig);
    return { configs: matchedConfigs, params: matchedParams };
  }

  private getMatchByName(name: string): Match {
    const configs: BuiltRouteConfig[] = [];
    // for (const routeConfig of this.routesConfig) {
    //   if (routeConfig.name === name) return routeConfig;
    // }
    // return null;
    return { configs: [], params: {} };
  }

  private buildRoutesConfig(routesConfig: RoutesConfig, prevPath = '/'): BuiltRoutesConfig {
    return routesConfig.map(routeConfig => {
      const concatPath = prevPath.replace(/\/$/, '') + routeConfig.path;
      return {
        ...routeConfig,
        concatPath,
        children: routeConfig.children
          ? this.buildRoutesConfig(routeConfig.children, concatPath)
          : undefined,
        urlPattern: new UrlPattern(concatPath)
      };
    });
  }
}
