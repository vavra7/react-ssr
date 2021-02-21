import { Matcher } from '../services';
import { Navigate } from './locationHook';
import { RouteConfig } from './routesConfig';

export interface Router {
  path: string;
  navigate: Navigate;
  routeConfig: RouteConfig | null;
  matcher: Matcher;
}
