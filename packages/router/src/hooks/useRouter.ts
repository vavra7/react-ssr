import { useContext } from 'react';

import { Router, RouterContext } from '../context';

export function useRouter(): Router {
  const router = useContext(RouterContext);
  if (!router) {
    throw new Error('Router needs to be used inside "RouterProvider".');
  }
  return router;
}
