import { createConfig } from './config';
import { createLogger } from './logger';
import { createServer } from './server';

async function main() {
  const logger = await createLogger(main.name);
  const config = await createConfig();
  logger.info(config);
  const server = await createServer();
  const { port, host, protocol } = config.server;
  server?.listen(port, host, () => {
    logger.info(`${protocol}://${host}:${port}`);
  });
}

main();
