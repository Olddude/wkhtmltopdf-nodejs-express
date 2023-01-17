import { cwd } from 'process';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { promisify } from 'util';
import { createLogger } from '../logger';
import { createConfig } from '../config';
import wkhtmltopdf from 'wkhtmltopdf';
import { pipeline } from 'stream';

async function createPdf() {
  const logger = await createLogger(createPdf.name);
  const config = await createConfig();
  const reportHtmlFilePath = resolve(cwd(), config.publicDir, 'report.html');
  const reportHtml = await readFile(reportHtmlFilePath, { encoding: 'utf-8' });
  const buildPdfStream = wkhtmltopdf(reportHtml, {
    pageSize: 'A4',
    dpi: 300,
    encoding: 'utf-8',
    // marginLeft: 24,
    // marginRight: 20,
    // marginBottom: 24,
    // headerSpacing: 20,
    // footerSpacing: 20,
  });
  const reportPdfFilePath = resolve(cwd(), config.publicDir, 'report.pdf');
  const reportPdfWriteStream = createWriteStream(reportPdfFilePath);
  const streamPromise = promisify(pipeline);
  await streamPromise(buildPdfStream, reportPdfWriteStream);
  logger.info('pdf creation finished');
}

export { createPdf };
