import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";
import fs from "fs";
import storageConfig from "../config/storage.config.js";
import { s3Client } from "../utils/file.util.js";
import BadRequestError from "../shared/errors/bad-request.error.js";
import appConfig from "../config/app.config.js";

/**
 * File filter to enforce allowed MIME types
 */
const fileFilter = (req, file, cb) => {
  if (
    !storageConfig.allowedMimeTypes ||
    storageConfig.allowedMimeTypes.length === 0 ||
    storageConfig.allowedMimeTypes.includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new BadRequestError(
        `File format '${file.mimetype}' is not supported. Allowed formats: ${storageConfig.allowedMimeTypes.join(", ")}`
      ),
      false
    );
  }
};

/**
 * Helper to check if AWS S3 credentials & bucket are present
 */
export const isS3Configured = () => {
  return Boolean(
    storageConfig.credentials?.accessKeyId &&
      storageConfig.credentials?.secretAccessKey &&
      storageConfig.bucket &&
      typeof storageConfig.bucket === "string" &&
      storageConfig.bucket.trim() !== ""
  );
};

/**
 * Create S3 Multer storage engine
 */
const createS3Storage = (folderPrefix = "uploads") => {
  return multerS3({
    s3: s3Client,
    bucket: storageConfig.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, {
        fieldName: file.fieldname,
        originalName: encodeURIComponent(file.originalname),
        uploadedBy: req.user ? String(req.user.id || req.user._id) : "anonymous",
      });
    },
    key: (req, file, cb) => {
      const sanitized = file.originalname.replace(/\s+/g, "-").toLowerCase();
      const ext = path.extname(sanitized);
      const nameWithoutExt = path.basename(sanitized, ext);
      const uniqueKey = `${folderPrefix}/${nameWithoutExt}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueKey);
    },
  });
};

/**
 * Create Local Disk Multer storage engine (fallback when S3 credentials not provided in dev)
 */
const createDiskStorage = (folderPrefix = "uploads") => {
  const uploadDir = path.join(process.cwd(), "uploads", folderPrefix);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const sanitized = file.originalname.replace(/\s+/g, "-").toLowerCase();
      const ext = path.extname(sanitized);
      const nameWithoutExt = path.basename(sanitized, ext);
      const uniqueFilename = `${nameWithoutExt}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueFilename);
    },
  });
};

/**
 * Get configured multer storage instance (S3 preferred, disk fallback)
 */
export const getStorageEngine = (folderPrefix = "uploads") => {
  if (isS3Configured()) {
    return createS3Storage(folderPrefix);
  }
  return createDiskStorage(folderPrefix);
};

/**
 * Convert a multer file to a public URL link
 */
export const getFileUrl = (file, folderPrefix = "uploads") => {
  if (!file) return null;
  // If uploaded to S3:
  if (file.location) {
    return storageConfig.customDomain
      ? `${storageConfig.customDomain}/${file.key}`
      : file.location;
  }
  if (file.key) {
    return storageConfig.customDomain
      ? `${storageConfig.customDomain}/${file.key}`
      : `https://${storageConfig.bucket}.s3.${storageConfig.region}.amazonaws.com/${file.key}`;
  }
  // Local disk fallback:
  if (file.filename) {
    const baseUrl = appConfig.appUrl || `http://localhost:${appConfig.port || 5000}`;
    return `${baseUrl}/uploads/${folderPrefix}/${file.filename}`;
  }
  return null;
};

/**
 * Convert bracket-notation form fields like 'countries[0][countryName]' to nested objects/arrays
 */
const unflattenBracketKeys = (body) => {
  if (!body || typeof body !== "object") return;
  for (const [key, value] of Object.entries(body)) {
    if (key.includes("[") && key.includes("]")) {
      const parts = key.replace(/\]/g, "").split("[");
      let curr = body;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        const nextPart = parts[i + 1];
        const isNextIndex = /^\d+$/.test(nextPart);
        if (!curr[part]) {
          curr[part] = isNextIndex ? [] : {};
        }
        curr = curr[part];
      }
      curr[parts[parts.length - 1]] = value;
      delete body[key];
    }
  }
};

