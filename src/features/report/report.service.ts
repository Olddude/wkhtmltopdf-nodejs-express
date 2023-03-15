import { createWriteStream } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';

import ejs from 'ejs';
import wkhtmltopdf from 'wkhtmltopdf';

import { createConfig } from '../../config';
import { createLogger } from '../../logger';

import { ReportDto } from './report.dto';

async function createReportService() {
  return {
    async createHtml(defaultReportDto: ReportDto) {
      const logger = await createLogger(this.createHtml.name);
      logger.info(defaultReportDto);
      const config = await createConfig();
      const headerTemplatePath = join(__dirname, 'header.template.ejs');
      const indexTemplatePath = join(__dirname, 'index.template.ejs');
      const footerTemplatePath = join(__dirname, 'footer.template.ejs');
      const map = {
        header: headerTemplatePath,
        index: indexTemplatePath,
        footer: footerTemplatePath
      };
      for await (const entry of Object.entries(map)) {
        const name = entry[0];
        const templatePath = entry[1];
        const template = await readFile(templatePath, { encoding: 'utf-8' });
        const outputPath = resolve(cwd(), config.server.publicDirectory, 'report', `${name}.html`);
        const renderedHtml = ejs.render(template, defaultReportDto, {});
        await writeFile(outputPath, renderedHtml, { encoding: 'utf-8' });  
      }
    },
    async createPdf() {
      const logger = await createLogger(this.createPdf.name);
      const config = await createConfig();
      const headerHtmlFilePath = resolve(cwd(), config.server.publicDirectory, 'report', 'header.html');
      const footerHtmlFilePath = resolve(cwd(), config.server.publicDirectory, 'report', 'footer.html');
      const indexHtmlFilePath = resolve(cwd(), config.server.publicDirectory, 'report', 'index.html');
      const indexHtml = await readFile(indexHtmlFilePath, { encoding: 'utf-8' });
      const buildPdfStream = wkhtmltopdf(indexHtml, {
        pageSize: 'A4',
        dpi: 300,
        encoding: 'utf-8',
        marginLeft: '20',
        marginRight: '20',
        marginBottom: '20',
        marginTop: '20',
        headerSpacing: 0,
        footerSpacing: 5,
        footerHtml: footerHtmlFilePath,
        // headerHtml: headerHtmlFilePath
      });
      const reportPdfFilePath = resolve(cwd(), config.server.publicDirectory, 'report', 'report.pdf');
      const reportPdfWriteStream = createWriteStream(reportPdfFilePath);
      await pipeline(buildPdfStream, reportPdfWriteStream);
      logger.info('pdf creation finished');
    }
  };
}

export { createReportService };
