import Joi from 'joi';

import { ReportDto } from './report.dto';

async function createReportValidator() {
  return {
    async validate(defaultReportDto: ReportDto) {
      const validator = Joi.object<ReportDto>({
        title: Joi.required(),
        content: Joi.required()
      });
      const validationResult = validator.validate(defaultReportDto);
      if (validationResult.error) {
        throw validationResult.error;
      }
      return validationResult.value;
    }
  }
}

export { createReportValidator };
