import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// ==============================================
// Raw Environment Variables
// ==============================================

// Application
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '5000', 10);
export const API_PREFIX = process.env.API_PREFIX || '/api/v1';
export const APP_NAME = process.env.APP_NAME || 'RH Global CRM';
export const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Environment Helpers
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';
export const IS_TEST = NODE_ENV === 'test';

// Database
export const MONGODB_URI_DEV = process.env.MONGODB_URI_DEV || '';
export const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD || '';
export const MONGOOSE_DEBUG = process.env.MONGOOSE_DEBUG === 'true';
export const MONGODB_URI =
  (IS_PRODUCTION ? MONGODB_URI_PROD : MONGODB_URI_DEV) ||
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/rh_global_crm';

// SuperAdmin Seeder
export const SUPER_ADMIN_NAME = process.env.SUPER_ADMIN_NAME || 'Super Admin';
export const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superAdmin@gmail.com';
export const SUPER_ADMIN_PHONE = process.env.SUPER_ADMIN_PHONE || '+1234567890';

// JWT Authentication
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'default_jwt_access_secret_change_me';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret_change_me';
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
export const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

// Rate Limiting
export const RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
export const RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);

// AWS S3 Storage
export const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';
export const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || 'rh-global-crm-storage';
export const AWS_S3_CUSTOM_DOMAIN = process.env.AWS_S3_CUSTOM_DOMAIN || '';
export const AWS_S3_SIGNED_URL_EXPIRES_IN = parseInt(
  process.env.AWS_S3_SIGNED_URL_EXPIRES_IN || '3600',
  10
);

// File Upload Constraints
export const MAX_FILE_SIZE_BYTES = parseInt(process.env.MAX_FILE_SIZE_BYTES || '10485760', 10);
export const ALLOWED_MIME_TYPES = (
  process.env.ALLOWED_MIME_TYPES ||
  'image/jpeg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
)
  .split(',')
  .map((type) => type.trim())
  .filter(Boolean);

// Email Provider Configuration
export const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'smtp';
export const EMAIL_FROM = process.env.EMAIL_FROM || 'RH Global CRM <no-reply@rhglobalcrm.com>';
export const SMTP_HOST = process.env.SMTP_HOST || 'smtp.mailtrap.io';
export const SMTP_PORT = parseInt(process.env.SMTP_PORT || '2525', 10);
export const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
export const SMTP_USER = process.env.SMTP_USER || '';
export const SMTP_PASS = process.env.SMTP_PASS || '';

// Payment Gateways
export const PAYMENT_GATEWAY_PROVIDER = process.env.PAYMENT_GATEWAY_PROVIDER || 'stripe';
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || '';
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

// ==============================================
// Grouped Environment Objects
// ==============================================

export const appEnv = {
  env: NODE_ENV,
  port: PORT,
  apiPrefix: API_PREFIX,
  appName: APP_NAME,
  appUrl: APP_URL,
  frontendUrl: FRONTEND_URL,
  isProduction: IS_PRODUCTION,
  isDevelopment: IS_DEVELOPMENT,
  isTest: IS_TEST,
};

export const dbEnv = {
  uri: MONGODB_URI,
  uriDev: MONGODB_URI_DEV,
  uriProd: MONGODB_URI_PROD,
  debug: MONGOOSE_DEBUG,
};

export const jwtEnv = {
  accessSecret: JWT_ACCESS_SECRET,
  refreshSecret: JWT_REFRESH_SECRET,
  accessExpiresIn: JWT_ACCESS_EXPIRES_IN,
  refreshExpiresIn: JWT_REFRESH_EXPIRES_IN,
};

export const rateLimitEnv = {
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
};

export const awsEnv = {
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  bucketName: AWS_S3_BUCKET_NAME,
  customDomain: AWS_S3_CUSTOM_DOMAIN,
  signedUrlExpiresIn: AWS_S3_SIGNED_URL_EXPIRES_IN,
};

export const uploadEnv = {
  maxFileSizeBytes: MAX_FILE_SIZE_BYTES,
  allowedMimeTypes: ALLOWED_MIME_TYPES,
};

export const emailEnv = {
  provider: EMAIL_PROVIDER,
  from: EMAIL_FROM,
  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  },
};

export const paymentEnv = {
  provider: PAYMENT_GATEWAY_PROVIDER,
  stripe: {
    secretKey: STRIPE_SECRET_KEY,
    webhookSecret: STRIPE_WEBHOOK_SECRET,
  },
  razorpay: {
    keyId: RAZORPAY_KEY_ID,
    keySecret: RAZORPAY_KEY_SECRET,
  },
};

// ==============================================
// Consolidated Default Export
// ==============================================

const env = {
  // App
  nodeEnv: NODE_ENV,
  port: PORT,
  apiPrefix: API_PREFIX,
  appName: APP_NAME,
  appUrl: APP_URL,
  frontendUrl: FRONTEND_URL,
  isProduction: IS_PRODUCTION,
  isDevelopment: IS_DEVELOPMENT,
  isTest: IS_TEST,

  // Sections
  app: appEnv,
  database: dbEnv,
  jwt: jwtEnv,
  rateLimit: rateLimitEnv,
  aws: awsEnv,
  upload: uploadEnv,
  email: emailEnv,
  payment: paymentEnv,
};

export default env;
export { env };
