import { RouterProvider, RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import Layout from './components/Layout';
import TestComponent from './components/TestComponent';
import { routes } from './router/routes';

export interface AppProps {
  location?: string;
}

const App: FC<AppProps> = ({ location }) => {
  return (
    <>
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
