import UrlPattern from 'url-pattern';

import { BuiltRouteConfig, BuiltRoutesConfig, Match, RawLocation, RoutesConfig } from '../types';

export class Matcher {
  private builtRoutesConfig: BuiltRoutesConfig;

  constructor(routesConfig: RoutesConfig) {
    this.builtRoutesConfig = this.buildRoutesConfig(routesConfig);
  }

  public getPath(rawLocation: RawLocation): string | null {
    if (typeof rawLocation === 'string') {
      return rawLocation;
    } else {
      const match = this.getMatchByName(rawLocation.name, rawLocation.params);
      if (!match.configs.length) {
        console.warn('Path was not found for:', rawLocation);
        return null;
      }
      const getChildConfig = (_config: BuiltRouteConfig): BuiltRouteConfig => {
        if (!_config.children || !_config.children.length) {
          return _config;
        } else {
          return getChildConfig(_config.children![0]);
        }
      };
      const config = getChildConfig(match.configs[match.configs.length - 1]);
      try {
        return config.urlPattern.stringify(match.params);
      } catch (err) {
        console.warn('Invalid params provided for:', rawLocation, err);
        return null;
      }
    }
  }

  public getMatch(rawLocation: RawLocation): Match {
    if (typeof rawLocation === 'string') {
      return this.getMatchByPath(rawLocation);
    } else {
      return this.getMatchByName(rawLocation.name, rawLocation.params);
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

  private getMatchByName(name: string, params: Record<string, any> = {}): Match {
    let matchedConfigs: Match['configs'] = [];
    const findMatch = (configs: BuiltRoutesConfig, prevConfigs: Match['configs'] = []): boolean => {
      for (const config of configs) {
        if (config.name === name) {
          matchedConfigs = [...prevConfigs, config];
          return true;
        } else if (config.children) {
          const success = findMatch(config.children, [...prevConfigs, config]);
          if (success) return true;
        }
      }
      return false;
    };
    findMatch(this.builtRoutesConfig);
    return { configs: matchedConfigs, params };
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
