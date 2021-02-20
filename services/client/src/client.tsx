import 'reflect-metadata';

import { RouterProvider } from '@react-ssr/router';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { routes } from './router/routes';

ReactDOM.hydrate(
  <StrictMode>
    <RouterProvider routesConfig={routes}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </RouterProvider>
  </StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
