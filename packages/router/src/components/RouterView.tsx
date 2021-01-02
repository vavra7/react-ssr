import React, { FC } from 'react';
import { RoutesConfig } from '../types';
import Route from './Route';

export interface RouterViewProps {
  routesConfig: RoutesConfig;
}

const RouterView: FC<RouterViewProps> = ({ routesConfig }) => {
  return (
    <>
      {routesConfig.map(item => (
        <Route key={item.name} />
      ))}
    </>
  );
};

export default RouterView;
