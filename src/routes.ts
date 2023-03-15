import express, { Router } from 'express';

import { createConfig } from './config';
import { createMeRoutes } from './features/me/me.routes';
import { createReportRoutes } from './features/report/report.routes';

async function createRoutes() {
  const config = await createConfig();
  const router = Router();

  // features
  router.use(await createReportRoutes());
  router.use(await createMeRoutes());

  router.get(
    '/**',
    express.static(config.server.publicDirectory),
    (req, res) => {
      res.sendFile(req.path, { root: config.server.publicDirectory });
    }
  );

  return router;
}

export { createRoutes };
