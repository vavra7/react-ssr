import ReactDOM from 'react-dom';
import React, { StrictMode } from 'react';
import { myText, MyText } from '@react-ssr/router';
import App from './App';

const a: MyText = 'test';

console.log(myText, a);

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
