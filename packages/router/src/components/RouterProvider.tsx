import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { RouteContext } from '../context/routeContext';
import { RouterDispatchContext } from '../context/routerDispatchContext';
import { ViewsConfigsContext } from '../context/viewsConfigsContext';
import { useIsComponentLoading } from '../hooks/useIsComponentLoading';
import { useLocation } from '../hooks/useLocation';
import { Router } from '../services/Router';
import { RouterCache } from '../services/RouterCache';
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
  const { push, replace, path, allConfigs, params, name, urlPattern, lang, config } = useLocation(
    matcher,
    staticPath
  );
  const [preloadedConfigsState, setPreloadedConfigsState] = useState<PreloadedConfigsState>({
    name,
    allConfigs: allConfigs as PreloadedRouteConfig[]
  });
  const { startLoading, finishLoading, isLoading } = useIsComponentLoading();

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
        if (!RouterCache.isRouteLoaded(name) && !loader.checkAllIsLoaded(allConfigs)) {
          startLoading(name);
          await loader.preloadMatchedConfigs(allConfigs);
          finishLoading(name);
        }
        setPreloadedConfigsState({
          name,
          allConfigs: allConfigs as PreloadedRouteConfig[]
        });
      }
    })();
  }, [allConfigs, loader, setPreloadedConfigsState, name]);

  return (
    <RouterDispatchContext.Provider value={routerValue}>
      <RouteContext.Provider
        value={{
          name,
          path,
          allConfigs,
          params,
          urlPattern,
          config,
          lang,
          loading: isLoading(name)
        }}
      >
        <ViewsConfigsContext.Provider value={preloadedConfigsState.allConfigs}>
          {children}
        </ViewsConfigsContext.Provider>
      </RouteContext.Provider>
    </RouterDispatchContext.Provider>
  );
};

export default RouterProvider;
