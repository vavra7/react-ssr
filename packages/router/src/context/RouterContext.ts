import { createContext } from 'react';

import { Matcher } from '../services';
import { LocationHook } from '../types';

export interface RouterContext {
  staticPath?: string;
  locationHook: LocationHook;
  matcher: Matcher;
}

export type RawRouterContext = Partial<RouterContext>;

export function isRouterContext(context: RawRouterContext): context is RouterContext {
  return !!context.locationHook && !!context.matcher;
}

export const RouterContext = createContext<RawRouterContext>({});
