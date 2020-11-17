import express, { Application } from 'express';
import { config } from './config';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './views/_App';
import { StaticRouter } from 'react-router-dom';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
  }

  private beforeRoutesInit(): void {
    this.app.use(express.static('dist'));
  }

  private routesInit(): void {
    this.app.get('*', (req, res) => {
      const reactApp = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      );
      const htmlTemplate = fs
        .readFileSync(path.resolve('src/index.html'), 'utf-8')
        .replace('<div id="app"></div>', `<div id="app">${reactApp}</div>`);
      res.send(htmlTemplate);
    });
  }

  public start(): void {
    this.beforeRoutesInit();
    this.routesInit();
    this.app.listen(config.port, () =>
      console.log(`ready - started FE server on ${config.baseUrl}`)
    );
  }
}

new Server().start();
