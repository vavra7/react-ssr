import { RoutesConfig } from '@react-ssr/router';

import NotFound from '../views/NotFound';
import SignIn from '../views/SignIn';

export enum Route {
  SignUp = 'signUp',
  SignIn = 'signIn',
  App = 'app',
  NotFound = 'notFound'
}

export const routes: RoutesConfig<Route> = [
  {
    path: '/sign-up',
    name: Route.SignUp,
    loadComponent: () => import('../views/SignUp' /* webpackChunkName: "signUp"*/)
  },
  {
    path: '/sign-in',
    name: Route.SignIn,
    component: SignIn
  },
  {
    path: '/',
    name: Route.App,
    loadComponent: () => import('../views/app/index' /* webpackChunkName: "app" */)
  },
  {
    path: '*',
    name: Route.NotFound,
    component: NotFound
  }
];
