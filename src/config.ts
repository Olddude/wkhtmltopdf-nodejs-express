import process from 'process';

import log4js from 'log4js';
import ms from 'ms';

async function createConfig() {
  const logLevel = process.env.LOG_LEVEL || 'debug';
  return {
    environment: process.env.NODE_ENV || 'development',
    server: {
      secret: process.env.SERVER_SECRET || 'secret',
      sessionMaxAge: ms(process.env.SERVER_SESSION_MAX_AGE || '30s'),
      protocol: process.env.SERVER_PROTOCOL || 'https',
      port: Number.parseInt(process.env.SERVER_PORT || '3000', 10),
      host: process.env.SERVER_HOST || 'localhost',
      publicDirectory: process.env.SERVER_PUBLIC_DIRECTORY || 'public',
      logLevel
    },
    database: {
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017',
      name: process.env.DATABASE_NAME || 'wkhtmltopdf',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'example',
      logLevel
    },
    logger: {
      appenders: {
        out: { type: 'stdout' },
      },
      categories: {
        default: { appenders: ['out'], level: logLevel },
      },
    } as log4js.Configuration
  };
}

export { createConfig };
