import 'reflect-metadata';

import { preloadComponents, RawRouterContext, RouterProvider } from '@react-ssr/router';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { routes } from './router/routes';

async function main(): Promise<void> {
  const routerContext: RawRouterContext = await preloadComponents(routes, location.pathname);
  ReactDOM.hydrate(
    <StrictMode>
      <RouterProvider context={routerContext}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </RouterProvider>
    </StrictMode>,
    document.getElementById('root')
  );
}

main();

if (module.hot) {
  module.hot.accept();
}
