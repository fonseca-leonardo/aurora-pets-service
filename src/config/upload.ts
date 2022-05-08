import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

export const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'minio';

  tempFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};
    minio: {
      bucket: string;
    };
  };
}

export default {
  driver: 'minio',

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    limits: {
      fileSize: 8 * 1024 * 1024, // 8 MB
    },
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}.${file.originalname.substring(
          file.originalname.lastIndexOf('.') + 1,
        )}`;

        return callback(null, fileName);
      },
    }),
  },

  config: {
    disk: {},
    minio: {
      bucket: process.env.MIN_IO_BUCKET || '',
    },
  },
} as IUploadConfig;
