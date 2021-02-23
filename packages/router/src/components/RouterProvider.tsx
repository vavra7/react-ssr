import React, { FC, ReactNode, useRef } from 'react';

import { RouterContext } from '../context';
import { RawRouterContext, RoutesConfig, TRouterContext } from '../types';
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
  let { current: routerContext } = useRef<TRouterContext | undefined>();

  const value: TRouterContext =
    routerContext ||
    (routerContext = buildRouterContext(Object.assign(context, { staticPath }), routesConfig));

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
};

export default RouterProvider;
