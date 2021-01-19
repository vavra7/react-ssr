import { RoutesConfig } from '@react-ssr/router';

import Test1 from '../views/Test1';
import Test2 from '../views/Test2';

export enum Route {
  Test1 = 'test1',
  Test2 = 'test2'
}

export const routes: RoutesConfig<Route> = [
  {
    path: '/test1',
    name: Route.Test1,
    component: Test1
  },
  {
    path: '/test2',
    name: Route.Test2,
    component: Test2
  }
];
