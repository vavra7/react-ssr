import { createContext, useContext } from 'react';

import { Matcher } from '../services/Matcher';
import { LocationPush, LocationReplace } from '../types';

export interface RouterDispatch {
  push: LocationPush;
  replace: LocationReplace;
  matcher: Matcher;
}

export const RouterDispatchContext = createContext<RouterDispatch | undefined>(undefined);

export const useRouter = (): RouterDispatch => {
  const router = useContext(RouterDispatchContext);
  if (!router) throw new Error('useRouter needs to be use inside RouterProvider');
  return router;
};
