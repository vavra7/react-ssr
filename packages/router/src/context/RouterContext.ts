import { createContext } from 'react';

import { LocationHook, RawLocation, RouteConfig, RoutesConfig } from '../types';

export interface RouterContext {
  routesConfig: RoutesConfig;
  staticPath?: string;
  locationHook: LocationHook;
  getRouteConfig: (rawLocation: RawLocation) => RouteConfig | null;
}

export type RawRouterContext = Partial<RouterContext>;

export function isRouterContext(context: RawRouterContext): context is RouterContext {
  return !!context.locationHook && !!context.getRouteConfig;
}

export const RouterContext = createContext<RawRouterContext>({});
