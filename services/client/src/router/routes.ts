import { RoutesConfig } from '@react-ssr/router';

import About from '../views/app/About';
import Home from '../views/app/Home';
import Listing from '../views/app/Listing';
import Profile from '../views/app/profile';
import Address from '../views/app/profile/Address';
import NotFound from '../views/NotFound';
import SignIn from '../views/SignIn';

export enum Route {
  SignUp = 'signUp',
  SignIn = 'signIn',
  App = 'app',
  AppHome = 'appHome',
  AppProfile = 'appProfile',
  AppProfileAddress = 'appProfileAddress',
  AppProfilePersonalInfo = 'appProfilePersonalInfo',
  AppListing = 'appListing',
  AppNewListing = 'appNewListing',
  AppAbout = 'appAbout',
  NotFound = 'notFound'
}

interface Meta {
  auth: boolean;
}

export const routes: RoutesConfig<Route, Meta> = [
  {
    path: '/sign-up',
    name: Route.SignUp,
    loadComponent: () => import('../views/SignUp' /* webpackChunkName: "signUp"*/),
    meta: {
      auth: false
    }
  },
  {
    path: '/sign-in',
    name: Route.SignIn,
    component: SignIn,
    meta: {
      auth: false
    }
  },
  {
    path: '/',
    name: Route.App,
    loadComponent: () => import('../views/app/index' /* webpackChunkName: "app" */),
    children: [
      {
        path: '/',
        name: Route.AppHome,
        component: Home,
        meta: {
          auth: false
        }
      },
      {
        path: '/profile',
        name: Route.AppProfile,
        component: Profile,
        children: [
          {
            path: '/address',
            name: Route.AppProfileAddress,
            component: Address,
            meta: {
              auth: true
            }
          },
          {
            path: '/personal-info',
            name: Route.AppProfilePersonalInfo,
            loadComponent: () =>
              import(
                '../views/app/profile/PersonalInfo' /* webpackChunkName: "appProfilePersonalInfo" */
              ),
            meta: {
              auth: true
            }
          }
        ],
        meta: {
          auth: true
        }
      },
      {
        path: '/listing/new',
        name: Route.AppNewListing,
        component: Listing,
        meta: {
          auth: true
        }
      },
      {
        path: '/listing/:id',
        name: Route.AppListing,
        component: Listing,
        meta: {
          auth: false
        }
      },
      {
        path: '/about',
        name: Route.AppAbout,
        component: About,
        meta: {
          auth: false
        }
      }
    ],
    meta: {
      auth: false
    }
  },
  {
    path: '*',
    name: Route.NotFound,
    component: NotFound,
    meta: {
      auth: false
    }
  }
];
