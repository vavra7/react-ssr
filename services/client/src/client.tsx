import 'reflect-metadata';

import { RouterProvider } from '@react-ssr/router';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { router } from './router';

async function main(): Promise<void> {
  await router.preloadComponents(location.pathname);
  ReactDOM.hydrate(
    <StrictMode>
      <RouterProvider context={router}>
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
