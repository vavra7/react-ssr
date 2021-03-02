import { ComponentType } from 'react';
import UrlPattern from 'url-pattern';

interface BaseConfig<Name extends string = string> {
  path: `/${string}` | '*';
  name: Name;
  component?: ComponentType;
  loadComponent?: () => Promise<{ default: ComponentType }>;
  meta?: Record<string, any>;
}

export type RouteConfig<
  Name extends string = string,
  Meta extends undefined | Record<string, any> = undefined
> = Meta extends undefined
  ? BaseConfig<Name> & {
      children?: RouteConfig<Name, Meta>[];
    }
  : BaseConfig<Name> & {
      children?: RouteConfig<Name, Meta>[];
      meta: Meta;
    };

export interface BuiltRouteConfig extends BaseConfig {
  concatPath: string;
  children?: BuiltRouteConfig[];
  urlPattern: UrlPattern;
}

export type RoutesConfig<
  Name extends string = string,
  Meta extends undefined | Record<string, any> = undefined
> = RouteConfig<Name, Meta>[];

export type BuiltRoutesConfig = BuiltRouteConfig[];
