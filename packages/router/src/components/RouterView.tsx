import React, { FC } from 'react';

import { useRouter } from '../hooks';
import DynamicRoute from './DynamicRoute';

export interface RouterViewProps {}

const RouterView: FC<RouterViewProps> = () => {
  const { routeConfig } = useRouter();

  return (
    <DynamicRoute component={routeConfig?.component} loadComponent={routeConfig?.loadComponent} />
  );
};

export default RouterView;
