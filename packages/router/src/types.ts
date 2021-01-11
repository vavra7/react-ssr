import { ComponentType } from 'react';

export type RoutesConfig<Name = string> = RouteConfig<Name>[];

interface RouteConfig<Name = string> {
  path: string;
  name: Name;
  component: ComponentType;
}

export type RawLocation = string | { name: string; params: Record<string, string | number> };
