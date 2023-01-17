import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import { createLogger } from './logger';
import { createRoutes } from './routes';

async function createApp() {
  const logger = await createLogger(createApp.name);
  const routes = await createRoutes();
  const app = express();
  app.use(bodyParser.json());
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));
  app.use(routes);
  return app;
}

export { createApp };
