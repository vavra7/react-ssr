import { useContext } from 'react';

import { isRouterContext, RouterContext } from '../context';
import { Router } from '../types';

export function useRouter(): Router {
  const context = useContext(RouterContext);

  if (!isRouterContext(context)) {
    throw new Error('Router needs to be used inside "RouterProvider".');
  }

  const [path, navigate] = context.locationHook({ staticPath: context.staticPath });

  return {
    path,
    navigate,
    getRouteConfig: context.getRouteConfig,
    routeConfig: context.getRouteConfig(path)
  };
}
