import { preloadComponents, RawRouterContext, RouterProvider } from '@react-ssr/router';
import express, { Application } from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { FilledContext, HelmetProvider } from 'react-helmet-async';

import App from './App';
import HtmlBoilerplate from './components/HtmlBoilerplate';
import { config } from './config';
import { routes } from './router/routes';

class ServerApp {
  private app: Application;
  private manifest: Record<string, string>;
  private preloadedRouterContext: RawRouterContext | undefined;

  constructor() {
    this.app = express();
    this.manifest = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'static/manifest.json'), 'utf-8')
    );
  }

  public async start(): Promise<void> {
    await this.beforeRoutesInit();
    this.routesInit();
    this.app.listen(config.port, () => {
      console.log(`ready - started FE server on ${config.baseUrl}`);
    });
  }

  private async beforeRoutesInit(): Promise<void> {
    this.app.use('/static', express.static('dist/static'));
    this.preloadedRouterContext = await preloadComponents(routes);
  }

  private async routesInit(): Promise<void> {
    this.app.get('*', async (req, res) => {
      const helmetContext: FilledContext | object = {};
      const routerContext: RawRouterContext = this.preloadedRouterContext || {};

      const reactApp = renderToString(
        <RouterProvider context={routerContext} routesConfig={routes} staticPath={req.originalUrl}>
          <HelmetProvider context={helmetContext}>
            <App />
          </HelmetProvider>
        </RouterProvider>
      );

      const html =
        '<!DOCTYPE html>' +
        renderToString(
          <HtmlBoilerplate
            helmetContext={helmetContext as FilledContext}
            scripts={[this.manifest['bundle.js']]}
          >
            {reactApp}
          </HtmlBoilerplate>
        );
      res.send(html);
    });
  }
}

new ServerApp().start();

if (module.hot) {
  module.hot.accept();
}
