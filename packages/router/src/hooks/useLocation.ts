import { useState } from 'react';
import Container from 'typedi';

import { Location } from '../services';

export type Navigate = () => void;
export type LocationHook = () => [path: string, navigate: Navigate];

const locationService = Container.get(Location);

export const useLocation: LocationHook = () => {
  const [path, update] = useState('asdf');

  console.log(locationService.getCurrentPathname())

  const navigate = (): void => {
    console.log('navigate');
  };
  return [path, navigate];
};
