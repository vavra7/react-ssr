import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const port = 4000;
const baseurl = `http://localhost:${port}`;
const app = express();

app.use(express.static("public"));

app.get('*', (req, res) => {
  res.send(`      <!DOCTYPE html>
  <head>
    <title>Universal React</title>
    <script src="/bundle.js" defer></script>
  </head>
  <body>
    <div id="root">${renderToString(<App />)}</div>
  </body>
</html>`);
});

app.listen(port, () => console.log(`ready - started server on ${baseurl}`));
