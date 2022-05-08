import fs from 'fs';
import path from 'path';
import util from 'util';
import mime from 'mime';
import { Client } from 'minio';

import { tempFolder } from '@config/upload';

interface ISaveOptions {
  folder?: string;
  overrideName?: string;
  makePublic?: boolean;
}

interface IHeaders {
  ContentType?: string;
  'x-amz-acl'?: string;
}

export default class StorageProvider {
  private minioClient: Client;

  constructor() {
    if (
      !process.env.MIN_IO_HOST ||
      !process.env.MIN_IO_PORT ||
      !process.env.MIN_IO_ACCESS_KEY ||
      !process.env.MIN_IO_SECRET_KEY ||
      !process.env.MIN_IO_USE_SSL
    ) {
      throw Error('MISSING MIN IO VARIABLES');
    }
    this.minioClient = new Client({
      endPoint: process.env.MIN_IO_HOST,
      port: Number(process.env.MIN_IO_PORT),
      useSSL: true,
      accessKey: process.env.MIN_IO_ACCESS_KEY,
      secretKey: process.env.MIN_IO_SECRET_KEY,
    });
  }

  public async getFile(file: string, folder?: string): Promise<string> {
    const expiry = 2 * 60 * 60;

    let path: string;

    if (folder) {
      path = folder + '/' + file;
    } else {
      path = file;
    }

    return new Promise((resolve, reject) => {
      this.minioClient.presignedGetObject(
        process.env.MIN_IO_BUCKET || 'aurora',
        path,
        expiry,
        (err, result) => {
          if (err) {
            console.log(err);
            return reject('File not found');
          }

          return resolve(result);
        },
      );
    });
  }

  public async saveFile(file: string, options?: ISaveOptions): Promise<string> {
    let folder: string | undefined = '';
    let overrideName: string | undefined = '';

    if (options) {
      folder = options?.folder;
      overrideName = options?.overrideName;
    }

    const originalPath = path.resolve(tempFolder, file);

    const headers: IHeaders = {};
    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    headers.ContentType = ContentType;

    if (options?.makePublic) {
      headers['x-amz-acl'] = 'public-read';
    }

    let filePath: string;

    if (folder) {
      filePath = folder + '/' + file;
    } else {
      filePath = file;
    }

    if (overrideName) {
      const [, fileExtension] = file.split('.');
      filePath = filePath.replace(file, overrideName + '.' + fileExtension);
    }

    return new Promise((resolve, reject) => {
      this.minioClient.fPutObject(
        process.env.MIN_IO_BUCKET || 'aurora',
        filePath,
        originalPath,
        headers,
        async function (error) {
          if (error) {
            await util.promisify(fs.unlink)(originalPath);

            return reject();
          }

          await util.promisify(fs.unlink)(originalPath);

          return resolve(file);
        },
      );
    });
  }

  public async deleteFile(file: string, folder?: string): Promise<void> {
    let filePath: string;

    if (folder) {
      filePath = folder + '/' + file;
    } else {
      filePath = file;
    }

    await this.minioClient.removeObject(
      process.env.MIN_IO_BUCKET || 'aurora',
      filePath,
    );
  }
}
