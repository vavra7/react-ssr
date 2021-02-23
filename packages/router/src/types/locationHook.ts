import { Matcher } from '../services';
import { RawLocation } from './locations';
import { TRouterContext } from './router';

export type Navigate = (to: RawLocation, options?: { replace?: boolean }) => void;

export interface LocationHookProps {
  matcher?: Matcher;
  staticPath?: TRouterContext['staticPath'];
}

export type LocationHook = (props?: LocationHookProps) => [path: string, navigate: Navigate];
