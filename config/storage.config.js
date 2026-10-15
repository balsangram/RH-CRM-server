import env from './env.config.js';

const storageConfig = {
  region: env.aws.region,
  credentials: {
    accessKeyId: env.aws.accessKeyId,
    secretAccessKey: env.aws.secretAccessKey,
  },
  bucket: env.aws.bucketName,
  customDomain: env.aws.customDomain,
  signedUrlExpiresIn: env.aws.signedUrlExpiresIn,
  maxFileSizeBytes: env.upload.maxFileSizeBytes,
  allowedMimeTypes: env.upload.allowedMimeTypes,
  folders: {
    documents: 'documents',
    visas: 'visas',
    invoices: 'invoices',
    avatars: 'avatars',
    temp: 'temp',
  },
};

export default storageConfig;
export { storageConfig };
