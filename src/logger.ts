import log4js from 'log4js';

import { createConfig } from './config';

async function createLogger(name: string) {
  const config = await createConfig();
  const logger = log4js.configure(config.logger).getLogger(name);
  return logger;
}

export { createLogger };
