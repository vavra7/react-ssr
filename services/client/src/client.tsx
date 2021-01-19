import 'reflect-metadata';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.hydrate(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
