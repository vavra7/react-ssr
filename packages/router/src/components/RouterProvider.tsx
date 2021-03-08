import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { RouteContext } from '../context/routeContext';
import { RouterDispatchContext } from '../context/routerDispatchContext';
import { ViewsConfigsContext } from '../context/viewsConfigsContext';
import { useLocation } from '../hooks';
import { Router } from '../services/Router';
import { PreloadedRouteConfig } from '../types';

interface PreloadedConfigsState {
  name: string;
  allConfigs: PreloadedRouteConfig[];
}

export interface RouterProviderProps {
  children: ReactNode;
  context: Router;
  staticPath?: string;
}

const RouterProvider: FC<RouterProviderProps> = ({
  children,
  staticPath,
  context: { matcher, loader }
}) => {
  console.log('rendering... (RouterProvider)');
  const { push, replace, path, allConfigs, params, name } = useLocation(matcher, staticPath);
  const [preloadedConfigsState, setPreloadedConfigsState] = useState<PreloadedConfigsState>({
    name,
    allConfigs: allConfigs as PreloadedRouteConfig[]
  });

  const routerValue = useMemo(
    () => ({
      push,
      replace,
      matcher
    }),
    [push, replace, matcher]
  );

  useEffect(() => {
    (async () => {
      if (preloadedConfigsState.name !== name) {
        await loader.preloadMatchedConfigs(allConfigs);
        setPreloadedConfigsState({
          name,
          allConfigs: allConfigs as PreloadedRouteConfig[]
        });
      }
    })();
  }, [allConfigs, loader, setPreloadedConfigsState, name]);

  return (
    <RouterDispatchContext.Provider value={routerValue}>
      <RouteContext.Provider value={{ name, path, allConfigs, params }}>
        <ViewsConfigsContext.Provider value={preloadedConfigsState.allConfigs}>
          {children}
        </ViewsConfigsContext.Provider>
      </RouteContext.Provider>
    </RouterDispatchContext.Provider>
  );
};

export default RouterProvider;
