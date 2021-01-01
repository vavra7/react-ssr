import React, { FC } from 'react';
import Layout from './components/Layout';
import Test1 from './views/Test1';

const App: FC = () => {
  return (
    <Layout>
      <Test1 />
    </Layout>
  );
};

export default App;
