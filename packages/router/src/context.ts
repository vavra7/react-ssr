import { createContext } from 'react';
import { RoutesConfig } from './types';

export interface Router {
  locationHook: () => void;
  routesConfig: RoutesConfig;
}

export const RouterContext = createContext<Router>({
  locationHook: () => console.log('hi'),
  routesConfig: []
});
