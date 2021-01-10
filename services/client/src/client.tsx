import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
}
