import { RouterView } from '@react-ssr/router';
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
      <Layout>
        <RouterView location={location} routesConfig={routes} />
        <TestComponent />
      </Layout>
    </>
  );
};

export default App;
