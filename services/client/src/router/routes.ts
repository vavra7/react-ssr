import { RoutesConfig } from '@react-ssr/router';

import Test1 from '../views/Test1';

export enum Route {
  Test1 = 'test1',
  Test2 = 'test2'
}

export const routes: RoutesConfig<Route> = [
  {
    path: '/',
    name: Route.Test1,
    component: Test1
  },
  {
    path: '/test2',
    name: Route.Test2,
    module: () => import('../views/Test2')
  }
];
