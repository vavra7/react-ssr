import { useCallback, useEffect, useRef, useState } from 'react';

import { HistoryEvent } from '../enums';
import { LocationHook, LocationPush, LocationReplace, LocationState } from '../types';

export const useLocation: LocationHook = (matcher, staticPath) => {
  const _path = staticPath || location.pathname;
  const [locationState, updateLocationState] = useState<LocationState>(() => ({
    path: _path,
    ...matcher.getMatch(_path)
  }));
  let { current: prevLocationState } = useRef<LocationState>(locationState);

  useEffect(() => {
    const checkForUpdates = (): void => {
      const newPath = location.pathname;
      if (prevLocationState.path !== newPath) {
        const newLocationState: LocationState = { path: newPath, ...matcher.getMatch(newPath) };
        updateLocationState(newLocationState);
        prevLocationState = newLocationState;
      }
    };
    Object.values(HistoryEvent).forEach(e => addEventListener(e, checkForUpdates));
    checkForUpdates();
    return () => Object.values(HistoryEvent).forEach(e => removeEventListener(e, checkForUpdates));
  }, []);

  const push = useCallback<LocationPush>(
    to => {
      const newPath = matcher.getPath(to);
      console.log(prevLocationState);
      if (!newPath) return;
      else history.pushState(null, '', newPath);
    },
    [matcher]
  );

  const replace = useCallback<LocationReplace>(
    to => {
      const newPath = matcher.getPath(to);
      if (!newPath) return;
      else history.replaceState(null, '', newPath);
    },
    [matcher]
  );

  return {
    push,
    replace,
    name: locationState.allConfigs[locationState.allConfigs.length - 1]?.name || '',
    path: locationState.path,
    allConfigs: locationState.allConfigs,
    params: locationState.params
  };
};
