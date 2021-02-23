import React, { ComponentType, createElement, FC, ReactElement, useEffect, useState } from 'react';

import { useRouter } from '../hooks';
import DynamicRoute from './DynamicRoute';

export interface RouterViewProps {}

const RouterView: FC<RouterViewProps> = () => {
  const { routeConfig } = useRouter();

  return <DynamicRoute component={routeConfig?.component} module={routeConfig?.module} />;
};

export default RouterView;
