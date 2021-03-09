import { createContext, useContext } from 'react';

import { LocationState } from '../types';

export interface Route extends LocationState {
  loading: boolean;
}

export const RouteContext = createContext<Route | undefined>(undefined);

export const useRoute = (): Route => {
  const route = useContext(RouteContext);
  if (!route) throw new Error('useRoute needs to be use inside RouterProvider');
  return route;
};
