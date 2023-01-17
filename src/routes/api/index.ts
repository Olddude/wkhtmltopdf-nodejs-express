import express from 'express';
import { createReport } from '../../services/report';

async function createApiRoutes() {
  const router = express.Router();
  router.post(
    '/api/generate-html',
    async (req, res) => {
      await createReport(req.body);
      res.sendStatus(201);
    }
  );
  return router;
}

export { createApiRoutes };