/**
 * Safely parse any JSON string fields sent via multipart/form-data
 */
const parseMultipartJsonFields = (body) => {
  if (!body || typeof body !== "object") return;
  unflattenBracketKeys(body);
  for (const [key, value] of Object.entries(body)) {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (
        (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
        (trimmed.startsWith("[") && trimmed.endsWith("]"))
      ) {
        try {
          body[key] = JSON.parse(trimmed);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
    }
  }
};

/**
 * Middleware: Parse multipart/form-data without requiring files.
 * Automatically parses JSON string fields and bracket notation (e.g. countries[0][countryName]).
 */
export const parseFormData = () => {
  const upload = multer().none();

  return (req, res, next) => {
    if (!req.is("multipart/form-data")) {
      return next();
    }

    upload(req, res, (err) => {
      if (err) return next(err);
      parseMultipartJsonFields(req.body);
      next();
    });
  };
};

/**
 * Middleware: Upload single image to S3 and convert to URL link in req.body[fieldName]
 * @param {string} fieldName - Form field name (default: 'image')
 * @param {string} folderPrefix - Folder in S3 (e.g. 'countries', 'visas')
 */
export const uploadS3Image = (fieldName = "image", folderPrefix = "uploads") => {
  const upload = multer({
    storage: getStorageEngine(folderPrefix),
    limits: { fileSize: storageConfig.maxFileSizeBytes },
    fileFilter,
  }).single(fieldName);

  return (req, res, next) => {
    // If request is not multipart/form-data, pass through (e.g. JSON requests with URL string)
    if (!req.is("multipart/form-data")) {
      return next();
    }

    upload(req, res, (err) => {
      if (err) {
        if (err.name === "NoSuchBucket" || err.Code === "NoSuchBucket") {
          return next(
            new BadRequestError(
              `AWS S3 bucket '${storageConfig.bucket}' does not exist in region '${storageConfig.region}'. Please add AWS_S3_BUCKET_NAME=<your-bucket> in .env or leave it blank to store files locally.`
            )
          );
        }
        return next(err);
      }

      if (req.file) {
        req.body[fieldName] = getFileUrl(req.file, folderPrefix);
      }

      parseMultipartJsonFields(req.body);
      next();
    });
  };
};

/**
 * Middleware: Upload multiple fields (e.g. single cover 'image' + multiple 'sideImages') to S3
 * and convert to URL links in req.body[field]
 * @param {Array<{ name: string, maxCount: number }>} fields
 * @param {string} folderPrefix
 */
export const uploadS3Fields = (fields = [], folderPrefix = "uploads") => {
  const upload = multer({
    storage: getStorageEngine(folderPrefix),
    limits: { fileSize: storageConfig.maxFileSizeBytes },
    fileFilter,
  }).fields(fields);

  return (req, res, next) => {
    if (!req.is("multipart/form-data")) {
      return next();
    }

    upload(req, res, (err) => {
      if (err) {
        if (err.name === "NoSuchBucket" || err.Code === "NoSuchBucket") {
          return next(
            new BadRequestError(
              `AWS S3 bucket '${storageConfig.bucket}' does not exist in region '${storageConfig.region}'. Please add AWS_S3_BUCKET_NAME=<your-bucket> in .env or leave it blank to store files locally.`
            )
          );
        }
        return next(err);
      }

      if (req.files) {
        for (const field of fields) {
          const uploadedList = req.files[field.name];
          if (uploadedList && uploadedList.length > 0) {
            if (field.maxCount === 1) {
              req.body[field.name] = getFileUrl(uploadedList[0], folderPrefix);
            } else {
              req.body[field.name] = uploadedList.map((f) => getFileUrl(f, folderPrefix));
            }
          }
        }
      }

      parseMultipartJsonFields(req.body);
      next();
    });
  };
};

export default {
  isS3Configured,
  getStorageEngine,
  getFileUrl,
  parseFormData,
  uploadS3Image,
  uploadS3Fields,
};
