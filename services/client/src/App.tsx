import './assets/styles/main.scss';

import { RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import favicon from './assets/images/favicon.png';
import RouteLoader from './components/RouteLoader';
import Test from './components/Test';

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

      <Test />

      <RouterView />
    </>
  );
};

export default App;
