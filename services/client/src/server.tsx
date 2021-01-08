import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import HtmlBoilerplate from './components/HtmlBoilerplate';
import { config } from './config';

class ServerApp {
  private app: Application;
  private manifest: Record<string, string>;

  constructor() {
    this.app = express();
    this.manifest = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'static/manifest.json'), 'utf-8')
    );
  }

  private beforeRoutesInit(): void {
    this.app.use('/static', express.static('dist/static'));
  }

  private routesInit(): void {
    this.app.get('*', async (req, res) => {
      res.send(
        '<!DOCTYPE html>' +
          renderToString(
            <HtmlBoilerplate scripts={[this.manifest['bundle.js']]}>
              <App />
            </HtmlBoilerplate>
          )
      );
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
