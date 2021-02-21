import { RawRouterContext, RouterContext } from '../context';
import { useLocation, useStaticLocation } from '../hooks';
import { Matcher } from '../services';
import { RoutesConfig } from '../types';

export function buildRouterContext(
  context: RawRouterContext = {},
  routesConfig: RoutesConfig = []
): RouterContext {
  const staticPath: RouterContext['staticPath'] = context.staticPath;
  const locationHook: RouterContext['locationHook'] =
    context.locationHook || (context.staticPath ? useStaticLocation : useLocation);
  const matcher: RouterContext['matcher'] = context.matcher || new Matcher(routesConfig);

  return { staticPath, locationHook, matcher };
}
