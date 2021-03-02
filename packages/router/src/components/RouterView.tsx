import React, { FC } from 'react';

import { useRouter } from '../hooks';
import DynamicRoute from './DynamicRoute';

export interface RouterViewProps {}

const RouterView: FC<RouterViewProps> = () => {
  const { match } = useRouter();

  console.log('RouterView - match', match);

  return (
    <DynamicRoute
      component={match?.configs?.[0]?.component}
      loadComponent={match?.configs?.[0]?.loadComponent}
    />
  );
};

export default RouterView;
