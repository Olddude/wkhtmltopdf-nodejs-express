import process from 'process';

async function createConfig() {
  const logLevel = process.env.LOG_LEVEL || 'warn';
  return {
    logLevel,
    environment: process.env.NODE_ENV || 'production',
    host: process.env.HOST || '0.0.0.0',
    port: Number.parseInt(process.env.PORT || '3000'),
    publicDir: process.env.PUBLIC_DIR || 'public',
    myHostServiceUrl: process.env.MY_HOST_SERVICE_URL || 'http://host.docker.internal:6449/reports/default',
    logger: {
      appenders: {
        out: { type: 'stdout' },
      },
      categories: {
        default: { appenders: ['out'], level: logLevel },
      },
    }
  };
}

export { createConfig };
