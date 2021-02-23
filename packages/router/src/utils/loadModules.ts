import { RouteConfig, RoutesConfig } from '../types';

async function promiseComponent(routeConfig: RouteConfig): Promise<void> {
  if (!routeConfig.module) throw new ReferenceError('Missing module to import.');
  routeConfig.component = (await routeConfig.module()).default;
}

export async function loadModules(routesConfig: RoutesConfig): Promise<void> {
  const promises: Promise<void>[] = [];
  routesConfig.forEach(routeConfig => {
    if (routeConfig.component) return;
    promises.push(promiseComponent(routeConfig));
  });
  await Promise.all(promises);
}
