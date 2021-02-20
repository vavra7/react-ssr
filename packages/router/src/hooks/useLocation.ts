import { useState } from 'react';

import { LocationHook } from '../types';
import { __SERVER__, getCurrentPath } from '../utils';

export const useLocation: LocationHook = () => {
  const [path] = useState(() => {
    if (__SERVER__) return '/';
    else return getCurrentPath();
  });

  const navigate = (): void => {
    console.log('navigate');
  };
  return [path, navigate];
};
