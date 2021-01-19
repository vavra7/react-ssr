import 'reflect-metadata';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

ReactDOM.hydrate(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
