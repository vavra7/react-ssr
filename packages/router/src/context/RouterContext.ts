import { createContext } from 'react';

import { RawLocation, RouteConfig, RoutesConfig } from '../types';

export interface Router {
  locationHook: () => void;
  routesConfig: RoutesConfig;
  getRouteConfig: (rawLocation: RawLocation) => RouteConfig | null;
}

export const RouterContext = createContext<Router | null>(null);
