import React, { FC } from 'react';
import { RawLocation, RoutesConfig } from '../types';
import Route from './Route';

export interface RouterViewProps {
  routesConfig: RoutesConfig;
  location?: RawLocation;
}

const RouterView: FC<RouterViewProps> = ({ routesConfig, location }) => {
  return (
    <>
      {routesConfig.map(item => (
        <Route key={item.name} />
      ))}
    </>
  );
};

export default RouterView;
