import { ComponentType } from 'react';
import UrlPattern from 'url-pattern';

interface BaseConfig<Name = string> {
  path: `/${string}` | '*';
  name: Name;
  component?: ComponentType;
  loadComponent?: () => Promise<{ default: ComponentType }>;
}

export interface RouteConfig<Name = string> extends BaseConfig<Name> {
  children?: RouteConfig<Name>[];
}

export interface BuiltRouteConfig extends BaseConfig {
  children?: BuiltRouteConfig[];
  urlPattern: UrlPattern;
}

export type RoutesConfig<Name = string> = RouteConfig<Name>[];

export type BuiltRoutesConfig = BuiltRouteConfig[];
