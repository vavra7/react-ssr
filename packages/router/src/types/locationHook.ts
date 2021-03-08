import { Match, Matcher } from '../services/Matcher';
import { Location } from './Location';

export type LocationPush = (to: Location) => void;
export type LocationReplace = (to: Location) => void;
export type LocationState = Match;

export type LocationHook = (
  matcher: Matcher,
  staticPath?: string
) => {
  push: LocationPush;
  replace: LocationReplace;
  name: string;
  path: LocationState['path'];
  allConfigs: LocationState['allConfigs'];
  params: LocationState['params'];
};
