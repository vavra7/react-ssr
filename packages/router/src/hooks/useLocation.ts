import { useCallback, useEffect, useRef, useState } from 'react';

import { HistoryEvent } from '../enums';
import { Matcher } from '../services/Matcher';
import { LocationHook, LocationPush, LocationReplace, LocationState } from '../types';
import { addHistoryEvents } from '../utils/addHistoryEvents';

addHistoryEvents();

function getLocationState(matcher: Matcher, path: string): LocationState {
  const match = matcher.getMatch(path);
  if (!match) {
    throw new Error(`No match for path: ${path}`);
  }
  return match;
}

export const useLocation: LocationHook = (matcher, staticPath) => {
  const _path = staticPath || location.pathname;
  const [locationState, updateLocationState] = useState<LocationState>(() =>
    getLocationState(matcher, _path)
  );
  let { current: prevLocationState } = useRef<LocationState>(locationState);

  useEffect(() => {
    const checkForUpdates = (): void => {
      const newPath = location.pathname;
      if (prevLocationState.path !== newPath) {
        const newLocationState: LocationState = getLocationState(matcher, newPath);
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
    ...locationState
  };
};
