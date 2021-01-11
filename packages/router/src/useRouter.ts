import { useContext } from 'react';
import { Router, RouterContext } from './context';

export function useRouter(): Router {
  return useContext(RouterContext);
}
