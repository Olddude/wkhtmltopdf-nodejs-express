import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import { createConfig } from './config';
import { createLogger } from './logger';

async function createDatabase() {
  const logger = await createLogger(createDatabase.name);
  const config = await createConfig();
  const fullDatabaseUrl = `${config.database.url}/${config.database.name}`;
  return {
    async createSessionStore() {
      const sessionStore = MongoStore.create({
        mongoUrl: fullDatabaseUrl,
        mongoOptions: {
          authSource: 'admin',
          auth: {
            username: config.database.user,
            password: config.database.password,
          },
        },
      });
      return sessionStore;
    },
    async initialize() {
      mongoose.set('strictQuery', true);
      await mongoose.connect(fullDatabaseUrl, {
        user: config.database.user,
        pass: config.database.password,
        authSource: 'admin',
      });
      logger.debug(`Connected to database ${fullDatabaseUrl}`);
    },
    async runMigrations() {
      throw new Error('not implemented');
    }
  };
}

export { createDatabase };
