import { useLocation, useStaticLocation } from '../hooks';
import { Matcher } from '../services';
import { RawRouterContext, RoutesConfig, TRouterContext } from '../types';

export function buildRouterContext(
  context: RawRouterContext = {},
  routesConfig: RoutesConfig = []
): TRouterContext {
  const staticPath: TRouterContext['staticPath'] = context.staticPath;
  const locationHook: TRouterContext['locationHook'] =
    context.locationHook || (context.staticPath ? useStaticLocation : useLocation);
  const matcher: TRouterContext['matcher'] = context.matcher || new Matcher(routesConfig);

  return { staticPath, locationHook, matcher };
}
