import { RouterView } from '@react-ssr/router';
import React, { FC } from 'react';

import Layout from '../../components/Layout';

const App: FC = () => {
  return (
    <Layout>
      <h1>App</h1>
      <RouterView />
    </Layout>
  );
};

export default App;
