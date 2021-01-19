import React, { FC, ReactNode, useCallback } from 'react';

import { RouterContext } from '../context';
import { useLocation } from '../hooks';
import { RawLocation, RoutesConfig } from '../types';

export interface RouterProviderProps {
  children: ReactNode;
  routesConfig: RoutesConfig;
  location?: RawLocation;
}

const RouterProvider: FC<RouterProviderProps> = ({ children, routesConfig }) => {
  const [path, navigate] = useLocation();

  const getRouteConfig = useCallback(
    (rawLocation: RawLocation) => {
      if (typeof rawLocation === 'string') {
        for (const routeConfig of routesConfig) {
          if (routeConfig.path === rawLocation) return routeConfig;
        }
        return null;
      } else {
        for (const routeConfig of routesConfig) {
          if (routeConfig.name === rawLocation.name) return routeConfig;
        }
        return null;
      }
    },
    [routesConfig]
  );

  return (
    <RouterContext.Provider value={{ path, navigate, routesConfig, getRouteConfig }}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;
