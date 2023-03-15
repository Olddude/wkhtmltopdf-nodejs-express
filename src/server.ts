import fs from 'fs';
import http from 'http';
import https from 'https';

import { createApp } from './app';
import { createConfig } from './config';
import { createLogger } from './logger';

async function createServer() {
  const config = await createConfig();
  const logger = await createLogger(createServer.name);
  if (config.server.protocol === 'http') {
    return createHttpServer();
  } else if (config.server.protocol === 'https') {
    return createHttpsServer();
  } else {
    logger.error(`Unknown protocol ${config.server.protocol}`);
  }
}

async function createHttpServer() {
  const app = await createApp();
  const config = await createConfig();
  const logger = await createLogger(createServer.name);
  logger.debug(config);
  const server = http.createServer(app);
  return server;
}

async function createHttpsServer() {
  const app = await createApp();
  const config = await createConfig();
  const logger = await createLogger(createHttpsServer.name);
  logger.debug(config);
  const server = https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
  }, app);
  return server;
}

export { createServer };
