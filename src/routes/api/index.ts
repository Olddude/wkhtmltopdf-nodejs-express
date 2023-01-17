import express from 'express';
import Joi from 'joi';
import { AnyPayload } from '../../models/payload';
import { createReport } from '../../services/report';

const validator = Joi.object<AnyPayload>({
  data: Joi.required()
});

async function createApiRoutes() {
  const router = express.Router();
  router.post(
    '/api/generate-html',
    async (req, res) => {
      try {
        await validator.validateAsync(req.body);
        await createReport(req.body);
        res.sendStatus(201);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );
  return router;
}

export { createApiRoutes };
