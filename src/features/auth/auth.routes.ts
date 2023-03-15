import path from 'path';

import { Router } from 'express';

async function createAuthRoutes() {
  const router = Router();
  router.post(
    '/login',
    (req, res) => {
      throw new Error('not implemented');
    }
  );
  router.get(
    '/logout',
    (req, res) => {
      throw new Error('not implemented');
    }
  );
  return router;
}

export { createAuthRoutes };
