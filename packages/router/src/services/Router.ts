import {
  BuiltRouteConfig,
  BuiltRoutesConfig,
  ConfigPath,
  Location,
  RoutesConfig,
  UrlPatterns
} from '../types';
import { buildUrlPatterns } from '../utils/buildUrlPatterns';
import { concatConfigPaths } from '../utils/concatConfigPaths';
import { Loader } from './Loader';
import { Matcher } from './Matcher';

export type NextFce = (args?: Location | boolean) => void;

export type BeforeEachFce = (from: BuiltRouteConfig, to: BuiltRouteConfig, next: NextFce) => void;

export class Router<Lang extends string = string> {
  public builtRoutesConfig: BuiltRoutesConfig;
  public matcher: Matcher;
  public loader: Loader;
  public beforeEachFce?: BeforeEachFce;

  constructor(routesConfig: RoutesConfig) {
    this.builtRoutesConfig = this.buildRoutesConfig(routesConfig);
    this.matcher = new Matcher<Lang>(this.builtRoutesConfig);
    this.loader = new Loader(this.builtRoutesConfig);
  }

  set defaultLang(lang: Lang) {
    if (!this.matcher.lang) this.matcher.lang = lang;
  }

  public async preloadComponents(forPath?: string): Promise<void> {
    if (!forPath) {
      await this.loader.preloadAllConfigs();
    } else {
      const match = this.matcher.getMatch(forPath);
      if (match) await this.loader.preloadMatchedConfigs(match.allConfigs);
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
