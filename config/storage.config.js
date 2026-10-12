module.exports = {
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  bucket: process.env.AWS_S3_BUCKET_NAME || 'rh-global-crm-storage',
  customDomain: process.env.AWS_S3_CUSTOM_DOMAIN || '',
  signedUrlExpiresIn: parseInt(process.env.AWS_S3_SIGNED_URL_EXPIRES_IN || '3600', 10),
  maxFileSizeBytes: parseInt(process.env.MAX_FILE_SIZE_BYTES || '10485760', 10), // 10MB default
  allowedMimeTypes: (process.env.ALLOWED_MIME_TYPES || '').split(',').map((type) => type.trim()),
  folders: {
    documents: 'documents',
    visas: 'visas',
    invoices: 'invoices',
    avatars: 'avatars',
    temp: 'temp',
  },
};
