import { createConfig } from './config';
import { createLogger } from './logger';
import { createServer } from './server';

async function main() {
  const logger = await createLogger(main.name);
  const config = await createConfig();
  logger.info(config);
  const server = await createServer();
  server.listen(config.port, config.host, () => {
    logger.info(`http://${config.host}:${config.port}`);
  });
}

main();
