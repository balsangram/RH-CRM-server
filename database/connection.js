import mongoose from 'mongoose';
import dbConfig from '../config/db.config.js';
import logger from '../utils/logger.util.js';

export const connectDB = async () => {
  try {
    if (dbConfig.uri.includes('USERNAME:PASSWORD') || dbConfig.uri.includes('<username>:<password>')) {
      logger.error(
        'Database connection failed: .env contains placeholder credentials (USERNAME:PASSWORD) in MONGODB_URI_DEV / MONGODB_URI_PROD.'
      );
      logger.warn('Please update your .env file with your actual MongoDB Atlas username and password.');
      process.exit(1);
    }

    if (dbConfig.debug) {
      mongoose.set('debug', true);
      logger.info('Mongoose debug mode enabled');
    }

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Waiting for auto-reconnection...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected successfully.');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });

    const conn = await mongoose.connect(dbConfig.uri, dbConfig.options);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      logger.error('Database connection failed: Invalid MongoDB username or password in .env');
      logger.warn('Check MONGODB_URI_DEV in .env. Note: If your password has special characters like @, #, or %, make sure they are URL-encoded.');
    } else {
      logger.error(`Database connection failed: ${error.message}`);
    }
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB disconnected successfully');
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};

export default {
  connectDB,
  disconnectDB,
};
