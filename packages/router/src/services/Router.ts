import {
  BuiltRouteConfig,
  BuiltRoutesConfig,
  ConfigPath,
  Location,
  RoutesConfig,
  UrlPatterns
} from '../types';
import { addHistoryEvents } from '../utils/addHistoryEvents';
import { buildUrlPatterns } from '../utils/buildUrlPatterns';
import { concatConfigPaths } from '../utils/concatConfigPaths';
import { Loader } from './Loader';
import { Matcher } from './Matcher';

export type NextFce = (args?: Location | boolean) => void;

export type BeforeEachFce = (from: BuiltRouteConfig, to: BuiltRouteConfig, next: NextFce) => void;

export class Router {
  public builtRoutesConfig: BuiltRoutesConfig;
  public matcher: Matcher;
  public loader: Loader;
  public beforeEachFce?: BeforeEachFce;

  constructor(routesConfig: RoutesConfig) {
    this.builtRoutesConfig = this.buildRoutesConfig(routesConfig);
    this.matcher = new Matcher(this.builtRoutesConfig);
    this.loader = new Loader(this.builtRoutesConfig);
    addHistoryEvents();
  }

  public async preloadComponents(forPath?: string): Promise<void> {
    if (!forPath) {
      await this.loader.preloadAllConfigs();
    } else {
      const match = this.matcher.getMatch(forPath);
      await this.loader.preloadMatchedConfigs(match.allConfigs);
    }
  }

  public beforeEach(beforeEachFce: BeforeEachFce): void {
    this.beforeEachFce = beforeEachFce;
  }

  private buildRoutesConfig(routesConfig: RoutesConfig): BuiltRoutesConfig {
    const _buildRoutesConfig = (
      _routesConfig: RoutesConfig,
      prevConfigPath: ConfigPath
    ): BuiltRoutesConfig => {
      return _routesConfig.map(routeConfig => {
        const concatPath: ConfigPath = concatConfigPaths(prevConfigPath, routeConfig.path);
        const urlPatterns: UrlPatterns = buildUrlPatterns(concatPath);
        return {
          ...routeConfig,
          concatPath,
          children: routeConfig.children
            ? _buildRoutesConfig(routeConfig.children, concatPath)
            : undefined,
          urlPatterns
        };
      });
    };
    return _buildRoutesConfig(routesConfig, '/');
  }
}
