import React from 'react';
import { hydrate } from 'react-dom';
import App from '../shared/App';

hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
