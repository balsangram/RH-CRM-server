import mongoose from 'mongoose';
import dbConfig from '../config/db.config.js';
import logger from '../utils/logger.util.js';

let listenersAdded = false;

export const connectDB = async () => {
  // 1: Connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // 2: Connecting (await existing connection attempt)
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve) => {
      mongoose.connection.once('connected', resolve);
    });
    return mongoose.connection;
  }

  try {
    if (dbConfig.uri.includes('USERNAME:PASSWORD') || dbConfig.uri.includes('<username>:<password>')) {
      logger.error(
        'Database connection failed: .env contains placeholder credentials (USERNAME:PASSWORD) in MONGODB_URI_DEV / MONGODB_URI_PROD.'
      );
      logger.warn('Please update your .env file with your actual MongoDB Atlas username and password.');
      if (!process.env.VERCEL) {
        process.exit(1);
      }
      throw new Error('Database placeholder credentials in MONGODB_URI');
    }

    if (dbConfig.debug) {
      mongoose.set('debug', true);
      logger.info('Mongoose debug mode enabled');
    }

    if (!listenersAdded) {
      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB disconnected. Waiting for auto-reconnection...');
      });

      mongoose.connection.on('reconnected', () => {
        logger.info('MongoDB reconnected successfully.');
      });

      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err.message}`);
      });
      listenersAdded = true;
    }

    const conn = await mongoose.connect(dbConfig.uri, dbConfig.options);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    if (error.message.includes('Authentication failed') || error.message.includes('bad auth')) {
      logger.error('Database connection failed: Invalid MongoDB username or password');
      logger.warn('Check MONGODB_URI in environment settings.');
    } else {
      logger.error(`Database connection failed: ${error.message}`);
    }
    if (!process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
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
