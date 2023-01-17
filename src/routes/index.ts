import express from 'express';
import path from 'path';
import { createApiRoutes } from './api';
import { createUiRoutes } from './ui';
import { createConfig } from '../config';
import { createLogger } from '../logger';

async function createRoutes() {
  const router = express.Router();
  const logger = await createLogger(createRoutes.name);
  const config = await createConfig();
  router.use(await createApiRoutes());
  router.use(await createUiRoutes());
  const publicDir = path.resolve(process.cwd(), config.publicDir);
  router.use(express.static(publicDir));
  router.get(
    '/**',
    (req, res) => {
      res.sendFile(req.path || 'index.html', { root: publicDir }, (err) => {
        logger.error(`error ${req.path}`, err);
        res.status(500).json(err);
      });
    }
  );
  return router;
}

export { createRoutes };
