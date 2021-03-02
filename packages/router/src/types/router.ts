import { Matcher } from '../services';
import { LocationHook, Navigate } from './locationHook';
import { BuiltRouteConfig } from './routesConfig';

export interface TRouterContext {
  staticPath?: string;
  locationHook: LocationHook;
  matcher: Matcher;
}

export type RawRouterContext = Partial<TRouterContext>;

export interface Match {
  configs: BuiltRouteConfig[];
  params: Record<string, any>;
}

export interface Router {
  path: string;
  navigate: Navigate;
  match: Match;
  matcher: Matcher;
}
