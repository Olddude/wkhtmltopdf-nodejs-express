import { cwd } from 'process';
import ejs from 'ejs';
import { resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline, Transform, TransformCallback } from 'stream';
import { createConfig } from '../config';
import { createApiClient } from '../clients/api-client';
import { createPdf } from './pdf';

class TransformHtmlStream extends Transform {
  async _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): Promise<void> {
    const inputHtml = Buffer.from(chunk, 'utf-8').toString();
    // const outputHtml = await createHtml(inputHtml, [
    //   { querySelector: 'link', attribute: 'href' },
    // ]);
    const outputHtml = inputHtml;
    this.push(outputHtml);
    callback();
  }
}

async function generateHere(data: any) {
  const config = await createConfig();
  const templatePath = resolve(cwd(), 'src', 'templates', 'report.ejs');
  const template = await readFile(templatePath, { encoding: 'utf-8' });
  const outputPath = resolve(cwd(), config.publicDir, 'index.html');
  const renderedHtml = ejs.render(template, data, {});
  await writeFile(outputPath, renderedHtml, { encoding: 'utf-8' });
}

async function generateWithApi(data: any) {
  const apiClient = await createApiClient();
  await apiClient.generateReport(data);
}

async function createReport(data: any) {
  const config = await createConfig();
  // await generateHere(data);
  await generateWithApi(data);
  const inputHtmlFileName = 'index.html';
  const inputHtmlFilePath = resolve(cwd(), config.publicDir, inputHtmlFileName);
  const inputHtmlStream = createReadStream(inputHtmlFilePath, { encoding: 'utf-8' });
  const transformHtmlStream = new TransformHtmlStream();
  const outputHtmlFileName = 'report.html';
  const outputHtmlFilePath = resolve(cwd(), config.publicDir, outputHtmlFileName);
  const outputHtmlStream = createWriteStream(outputHtmlFilePath, { encoding: 'utf-8' });
  const streamPromise = promisify(pipeline);
  await streamPromise(inputHtmlStream, transformHtmlStream, outputHtmlStream);
  await createPdf();
}

export { createReport };
