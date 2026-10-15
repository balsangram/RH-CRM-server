import app from './app.js';
import appConfig from './config/app.config.js';
import { connectDB, disconnectDB } from './database/connection.js';
import logger from './utils/logger.util.js';

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start listening on configured port
    const server = app.listen(appConfig.port, () => {
      logger.info(
        `🚀 ${appConfig.appName} server running in ${appConfig.env} mode on port ${appConfig.port}`
      );
      logger.info(`🔗 Base API URL: ${appConfig.appUrl}${appConfig.apiPrefix}`);
    });

    // Graceful Shutdown Handler
    const handleShutdown = async (signal) => {
      logger.warn(`Received ${signal}. Shutting down server gracefully...`);

      server.close(async () => {
        logger.info('HTTP server closed.');
        await disconnectDB();
        logger.info('Clean exit.');
        process.exit(0);
      });

      // Force shutdown after timeout
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down.');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));

    process.on('unhandledRejection', (reason, promise) => {
      logger.error(`Unhandled Promise Rejection: ${reason}`);
    });

    process.on('uncaughtException', (error) => {
      logger.error(`Uncaught Exception: ${error.message} - ${error.stack}`);
      process.exit(1);
    });
  } catch (err) {
    logger.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
