import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import appConfig from './config/app.config.js';
import requestLogger from './middlewares/request-logger.middleware.js';
import rateLimiter from './middlewares/rate-limiter.middleware.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import NotFoundError from './shared/errors/not-found.error.js';

import authRoutes from './modules/auth/auth.routes.js';
import holidayRoutes from './modules/holiday/holiday.routes.js';
import visaRoutes from './modules/visa/visa.routes.js';

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS with credentials for cookies
app.use(
  cors({
    origin: appConfig.frontendUrl || '*',
    credentials: true,
  })
);

// Cookie parser middleware
app.use(cookieParser());

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads serving
app.use('/uploads', express.static('uploads'));

// HTTP Request logging
app.use(requestLogger);

// Global Rate Limiting
app.use(appConfig.apiPrefix, rateLimiter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: appConfig.appName,
  });
});

// Root API Welcome endpoint
app.get(appConfig.apiPrefix, (req, res) => {
  res.status(200).json({
    message: `Welcome to ${appConfig.appName} API`,
    version: '1.0.0',
  });
});

// Note: Domain module routes are plugged in here dynamically:
app.use(`${appConfig.apiPrefix}/auth`, authRoutes);
app.use(`${appConfig.apiPrefix}/holiday`, holidayRoutes);
app.use(`${appConfig.apiPrefix}/visa`, visaRoutes);
// app.use(`${appConfig.apiPrefix}/applications`, applicationRoutes);
// etc.

// 404 Handler for undefined routes
app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

// Centralized Global Error Handler
app.use(errorHandler);

export default app;
export { app };
