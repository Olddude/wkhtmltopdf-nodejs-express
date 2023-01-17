import http from 'http';
import { createApp } from './app';

async function createServer() {
  const app = await createApp();
  const server = http.createServer(app);
  return server;
}

export { createServer };
