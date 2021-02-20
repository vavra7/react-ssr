import React, { FC, ReactNode, useRef } from 'react';

import { RawRouterContext, RouterContext } from '../context';
import { RoutesConfig } from '../types';
import { buildRouterContext } from '../utils';

export interface RouterProviderProps {
  children: ReactNode;
  context?: RawRouterContext;
  routesConfig?: RoutesConfig;
  staticPath?: string;
}

const RouterProvider: FC<RouterProviderProps> = ({
  children,
  routesConfig,
  staticPath,
  context = {}
}) => {
  let { current: routerContext } = useRef<RouterContext | undefined>();
  const value: RouterContext =
    routerContext ||
    (routerContext = buildRouterContext(Object.assign(context, { staticPath, routesConfig })));

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default RouterProvider;
