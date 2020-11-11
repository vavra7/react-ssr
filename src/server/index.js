import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';
import fs from 'fs';
import path from 'path';

const port = 4000;
const baseurl = `http://localhost:${port}`;
const app = express();

function fakeFetch() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa, deserunt.'
        },
        {
          id: 2,
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, odit.'
        }
      ]);
    }, 1000);
  });
}

app.use(express.static('dist'));

app.get('/', (req, res) => {
  const htmlTemplate = fs.readFileSync(path.resolve('./public/index.html'), 'utf-8');
  fakeFetch().then(initialData => {
    const reactApp = renderToString(<App initialData={initialData} />);
    res.send(htmlTemplate.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`));
  });
});

app.listen(port, () => console.log(`ready - started server on ${baseurl}`));
