const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const storageConfig = require('../config/storage.config');
const { s3Client } = require('../utils/file.util');
const BadRequestError = require('../shared/errors/bad-request.error');

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
const createS3Uploader = (folderPrefix = 'documents') => {
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
const memoryUploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: storageConfig.maxFileSizeBytes,
  },
  fileFilter,
});

module.exports = {
  createS3Uploader,
  memoryUploader,
  uploadDocument: createS3Uploader(storageConfig.folders.documents),
  uploadVisa: createS3Uploader(storageConfig.folders.visas),
  uploadInvoice: createS3Uploader(storageConfig.folders.invoices),
  uploadAvatar: createS3Uploader(storageConfig.folders.avatars),
};
