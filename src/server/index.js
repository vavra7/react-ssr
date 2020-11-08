import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import fs from 'fs';
import path from 'path';

const port = 4000;
const baseurl = `http://localhost:${port}`;
const app = express();

app.get('/', (req, res) => {
  const reactApp = renderToString(<App />);
  const htmlTemplate = fs.readFileSync(path.resolve('./public/index.html'), 'utf-8');

  res.send(htmlTemplate.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`));
});

app.listen(port, () => console.log(`ready - started server on ${baseurl}`));
