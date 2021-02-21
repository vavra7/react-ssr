import { RouterContext } from '../context';
import { Matcher } from '../services';
import { RawLocation } from './locations';

export type Navigate = (to: RawLocation, options?: { replace?: boolean }) => void;

export interface LocationHookProps {
  matcher?: Matcher;
  staticPath?: RouterContext['staticPath'];
}

export type LocationHook = (props?: LocationHookProps) => [path: string, navigate: Navigate];
