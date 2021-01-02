import { RouterView } from '@react-ssr/router';
import React, { FC } from 'react';
import { routes } from './router/routes';

const App: FC = () => {
  return (
    <>
      <div>global alerts</div>
      <RouterView routesConfig={routes} />
    </>
  );
};

export default App;
