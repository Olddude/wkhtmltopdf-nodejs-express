import path from 'path';

import { Router } from 'express';

async function createMeRoutes() {
  const router = Router();
  router.get(
    '/me',
    (req, res) => {
      res.render(path.join(__dirname, 'me.view.ejs'), { user: req.user });
    }
  );
  return router;
}

export { createMeRoutes };
