import { ComponentType } from 'react';
import UrlPattern from 'url-pattern';

import { PickRequired } from './PickRequired';

export type PathString = `/${string}` | '*';
export type LocalizedPaths<Lang extends string = string> = { [key in Lang]?: PathString };

export type ConfigPath<Lang extends string = string> = PathString | LocalizedPaths<Lang>;

export function isPathString(configPath: ConfigPath): configPath is PathString {
  return !!(typeof configPath === 'string');
}

export function isLocalizedPaths(configPath: ConfigPath): configPath is LocalizedPaths {
  return !!(typeof configPath !== 'string');
}

interface BaseConfig<Name extends string = string, Lang extends string = string> {
  path: ConfigPath<Lang>;
  name: Name;
  component?: ComponentType;
  loadComponent?: () => Promise<{ default: ComponentType }>;
  meta?: Record<string, any>;
}

export type RouteConfig<
  Name extends string = string,
  Lang extends string = string,
  Meta extends undefined | Record<string, any> = undefined
> = Meta extends undefined
  ? BaseConfig<Name, Lang> & {
      children?: RouteConfig<Name, Lang, Meta>[];
    }
  : BaseConfig<Name, Lang> & {
      children?: RouteConfig<Name, Lang, Meta>[];
      meta: Meta;
    };

export type UrlPatterns = UrlPattern | Record<string, UrlPattern>;

export interface BuiltRouteConfig extends BaseConfig {
  concatPath: ConfigPath;
  children?: BuiltRouteConfig[];
  urlPatterns: UrlPatterns;
}

export type RoutesConfig<
  Name extends string = string,
  Lang extends string = string,
  Meta extends undefined | Record<string, any> = undefined
> = RouteConfig<Name, Lang, Meta>[];

export type BuiltRoutesConfig = BuiltRouteConfig[];

export type PreloadedRouteConfig = PickRequired<BuiltRouteConfig, 'component'>;
