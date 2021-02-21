import { ComponentType } from 'react';

export type RoutesConfig<Name = string> = RouteConfig<Name>[];

export interface RouteConfig<Name = string> {
  path: `/${string}`;
  name: Name;
  component: ComponentType;
}
