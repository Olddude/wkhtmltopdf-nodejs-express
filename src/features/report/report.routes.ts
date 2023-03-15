import express from 'express';

import { createReportService } from './report.service';
import { createReportValidator } from './report.validator';

async function createReportRoutes() {
  const router = express.Router();
  router.post(
    '/api/report',
    async (req, res) => {
      const validator = await createReportValidator();
      const defaultReportDto = await validator.validate(req.body);
      const service = await createReportService();
      await service.createHtml(defaultReportDto);
      await service.createPdf();
      res.sendStatus(201);
    }
  );
  return router;
}

export { createReportRoutes };
