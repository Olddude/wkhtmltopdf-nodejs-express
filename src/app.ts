import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';

import { createConfig } from './config';
import { createDatabase } from './database';
import { createLogger } from './logger';
import { createAuthMiddleware } from './middleware/auth.middleware';
import { createRoutes } from './routes';

async function createApp() {
  const logger = await createLogger(createApp.name);
  const config = await createConfig();
  const routes = await createRoutes();
  const database = await createDatabase();
  await database.initialize();
  const sessionStore = await database.createSessionStore();
  const app = express();
  app.use(helmet());
  app.use(session({
    secret: config.server.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: config.server.sessionMaxAge,
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    },
    store: sessionStore,
  }));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  }));
  const auth = await createAuthMiddleware();
  app.use(auth.initialize());
  app.use(auth.session());
  app.use(auth.authenticate(['anonymous']));
  app.use(routes);
  app.set('view engine', 'ejs');
  return app;
}

export { createApp };
