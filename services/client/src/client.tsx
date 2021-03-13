import 'reflect-metadata';

import { I18nProvider } from '@react-ssr/i18n';
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
        <I18nProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </I18nProvider>
      </RouterProvider>
    </StrictMode>,
    document.getElementById('root')
  );
}

main();

if (module.hot) {
  module.hot.accept();
}
