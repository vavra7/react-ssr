import { RouterContext } from '../context';
import { Navigate } from './locationHook';
import { RouteConfig } from './routeConfigs';

export interface Router {
  path: string;
  navigate: Navigate;
  routeConfig: RouteConfig | null;
  getRouteConfig: RouterContext['getRouteConfig'];
}
