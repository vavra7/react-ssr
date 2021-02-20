import { useCallback } from 'react';

import { RawRouterContext, RouterContext } from '../context';
import { useLocation, useStaticLocation } from '../hooks';
import { RawLocation } from '../types';

export function buildRouterContext(context: RawRouterContext = {}): RouterContext {
  const routesConfig: RouterContext['routesConfig'] = context.routesConfig || [];
  const staticPath: RouterContext['staticPath'] = context.staticPath;
  const locationHook: RouterContext['locationHook'] =
    context.locationHook || (context.staticPath ? useStaticLocation : useLocation);

  const getRouteConfig: RouterContext['getRouteConfig'] =
    context.getRouteConfig ||
    useCallback<RouterContext['getRouteConfig']>(
      (rawLocation: RawLocation) => {
        const _routesConfig = context.routesConfig || [];
        if (typeof rawLocation === 'string') {
          for (const routeConfig of _routesConfig) {
            if (routeConfig.path === rawLocation) return routeConfig;
          }
          return null;
        } else {
          for (const routeConfig of _routesConfig) {
            if (routeConfig.name === rawLocation.name) return routeConfig;
          }
          return null;
        }
      },
      [context.routesConfig]
    );

  return { routesConfig, staticPath, locationHook, getRouteConfig };
}
