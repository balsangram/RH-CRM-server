import env from './env.config.js';

const dbConfig = {
  uri: env.database.uri,
  debug: env.database.debug,
  options: {
    autoIndex: !env.isProduction,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
    minPoolSize: 1,
    heartbeatFrequencyMS: 10000,
  },
};

export default dbConfig;
export { dbConfig };
