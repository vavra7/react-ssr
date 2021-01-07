import express, { Application } from 'express';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import { config } from './config';
import fs from 'fs';
import path from 'path';
import App from './App';

class ServerApp {
  private app: Application;
  private htmlTemplate: string;

  constructor() {
    this.app = express();
    this.htmlTemplate = fs.readFileSync(path.resolve(__dirname, 'static/index.html'), 'utf-8');
  }

  private beforeRoutesInit(): void {
    this.app.use(express.static('dist/static'));
  }

  private routesInit(): void {
    this.app.get('*', async (req, res) => {
      const reactAppString = ReactDOMServer.renderToString(<App />);
      const staticPage = this.htmlTemplate.replace(
        '<div id="root"></div>',
        `<div id="root">${reactAppString}</div>`
      );
      res.send(staticPage);
    });
  }

  public start(): void {
    this.beforeRoutesInit();
    this.routesInit();
    this.app.listen(config.port, () => {
      console.log(`ready - started FE server on ${config.baseUrl}`);
    });
  }
}

new ServerApp().start();
