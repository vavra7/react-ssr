import { RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import favicon from './assets/images/favicon.png';
import Layout from './components/Layout';
import TestComponent from './components/TestComponent';

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

      <div>global alerts</div>

      <Layout>
        <RouterView />
        <TestComponent />
      </Layout>
    </>
  );
};

export default App;
