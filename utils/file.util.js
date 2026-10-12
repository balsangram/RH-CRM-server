const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const path = require('path');
const storageConfig = require('../config/storage.config');
const logger = require('./logger.util');

// Initialize AWS S3 Client
const s3Client = new S3Client({
  region: storageConfig.region,
  credentials: {
    accessKeyId: storageConfig.credentials.accessKeyId,
    secretAccessKey: storageConfig.credentials.secretAccessKey,
  },
});

/**
 * Generate a unique S3 object key
 * @param {string} folder
 * @param {string} originalName
 * @returns {string}
 */
const generateS3Key = (folder = 'documents', originalName = '') => {
  const sanitizedName = originalName.replace(/\s+/g, '-').toLowerCase();
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(sanitizedName);
  const base = path.basename(sanitizedName, ext);
  return `${folder}/${base}-${timestamp}-${randomStr}${ext}`;
};

/**
 * Upload a Buffer or Stream directly to AWS S3
 * @param {Buffer|ReadableStream} fileBuffer
 * @param {string} key
 * @param {string} mimeType
 * @returns {Promise<{ key: string, location: string, bucket: string }>}
 */
const uploadToS3 = async (fileBuffer, key, mimeType) => {
  try {
    const command = new PutObjectCommand({
      Bucket: storageConfig.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    const publicUrl = storageConfig.customDomain
      ? `${storageConfig.customDomain}/${key}`
      : `https://${storageConfig.bucket}.s3.${storageConfig.region}.amazonaws.com/${key}`;

    return {
      key,
      location: publicUrl,
      bucket: storageConfig.bucket,
    };
  } catch (error) {
    logger.error(`Error uploading file to S3: ${error.message}`);
    throw error;
  }
};

/**
 * Generate a secure Presigned URL for downloading/viewing a private S3 object
 * @param {string} key
 * @param {number} expiresIn
 * @returns {Promise<string>}
 */
const getPresignedDownloadUrl = async (key, expiresIn = storageConfig.signedUrlExpiresIn) => {
  try {
    const command = new GetObjectCommand({
      Bucket: storageConfig.bucket,
      Key: key,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    logger.error(`Error generating presigned download URL: ${error.message}`);
    throw error;
  }
};

/**
 * Generate a secure Presigned URL for client-side direct upload
 * @param {string} key
 * @param {string} contentType
 * @param {number} expiresIn
 * @returns {Promise<string>}
 */
const getPresignedUploadUrl = async (
  key,
  contentType,
  expiresIn = storageConfig.signedUrlExpiresIn
) => {
  try {
    const command = new PutObjectCommand({
      Bucket: storageConfig.bucket,
      Key: key,
      ContentType: contentType,
    });

    return await getSignedUrl(s3Client, command, { expiresIn });
  } catch (error) {
    logger.error(`Error generating presigned upload URL: ${error.message}`);
    throw error;
  }
};

/**
 * Delete an object from AWS S3
 * @param {string} key
 * @returns {Promise<boolean>}
 */
const deleteFromS3 = async (key) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: storageConfig.bucket,
      Key: key,
    });

    await s3Client.send(command);
    return true;
  } catch (error) {
    logger.error(`Error deleting file from S3: ${error.message}`);
    throw error;
  }
};

module.exports = {
  s3Client,
  generateS3Key,
  uploadToS3,
  getPresignedDownloadUrl,
  getPresignedUploadUrl,
  deleteFromS3,
};
