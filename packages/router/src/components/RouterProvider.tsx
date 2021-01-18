import React, { FC, ReactNode, useCallback } from 'react';

import { RouterContext } from '../context';
import { RawLocation, RoutesConfig } from '../types';

export interface RouterProviderProps {
  children: ReactNode;
  routesConfig: RoutesConfig;
  location?: RawLocation;
}

const RouterProvider: FC<RouterProviderProps> = ({ children, routesConfig }) => {
  const getRouteConfig = useCallback(
    (rawLocation: RawLocation) => {
      console.log(rawLocation);
      return routesConfig[1] || null;
    },
    [routesConfig]
  );

  return (
    <RouterContext.Provider
      value={{ locationHook: () => console.log('locationHook'), routesConfig, getRouteConfig }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
