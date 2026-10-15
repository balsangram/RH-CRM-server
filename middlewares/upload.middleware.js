import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import storageConfig from '../config/storage.config.js';
import { s3Client } from '../utils/file.util.js';
import BadRequestError from '../shared/errors/bad-request.error.js';

/**
 * File filter to enforce allowed MIME types
 */
const fileFilter = (req, file, cb) => {
  if (
    storageConfig.allowedMimeTypes.length === 0 ||
    storageConfig.allowedMimeTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        `File format '${file.mimetype}' is not supported. Allowed formats: ${storageConfig.allowedMimeTypes.join(', ')}`
      ),
      false
    );
  }
};

/**
 * Factory to create Multer S3 storage instance with custom folder partition
 * @param {string} folderPrefix
 */
export const createS3Uploader = (folderPrefix = 'documents') => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: storageConfig.bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, {
          fieldName: file.fieldname,
          originalName: encodeURIComponent(file.originalname),
          uploadedBy: req.user ? String(req.user.id || req.user._id) : 'anonymous',
        });
      },
      key: (req, file, cb) => {
        const sanitized = file.originalname.replace(/\s+/g, '-').toLowerCase();
        const ext = path.extname(sanitized);
        const nameWithoutExt = path.basename(sanitized, ext);
        const uniqueKey = `${folderPrefix}/${nameWithoutExt}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueKey);
      },
    }),
    limits: {
      fileSize: storageConfig.maxFileSizeBytes,
    },
    fileFilter,
  });
};

/**
 * In-memory storage uploader (useful when manual processing is needed before uploading to S3)
 */
export const memoryUploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: storageConfig.maxFileSizeBytes,
  },
  fileFilter,
});

export const uploadDocument = createS3Uploader(storageConfig.folders.documents);
export const uploadVisa = createS3Uploader(storageConfig.folders.visas);
export const uploadInvoice = createS3Uploader(storageConfig.folders.invoices);
export const uploadAvatar = createS3Uploader(storageConfig.folders.avatars);

export default {
  createS3Uploader,
  memoryUploader,
  uploadDocument,
  uploadVisa,
  uploadInvoice,
  uploadAvatar,
};
