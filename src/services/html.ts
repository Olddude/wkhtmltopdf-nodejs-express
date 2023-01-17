import { cwd } from 'process';
import { resolve } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline, Transform, TransformCallback } from 'stream';
import { promisify } from 'util';
import { JSDOM } from 'jsdom';
import { createLogger } from '../logger';
import { createConfig } from '../config';

class HtmlTransform extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
    this.push(chunk);
    callback();
  }
}

async function createHtml(inputHtml: string, jobs: any[]) {
  const logger = await createLogger(createHtml.name);
  const config = await createConfig();
  const dom = new JSDOM(inputHtml);
  const document = dom.window.document;
  for await (const job of jobs) {
    const { querySelector, attribute } = job;
    logger.info(`fixing path for ${attribute}, in ${querySelector}`);
    const elements = document.querySelectorAll(querySelector);
    for await (const element of elements) {
      const sourceFilePath = element.getAttribute(attribute);
      const sourceFileName = sourceFilePath.replace(/^.*[\\\/]/, '');
      const sourceFileStream = createReadStream(sourceFilePath);
      const targetFileName = sourceFileName;
      const targetFilePath = resolve(cwd(), config.publicDir, targetFileName);
      const targetFileStream = createWriteStream(targetFilePath);
      const transformFileStream = new HtmlTransform();
      const streamPromise = promisify(pipeline);
      await streamPromise(sourceFileStream, transformFileStream, targetFileStream);
      element.setAttribute(attribute, targetFileName);
    }
  }
  const outputHtml = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
  return outputHtml;
}

export { createHtml };
