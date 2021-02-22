import { useCallback, useEffect, useRef, useState } from 'react';

import { HistoryEvent } from '../enums';
import { LocationHook, Navigate } from '../types';
import { getCurrentPath } from '../utils';

export const useLocation: LocationHook = ({ matcher } = {}) => {
  const [path, updatePath] = useState<string>(() => getCurrentPath());
  let { current: prevPath } = useRef<string>(path);

  useEffect(() => {
    const checkForUpdates = (): void => {
      const newPath = getCurrentPath();
      prevPath !== newPath && updatePath((prevPath = newPath));
    };
    Object.values(HistoryEvent).forEach(e => addEventListener(e, checkForUpdates));
    checkForUpdates();
    return () => Object.values(HistoryEvent).forEach(e => removeEventListener(e, checkForUpdates));
  }, []);

  const navigate = useCallback<Navigate>(
    (to, { replace = false } = {}) => {
      if (!matcher) throw new ReferenceError('Matcher was not passed to the location hook.');
      const newPath = matcher.getPath(to);
      if (!newPath) return;
      if (replace) {
        history.replaceState(null, '', newPath);
      } else {
        history.pushState(null, '', newPath);
      }
    },
    [matcher]
  );

  return [path, navigate];
};
