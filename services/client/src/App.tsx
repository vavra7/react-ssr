import { RouterProvider, RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import Layout from './components/Layout';
import TestComponent from './components/TestComponent';
import { routes } from './router/routes';

export interface AppProps {
  location?: string;
}

const App: FC<AppProps> = ({ location }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title lang="en">React SSR</title>
        <meta content="React SSR description" name="description" />
        <link href="" rel="icon" type="image/png" />
      </Helmet>

      <div>global alerts</div>

      <RouterProvider location={location} routesConfig={routes}>
        <Layout>
          <RouterView />
          <TestComponent />
        </Layout>
      </RouterProvider>
    </>
  );
};

export default App;
