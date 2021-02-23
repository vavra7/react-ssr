import { ComponentType } from 'react';

import { RequireAtLeastOne } from './RequireAtLeastOne';

interface BaseConfig<Name = string> {
  path: `/${string}`;
  name: Name;
  component?: ComponentType;
  module?: () => Promise<{ default: ComponentType }>;
}

export type RouteConfig<Name = string> = RequireAtLeastOne<
  BaseConfig<Name>,
  'component' | 'module'
>;

export type RoutesConfig<Name = string> = RouteConfig<Name>[];
