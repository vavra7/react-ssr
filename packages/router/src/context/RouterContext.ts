import { createContext } from 'react';

import { RawRouterContext, TRouterContext } from '../types';

export function isRouterContext(context: RawRouterContext): context is TRouterContext {
  return !!context.locationHook && !!context.matcher;
}

export const RouterContext = createContext<RawRouterContext>({});
