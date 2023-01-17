import { Axios } from 'axios';
import { createLogger } from '../logger';
import { createConfig } from '../config';

async function createApiClient() {
  const config = await createConfig();
  const client = new Axios({
    baseURL: config.myHostServiceUrl
  });
  return {
    async generateReport(data: any) {
      const logger = await createLogger('generateReport');
      try {
        await client.post('', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (e) {
        logger.error(`could not generate report`, e);
      }
    }
  };
}

export { createApiClient };
