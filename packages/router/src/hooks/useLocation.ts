import { useCallback, useState } from 'react';

import { LocationHook, Navigate } from '../types';
import { getCurrentPath } from '../utils';

export const useLocation: LocationHook = ({ matcher } = {}) => {
  const [path] = useState<string>(() => getCurrentPath());

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
