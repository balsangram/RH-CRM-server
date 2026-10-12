const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const appConfig = require('./config/app.config');
const requestLogger = require('./middlewares/request-logger.middleware');
const rateLimiter = require('./middlewares/rate-limiter.middleware');
const errorHandler = require('./middlewares/error-handler.middleware');
const NotFoundError = require('./shared/errors/not-found.error');

const app = express();

// Security HTTP headers
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: appConfig.frontendUrl || '*',
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
// app.use(`${appConfig.apiPrefix}/auth`, require('./modules/auth/routes/auth.routes'));
// app.use(`${appConfig.apiPrefix}/applications`, require('./modules/applications/routes/application.routes'));
// etc.

// 404 Handler for undefined routes
app.use((req, res, next) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

// Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
