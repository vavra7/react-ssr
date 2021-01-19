import { createContext } from 'react';

import { Navigate } from '../hooks';
import { RawLocation, RouteConfig, RoutesConfig } from '../types';

export interface Router {
  path: string;
  navigate: Navigate;
  routesConfig: RoutesConfig;
  getRouteConfig: (rawLocation: RawLocation) => RouteConfig | null;
}

export const RouterContext = createContext<Router | null>(null);
