import ReactDOM from 'react-dom';
import React, { StrictMode } from 'react';
import App from './App';

ReactDOM.hydrate(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
