import { Link, RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import favicon from './assets/images/favicon.png';
import RouteLoader from './components/RouteLoader';
import { Route } from './router/routes';

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title lang="en">React SSR</title>
        <meta content="React SSR description" name="description" />
        <link href={favicon} rel="icon" type="image/png" />
      </Helmet>

      <RouteLoader />

      <div>global alerts</div>

      <div style={{ border: 'black 1px solid' }}>
        <h4>Test</h4>
        <Link to={{ name: Route.SignIn }}>
          <button type="button">SignIn</button>
        </Link>
        <Link to={{ name: Route.SignUp }}>
          <button type="button">SignUp</button>
        </Link>
        <Link to={{ name: Route.App }}>
          <button type="button">App</button>
        </Link>
        <Link to={{ name: Route.AppHome }}>
          <button type="button">AppHome</button>
        </Link>
      </div>

      <RouterView />
    </>
  );
};

export default App;
