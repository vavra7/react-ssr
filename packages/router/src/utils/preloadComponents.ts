import { Matcher } from '../services';
import { BuiltRouteConfig, BuiltRoutesConfig, RawRouterContext, RoutesConfig } from '../types';
import { buildRoutesConfig } from './buildRoutesConfig';

/**
 * Runs load component function. Its result
 * saves under key component.
 *
 * @param builtRouteConfig
 */
async function promiseComponent(builtRouteConfig: BuiltRouteConfig): Promise<void> {
  if (!builtRouteConfig.loadComponent)
    throw new ReferenceError(`Missing component to load for config: ${buildRoutesConfig.name}`);
  builtRouteConfig.component = (await builtRouteConfig.loadComponent()).default;
}

/**
 * Iterates all configs in tree and loads all components
 * that have dynamic import only.
 *
 * @param builtRoutesConfig
 */
async function preloadAllConfigs(builtRoutesConfig: BuiltRoutesConfig): Promise<void> {
  const promises: Promise<void>[] = [];
  const promiseForEach = (_builtRoutesConfig: BuiltRoutesConfig): void => {
    _builtRoutesConfig.forEach(builtRouteConfig => {
      if (!builtRouteConfig.component) promises.push(promiseComponent(builtRouteConfig));
      if (builtRouteConfig.children?.length) promiseForEach(builtRouteConfig.children);
    });
  };
  promiseForEach(builtRoutesConfig);
  await Promise.all(promises);
}

/**
 * Loads component for every matched config.
 *
 * @param builtRoutesConfig
 */
async function preloadMatchedConfigs(builtRoutesConfig: BuiltRouteConfig[]): Promise<void> {
  const promises: Promise<void>[] = [];
  builtRoutesConfig.forEach(builtRouteConfig => {
    if (!builtRouteConfig.component) promises.push(promiseComponent(builtRouteConfig));
  });
  await Promise.all(promises);
}

/**
 * Loads either all components in tree or only those in the given path.
 *
 * @param routesConfig
 * @param forPath
 */
export async function preloadComponents(
  routesConfig: RoutesConfig,
  forPath?: string
): Promise<RawRouterContext> {
  const builtRoutesConfig: BuiltRoutesConfig = buildRoutesConfig(routesConfig);
  const matcher = new Matcher(builtRoutesConfig);
  if (!forPath) {
    await preloadAllConfigs(matcher.builtRoutesConfig);
  } else {
    const match = matcher.getMatch(forPath);
    await preloadMatchedConfigs(match.configs);
  }
  return {
    matcher
  };
}
