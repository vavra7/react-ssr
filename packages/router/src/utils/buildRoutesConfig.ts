import UrlPattern from 'url-pattern';

import { BuiltRoutesConfig, RoutesConfig } from '../types';

export function buildRoutesConfig(routesConfig: RoutesConfig, prevPath = '/'): BuiltRoutesConfig {
  return routesConfig.map(routeConfig => {
    const concatPath = prevPath.replace(/\/$/, '') + routeConfig.path;
    return {
      ...routeConfig,
      concatPath,
      children: routeConfig.children
        ? buildRoutesConfig(routeConfig.children, concatPath)
        : undefined,
      urlPattern: new UrlPattern(concatPath)
    };
  });
}
