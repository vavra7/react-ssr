import { Matcher } from '../services';
import { LocationHook, Navigate } from './locationHook';
import { RouteConfig } from './routesConfig';

export interface TRouterContext {
  staticPath?: string;
  locationHook: LocationHook;
  matcher: Matcher;
}

export type RawRouterContext = Partial<TRouterContext>;

export interface Router {
  path: string;
  navigate: Navigate;
  routeConfig: RouteConfig | null;
  matcher: Matcher;
}
